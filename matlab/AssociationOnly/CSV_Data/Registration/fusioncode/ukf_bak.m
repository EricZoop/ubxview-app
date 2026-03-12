classdef ukf < handle
    properties (SetAccess = public, GetAccess = public)
        mState;
        mConfig;
    end
    methods (Access = public)
        function obj =ukf(config,time)
            if(isstruct(config))
                obj.mConfig = config;
                % set state
                obj.mState = initkalman(obj);
                obj.mState.Tlast = time;
            else
                % Set Configuration
                obj.mConfig = obj.SetParams(config);
                % set state
                obj.mState = initkalman(obj);
                obj.mState.Tlast = time;
            end
            
        end
        
        function config = SetParams(obj,configFile)
            z = xml2struct(configFile);
            config.numberFilters = str2num(z.Parameters.general.numberOfFilter.Text);
            config.totalStates= str2num(z.Parameters.general.numberOfStates.Text);
            config.observedStates= str2num(z.Parameters.general.numberOfObservedStates.Text);
            config.processModel = strtrim(z.Parameters.general.processNoiseModel.Text);
            config.lockAcceptance = .01*str2num(z.Parameters.general.lockAcceptancePercent.Text);
            config.measuremodel = @obj.raedmeasurementecef;
            switch config.processModel
                case 'discreteWhiteNoiseAccModel'
                    config.sigma= str2num(z.Parameters.general.processNoiseModelAcc.Text);
                    config.pModel = 'discreteWhiteNoiseAccModel';
                otherwise
                    config.sigma= 1;
                    config.pModel =  'discreteWhiteNoiseAccModel';
            end
        end
        function state = initkalman(obj)
            %times
            
            state.Tlast = 0;
            state.updates = 0;
            %state vectors
            state.xPred = zeros(obj.mConfig.totalStates,1);
            state.xCurr = zeros(obj.mConfig.totalStates,1);
            %error covariance matrix
            state.PPred = zeros(obj.mConfig.totalStates,obj.mConfig.totalStates);
            state.PCurr = zeros(obj.mConfig.totalStates,obj.mConfig.totalStates);
            %state transition matrix
            state.A = zeros(obj.mConfig.totalStates,obj.mConfig.totalStates);
            %observation matrix
            state.MahalanobisDistance = 0;
            state.memoryLength = 20;
            state.likelyhood  = .1;
            state.acceptanceValue = 20;
            state.acceptanceMemory = zeros(state.memoryLength ,1);
            state.gateProb = 1;
            state.locked = false;
            state.trackConfirmation = .02;
            
            %gain matrix
            state.K= eye(obj.mConfig.totalStates,obj.mConfig.observedStates);
            
            %pdf function
            state.acceptanceInterval =obj.computeAcceptanceInterval( obj.mConfig.lockAcceptance);
            
            
            state.cdfx = [0:.01:12];
            state.pdf = chitwopdf(state.cdfx,3);
            state.cdfy = cumsum(.01*state.pdf );
            state.alpha=.1;                                 %default, tunable
            state.ki=3-obj.mConfig.totalStates;                                       %default, tunable
            state.beta=2;                                     %default, tunable
            state.lambda=state.alpha^2*(obj.mConfig.totalStates+state.ki)-obj.mConfig.totalStates;                    %scaling factor
            state.c =obj.mConfig.totalStates+state.lambda;                                 %scaling factor
            %             Wm=[state.lambda/state.c 0.5/state.c+zeros(1,2*obj.mConfig.totalStates)];           %weights for means
            %             Wm = Wm/sum(Wm);
            %             Wc=Wm;
            %             Wc(1)=Wc(1)+(1-state.alpha^2+state.beta);               %weights for covariance
            
            Wm = zeros(1,2*obj.mConfig.totalStates+1);
            Wm = Wm + 1/(2*(obj.mConfig.totalStates+state.lambda));
            Wc = Wm;
            Wm(1) = state.lambda/(obj.mConfig.totalStates+state.lambda);
            Wc(1) = Wm(1) + (1-state.alpha^2+state.beta);
            state.Wc = Wc;
            state.Wm = Wm;
            
            state.c = sqrt(state.c);
        end
