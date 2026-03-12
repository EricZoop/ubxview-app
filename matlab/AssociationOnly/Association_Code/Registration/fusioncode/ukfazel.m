 classdef ukfazel < handle
    properties (SetAccess = public, GetAccess = public)
        mState;
        mConfig;
    end
    methods (Access = public)
        function obj =ukfazel(config,time)
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
            config.measuremodel = @obj.raedmeasurementazel;
            switch config.processModel
                case 'discreteWhiteNoiseAccModel'
                    config.sigma= str2num(z.Parameters.general.processNoiseModelAcc.Text);
                    config.pModel = 'discreteWhiteNoiseAccModel';
                otherwise
                    config.sigma= 1;
                    config.pModel =  'discreteWhiteNoiseAccModel';
            end
        end
        function firstUpdate(obj,R,z,tnow)
            
            obj.mState.z = z';
            obj.mState.Tlast = tnow;
            
            %z(3) = -z(3);
            
            
            
            
            
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
            
            
            % P = (zz-mp)*(zz-mp)'/1000;
            %obj.mState.Q = eye(size(obj.mState.Q));
            obj.mState.PPred = kron(R,eye(2))+obj.mState.Q;
            
            obj.mState.xPred([1 3 ]) =z([1 2 ]);
            obj.mState.PCurr = obj.mState.PPred;
            obj.mState.xCurr = obj.mState.xPred;
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
            state.pdf = chitwopdf(state.cdfx,2);
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
        function Y = proptrack(obj,X,time)
            obj.mState.A = obj.buildTransitionMatrix(time);
            Y = obj.mState.A*X;
            
                
            Y(1,:)=mod(Y(1,:),360);
            Y(3,:)=rem(Y(3,:),90);   
                
            
            
        end
        function  predict(obj,tnow)
            
            time = tnow-obj.mState.Tlast;
            % fprintf(1,'%E\n', time );
            obj.mState.Tlast = tnow;
            
            obj.mState.Q = obj.ProcessModel(obj.mConfig.sigma,time);
            
            % obj.mState.Q = eye(size(obj.mState.Q));
           % obj.mState.A = obj.buildTransitionMatrix(time);
            %sigma points at previous time step
             obj.mState.PCurr =   (obj.mState.PCurr+obj.mState.PCurr')/2.;
            X=obj.sigmas(obj.mState.xCurr,obj.mState.PCurr,obj.mState.c);%sigma points around xCurr
            
            %predicted mean of state
            obj.mState.xPred = zeros(size(obj.mState.xPred));
           
            
            obj.mState.A = obj.buildTransitionMatrix(time);
            Y = obj.mState.A*X;
            
            Yr = cosd(Y([1 3],:));
            Yi = sind(Y([1 3],:));
            Yv = Y([2 4],:);
            Xr = zeros(2,1);
            Xi = zeros(2,1);
            Xv = zeros(2,1);
            for k=1:size(X,2)
                Xr = Xr + obj.mState.Wm(k)*Yr(:,k);
                Xi = Xi + obj.mState.Wm(k)*Yi(:,k);
                Xv = Xv + obj.mState.Wm(k)*Yv(:,k);
                %obj.mState.xPred=obj.mState.xPred+obj.mState.Wm(k)*Y(:,k);
            end
            
            Xr = atan2d(Xi,Xr);
            if(Xr(1)<0)
                Xr(1) = Xr(1) + 360;
            end
            if(Xr(2)>90)
                Xr(2) = 90;
            end
            if(Xr(2)<-90)
                Xr(2) = -90;
            end
            
            obj.mState.xPred([1 3]) = Xr;
            obj.mState.xPred([2 4]) = Xv;
            
            Y1 = obj.measurementDifference(Y,obj.mState.xPred(:,ones(1,size(X,2))));
           % Y1=Y-obj.mState.xPred(:,ones(1,size(X,2)));
            %predicted covariance of state
            
            obj.mState.PPred=Y1*diag(obj.mState.Wc)*Y'+obj.mState.Q;
            
            obj.mState.PPred2 = zeros(obj.mConfig.totalStates);
            for k=1:size(X,2)
                
                obj.mState.PPred2=obj.mState.PPred2+obj.mState.Wc(k)*Y1(:,k)*Y1(:,k)';
            end
            obj.mState.PPred = obj.mState.PPred2+obj.mState.Q;
            %Y=obj.sigmas(obj.mState.xPred,obj.mState.PPred,obj.mState.c);%sigma points around xCurr
            Y = obj.proptrack(X,time);
            obj.mState.X=Y;
        end
        function  [xPred,PPred] = extrap(obj,tnow)
            
            time = tnow-obj.mState.Tlast;
            % fprintf(1,'%E\n', time );
            
            
            Q = obj.ProcessModel(obj.mConfig.sigma,time);
            
            % obj.mState.Q = eye(size(obj.mState.Q));
            A = obj.buildTransitionMatrix(time);
            
            xPred = A * obj.mState.xCurr;
            PPred = A*(obj.mState.PCurr*A')+Q;
            
        end
        function delta = measurementDifference(obj,s1,s2)
            %handles angle wrap around
            delta = s1-s2;
            
            delta(1,:) = atan2d(sind(delta(1,:)), cosd(delta(1,:)));
        end
        function A = buildTransitionMatrix(obj,T)
            A = eye(obj.mConfig.totalStates,obj.mConfig.totalStates);
            for i = 0:obj.mConfig.observedStates-1
                A(i*2+1,i*2+2) = T;
            end
        end
        
        function  update(obj,R,z)
            obj.mState.R = R;
            obj.mState.z = z;
            obj.mState.PPred;
            obj.mState.xPred;
            
            zSigma = zeros(numel(z),size(obj.mState.X,2));
            
            
            zPredR = zeros(numel(z),1);
            zPredI = zeros(numel(z),1);
            for k=1:size(zSigma,2)
                zSigma(:,k) =obj.mConfig.measuremodel( obj.mState.X(:,k));
            end
            zSigmaR = cosd(zSigma);
            zSigmaI = sind(zSigma);
            for k=1:size(zSigma,2)
                
                zPredR = zPredR+ obj.mState.Wm(k)*zSigmaR(:,k);
                zPredI = zPredI+ obj.mState.Wm(k)*zSigmaI(:,k);
            end
            zPred(1) = atan2d(zPredI(1),zPredR(1));
            zPred(2) = atan2d(zPredI(2),zPredR(2));
            zPred= zPred';
            if(zPred(1)<0)
                zPred(1) = zPred(1) + 360;
            end
            if(zPred(2)>90)
                zPred(2) = 90;
            end
            if(zPred(2)<-90)
                zPred(2) = -90;
            end
            Y1=  obj.measurementDifference(zSigma,zPred);%zSigma-zPred(:,ones(1,size(obj.mState.X,2)));
            %predicted covariance of state
            obj.mState.PzPred=Y1*diag(obj.mState.Wc)*Y1'+R;
            obj.mState.PzPred2 = zeros(numel(z));
            for k=1:size(Y1,2)
                
                obj.mState.PzPred2=obj.mState.PzPred2+obj.mState.Wc(k)*Y1(:,k)*Y1(:,k)';
            end
            obj.mState.PzPred = obj.mState.PzPred2+R;
%             Y = obj.mState.X-obj.mState.xPred(:,ones(1,size(obj.mState.X,2)));
%             for k=1:size(Y,2)
%                 Y(:,k) =obj.measurementDifference( obj.mState.X(:,k));
%             end
            Y = obj.measurementDifference(obj.mState.X,obj.mState.xPred(:,ones(1,size(obj.mState.X,2))));
            
            P12=Y*diag(obj.mState.Wc)*Y1';                        %transformed cross-covariance
            P122 = zeros(obj.mConfig.totalStates,numel(z));
            for k=1:size(Y1,2)
                
                P122=P122+obj.mState.Wc(k)*Y(:,k)*Y1(:,k)';
            end
            P12 = P122;
            K=P12/(obj.mState.PzPred);
            delta = obj.measurementDifference(z,zPred);
            obj.mState.xCurr =obj.mState.xPred+K*delta;         
            obj.mState.xCurr(1) = atan2d(sind(obj.mState.xCurr(1)),cosd(obj.mState.xCurr(1)));
            if(obj.mState.xCurr(1)<0)
                obj.mState.xCurr(1) = obj.mState.xCurr(1) + 360;
            end
            obj.mState.xCurr(3) = atan2d(sind(obj.mState.xCurr(3)),cosd(obj.mState.xCurr(3)));
            %state update
            obj.mState.PCurr =obj.mState.PPred-K*obj.mState.PzPred*K';                                %covariance update
            l= chol(obj.mState.PCurr);
            %CI = obj.mState.H*obj.mState.PPred*obj.mState.H';
            %e = obj.mState.H*(obj.mState.PCurr*obj.mState.H')+obj.mState.R;
            diffError = obj.mState.z-obj.mConfig.measuremodel(obj.mState.xCurr);
            e = obj.mState.PzPred;
            obj.mState.MahalanobisDistance = diffError' *(e\diffError);
            obj.mState.gateProb = 1-interp1(obj.mState.cdfx,obj.mState.cdfy,obj.mState.MahalanobisDistance,'linear',1);
            %obj.mState.likelyhood =  1/ sqrt((2*pi)^3 * det(e)) * exp(-1/2 * obj.mState.MahalanobisDistance);
            obj.mState.likelyhood =  (1/( (2*pi)^(obj.mConfig.observedStates/2)*sqrt(det(e)))) * exp(-1/2 * obj.mState.MahalanobisDistance);
            obj.mState.acceptanceMemory(1+mod(obj.mState.updates,obj.mState.memoryLength)) =obj.mState.MahalanobisDistance;
            obj.mState.updates = obj.mState.updates  + 1;
            obj.mState.acceptanceValue = median(obj.mState.acceptanceMemory(obj.mState.acceptanceMemory>0));
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
        function X=sigmas(obj,x,P,c)
            %Sigma points around reference point
            %Inputs:
            %       x: reference point
            %       P: covariance
            %       c: coefficient
            %Output:
            %       X: Sigma points
            
            A = c*chol(P)';
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
           
            
        end
        
        
        function A = raedmeasurementazel(obj,x)
           
            x(1)=mod(x(1),360);
            x(3) = rem(x(3),90);
            A = [x(1); x(3)];
        end
        
        
        function setPosReceiver(obj,lat,  lon,  alt)
            obj.mState.receiverPos.lat = lat;
            obj.mState.receiverPos.lon= lon;
            obj.mState.receiverPos.alt= alt;
            [X, Y, Z] = geodetic2ecef(wgs84Ellipsoid, lat, lon, alt);
            obj.mState.receiverPos.ecef = [X, Y, Z];
            
            
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
    end
end
