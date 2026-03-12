
classdef fusionfilter < handle
    properties (SetAccess = public, GetAccess = public)
        mState;
        mConfig;
    end
    methods (Access = public)
        function obj =fusionfilter(config,time)
            if(isstruct(config))
                obj.mConfig = config;
                % set state
                obj.mState = initfusion(obj);
                obj.mState.Tlast = time;
            else
                % Set Configuration
                obj.mConfig = obj.SetParams(config);
                % set state
                obj.mState = initfusion(obj);
                obj.mState.Tlast = time;
            end
            
        end
        
        function config = SetParams(obj,configFile)
            z = xml2struct(configFile);
            config.numberFilters = str2num(z.Parameters.general.numberOfFilter.Text);
            config.defocus = str2num(z.Parameters.general.defocus.Text);
            config.totalStates= str2num(z.Parameters.general.numberOfStates.Text);
            config.observedStates= str2num(z.Parameters.general.numberOfObservedStates.Text);
            config.processModel = strtrim(z.Parameters.general.processNoiseModel.Text);
            config.lockAcceptance = .01*str2num(z.Parameters.general.lockAcceptancePercent.Text);
            switch config.processModel
                case 'discreteWhiteNoiseAccModel'
                    config.sigma= str2num(z.Parameters.general.processNoiseModelAcc.Text);
                    config.pModel = 'discreteWhiteNoiseAccModel';
                otherwise
                    config.sigma= 1;
                    config.pModel =  'discreteWhiteNoiseAccModel';
            end
        end
        function state = initfusion(obj)
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
            state.longitude = 0;
            state.latitude =0;
            state.altitude = 0;
            state.MahalanobisDistance = 0;
            state.memoryLength = 10;
            state.likelyhood  = .1;
            state.acceptanceValue = 20;
            state.acceptanceProb  = 0;
            state.acceptanceMemory = zeros(state.memoryLength ,1);
            state.gateProb = 1;
            state.locked = false;
            state.trackConfirmation  = .02;
            state.H= zeros(obj.mConfig.observedStates,obj.mConfig.totalStates);
            for ii = 1:obj.mConfig.observedStates
                state.H(ii,1+2*(ii-1)) =1;
            end
            state.Hs= zeros(obj.mConfig.observedStates,obj.mConfig.totalStates);
            for ii = 1:obj.mConfig.observedStates
                state.Hs(ii,1+2*(ii-1)) =1;
                state.Hs(ii,2+2*(ii-1)) =1;
            end
            state.Rned2ecef = eye(obj.mConfig.observedStates);
            state.Rned2ecefBig =eye(6);%kron( state.Rned2ecef,[1 1;1 1]);
            %gain matrix
            state.K= eye(obj.mConfig.totalStates,obj.mConfig.observedStates);
            state.I = eye(obj.mConfig.totalStates,obj.mConfig.totalStates);
            state.cdfx = [0:.01:12];
            state.pdf = chitwopdf(state.cdfx,3);
            state.cdfy = cumsum(.01*state.pdf );
            %pdf function
            
        end
        function  predict(obj,tnow)
            
            time = tnow-obj.mState.Tlast;
            %fprintf(1,'%E\n', time );
            obj.mState.Tlast = tnow;
            
            obj.mState.Q = obj.ProcessModel(obj.mConfig.sigma,time);
            obj.mState.A = obj.buildTransitionMatrix(time);
            %predict state
            
            obj.mState.xPred = obj.mState.A*obj.mState.xCurr;
            
            %predict covariance
            obj.mState.PPred = obj.mState.A*(obj.mState.PCurr*obj.mState.A')+obj.mState.Q;
            
        end
        function  [xPred,PPred] = extrap(obj,tnow)
            
            time = tnow-obj.mState.Tlast;
            %fprintf(1,'%E\n', time );
            
            
            Q = obj.ProcessModel(obj.mConfig.sigma,time);
            A = obj.buildTransitionMatrix(time);
            %predict state
            
            xPred = A*obj.mState.xCurr;
            
            %predict covariance
            PPred = A*(obj.mState.PCurr*A')+Q;
            
        end
        function A = buildTransitionMatrix(obj,T)
            A = eye(obj.mConfig.totalStates,obj.mConfig.totalStates);
            for i = 0:obj.mConfig.observedStates-1
                A(i*2+1,i*2+2) = T;
            end
        end
        function firstUpdate(obj,x1,x2,P1,P2,tnow)
            time = tnow-obj.mState.Tlast;
            P = P1+P2;
            obj.mState.xCurr = P2 * (P \ x1) + P1 * (P \ x2);
            obj.mState.PCurr = P1*(P\P2);
            obj.mState.PPred = obj.mState.PCurr;
            obj.mState.xPred= obj.mState.xCurr;
            obj.mState.Tlast = tnow;
            
        end
        
        function  update(obj,x1,x2,P1,P2)
            
            P = P1+P2;
            Q = obj.ProcessModel(obj.mConfig.sigma,1);
            
            obj.mState.xCurr = P2 * (P \ x1) + P1 * (P \ x2);
            obj.mState.PCurr = P1*(P\P2);
            
            
            %square of distance
            p = [x1(1);x1(3);x1(5)];
            p = p-obj.mState.receiverPos.ecef';
            range = sqrt(p(1).^2+p(2).^2+p(3).^2);
            P = P +diag(range*[sind(obj.mConfig.defocus) 0 sind(obj.mConfig.defocus) 0 sind(obj.mConfig.defocus) 0]).^2;
            P = P + diag([0 2 0 2 0 2].^2);
            %P = P + Pinf;
            obj.mState.MahalanobisDistance = (x2-x1)'*(P\(x2-x1));
            obj.mState.PPred = obj.mState.PCurr;
            obj.mState.xPred= obj.mState.xCurr;
            obj.mState.gateProb = 1-interp1(obj.mState.cdfx,obj.mState.cdfy,obj.mState.MahalanobisDistance,'linear',1);
            obj.mState.acceptanceMemory(1+mod(obj.mState.updates,obj.mState.memoryLength)) =obj.mState.MahalanobisDistance;
            obj.mState.updates = obj.mState.updates  + 1;
            obj.mState.acceptanceValue = median(obj.mState.acceptanceMemory(obj.mState.acceptanceMemory>0));
            obj.mState.acceptanceProb =  1-interp1(obj.mState.cdfx,obj.mState.cdfy,obj.mState.acceptanceValue,'linear',1);
            obj.mState.likelyhood =  exp(-1/2 * obj.mState.MahalanobisDistance)/sqrt(2*pi*det(P));
            state.cdfx = [0:.01:12];
            state.pdf = chitwopdf(state.cdfx,3);
            state.cdfy = cumsum(.01*state.pdf );
            if(isnan(obj.mState.likelyhood)||obj.mState.likelyhood<1E-9)
                obj.mState.likelyhood= 1E-9;
            end
            factor = 7;
            obj.mState.trackConfirmation = factor*obj.mState.likelyhood*obj.mState.trackConfirmation/...
                (factor*obj.mState.likelyhood*obj.mState.trackConfirmation+1.-obj.mState.trackConfirmation);
            
            
            if(obj.mState.trackConfirmation<.02)
                
                obj.mState.trackConfirmation = .02;
            end
            if(obj.mState.trackConfirmation>.98)
                
                obj.mState.trackConfirmation = .98;
            end
            
            
            
            if( obj.mState.updates>3)
                obj.mState.locked = true;
            else
                obj.mState.locked = false;
            end
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
        
        function setPosReceiver(obj,lat,  lon,  alt)
            obj.mState.receiverPos.lat = lat;
            obj.mState.receiverPos.lon= lon;
            obj.mState.receiverPos.alt= alt;
            [X, Y, Z] = geodetic2ecef(wgs84Ellipsoid, lat, lon, alt);
            obj.mState.receiverPos.ecef = [X, Y, Z];
            
            obj.mState.Renu2ecef = ned2ecefrotationmatrix(obj,lat, lon);
            obj.mState.Renu2ecefBig = kron(obj.mState.Renu2ecef,eye(2));
            
        end
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
    end
end