%         function  predict(obj,tnow)
%             
%             time = tnow-obj.mState.Tlast;
%            % fprintf(1,'%E\n', time );
%             obj.mState.Tlast = tnow;
%             
%             obj.mState.Q = obj.ProcessModel(obj.mConfig.sigma,time);
%             
%             % obj.mState.Q = eye(size(obj.mState.Q));
%             obj.mState.A = obj.buildTransitionMatrix(time);
%             %sigma points at previous time step
%             X=obj.sigmas(obj.mState.xCurr,obj.mState.PCurr,obj.mState.c);%sigma points around xCurr
%             
%             %predicted mean of state
%             obj.mState.xPred = zeros(size(obj.mState.xPred));
%             Y = obj.mState.A*X;
%             for k=1:size(X,2)
%                 
%                 obj.mState.xPred=obj.mState.xPred+obj.mState.Wm(k)*Y(:,k);
%             end
%             Y1=Y-obj.mState.xPred(:,ones(1,size(X,2)));
%             %predicted covariance of state
%             
%             obj.mState.PPred=Y1*diag(obj.mState.Wc)*Y'+obj.mState.Q;
%             
%             obj.mState.PPred2 = zeros(obj.mConfig.totalStates);
%             for k=1:size(X,2)
%                 
%                 obj.mState.PPred2=obj.mState.PPred2+obj.mState.Wc(k)*Y1(:,k)*Y1(:,k)';
%             end
%             obj.mState.PPred = obj.mState.PPred2+obj.mState.Q;
%             %Y=obj.sigmas(obj.mState.xPred,obj.mState.PPred,obj.mState.c);%sigma points around xCurr
%             Y = obj.mState.A*X;
%             obj.mState.X=Y;
%         end
        function  predict(obj,tnow)
            
            time = tnow-obj.mState.Tlast;
            if(time<=0)
                a = 1; 
                obj.mState.invalidTimeDetected = true;
                return;
            else
                 obj.mState.invalidTimeDetected = false;
            end
            % fprintf(1,'%E\n', time );
            obj.mState.Tlast = tnow;
            
            % fprintf(1,'%E\n', time );
            
            
            Q = obj.ProcessModel(obj.mConfig.sigma,time);
            
            % obj.mState.Q = eye(size(obj.mState.Q));
            A = obj.buildTransitionMatrix(time);
            
            obj.mState.xPred = A * obj.mState.xCurr;
            obj.mState.PPred = A*(obj.mState.PCurr*A')+Q;

            obj.mState.X=obj.sigmas(obj.mState.xPred, obj.mState.PPred ,obj.mState.c);%sigma points around xCurr
        end
        function  [xPred,PPred] = extrap(obj,tnow)
            time = tnow-obj.mState.Tlast;
            if(tnow~=obj.mState.Tlast&&time<3)
                
                % fprintf(1,'%E\n', time );
                
                
                Q = obj.ProcessModel(obj.mConfig.sigma,time);
                
                % obj.mState.Q = eye(size(obj.mState.Q));
                A = obj.buildTransitionMatrix(time);
                
                xPred = A * obj.mState.xCurr;
                PPred = A*(obj.mState.PCurr*A')+Q;
            else
                xPred = obj.mState.xCurr;
                PPred = obj.mState.PCurr;
            end
            
        end
        function delta = measurementDifference(obj,s1,s2)
            %handles angle wrap around
            delta = s1-s2;
            
            delta(2,:) = atan2(sin(delta(2,:)), cos(delta(2,:)));
        end
        function A = buildTransitionMatrix(obj,T)
            A = eye(obj.mConfig.totalStates,obj.mConfig.totalStates);
            for i = 0:obj.mConfig.observedStates-1
                A(i*2+1,i*2+2) = T;
            end
        end
        function raed = getraed(obj,time)
            if (time ~= obj.mState.Tlast)
                
                timeInc = time - obj.mState.Tlast;
                %set Q
                Q= obj.ProcessModel(obj.mConfig.sigma,timeInc);
                A = obj.buildTransitionMatrix(timeInc);
                
                % set A
               
                xPred = A *obj.mState.xCurr;
               
                PPred = A * (obj.mState.PCurr * A') + Q;
                
                 X=obj.sigmas( xPred  ,PPred ,obj.mState.c);
            else
                 X=obj.sigmas( obj.mState.xCurr ,obj.mState.PCurr ,obj.mState.c);
            end
            zPred = zeros(4,1);
            zSigma = zeros(4,size(X,2));
            for k=1:size(zSigma,2)
                zSigma(:,k) =obj.mConfig.measuremodel( X(:,k));
                zPred=zPred+obj.mState.Wm(k)*zSigma(:,k);
            end
            raed = zPred;
    
  
        end
       
        function [zPred,PzPred] = getraedSigmPositionVelocityAtposition(obj,tnow, position)
            time = tnow-obj.mState.Tlast;
            % fprintf(1,'%E\n', time );
            
            if (time ~= obj.mState.Tlast)
                Q = obj.ProcessModel(obj.mConfig.sigma,time);
                
                % obj.mState.Q = eye(size(obj.mState.Q));
                A = obj.buildTransitionMatrix(time);
                
                xPred = A * obj.mState.xCurr;
                PPred = A*(obj.mState.PCurr*A')+Q;
                X=obj.sigmas( xPred  ,PPred ,obj.mState.c);
            else
                X=obj.sigmas( obj.mState.xCurr ,obj.mState.PCurr ,obj.mState.c);
            end
            zSigma = zeros(size(X));
            zPred = zeros(6, 1);
            
            Xr = zeros(2, 1);
            Xi = zeros(2, 1);
            
            Zr = zeros(2, 1);
            Zi = zeros(2, 1);
            for ii = 1:size(X,2)
                [meas] = raedmeasurementandvelocityAtPosition(obj, X(:,ii), position)';
                zSigma(:,ii) = meas;
                Xr(1) = cosd(meas(2));
                Xr(2) = cosd(meas(4));
                
                Xi(1) = sind(meas(2));
                Xi(2) = sind(meas(4));
                Zr =Zr + obj.mState.Wm(ii) * Xr;
                Zi =Zi + obj.mState.Wm(ii) * Xi;
                zPred =zPred+ obj.mState.Wm(ii) * meas;
                
            end
            zPred(2) = atan2d(Zi(1), Zr(1));
            
            if(zPred(2)<0)
                zPred(2) = zPred(2) + 360;
            end
            zPred(4) = atan2d(Zi(2), Zr(2));
            if(zPred(4)>90)
                zPred(4) = 90;
            end
            if(zPred(4)<-90)
                zPred(4) = -90;
            end
            PzPred = zeros(6);
            delta = zSigma-zPred;
            
            delta(2,:) = atan2(sin(delta(2,:)), cos(delta(2,:)));
            
            delta(4,:) = atan2(sin(delta(4,:)), cos(delta(4,:)));
            Y1=delta;
            
            for ii = 1:size(X,2)
                PzPred = PzPred + obj.mState.Wm(ii) *Y1(:,ii) *Y1(:,ii)';
            end

            PzPred = (PzPred + PzPred') / 2.;
            
            end
        function [raed] = raedmeasurementandvelocityAtPosition(obj, x, position)
            [LAT, LON] = ecef2geodetic(wgs84Ellipsoid, position(1),  position(2),  position(3));
            
            %order 1: range
            %     2: Az
            %      3: Az rate
            %      4: El
            %      5: El rate
            %      6: Range Rate (doppler)
            % Range in meters, az, el, in deg,deg/sec, range rate: m/s
            Renu2ecef = ned2ecefrotationmatrix(LAT,LON);
            
            y = [x(1);x(3);x(5)];
            y = y-position';
            y = Renu2ecef'*y;
            cvm = y;
            x(1) = y(1);
            x(3) = y(2);
            x(5) = y(3);
            y = [x(2);x(4);x(6)];
            
            y = Renu2ecef'*y;
            cvv = y;
            x(2) = y(1);
            x(4) = y(2);
            x(6) = y(3);
            r = sqrt(x(1,:).^2 + x(3,:).^2+x(5,:).^2);
            az = atan2d(x(3,:),x(1,:));
            az(az<0) = az(az<0) + 360;
            el = -asind(x(5,:)./r);
            v1 = [x(1,:); x(3,:); x(5,:)];
            v2 = [x(2,:); x(4,:); x(6,:)];
            
            d =  dot(v1,v2)./r;
            A = [r; az ;el;d];
            %calculate azimuthal rate
            
            ps = [0;0;1];
            
            pp = cvm - dot(cvm,ps) * ps;
            angularVelocity = cvv - dot(cvv,pp) / (dot(pp,pp)) * pp;
            s = cross(pp,angularVelocity);
            azr = s(2);
            Rs = zeros(3);
            %calculate elevation rate
            Rs(1,1) =  cosd(az );
            Rs(2,1) = -sind(az);
            Rs(1,2) = -Rs(2,1) ;
            Rs(2,2) = Rs(1,1);
            Rs(3,3) = 1.;
            pr =Rs'*cvm;
            vr =Rs'*cvv;
            ps = [1;0;0];
            
            pp = pr-dot(pr,ps)*ps;
            angularVelocity = vr - dot(vr,pp)/(dot(pp,pp))*pp;
            s =cross(angularVelocity,pp/(dot(pp,pp)));
            elr =s(1);

            raed(1) = r;
            raed(2) = az;
            raed(3) = azr;
            raed(4) = el;
            raed(5) = elr;
            raed(6) = d;
            
        end
        function firstUpdate(obj,R,z,tnow)
           
            z = z(:);

            obj.mState.z = z;
            obj.mState.Tlast = tnow;
            
            z = unbiasedconversionsph2car(z, R)';
            z(3) = -z(3);
            z=z(:);
            R = buildmeasurenoisematrix(z, R);
            
            z = obj.mState.Renu2ecef*z;
            z = z+obj.mState.receiverPos.ecef';
            R = obj.mState.Renu2ecef*R*obj.mState.Renu2ecef';
            obj.mState.Q = obj.ProcessModel(obj.mConfig.sigma,1);
%              obj.mState.Q(2, 2) = 100. * 100.;
%              obj.mState.Q(4, 4) = 100. * 100.;
%              obj.mState.Q(6, 6) = 100. * 100.;
            %             R = 10*R;
            %             y = randn(1000,4)*R+z';
            %             zz = zeros(6,1000);
            %             for ii = 1:1000
            %                 zz([1 3 5],ii) = obj.standardConversionSph2car(y(ii,1:3),[]);
            %             end
            mp = zeros(6,1);
            mp([1 3 5]) = z;
            
            % P = (zz-mp)*(zz-mp)'/1000;
            %obj.mState.Q = eye(size(obj.mState.Q));
            obj.mState.PPred = kron(R,eye(2));%+obj.mState.Q;
            R(2,2) = 250000;
            R(4,4) = 250000;
            R(6,6) = 250000;
            obj.mState.xPred([1 3 5]) = mp([1 3 5]);
            obj.mState.PCurr = obj.mState.PPred;
            obj.mState.xCurr = obj.mState.xPred;
        end
        function firstUpdateEcef(obj,R,ecefpos,tnow,z)
            obj.mState.z = z;
            obj.mState.Tlast = tnow;
            obj.mState.PCurr = R;
            obj.mState.xCurr = ecefpos;
        end
        %         function  update(obj,R,z)
        %             obj.mState.R = R;
        %             obj.mState.z = z;
        %             e = obj.mState.H*(obj.mState.PPred*obj.mState.H')+obj.mState.R;
        %             obj.mState.K = obj.mState.PPred*obj.mState.H'/e;
        %             diffError = obj.mState.z-obj.mState.H*obj.mState.xPred;
        %
        %             obj.mState.xCurr =  obj.mState.xPred + obj.mState.K*diffError ;
        %             obj.mState.PCurr = (obj.mState.I-obj.mState.K*obj.mState.H)*obj.mState.PPred;
        %             %CI = obj.mState.H*obj.mState.PPred*obj.mState.H';
        %             %e = obj.mState.H*(obj.mState.PCurr*obj.mState.H')+obj.mState.R;
        %             obj.mState.MahalanobisDistance = diffError' *(e\diffError);
        %             obj.mState.gateProb = 1-interp1(obj.mState.cdfx,obj.mState.cdfy,obj.mState.MahalanobisDistance,'linear',1);
        %             obj.mState.likelyhood =  1/ sqrt((2*pi)^3 * det(e)) * exp(-1/2 * obj.mState.MahalanobisDistance);
        %
        %             obj.mState.acceptanceMemory(1+mod(obj.mState.updates,obj.mState.memoryLength)) =obj.mState.MahalanobisDistance;
        %             obj.mState.updates = obj.mState.updates  + 1;
        %             obj.mState.acceptanceValue = median(obj.mState.acceptanceMemory(obj.mState.acceptanceMemory>0));
        %
        %             if( obj.mState.updates>3&&obj.mState.acceptanceValue>obj.mState.acceptanceInterval(1)&&obj.mState.acceptanceValue<obj.mState.acceptanceInterval(2))
        %                 obj.mState.locked = true;
        %             else
        %                 obj.mState.locked = false;
        %             end
        %         end
        
        function  update(obj,R,z)
            if(~obj.mState.invalidTimeDetected)
            obj.mState.R = R;
            obj.mState.z = z;
            obj.mState.PPred;
            obj.mState.xPred;
            
            zSigma = zeros(numel(z),size(obj.mState.X,2));
            
            
            zPred = zeros(numel(z),1);
            zr = zeros(2,1);
            zi = zeros(2,1);
            for k=1:size(zSigma,2)
                meas =obj.mConfig.measuremodel( obj.mState.X(:,k));
                zSigma(:,k) = meas;
                xr = cos(meas(2:3));
                xi = sin(meas(2:3));
                zr = zr+obj.mState.Wm(k)*xr;
                zi = zi+obj.mState.Wm(k)*xi;
                zPred=zPred+obj.mState.Wm(k)*meas;
                
            end
           
            zPred(2) = atan2(zi(1),zr(1));
            if(zPred(2)<0)
                zPred(2) = zPred(2) + 2*pi;
            end
            zPred(3) = atan2(zi(2),zr(2));
             obj.mState.zPred = zPred;
            Y1=  obj.measurementDifference(zSigma,zPred);%zSigma-zPred(:,ones(1,size(obj.mState.X,2)));
            %predicted covariance of state
            %obj.mState.PzPred=Y1*diag(obj.mState.Wc)*Y1'+R;
            obj.mState.PzPred2 = zeros(numel(z));
            for k=1:size(Y1,2)
                
                obj.mState.PzPred2=obj.mState.PzPred2+obj.mState.Wc(k)*Y1(:,k)*Y1(:,k)';
            end
            obj.mState.PzPred = obj.mState.PzPred2+R;
            obj.mState.PzPred =  (obj.mState.PzPred +obj.mState.PzPred')/2;
            Y = obj.mState.X-obj.mState.xPred(:,ones(1,size(obj.mState.X,2)));
           % P12=Y*diag(obj.mState.Wc)*Y1';                        %transformed cross-covariance
            P122 = zeros(obj.mConfig.totalStates,numel(z));
            for k=1:size(Y1,2)
                
                P122=P122+obj.mState.Wc(k)*Y(:,k)*Y1(:,k)';
            end
            P12 = P122;
            K=P12/(obj.mState.PzPred);
            delta = obj.measurementDifference(z,zPred);
            obj.mState.xCurr =obj.mState.xPred+K*delta;                              %state update
            obj.mState.PCurr =obj.mState.PPred-K*obj.mState.PzPred*K';                                %covariance update
            try
                z = chol(obj.mState.PCurr);
            catch
                a = 1;
            end
            %CI = obj.mState.H*obj.mState.PPred*obj.mState.H';
            %e = obj.mState.H*(obj.mState.PCurr*obj.mState.H')+obj.mState.R;
            diffError = obj.measurementDifference(obj.mState.z,obj.mConfig.measuremodel(obj.mState.xCurr));
            e = obj.mState.PzPred;
            obj.mState.MahalanobisDistance = diffError' *(e\diffError);
            obj.mState.gateProb = 1-interp1(obj.mState.cdfx,obj.mState.cdfy,obj.mState.MahalanobisDistance,'linear',1);
            %obj.mState.likelyhood =  1/ sqrt((2*pi)^3 * det(e)) * exp(-1/2 * obj.mState.MahalanobisDistance);
            obj.mState.likelyhood =    exp(-1/2 * obj.mState.MahalanobisDistance)/sqrt(2*pi*det(e));
            obj.mState.acceptanceMemory(1+mod(obj.mState.updates,obj.mState.memoryLength)) =obj.mState.MahalanobisDistance;
            obj.mState.updates = obj.mState.updates  + 1;
            obj.mState.acceptanceValue = median(obj.mState.acceptanceMemory(obj.mState.acceptanceMemory>0));
            obj.mState.acceptanceProb =  1-interp1(obj.mState.cdfx,obj.mState.cdfy,obj.mState.acceptanceValue,'linear',1);
            factor = 1;
            obj.mState.trackConfirmation = factor*obj.mState.likelyhood*obj.mState.trackConfirmation/(factor*obj.mState.likelyhood*obj.mState.trackConfirmation+1.-obj.mState.trackConfirmation);
            if(obj.mState.trackConfirmation<.02)
                
                obj.mState.trackConfirmation = .02;
            end
            if(obj.mState.trackConfirmation>.98)
                
                obj.mState.trackConfirmation = .98;
            end
            if( obj.mState.updates>3&&obj.mState.acceptanceValue>obj.mState.acceptanceInterval(1)&&obj.mState.acceptanceValue<obj.mState.acceptanceInterval(2))
                obj.mState.locked = true;
            else
                obj.mState.locked = false;
            end
            end
        end
        function X=sigmas(obj,x,P,c)
            %Sigma points around reference point
            %Inputs:
            %       x: reference point
            %       P: covariance
            %       c: coefficient
            %Output:
            %       X: Sigma points
            try
                A = c*chol(P)';
            catch
                A = c*chol(eye(size(P)))';
            end
            Y = x(:,ones(1,numel(x)));
            X = [x Y+A Y-A];
        end
        function [y,Y,P,Y1]=ut(obj,f,X,Wm,Wc,n,R)
            %Unscented Transformation
            %Input:
            %        f: nonlinear map
            %        X: sigma points
            %       Wm: weights for mean
            %       Wc: weights for covraiance
            %        n: numer of outputs of f
            %        R: additive covariance
            %Output:
            %        y: transformed mean
            %        Y: transformed smapling points
            %        P: transformed covariance
            %       Y1: transformed deviations
            
            L=size(X,2);
            y=zeros(n,1);
            Y=zeros(n,L);
            for k=1:L
                Y(:,k)=f(X(:,k));
                y=y+Wm(k)*Y(:,k);
            end
            Y1=Y-y(:,ones(1,L));
            P=Y1*diag(Wc)*Y1'+R;
        end
        function Q = ProcessModel(obj,sigma,time)
            switch obj.mConfig.pModel
                case 'discreteWhiteNoiseAccModel'
                    Q = eye(obj.mConfig.totalStates);
                    for ii = 0:obj.mConfig.observedStates-1
                        Q(2*ii+1,2*ii+1) = time^4 * sigma(ii+1)^2 * 1/3;
                        Q(2*ii+1,2*ii+2) = time^3 * sigma(ii+1)^2 * 1/2;
                        Q(2*ii+2,2*ii+1) = time^3 * sigma(ii+1)^2 * 1/2;
                        Q(2*ii+2,2*ii+2) = time^2 * sigma(ii+1)^2;
                    end
                otherwise
                    Q = eye(obj.mConfig.totalStates);
                    for ii = 0:obj.mConfig.observedStates-1
                        Q(2*ii+1,2*ii+1) = time^4 * sigma(ii+1)^2 * 1/3;
                        Q(2*ii+1,2*ii+2) = time^3 * sigma(ii+1)^2 * 1/2;
                        Q(2*ii+2,2*ii+1) = time^3 * sigma(ii+1)^2 * 1/2;
                        Q(2*ii+2,2*ii+2) = time^2 * sigma(ii+1)^2;
                    end
            end
              Q = obj.mState.Renu2ecefBig * Q * obj.mState.Renu2ecefBig';
        end
        function z = standardConversionSph2car(obj,posRad,sigmaRad)
            z(1) = posRad(1)*cos(posRad(2))*cos(posRad(3));
            z(2) = posRad(1)*sin(posRad(2))*cos(posRad(3));
            z(3) = posRad(1)*sin(posRad(3));
            
        end
        % function A = raedmeasurement(x)
        % make range, az, elevation, doppler measurement of linear
        % state vector x
        %x = [px vx py vy pz vz];
        % where p is position & v velocity
        function A = raedmeasurement(obj,x)
            
            r = sqrt(x(1,:).^2 + x(3,:).^2+x(5,:).^2);
            az = atan2(x(3,:),x(1,:));
            el = asin(x(5,:)./r);
            v1 = [x(1,:); x(3,:); x(5,:)];
            v2 = [x(2,:); x(4,:); x(6,:)];
            
            d =  dot(v1,v2)./r;
            A = [r; az ;el;d];
        end
        % function A = raedmeasurement(x)
        % make range, az, elevation, doppler measurement of linear
        % state vector x
        %x = [px vx py vy pz vz];
        % where p is position & v velocity
        function A = raedmeasurementecef(obj,x)
             y = [x(1);x(3);x(5)];
             y = y-obj.mState.receiverPos.ecef';
             y = obj.mState.Renu2ecef'*y;
             x(1) = y(1);
             x(3) = y(2);
             x(5) = y(3);
             y = [x(2);x(4);x(6)];
            
             y = obj.mState.Renu2ecef'*y;
             x(2) = y(1);
             x(4) = y(2);
             x(6) = y(3);
            r = sqrt(x(1,:).^2 + x(3,:).^2+x(5,:).^2);
            az = atan2(x(3,:),x(1,:));
            el = -asin(x(5,:)./r);
            v1 = [x(1,:); x(3,:); x(5,:)];
            v2 = [x(2,:); x(4,:); x(6,:)];
            
            d =  dot(v1,v2)./r;
            A = [r; az ;el;d];
        end
        % function A = raedmeasurement(x)
        % make range, az, elevation measurement of linear
        % state vector x
        %x = [px vx py vy pz vz];
        % where p is position & v velocity
        function A = raemeasurement(obj,x)
            
            r = sqrt(x(1,:).^2 + x(3,:).^2+x(5,:).^2);
            az = atan2(x(3,:),x(1,:));
            el = atan2(x(5,:),r);
            v1 = [x(1,:); x(3,:); x(5,:)];
            v2 = [x(2,:); x(4,:); x(6,:)];
            
            % d =  dot(v1,v2)./r;
            A = [r; az ;el];
        end
        %         function A = raedmeasurementrada(obj,x)
        %             Fc = 3.25E9;
        %             [geometry,] = mhrelementgeometry();
        %             subarrayGeometry = [1 0 1;-1 0 1;-1 0 -1;1 0 -1]*.1413/2;
        %             zdist = .1413/2;
        %             r = sqrt(x(1,:).^2 + x(3,:).^2+x(5,:).^2);
        %             az = atan2(x(3,:),x(1,:));
        %             el = asin(x(5,:)./r) + .3*asin(-(x(5,:)+4)./r);
        %             v1 = [x(1,:); x(3,:); x(5,:)];
        %             v2 = [x(2,:); x(4,:); x(6,:)];
        %
        %             % d =  dot(v1,v2)./r;
        %             rDirect = sqrt( (x(5,:)-heightRadar+geometry(:,3)).^2+(geometry(:,2)+r).^2);
        %             rMulti = sqrt( (-(x(5,:)+heightRadar)+geometry(:,3)).^2+(geometry(:,2)+r).^2);
        %             angleDirect = atan2d(heightDrone-heightRadar,r);
        %             angleMult = atan2d(-(heightDrone+heightRadar),r);
        %             svDirect = steeringvector([],0,...
        %                 angleDirect*pi/180,lamda,state.subarrayGeometry([1 4],:) );
        %             %exp(1i*2*pi/lamda*state.subarrayGeometry([1 4],:)*sind(angleDirect));
        %             svMult  = steeringvector([],0,...
        %                 angleMult*pi/180,lamda,state.subarrayGeometry([1 4],:) );
        %             %exp(1i*2*pi/lamda*state.subarrayGeometry([1 4],:)*sind(angleMult));
        %             di = .1413;%magic number for MHR RPS-42 Radar
        %
        %             sv = svDirect+alpha*svMult;
        %
        %             % sv = svDirect ;%+ alpha*svMult;
        %             svReceive = steeringvector([],0,...
        %                 0*pi/180,lamda,state.subarrayGeometry([1 4],:) );
        %             sv = sv.*svReceive'.';
        %             ang = angle(sv(1,:).*conj(sv(2,:)) );
        %
        %             elest= asin(ang*lamda/(2*pi*di) );
        %             A = [r; az ;el];
        %         end
        function R = ned2ecefrotationmatrix(obj,lat, lon)
            R = eye(3,3);
            lat = pi/180 * lat;
            lon = pi/180 * lon;
            c  = 1;
            R(0+c, 0+c) = -cos(lon) * sin(lat);
            R(1+c, 1+c) =  cos(lon);
            R(2+c, 2+c) = -sin(lat);
            R(0+c, 1+c) = -sin(lon);
            R(0+c, 2+c) = -cos(lon) * cos(lat);
            R(1+c, 2+c) = -sin(lon) * cos(lat);
            R(1+c, 0+c) = -sin(lon) * sin(lat);
            R(2+c, 1+c) = 0.;
            R(2+c, 0+c) = cos(lat);
            
            
        end
        function [cov,ZMean] = getEcefCovarianceMeasure(obj)
            cov = [];
            
            ZMean= zeros(3,1);
            
            alpha=.1;                                 %default, tunable
            ki=3-obj.mConfig.totalStates;                                       %default, tunable
            beta=2;                                     %default, tunable
            lambda=alpha^2*(4+ki)-4;                    %scaling factor
            c =4+lambda;                                 %scaling factor
            %             Wm=[state.lambda/state.c 0.5/state.c+zeros(1,2*obj.mConfig.totalStates)];           %weights for means
            %             Wm = Wm/sum(Wm);
            %             Wc=Wm;
            %             Wc(1)=Wc(1)+(1-state.alpha^2+state.beta);               %weights for covariance
            
            Wm = zeros(1,2*4+1);
            Wm = Wm + 1/(2*(4+lambda));
            Wc = Wm;
            Wm(1) = lambda/(4+lambda);
            Wc(1) = Wm(1) + (1-alpha^2+beta);
  
            c = sqrt(c);
            X = obj.sigmas(obj.mState.zPred,obj.mState.PzPred,c);
            
            
            for ii = 1:size(X,2)
                Z(:,ii) = obj.standardConversionSph2car(X(:,ii));
                ZMean = ZMean+Wm(ii)*Z(:,ii);
            end
            Y1 = Z-ZMean;
            cov = zeros(3);
            for k=1:size(Y1,2)
                
                cov=cov+Wc(k)*Y1(:,k)*Y1(:,k)';
            end
          
            
            a = 1;
        end
        
        function setPosReceiver(obj,lat,  lon,  alt)
            obj.mState.receiverPos.lat = lat;
            obj.mState.receiverPos.lon= lon;
            obj.mState.receiverPos.alt= alt;
            [X, Y, Z] = geodetic2ecef(wgs84Ellipsoid, lat, lon, alt);
            obj.mState.receiverPos.ecef = [X, Y, Z];
            
            obj.mState.Renu2ecef = ned2ecefrotationmatrix(obj,lat, lon);
            obj.mState.Renu2ecefBig = kron(obj.mState.Renu2ecef,eye(2));
            a = 1;
        end
        
        
        function interval = computeAcceptanceInterval(obj,prob)
            state.cdfx = [0:.01:12];
            
            pdf = chitwopdf(state.cdfx,3);
            state.cdfy = cumsum(.01*pdf);
            [b,ix] = sort(pdf);
            bb= b;
            i = 1;
            [~,center] = max(pdf);
            count = 1;
            while numel(bb)>100
                val = bb(i);
                index = 1:numel(pdf);
                inz = find(index>center);
                z = abs(pdf(inz)-val);
                [~,ind] = min(z);
                ind = ind+inz(1)-1;
                
                inz = find(index<center);
                z = abs(pdf(inz)-val);
                [~,ind2] = min(z);
                
                vv = interp1(state.cdfx,state.cdfy,state.cdfx([ind2 ind]),'linear',1);
                intv(:,count) = state.cdfx([ind2 ind]);
                cValue(count) = vv(1) + vv(2);
                bb(i) = [];
                ix(i) = [];
                
                count= count + 1;
            end
            score = abs(cValue-prob);
            [~,i] = min(score);
            interval = intv(:,i);
        end
        function twopointinit(obj,raed1,R1,t1,raed2,R2,t2)
            
            if(0)
            z1 = unbiasedconversionsph2car(raed1, R1)';
            z1 = z1(:);
            z1(3) = -z1(3);
            z1 = obj.mState.Renu2ecef*z1;
            z1 = z1+obj.mState.receiverPos.ecef';
            
            z2 = unbiasedconversionsph2car(raed2, R1)';
            
            z2 = z2(:);
            z2(3) = -z2(3);
            z2 = obj.mState.Renu2ecef*z2;
            z2 = z2+obj.mState.receiverPos.ecef';

            obj.mState.z = z2;
            obj.mState.Tlast = t2;
           
            R = buildmeasurenoisematrix(raed2, R2);
            R = obj.mState.Renu2ecef*R*obj.mState.Renu2ecef';
            obj.mState.Q = obj.ProcessModel(obj.mConfig.sigma,1);

            mp = zeros(6,1);
            mp([1 3 5]) = z2;
            
            v = (z2-z1)/(t2-t1);
            mp([2 4 6]) = v;
            
            % P = (zz-mp)*(zz-mp)'/1000;
            %obj.mState.Q = eye(size(obj.mState.Q));
            obj.mState.PPred = kron(R,eye(2))+obj.mState.Q;
            
            obj.mState.xPred = mp;
            obj.mState.PCurr = obj.mState.PPred;
            obj.mState.xCurr = obj.mState.xPred;
            obj.mState.updates = obj.mState.updates  + 1;
            else

                    assert(raed1(1)>10);

                 obj.firstUpdate(R1,raed1,t1);
                 obj.predict(t2);
                 obj.update(diag(R2.^2),raed2);
                 a = 1;
            end
        end
        function [zPred,PzPred] = getraedSigmPositionVelocity(obj,tnow)
            position = obj.mState.receiverPos.ecef;
            [zPred,PzPred] = obj.getraedSigmPositionVelocityAtposition(tnow, position);
        end
        function [zPred,PzPred] = getraedSigmPosition(obj,tnow)
            
            position = obj.mState.receiverPos.ecef;
            try
                [zPred,PzPred] = obj.getraedSigmaAtposition(tnow, position);
            catch
                PzPred =  obj.mState.R;
                zPred = obj.mState.z ;
                
            end
        end
    end
     
end
