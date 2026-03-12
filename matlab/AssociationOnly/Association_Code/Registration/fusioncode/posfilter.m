classdef posfilter < handle
    properties (SetAccess = public, GetAccess = public)
        mState;
        mConfig;
    end
    methods (Access = public)
        function obj =posfilter(config,time)
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
            state.longitude = 0;
            state.latitude =0;
            state.altitude = 0;
            state.MahalanobisDistance = 0;
            state.memoryLength = 20;
            state.likelyhood  = .1;
            state.acceptanceValue = 20;
            state.ned2ecefrotationmatrix = eye(3);
            state.ned2ecefrotationmatrixbig = eye(6);
            state.acceptanceMemory = zeros(state.memoryLength ,1);
            state.gateProb = 1;
            state.locked = false;
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
            %pdf function
          
            state.cdfx = [0:.01:12];
            state.pdf = chitwopdf(state.cdfx,3);
            state.cdfy = cumsum(.01*state.pdf );
            state.trackConfirmation = .02;
        end
        function  predict(obj,tnow)
           
            time = tnow-obj.mState.Tlast;
            obj.mState.Tlast=  tnow;
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
            if(tnow~=obj.mState.Tlast)
                %fprintf(1,'%E\n', time );
                
                
                Q = obj.ProcessModel(obj.mConfig.sigma,time);
                A = obj.buildTransitionMatrix(time);
                %predict state
                
                xPred = A*obj.mState.xCurr;
                
                %predict covariance
                PPred = A*(obj.mState.PCurr*A')+Q;
            else
                xPred = obj.mState.xCurr;
                PPred = obj.mState.PCurr;
            end
            
        end
        function A = buildTransitionMatrix(obj,T)
           % v = repmat([T 0],
            A = eye(obj.mConfig.totalStates,obj.mConfig.totalStates);%+ diag([T 0 T 0 T],1);
            for i = 0:obj.mConfig.observedStates-1
                A(i*2+1,i*2+2) = T;
            end
        end
        function setLocalPosition(obj,lat,lon,alt)
            obj.mState.longitude = lat;
            obj.mState.latitude =lon;
            obj.mState.altitude = alt;
            obj.mState.ned2ecefrotationmatrix = ned2ecefrotationmatrix(lon*pi/180,lat*pi/180);
            obj.mState.ned2ecefrotationmatrixbig = kron(obj.mState.ned2ecefrotationmatrix,eye(2,2));
        end
        function firstUpdate(obj,R,z,tnow)
            time = tnow-obj.mState.Tlast;
            obj.mState.z = z;
            
            obj.mState.Tlast = tnow;
         
            obj.mState.Q = obj.ProcessModel(obj.mConfig.sigma,.1);
            obj.mState.PPred = obj.mState.Q;
           
            obj.mState.xPred([1 3 5]) = z;
            obj.mState.PCurr = obj.mState.PPred;
            obj.mState.xCurr = obj.mState.xPred;
        end
       
        function firstUpdateEcef(obj,sigmaECEF,ECEF,tnow)
            obj.mState.Tlast= tnow;
            obj.mState.xPred = [ECEF(1);0;ECEF(2);0;ECEF(3);0];
            obj.mState.xCurr = obj.mState.xPred;
           
            obj.mState.Q = obj.ProcessModel(obj.mConfig.sigma,10);
            obj.mState.PPred =  obj.mState.Q ;
            obj.mState.PCurr =  obj.mState.PCurr  ;
            obj.mState.z =ECEF;
            % convert nedPos to ecef
        end
        function  update(obj,R,z)
            obj.mState.R = R;
            obj.mState.z = z;
            e = obj.mState.H*(obj.mState.PPred*obj.mState.H')+obj.mState.R;
            obj.mState.K = obj.mState.PPred*obj.mState.H'/e;
            diffError = obj.mState.z-obj.mState.H*obj.mState.xPred;
            
            obj.mState.xCurr =  obj.mState.xPred + obj.mState.K*diffError ;
            obj.mState.PCurr = (obj.mState.I-obj.mState.K*obj.mState.H)*obj.mState.PPred;
            %CI = obj.mState.H*obj.mState.PPred*obj.mState.H';
            %e = obj.mState.H*(obj.mState.PCurr*obj.mState.H')+obj.mState.R;
            obj.mState.MahalanobisDistance = diffError' *(e\diffError);
            if(obj.mState.MahalanobisDistance<.0001)
                a = 1;
            end
            
            obj.mState.likelyhood = exp(-1/2 * obj.mState.MahalanobisDistance)/sqrt(2*pi*det(e));
            factor = 5;
            
           % fprintf(1,'DET E: %f\n',sqrt(det(e)))
            obj.mState.trackConfirmation = factor*obj.mState.likelyhood*obj.mState.trackConfirmation/(factor*obj.mState.likelyhood*obj.mState.trackConfirmation+1.-obj.mState.trackConfirmation);
           % fprintf('Track: %d MHD: %f L: %f TC: %E GP: %E\n',obj.mState.updates,...
           %     obj.mState.MahalanobisDistance, obj.mState.likelyhood,obj.mState.trackConfirmation,obj.mState.gateProb
            if(obj.mState.trackConfirmation<.02)
                
                obj.mState.trackConfirmation = .02;
            end
            if(obj.mState.trackConfirmation>.98)
                
                obj.mState.trackConfirmation = .98;
            end
            obj.mState.acceptanceMemory(1+mod(obj.mState.updates,obj.mState.memoryLength)) =obj.mState.MahalanobisDistance;
            obj.mState.updates = obj.mState.updates  + 1;
            obj.mState.acceptanceValue = median(obj.mState.acceptanceMemory(obj.mState.acceptanceMemory>0));
            
            obj.mState.gateProb = 1-interp1(obj.mState.cdfx,obj.mState.cdfy,obj.mState.acceptanceValue,'linear',1);
            if( obj.mState.updates>3)
                obj.mState.locked = true;
            else
                obj.mState.locked = false;
            end
        end
        function  updateECEF(obj,sigmaECEF,ECEF)
           
            
            obj.mState.z =ECEF;
            obj.mState.R = diag(sigmaECEF).^2;
            obj.update(obj.mState.R,obj.mState.z);
            
        end
        function Q = ProcessModel(obj,sigma,time)
            switch obj.mConfig.pModel
                case 'discreteWhiteNoiseAccModel'
                    Q = eye(6);
                    for ii = 0:2
                        Q(2*ii+1,2*ii+1) = time^4 * sigma(ii+1)^2 * 1/4;
                        Q(2*ii+1,2*ii+2) = time^3 * sigma(ii+1)^2 * 1/2;
                        Q(2*ii+2,2*ii+1) = time^3 * sigma(ii+1)^2 * 1/2;
                        Q(2*ii+2,2*ii+2) = time^2 * sigma(ii+1)^2;
                    end
                case 'continuousWienerAccModel'
                    
                    Q = eye(9);
                    for ii = 0:2
                        Q((1:3)+ii*3,(1:3)+ii*3)= ...
                            [1/20*time^5 1/8*time^4  1/6*time^3;...
                            1/8* time^4 1/3* time^3 1/2*time^2;...
                            1/6* time^3 1/2* time^2 1*  time]*sigma(ii+1);
                    end
                otherwise
                    error('Unknown Process Model');
            end
            Q =  obj.mState.ned2ecefrotationmatrixbig*Q*obj.mState.ned2ecefrotationmatrixbig';
        %         end
        end
        %         function Q = ProcessModel(obj,sigma,time)
        % %            switch obj.mConfig.pModel
        % %                 case 'discreteWhiteNoiseAccModel'
        % %                     Q = eye(obj.mConfig.totalStates);
        % %                     for ii = 0:obj.mConfig.observedStates-1
        % %                         Q(2*ii+1,2*ii+1) = time^4 * sigma(ii+1)^2 * 1/3;
        % %                         Q(2*ii+1,2*ii+2) = time^3 * sigma(ii+1)^2 * 1/2;
        % %                         Q(2*ii+2,2*ii+1) = time^3 * sigma(ii+1)^2 * 1/2;
        % %                         Q(2*ii+2,2*ii+2) = time^2 * sigma(ii+1)^2;
        % %                     end
        % %                 otherwise
        % %                     Q = eye(obj.mConfig.totalStates);
        % %                     for ii = 0:obj.mConfig.observedStates-1
        % %                         Q(2*ii+1,2*ii+1) = time^4 * sigma(ii+1)^2 * 1/3;
        % %                         Q(2*ii+1,2*ii+2) = time^3 * sigma(ii+1)^2 * 1/2;
        % %                         Q(2*ii+2,2*ii+1) = time^3 * sigma(ii+1)^2 * 1/2;
        % %                         Q(2*ii+2,2*ii+2) = time^2 * sigma(ii+1)^2;
        % %                     end
        % %             end
        %
        %             Q = eye(obj.mConfig.totalStates);
        % %             for ii = 0:obj.mConfig.observedStates-1
        % %                 Q(2*ii+1,2*ii+1) = time^4 * sigma(ii+1)^2 * 1/3;
        % %                 Q(2*ii+1,2*ii+2) = time^3 * sigma(ii+1)^2 * 1/2;
        % %                 Q(2*ii+2,2*ii+1) = time^3 * sigma(ii+1)^2 * 1/2;
        % %                 Q(2*ii+2,2*ii+2) = time^2 * sigma(ii+1)^2;
        % %             end
        % %             ii = 0;
        %             sigma= sigma.^2;
        %             va = sigma(1);
        %             Q(1,1) = time^4 *va * 1/3;
        %             Q(1,2) = time^3 *va* 1/2;
        %             Q(2,1) = time^3 *va* 1/2;
        %             Q(2,2) = time^2 *va^2;
        %
        %
        %
        %             va = sigma(2);
        %             Q(3,3) = time^4 *va * 1/3;
        %             Q(3,4) = time^3 *va* 1/2;
        %             Q(4,3) = time^3 *va* 1/2;
        %             Q(4,4) = time^2 *va^2;
        %
        %
        %             va = sigma(3);
        %             Q(5,5) = time^4 *va * 1/3;
        %             Q(5,6) = time^3 *va* 1/2;
        %             Q(6,5) = time^3 *va* 1/2;
        %             Q(6,6) = time^2 *va^2;
        %
        %
        %             Q = obj.mState.ned2ecefrotationmatrixbig*Q*obj.mState.ned2ecefrotationmatrixbig';
        %         end
        %
        %
    end
end
