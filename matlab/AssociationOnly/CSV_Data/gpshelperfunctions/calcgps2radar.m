function gpstrack = calcgps2radar(targettrack, radartrack,trimGps,minTime,maxTime,radarParameters)
%get lat and long at times
if(trimGps && ~isempty(minTime))
    index = find(targettrack.dateNum<minTime|targettrack.dateNum>maxTime);
    
    names = fieldnames(targettrack);
    for ii = 1:numel(names)
        checkstring = sprintf('numel(targettrack.%s)<numel(index)',names{ii});
        if(eval(checkstring)==1)
            
        else
            dothis = sprintf('targettrack.%s(index) = [];', names{ii});
            eval(dothis);
        end
    end
end
%     targettrack.dateNum(index) = [];
%     targettrack.Alt(index) = [];
%     %targettrack.Course(index) = [];
%     targettrack.elapsedTime(index) = [];
%     targettrack.HDOP(index) = [];
%     targettrack.Lat(index) = [];
%     targettrack.Lon(index) =[];
%targettrack.Speed(index) = [];

% If GPS is entirely trimmed, delete
if isempty(targettrack.dateNum)
    gpstrack = [];
    return;
end

% Remove duplicate dateNum entries
[~,index] = unique(targettrack.dateNum );
gpstrack2 = soa2aos(targettrack);
gpstrack2= gpstrack2(index);
targettrack = aos2soa(gpstrack2);
tUTC= targettrack.dateNum;
[~,index] = sort(tUTC);
gpstrack2 = soa2aos(targettrack);
gpstrack2= gpstrack2(index);
targettrack = aos2soa(gpstrack2);

% If GPS is entirely trimmed, delete
if isempty(targettrack.dateNum)
    gpstrack = [];
    return;
end

% Remove nan idxs
nanIdx = isnan(targettrack.dateNum) | isnan(targettrack.Lat) | isnan(targettrack.Lon) | isnan(targettrack.Alt);
fns = fieldnames(targettrack);
for iFns = 1:length(fns)
    targettrack2.(fns{iFns}) = targettrack.(fns{iFns})(~nanIdx);
end

targettrack = targettrack2;

% If GPS is entirely trimmed, delete
if isempty(targettrack.dateNum)
    gpstrack = [];
    return;
end

% Remove repeateded lat/lon entries, ADSB data problem?
index = (diff(targettrack.Lat)~=0) | (diff(targettrack.Lon)~=0) | (diff(targettrack.Alt)~=0);
index = [true, index];
gpstrack2 = soa2aos(targettrack);
gpstrack2= gpstrack2(index);
targettrack = aos2soa(gpstrack2);

% If GPS is entirely trimmed, delete
if isempty(targettrack) || isempty(targettrack.dateNum)
    gpstrack = [];
    return;
end

% Remove outliers - TODO, incorporate in Kalman filter
% latPoly = polyfit(targettrack.elapsedTime, targettrack.Lat, 2);
% polyData = polyval(latPoly, targettrack.elapsedTime);
% error = polyData - targettrack.Lat;
% outlier = isoutlier(error);
% index = ~outlier;
% gpstrack2 = soa2aos(targettrack);
% gpstrack2= gpstrack2(index);
% targettrack = aos2soa(gpstrack2);



tUTC= targettrack.dateNum;
if (numel(tUTC) < 2)
    fprintf('GPS data time range does not overlap with track data. GPS data ignored\n');
    gpstrack = [];
