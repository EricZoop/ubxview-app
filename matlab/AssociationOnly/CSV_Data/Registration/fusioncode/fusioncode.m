classdef fusioncode < handle
    properties (SetAccess = public, GetAccess = public)
        mState;
        mConfig;
    end
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    methods (Access = public)
        %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        function obj =fusioncode(config)
            % Set Configuration
            % set state
            obj.mState.platformCount = 0;
            obj.mState.Tlast = 0;
            obj.mConfig.maxSTD = 500;
            obj.mConfig.maxAz  = 10;
            obj.mConfig.maxMhd = 4;
        end
        %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        function  initfusion(obj)
            %times
            obj.mState.fusion.radarTracks = [];
            obj.mState.fusion.radarTrackIds = containers.Map('KeyType','char','ValueType','double');
            obj.mState.fusion.alignTrackIds = containers.Map('KeyType','char','ValueType','double');
            obj.mState.fusion.currentTime = [];
            obj.mState.fusion.maxDeterminant = det(diag([40000*sind(1) 200 40000*sind(1) 200 40000*sind(1) 200]).^2);
        end
        %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        function  initplatform(obj,platform)
            %times
            obj.mState.platformCount = obj.mState.platformCount + 1;
            obj.mState.platform(platform.platformId).platformId = platform.platformId;
            obj.mState.platform(platform.platformId).type = platform.type;
            obj.mState.platform(platform.platformId).trackCoordinates =  platform.trackCoordinates;
            obj.mState.platform(platform.platformId).platformTrack = [];
            obj.mState.platform(platform.platformId).radarTracks = [];
            obj.mState.platform(platform.platformId).radarTrackIds = containers.Map('KeyType','double','ValueType','double');
            obj.mState.platform(platform.platformId).currentTime = [];
            obj.mState.platform(platform.platformId).alignReference = platform.alignReference;
        end
        %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        function  updateplatform(obj,platform)
            %times
            if(isempty(obj.mState.platform(platform.platformId).platformTrack))
                obj.mState.platform(platform.platformId).platformTrack =  posfilter('filterparameters.xml',0);
                obj.mState.platform(platform.platformId).platformTrack.firstUpdateEcef(...
                    platform.platformPosStd,platform.platformPosEcef,platform.time);
            else
                
                obj.mState.platform(platform.platformId).platformTrack.predict(platform.time);
                
                obj.mState.platform(platform.platformId).platformTrack.updateECEF(...
                    platform.platformPosStd,platform.platformPosEcef);
            end
            
            
        end
        %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        function  deletestaletracks(obj,time)
            for ii = 1:obj.mState.platformCount
                platform=  obj.mState.platform(ii);
                keys =platform.radarTrackIds.keys;
                count = 1;
                detectionsKeys = [];
                for jj = 1:platform.radarTrackIds.Count
                    tid = platform.radarTrackIds(keys{jj});
                    if(abs(platform.radarTracks{tid}.mState.Tlast-time)>15)
                        % fprintf(1,'Deleting track: %f\n',keys{jj});
                        detectionsKeys(count) = keys{jj};
                        count = count + 1;
                    end
                end
                if(~isempty(detectionsKeys))
                    for vs = 1:numel(detectionsKeys)
                        platform.radarTracks{platform.radarTrackIds(detectionsKeys(vs))}= [];
                        platform.radarTrackIds.remove(detectionsKeys(vs));
                    end
                end
                obj.mState.platform(ii) =  platform;
            end
            detectionsKeys = [];
            keys = obj.mState.fusion.radarTrackIds.keys;
            count = 1;
            for jj = 1:obj.mState.fusion.radarTrackIds.Count
                tid = obj.mState.fusion.radarTrackIds(keys{jj});
                if(abs(obj.mState.fusion.radarTracks{tid}.mState.Tlast-time)>5)
                    detectionsKeys{count} = keys{jj};
                    count = count + 1;
                end
            end
            if(~isempty(detectionsKeys))
                for vs = 1:numel(detectionsKeys)
                    
                    obj.mState.fusion.radarTracks{obj.mState.fusion.radarTrackIds(detectionsKeys{vs})}= [];
                    obj.mState.fusion.radarTrackIds.remove(detectionsKeys{vs});
                end
            end
        end
        %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        function [tracks,confirm] =  getcurrentraed(obj,platformId,time,format,pos)
            confirm = [];
            for ii = platformId
                switch format
                    case 'RAED'
                        tracks =  [];
                        platform=  obj.mState.platform(ii);
                        keys =platform.radarTrackIds.keys;
                        for jj = 1:numel( keys)
                            tid = platform.radarTrackIds(keys{jj});
                            tracks.Id(jj)  = tid;
                            tracks.raed(jj,:) = platform.radarTracks{tid}.getraed(time);
                            tracks.raed(jj,2) = tracks.raed(jj,2) * 180/pi;
                            tracks.raed(jj,3) = tracks.raed(jj,3) * 180/pi;
                            confirm(jj) = platform.radarTracks{tid}.mState.trackConfirmation;
                            if(tracks.raed(jj,2)<0)
                                tracks.raed(jj,2) = tracks.raed(jj,2) + 360;
                            end
                        end
                        
                    case 'ECEF'
                        tracks =  [];
                        platform=  obj.mState.platform(ii);
                        keys =platform.radarTrackIds.keys;
                        for jj = 1:numel( keys)
                            tid = platform.radarTrackIds(keys{jj});
                            tracks.Id(jj)  = tid;
                            
                            [tracksz] = platform.radarTracks{tid}.extrap(time);
                            Xo =tracksz(1);
                            Yo =tracksz(3);
                            Zo =tracksz(5);
                            [lat0, lon0, h0] = ecef2geodetic( wgs84Ellipsoid,pos(1),pos(2),pos(3));
                            [az,el,rg] =  ecef2aer(Xo, Yo, Zo, lat0, lon0, h0, wgs84Ellipsoid);
                            
                            tracks.raed(jj,2)  = az;
                            tracks.raed(jj,3) = el;
                            tracks.raed(jj,1) = rg;
                            confirm(jj) = platform.radarTracks{tid}.mState.trackConfirmation;
                        end
                    case 'AZEL'
                end
                
            end
            
        end
        %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        function [tracks,confirm] =  getfusedraed(obj,time,pos)
            confirm = [];
            tracks =  [];
            platform=   obj.mState.fusion;
            keys =platform.radarTrackIds.keys;
            for jj = 1:numel( keys)
                tid = platform.radarTrackIds(keys{jj});
                tracks.Id(jj)  = tid;
                [tracksz] = platform.radarTracks{tid}.extrap(time);
                Xo =tracksz(1);
                Yo =tracksz(3);
                Zo =tracksz(5);
                [lat0, lon0, h0] = ecef2geodetic( wgs84Ellipsoid,pos(1),pos(2),pos(3));
                [az,el,rg] =  ecef2aer(Xo, Yo, Zo, lat0, lon0, h0, wgs84Ellipsoid);
                
                tracks.raed(jj,2)  = az;
                tracks.raed(jj,3) = el;
                tracks.raed(jj,1) = rg;
                confirm(jj) = platform.radarTracks{tid}.mState.trackConfirmation;
                
            end
        end
        %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        function tracks =  getcurrentecef(obj,platformId,time)
            
            for ii = platformId
                tracks =  [];
                platform=  obj.mState.platform(ii);
                keys =platform.radarTrackIds.keys;
                
                
                for jj = 1:numel( keys)
                    tid = platform.radarTrackIds(keys{jj});
                    tracks.Id(jj)  = tid;
                    [tracks.ecef(jj,:),tracks.cov{jj}] = platform.radarTracks{tid}.extrap(time);
                    %platform.radarTracks{ tid}.predict(time);
                    
                end
            end
            
        end
        %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        function tracks =  getfusedecef(obj,time)
            tracks =  [];
            platform=  obj.mState.fusion;
            keys =platform.radarTrackIds.keys;
            for jj = 1:numel( keys)
                tid = platform.radarTrackIds(keys{jj});
                tracks.Id(jj)  = tid;
                [tracks.ecef(jj,:),tracks.ppred{jj}] = platform.radarTracks{tid}.extrap(time);
                %platform.radarTracks{ tid}.predict(time);
                
            end
        end
        %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        function  insertpoint(obj,datapoint)
            
            platform=  obj.mState.platform(datapoint.platformId);
            weHaveKey = platform.radarTrackIds.isKey(datapoint.trackId);
            
            if(~weHaveKey)
                % make entry for track
                
                % get new index for new track class for new track
                platform.radarTrackIds(datapoint.trackId) =  numel( platform.radarTracks)+1;
                tid = platform.radarTrackIds(datapoint.trackId);
                switch datapoint.format
                    case 'RAED'
                        platform.radarTracks{tid} = ...
                            ukf('filterparametersukf.xml',0);
                        
                        [lat,lon,h] = ecef2geodetic(wgs84Ellipsoid,platform.platformTrack.mState.xCurr(1),...
                            platform.platformTrack.mState.xCurr(3),...
                            platform.platformTrack.mState.xCurr(5));
                        
                        platform.radarTracks{ tid}.setPosReceiver(lat,lon,h);
                        if(isfield(datapoint,'ecef'))
                            R = diag([datapoint.ecefStd(1) ;datapoint.ecefVelStd(1);
                                datapoint.ecefStd(2); datapoint.ecefVelStd(2);
                                datapoint.ecefStd(3); datapoint.ecefVelStd(3)]);
                            
                            ecefpos = [datapoint.ecef(1) ;datapoint.ecefVelocity(1);
                                datapoint.ecef(2); datapoint.ecefVelocity(2);
                                datapoint.ecef(3); datapoint.ecefVelocity(3)];
                            platform.radarTracks{ tid}.firstUpdateEcef(R.^2,ecefpos,datapoint.time,datapoint.pos);
                        else
                            platform.radarTracks{ tid}.firstUpdate(datapoint.posStd,datapoint.pos,datapoint.time);
                        end
                        
                        
                        
                    case 'ECEF'
                        % fprintf(1,'New Tracks: %d\n',datapoint.trackId);
                        platform.radarTracks{tid} =  posfilter('filterparameters.xml',0);
                        platform.radarTracks{tid}.firstUpdateEcef(...
                            datapoint.posStd,datapoint.pos,datapoint.time);
                    case 'AZEL'
                        platform.radarTracks{tid}=ukfazel('filterparametersukfazel.xml',0);
                        [lat,lon,h] = ecef2geodetic(wgs84Ellipsoid,platform.platformTrack.mState.xCurr(1),...
                            platform.platformTrack.mState.xCurr(3),...
                            platform.platformTrack.mState.xCurr(5));
                        
                        platform.radarTracks{ tid}.setPosReceiver(lat,lon,h);
                        platform.radarTracks{tid}.firstUpdate(...
                            diag(datapoint.posStd),datapoint.pos,datapoint.time);
                end
                
            else
                tid = platform.radarTrackIds(datapoint.trackId);
                switch datapoint.format
                    case 'RAED'
                        
                        [lat,lon,h] = ecef2geodetic(wgs84Ellipsoid,platform.platformTrack.mState.xCurr(1),...
                            platform.platformTrack.mState.xCurr(3),...
                            platform.platformTrack.mState.xCurr(5));
                        platform.radarTracks{ tid}.setPosReceiver(lat,lon,h);
                        platform.radarTracks{ tid}.predict(datapoint.time);
                        platform.radarTracks{ tid}.update(diag(datapoint.posStd.^2),datapoint.pos);
                    case 'ECEF'
                        platform.radarTracks{ tid}.predict(datapoint.time);
                        platform.radarTracks{ tid}.updateECEF(...
                            datapoint.posStd,datapoint.pos);
                    case 'AZEL'
                        [lat,lon,h] = ecef2geodetic(wgs84Ellipsoid,platform.platformTrack.mState.xCurr(1),...
                            platform.platformTrack.mState.xCurr(3),...
                            platform.platformTrack.mState.xCurr(5));
                        platform.radarTracks{ tid}.setPosReceiver(lat,lon,h);
                        platform.radarTracks{ tid}.predict(datapoint.time);
                        platform.radarTracks{ tid}.update(diag(datapoint.posStd.^2),datapoint.pos);
                end
                
                
            end
            obj.mState.platform(datapoint.platformId) =  platform;
        end
        %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        function  mhd = fuse(obj,time)
            % get all platform ids
            mhd = [];
            count = 1;
            for ii = 1:numel(obj.mState.platform)
                if(~isempty(obj.mState.platform(ii).radarTrackIds.keys))
                    tracks{count} = cell2mat(obj.mState.platform(ii).radarTrackIds.keys);
                    count = count + 1;
                end
            end
            if(numel(tracks)>1)
                D = tracks;
                [D{:}] = ndgrid(tracks{:});
                Z = cell2mat(cellfun(@(m)m(:),D,'uni',0));
                
                ids = [obj.mState.platform(:).platformId];
                platform1 = obj.mState.platform(1);
                platform2 = obj.mState.platform(2);
                
                for ii = 1:size(Z,1)
                    %check distance between points
                    
                    tid1 = platform1.radarTrackIds(Z(ii,1));
                    tid2 = platform2.radarTrackIds(Z(ii,2));
                    if(strcmp(platform1.trackCoordinates,'ECEF')&&strcmp(platform2.trackCoordinates,'ECEF'))
                        
                        [stateVector1,cov1]= platform1.radarTracks{ tid1}.extrap(time);
                        [stateVector2,cov2]= platform2.radarTracks{ tid2}.extrap(time);
                        %                      stateVector1 = platform1.radarTracks{ tid1}.mState.xPred;
                        %                      stateVector2 = platform2.radarTracks{ tid2}.mState.xPred;
                        %
                        %                      cov1 = platform1.radarTracks{ tid1}.mState.PPred ;
                        %                      cov2 = platform2.radarTracks{ tid2}.mState.PPred ;
                        d = stateVector1-stateVector2;
                        C = ((cov1+cov2));
                        mhd(ii) = sqrt(d'*(C\d));
                        
                        %Volume = det(C);
                        goodCheck = true;
                        if(platform1.radarTracks{ tid1}.mState.updates<4||platform2.radarTracks{ tid2}.mState.updates<4)
                            goodCheck = false;
                        end
                        %                         if(Volume>obj.mState.fusion.maxDeterminant)
                        %                             a = 1;
                        %                             goodCheck = false;
                        %                         end
                        if(mhd(ii)<20&&goodCheck)
                            a = 1;
                            key = sprintf('%d,%d',Z(ii,1),Z(ii,2));
                            weHaveKey = obj.mState.fusion.radarTrackIds.isKey(key);
                            if(weHaveKey)
                                %fprintf(1,'WE HAVE KEY: %s\n',key);
                                tid = obj.mState.fusion.radarTrackIds(key);
                                obj.mState.fusion.radarTracks{tid}.predict(time);
                                obj.mState.fusion.radarTracks{tid}.update(...
                                    stateVector1,stateVector2,cov1,cov2);
                                
                            else
                                % fprintf(1,'WE NO HAVE KEY: %s\n',key);
                                obj.mState.fusion.radarTrackIds(key) =  numel( obj.mState.fusion.radarTracks)+1;
                                tid = obj.mState.fusion.radarTrackIds(key);
                                obj.mState.fusion.radarTracks{tid} =  fusionfilter('filterparameters.xml',time);
                                obj.mState.fusion.radarTracks{tid}.firstUpdate(...
                                    stateVector1,stateVector2,cov1,cov2,time);
                            end
                            
                        end
                    end
                    if(strcmp(platform1.trackCoordinates,'ECEF')&&strcmp(platform2.trackCoordinates,'AZEL'))
                        %radar optic fusion case
                        a = 1;
                        %get ecef pos of optic
                        opticPosState = platform2.platformTrack.extrap(time);
                        ecefOptic =  opticPosState(1:2:6);
                        [stateVector1,cov1]= platform1.radarTracks{ tid1}. getraedSigmPositionVelocityAtposition(time,ecefOptic');
                        [stateVector2,cov2]= platform2.radarTracks{ tid2}.extrap(time);
                        delta = stateVector1([2:5])-stateVector2;
                        delta(1) = atan2d(sind(delta(1)), cosd(delta(1)));
                        cov = cov1(2:1:end-1,2:1:end-1)+cov2;
                        mhd(ii) =  sqrt(abs(delta'*(cov\delta)));
                        
                        
                        if(mhd(ii)<50)
                            a = 1;
                            key = sprintf('%d,%d',tid1,tid2);
                            weHaveKey = obj.mState.fusion.radarTrackIds.isKey(key);
                            pos(1) = stateVector1(1);
                            pos(2) = stateVector2(1)*pi/180;
                            pos(3) = stateVector2(3)*pi/180;
                            pos(4) = stateVector1(6);
                            pos= pos';
                            posStd = diag([cov1(1,1) cov2(1,1)*(pi/180)^2 cov2(3,3)*(pi/180)^2 cov1(6,6)]);
                            [lat,lon,h] = ecef2geodetic(wgs84Ellipsoid,opticPosState(1),...
                                opticPosState(3),...
                                opticPosState(5));
                            if(weHaveKey)
                                tid = obj.mState.fusion.radarTrackIds(key);
                                obj.mState.fusion.radarTracks{tid}.setPosReceiver(lat,lon,h);
                                obj.mState.fusion.radarTracks{tid}.predict(time);
                                obj.mState.fusion.radarTracks{tid}.update(posStd,pos);
                                
                            else
                                % fprintf(1,'WE NO HAVE KEY: %s\n',key);
                                obj.mState.fusion.radarTrackIds(key) =  numel( obj.mState.fusion.radarTracks)+1;
                                tid = obj.mState.fusion.radarTrackIds(key);
                                obj.mState.fusion.radarTracks{tid} = ukf('filterparametersukf.xml',0);
                                
                                obj.mState.fusion.radarTracks{tid}.setPosReceiver(lat,lon,h);
                                
                                obj.mState.fusion.radarTracks{tid}.firstUpdate(...
                                    posStd,pos,time);
                            end
                        end
                    end
                end
            end
            
        end
        %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        function  mhd = fusetwo(obj,time, varargin)
            % get all platform ids
            maxAz  = obj.mConfig.maxAz; % default is 10
            maxMhd = obj.mConfig.maxMhd;% default is 4
            maxSTD = obj.mConfig.maxSTD;% default is 500
            
            if any(strcmp(varargin, 'fid'))
                fid = varargin{find(strcmp(varargin, 'fid')) +1};
            else
                fid = 1;
            end
            mhd = [];
            count = 1;
            for ii = 1:numel(obj.mState.platform)
                if(~isempty(obj.mState.platform(ii).radarTrackIds.keys))
                    tracks{count} = cell2mat(obj.mState.platform(ii).radarTrackIds.keys);
                    count = count + 1;
                end
            end
            platform1 = obj.mState.platform(1);
            platform2 = obj.mState.platform(2);
            if(numel(tracks)~=2)
                return;
            end
            stateVector1 = zeros(6,numel( tracks{1}));
            cov1 = zeros(6,6,numel( tracks{1}));
            stateVector2 = zeros(6,numel( tracks{2}));
            cov2 = zeros(6,6,numel( tracks{2}));
            
            
            %next ECEF for objects that are close enough
            %%%%%%%%%%%%%%%%
            stateVector1 = zeros(6,numel( tracks{1}));
            cov1 = zeros(6,6,numel( tracks{1}));
            stateVector2 = zeros(6,numel( tracks{2}));
            cov2 = zeros(6,6,numel( tracks{2}));
            for ii = 1:numel( tracks{1})
                tid = platform1.radarTrackIds(tracks{1}(ii) );
                position = platform1.radarTracks{ tid}.mState.receiverPos.ecef;
                
                [stateVector1(:,ii) , cov1(:,:,ii) ]= platform1.radarTracks{ tid}.extrap(time);
                
            end
            range1 = stateVector1(1:2:6,:)-position';
            range1 = sqrt(range1(1,:).^2 + range1(2,:).^2 + range1(3,:).^2);
            for ii = 1:numel( tracks{2})
                tid = platform2.radarTrackIds(tracks{2}(ii) );
                [stateVector2(:,ii) , cov2(:,:,ii) ]= platform2.radarTracks{ tid}.extrap(time);
            end
            range2 = stateVector2(1:2:6,:)-position';
            range2 = sqrt(range2(1,:).^2 + range2(2,:).^2 + range2(3,:).^2);
            [lat,lon,alt] = ecef2geodetic(wgs84Ellipsoid, position(1), position(2), position(3)) ;
            if(strcmp(platform1.trackCoordinates,'ECEF')&&strcmp(platform2.trackCoordinates,'ECEF'))
                
                for ii = 1:size(stateVector2,2)
                    tid2 = platform2.radarTrackIds(tracks{2}(ii));
                    if(platform2.radarTracks{ tid2}.mState.updates>4)
                        for jj = 1:size(stateVector1,2)
                            
                            tid1 = platform1.radarTrackIds(tracks{1}(jj));
                            if(platform1.radarTracks{ tid1}.mState.updates>1)
                                if(abs(range2(ii)-range1(jj))<20)
                                    key = sprintf('%d,%d',tracks{1}(jj),tracks{2}(ii));
                                    
                                    weHaveKey = obj.mState.fusion.alignTrackIds.isKey(key);
                                    Std = sqrt(cov1(1,1,jj)+cov1(3,3,jj)+cov1(5,5,jj));
                                    if(platform1.alignReference)
                                        if(weHaveKey)
                                            tid = obj.mState.fusion.alignTrackIds(key);
                                            obj.mState.fusion.align{tid}.insertPoint(stateVector1(1:2:6,jj)-position',stateVector2(1:2:6,ii)-position',1,Std);
                                        else
                                            obj.mState.fusion.alignTrackIds(key) =  numel( obj.mState.fusion.radarTracks)+1;
                                            tid = obj.mState.fusion.alignTrackIds(key);
                                            
                                            obj.mState.fusion.align{tid} = aligner(1);
                                            obj.mState.fusion.align{tid}.insertPoint(stateVector1(1:2:6,jj)-position',stateVector2(1:2:6,ii)-position',1,Std);
                                        end
                                        R = obj.mState.fusion.align{tid}.Attitude{1};
                                        az = abs(atan2d(R(2,1),R(1,1)));
                                        R = kron(R,eye(2));
                                        sv2 = stateVector2(:,ii);
                                        sv2(1:2:6) = sv2(1:2:6)-position';
                                        sv2 = R*sv2;
                                        sv2(1:2:6) = sv2(1:2:6)+position';
                                        cv2 = R*cov2(:,:,ii)*R';
                                        d = stateVector1(:,jj)-sv2;
                                        C = cov1(:,:,jj) + cv2;
                                    elseif(platform2.alignReference)
                                        if(weHaveKey)
                                            tid = obj.mState.fusion.alignTrackIds(key);
                                            obj.mState.fusion.align{tid}.insertPoint(stateVector2(1:2:6,ii)-position',stateVector1(1:2:6,jj)-position',1,Std);
                                        else
                                            obj.mState.fusion.alignTrackIds(key) =  numel( obj.mState.fusion.radarTracks)+1;
                                            tid = obj.mState.fusion.alignTrackIds(key);
                                            
                                            obj.mState.fusion.align{tid} = aligner(1);
                                            obj.mState.fusion.align{tid}.insertPoint(stateVector2(1:2:6,ii)-position',stateVector1(1:2:6,jj)-position',1,Std);
                                        end
                                        R = obj.mState.fusion.align{tid}.Attitude{1};
                                        az = abs(atan2d(R(2,1),R(1,1)));
                                        R = kron(R,eye(2));
                                        sv1 = stateVector1(:,jj);
                                        sv1(1:2:6) = sv1(1:2:6)-position';
                                        sv1 = R*sv1;
                                        sv1(1:2:6) = sv1(1:2:6)+position';
                                        cv1 = R*cov1(:,:,jj)*R';
                                        d = stateVector2(:,ii)-sv1;
                                        C = cov2(:,:,ii) + cv1;
                                    else
                                        if(weHaveKey)
                                            tid = obj.mState.fusion.alignTrackIds(key);
                                            obj.mState.fusion.align{tid}.insertPoint(stateVector2(1:2:6,ii)-position',stateVector1(1:2:6,jj)-position',1,Std);
                                        else
                                            obj.mState.fusion.alignTrackIds(key) =  numel( obj.mState.fusion.radarTracks)+1;
                                            tid = obj.mState.fusion.alignTrackIds(key);
                                            
                                            obj.mState.fusion.align{tid} = aligner(1);
                                            obj.mState.fusion.align{tid}.insertPoint(stateVector2(1:2:6,ii)-position',stateVector1(1:2:6,jj)-position',1,Std);
                                        end
                                        R = obj.mState.fusion.align{tid}.Attitude{1};
                                        az = abs(atan2d(R(2,1),R(1,1)));
                                        R = kron(R,eye(2));
                                        sv1 = stateVector1(:,jj);
                                        sv1(1:2:6) = sv1(1:2:6)-position';
                                        sv1 = R*sv1;
                                        sv1(1:2:6) = sv1(1:2:6)+position';
                                        cv1 = R*cov1(:,:,jj)*R';
                                        d = stateVector2(:,ii)-stateVector1(:,jj);
                                        C = cov2(:,:,ii) + cov1(:,:,jj);
                                    end
                                    mhd =sqrt(d'*(C\d));
                                    
                                    %fprintf(1,'MHD: %f key: %f\n',mhd,tracks{2}(ii));
                                    
                                    if(mhd<maxMhd&&  az<maxAz&&Std<maxSTD )
                                        weHaveKey = obj.mState.fusion.radarTrackIds.isKey(key);
                                        if(weHaveKey)
                                            %                                             l = split(key,',');
                                            %                                             if(1685==str2num(l{1}))
                                            %                                                 a = 1;
                                            %                                             end
                                            %fprintf(1,'WE HAVE KEY: %s\n',key);
                                            tid = obj.mState.fusion.radarTrackIds(key);
                                            obj.mState.fusion.radarTracks{tid}.setPosReceiver(lat,  lon,  alt);
                                            obj.mState.fusion.radarTracks{tid}.predict(time);
                                            %covariance inflation
                                            if(platform1.alignReference)
                                                obj.mState.fusion.radarTracks{tid}.update(...
                                                    stateVector1(:,jj),sv2,cov1(:,:,jj),cv2);
                                            elseif(platform2.alignReference)
                                                obj.mState.fusion.radarTracks{tid}.update(...
                                                    sv1,stateVector2(:,ii),cv1,cov2(:,:,ii));
                                            else
                                                obj.mState.fusion.radarTracks{tid}.update(...
                                                    stateVector1(:,jj),stateVector2(:,ii),cov1(:,:,jj),cov2(:,:,ii));
                                            end
                                        else
                                            % fprintf(fid,'WE NO HAVE KEY: %s\n',key); %Ryan commented to reduce print statements
                                            obj.mState.fusion.radarTrackIds(key) =  numel( obj.mState.fusion.radarTracks)+1;
                                            tid = obj.mState.fusion.radarTrackIds(key);
                                            obj.mState.fusion.radarTracks{tid} =  fusionfilter('filterparameters.xml',time);
                                            obj.mState.fusion.radarTracks{tid}.setPosReceiver(lat,  lon,  alt);
                                            if(platform1.alignReference)
                                                obj.mState.fusion.radarTracks{tid}.firstUpdate(...
                                                    stateVector1(:,jj),sv2,cov1(:,:,jj),cv2,time);
                                            elseif(platform2.alignReference)
                                                obj.mState.fusion.radarTracks{tid}.firstUpdate(...
                                                    sv1,stateVector2(:,ii),cv1,cov2(:,:,ii),time);
                                            else
                                                obj.mState.fusion.radarTracks{tid}.firstUpdate(...
                                                    stateVector1(:,jj),stateVector2(:,ii),cov1(:,:,jj),cov2(:,:,ii),time);
                                            end
                                        end
                                    end
                                end
                            end
                            
                        end
                    end
                end
            end
            
            
            
        end
        %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    end
end