else
    [latGps] = getdataattime(tUTC,targettrack,'dateNum','Lat','linear');
    [longGps] =  getdataattime(tUTC,targettrack,'dateNum','Lon','linear');
    [altGps] = getdataattime(tUTC,targettrack,'dateNum','Alt','linear');
    [latV] = getdataattime(tUTC,radartrack,'dateNum','Lat','linear');
    [longV] =  getdataattime(tUTC,radartrack,'dateNum','Lon','linear');
    [altV] =  getdataattime(tUTC,radartrack,'dateNum','Alt','linear');
    [X, Y, Z] = geodetic2ecef(wgs84Ellipsoid, latGps, longGps, altGps);
    [Xv, Yv, Zv] = geodetic2ecef(wgs84Ellipsoid, latV, longV, altV);
    posFilter=  posfilter('filterparameters.xml',0);
    
    times = (tUTC-min(tUTC))*(24*3600);
    first = true;
    oldTime= times(1);
    for ii = 1:numel(times)
        pos = [X(ii);Y(ii);Z(ii)];
        posStd = [50;50;50];
        if( (times(ii)-oldTime)>10)
            %reset on time break
            first= true;
            clear posFilter;
            posFilter=  posfilter('filterparameters.xml',0);
        end
        if(first)
            
            posFilter.firstUpdateEcef(posStd,pos,times(ii));
            first = false;
        else
            posFilter.predict(times(ii));
            posFilter.updateECEF(posStd,pos);
        end
        oldTime = times(ii);
        x  = posFilter.mState.xCurr;
        [Azimuth(ii), Elevation(ii), range(ii)] = ecef2aer(x(1),...
            x(3), x(5), latV(ii), longV(ii), altV(ii), wgs84Ellipsoid);
        if(Azimuth(ii)<0)
            Azimuth(ii) = Azimuth(ii)+ 360;
        end
        
        position = [Xv(ii) Yv(ii) Zv(ii)];
        Renu2ecef = ned2ecefrotationmatrix(latV(ii), longV(ii));
        y = [x(1);x(3);x(5)];
        y = y-position';
        y = Renu2ecef'*y;
        x(1) = y(1);
        
        x(3) = y(2);
        x(5) = y(3);
        y = [x(2);x(4);x(6)];
        y = Renu2ecef'*y;
        nwu(ii,:) = y;
        x(2) = y(1);
        x(4) = y(2);
        x(6) = y(3);
        v1 = [x(1); x(3); x(5)];
       
       
        v2 = [x(2); x(4); x(6)];
         nwu(ii,:) = v1;
        nwuVelocity(ii,:) = v2;
        Heading(ii) = atan2d(-x(4),x(2));
        Doppler(ii) =  dot(v1,v2)./range(ii);
       
    end
    if(trimGps && min(range)>radarParameters.maxTargetRange)
        gpstrack =[];
    else
        %[rangeTarget,azTarget] = distance(latV,longV,latGps,longGps, earthRadius);
        %    [rangeTarget,azTarget] = distance(latGps,longGps,latV,longV,earthRadius);
        gpstrack = targettrack;
        %Alt = altGps-altV;   % AO TODO 6/14/2018: Drone GPS altitude is usually in WGS84 (Height Above Ellipsoid or HAE) but radar outputs EGM96 (Height above MSL as defined by a geoid). To convert WGS84 to EGM96, we need to take into account the lat/long position of the GPS and find the MSL from a saved map.
        %Alt = altGps;       % AO TEST 3/29/2018
        %         gpstrack.Range = sqrt(rangeTarget.^2 + (Alt).^2);
        %         gpstrack.Elevation = asind((Alt./gpstrack.Range));
        %         gpstrack.Azimuth  = azTarget;
        gpstrack.Alt = altGps;
        gpstrack.Heading = Heading;
        gpstrack.Range = range;
        gpstrack.Azimuth = Azimuth;
        gpstrack.Elevation = Elevation;
        gpstrack.VelDopp = Doppler;
        gpstrack.positionNorth = nwu(:,1)';
        gpstrack.positionWest = -nwu(:,2)';
        gpstrack.positionUp = -nwu(:,3)';
        gpstrack.velocityNorth = nwuVelocity(:,1)';
        gpstrack.velocityWest = -nwuVelocity(:,2)';
        gpstrack.velocityUp = nwuVelocity(:,3)';

        %Ryan Changes
        % if isfield(targettrack, 'datetime')
        %     gpstrack.datetime = targettrack.datetime;
        % else
        %     gpstrack.datetime = datetime(gpstrack.dateNum, 'ConvertFrom','datenum');
        % end
        %End Ryan Changes

        % % Beginning of new doppler calculation
        % [~,ins] = unique(gpstrack.elapsedTime);
        % time = min(gpstrack.elapsedTime):.1:max(gpstrack.elapsedTime);
        % range = interp1(gpstrack.elapsedTime(ins),gpstrack.Range(ins),time,'spline');
        % 
        % fftx = fft(range );
        % N = numel(range );
        % B =fir1(256,.25);
        % H = fft(B/sum(B),N);
        % delay = 256 / 2;
        % B = H .* exp(1j * 2 * pi * delay * (0:N-1) /N);
        % 
        % fftx = (B).*fftx ;
        % T = max(time)-min(time);
        % k = (2*pi/T)*[0:N/2-1, 0, -N/2+1:-1];
        % dffft = 1i*k.*fftx;
        % Doppler = abs(ifft(dffft));
        % gpstrack.VelDopp(2:end-2) = interp1(time, Doppler, gpstrack.elapsedTime(2:end-2));
        % % End of new doppler calculation

        try
            % Now loop through the radar sequences and identify when the GPS is on our FOV
            gpstrack.inFov = zeros(size(gpstrack.Alt));
            for iSeq = 1:length(radarParameters.maxTargetRangeBySeq)
                if ~contains(radarParameters.beamType{iSeq}, 'Search')
                    continue;
                end
                % Azimuth in based on the different radar faces
                inFovThisSeqAz = zeros(size(gpstrack.inFov));
                headings = mod(radarParameters.vehicleToFixture.Heading+ mean(radartrack.Yaw), 360);
                fov = NaN(2,4);
                minAz = min(radarParameters.azsteer{iSeq})-max(radarParameters.azBeamwidth)/2;
                maxAz = max(radarParameters.azsteer{iSeq})+max(radarParameters.azBeamwidth)/2;
                for iRadar = 1:length(radarParameters.enabled)
                    if radarParameters.enabled(iRadar)
                        fov(:, iRadar) = mod([headings(iRadar)+minAz, headings(iRadar)+maxAz], 360);
                        if (fov(1,iRadar) < fov(2,iRadar)) % FOV doesn't wrap across 0
                            inFovThisSeqAz = inFovThisSeqAz | (gpstrack.Azimuth >= fov(1,iRadar) & gpstrack.Azimuth <= fov(2,iRadar));
                        else % FOV wraps across zero
                            inFovThisSeqAz = inFovThisSeqAz | (gpstrack.Azimuth >= fov(1,iRadar) | gpstrack.Azimuth <= fov(2,iRadar));
                        end
                    end
                end

                inFovThisSeq = ...
                    inFovThisSeqAz & ...
                    gpstrack.Range < radarParameters.maxTargetRangeBySeq(iSeq) & ...
                    gpstrack.Range > radarParameters.ActMinRange(iSeq) & ...
                    gpstrack.Elevation < max(radarParameters.elsteer{iSeq}) + max(radarParameters.elBeamwidth) /2 & ...
                    gpstrack.Elevation > min(radarParameters.elsteer{iSeq}) - max(radarParameters.elBeamwidth) /2 & ...
                    abs(gpstrack.VelDopp) > radarParameters.minVelocity(iSeq) & ...
                    abs(gpstrack.VelDopp) < radarParameters.maxVelocity(iSeq);

                % Also need to account for the other ProcChan if it exists
                if radarParameters.numChan(iSeq) > 1
                    % Azimuth in based on the different radar faces
                    inFovThisSeqAz = zeros(size(gpstrack.inFov));
                    headings = mod(radarParameters.vehicleToFixture.Heading+ mean(radartrack.Yaw), 360);
                    fov = NaN(2,4);
                    minAz = min(radarParameters.azsteer{iSeq, 2})-max(radarParameters.azBeamwidth)/2;
                    maxAz = max(radarParameters.azsteer{iSeq, 2})+max(radarParameters.azBeamwidth)/2;
                    for iRadar = 1:length(radarParameters.enabled)
                        if radarParameters.enabled(iRadar)
                            fov(:, iRadar) = mod([headings(iRadar)+minAz, headings(iRadar)+maxAz], 360);
                            if (fov(1,iRadar) < fov(2,iRadar)) % FOV doesn't wrap across 0
                                inFovThisSeqAz = inFovThisSeqAz | (gpstrack.Azimuth >= fov(1,iRadar) & gpstrack.Azimuth <= fov(2,iRadar));
                            else % FOV wraps across zero
                                inFovThisSeqAz = inFovThisSeqAz | (gpstrack.Azimuth >= fov(1,iRadar) | gpstrack.Azimuth <= fov(2,iRadar));
                            end
                        end
                    end

                    inFovThisSeqPc2 = ...
                        inFovThisSeqAz & ...
                        gpstrack.Range < radarParameters.maxTargetRangeBySeq(iSeq, 2) & ...
                        gpstrack.Range > radarParameters.ActMinRange(iSeq, 2) & ...
                        gpstrack.Elevation < max(radarParameters.elsteer{iSeq, 2}) + max(radarParameters.elBeamwidth) /2 & ...
                        gpstrack.Elevation > min(radarParameters.elsteer{iSeq, 2}) - max(radarParameters.elBeamwidth) /2 & ...
                        abs(gpstrack.VelDopp) > radarParameters.minVelocity(iSeq, 2) & ...
                        abs(gpstrack.VelDopp) < radarParameters.maxVelocity(iSeq, 2);

                    inFovThisSeq = inFovThisSeq | inFovThisSeqPc2;
                end

                gpstrack.inFov = gpstrack.inFov | inFovThisSeq;
            end
        catch
            % This try/catch is here so the GPS track will still load if
            % something goes wrong here
            % disp("Error computing FOV");%Ryan Commented
            disp("Computing FOV failed, assigning ones for every truth");
            gpstrack.inFov = ones(size(gpstrack.Alt));
        end

        if radarParameters.externalTracks
            gpstrack.inFov = ones(size(gpstrack.Alt));
        end

    end
    %compute gradient
    %resample range to uniform grid
    %         dt = 1;
    %         dt1sec  =  dt/(24*3600);
    %         tALL = tUTC(1):dt1sec:tUTC(end);
    %         slantRange = interp1(tUTC,gpstrack.Range ,tALL,'spline');
    %         dvdt = gradient(slantRange,dt);
    %
    %         gpstrack.VelDopp = interp1(tALL,dvdt,tUTC,'spline');
    
    % Remove NaN values from key fields
%     nanIdx = isnan(gpstrack.Lat) | isnan(gpstrack.Lon) | isnan(gpstrack.Alt);
%     fns = fieldnames(gpstrack);
%     for iFn = 1:length(fns)
%         gpstrack.(fns{iFn}) = gpstrack.(fns{iFn})(~nanIdx);
%     end
    
    
    if(trimGps && ~isempty(gpstrack))
        index = (gpstrack.Range>1.5*radarParameters.maxTargetRange);
        gpstrack2 = soa2aos(gpstrack);
        gpstrack2(index) = [];
        gpstrack = aos2soa(gpstrack2);
        if(isempty(gpstrack) || numel(gpstrack.Range)<10)%Ryan Temp Comment
        % if(isempty(gpstrack) || numel(gpstrack.Range)<2)%Ryan Temp Addition
            gpstrack  = [];
        end
    else
        a = 1;
    end
end
% calculate clutter limit

a = 1;

