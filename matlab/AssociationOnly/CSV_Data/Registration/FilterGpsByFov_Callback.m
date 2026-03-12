function trackTruth_Struct = FilterGpsByFov_Callback(trackTruth_Struct)
    % Min / max range
    minRange = trackTruth_Struct.radarParameters.minRange;
    maxRange = trackTruth_Struct.radarParameters.maxTargetRange;
    % Min / Max Elevation
    minElCells = cellfun(@min, trackTruth_Struct.radarParameters.elsteer, 'UniformOutput', false);
    maxElCells = cellfun(@max, trackTruth_Struct.radarParameters.elsteer, 'UniformOutput', false);
    minEl = inf;
    maxEl = -inf;
    for iMinElCell = 1:length(minElCells)
        if ~isempty(minElCells{iMinElCell})
            minEl = min(minEl, minElCells{iMinElCell});
        end
    end
    for iMaxElCell = 1:length(maxElCells)
        if ~isempty(maxElCells{iMaxElCell})
            maxEl = max(maxEl, maxElCells{iMaxElCell});
        end
    end
    minEl = minEl - max(trackTruth_Struct.radarParameters.elBeamwidth)/2; % Need to check this works with nMHR
    maxEl = maxEl + max(trackTruth_Struct.radarParameters.elBeamwidth)/2;
    % Az width of one radar
    minAz = inf;
    maxAz = -inf;
    minAzCells = cellfun(@min, trackTruth_Struct.radarParameters.azsteer, 'UniformOutput', false);
    maxAzCells = cellfun(@max, trackTruth_Struct.radarParameters.azsteer, 'UniformOutput', false);
    for iMinAzCell = 1:length(minAzCells)
        if ~isempty(minAzCells{iMinAzCell})
            minAz = min(minAz, minAzCells{iMinAzCell});
        end
    end
    for iMaxAzCell = 1:length(maxAzCells)
        if ~isempty(maxAzCells{iMaxAzCell})
            maxAz = max(maxAz, maxAzCells{iMaxAzCell});
        end
    end
    minAz = minAz - max(trackTruth_Struct.radarParameters.azBeamwidth)/2;
    maxAz = maxAz + max(trackTruth_Struct.radarParameters.azBeamwidth)/2;
    
    % Radar Headings
    headings = mod(trackTruth_Struct.radarParameters.heading + trackTruth_Struct.radarParameters.vehicleToFixture.Heading+ trackTruth_Struct.radar.otm* mean(trackTruth_Struct.status.Yaw), 360);
    fov = NaN(2,4);
    for iRadar = 1:length(trackTruth_Struct.radarParameters.enabled)
        if trackTruth_Struct.radarParameters.enabled(iRadar)
            fov(:, iRadar) = mod([headings(iRadar)+minAz, headings(iRadar)+maxAz], 360);
        end
    end
    % Now filter GPS tracks
    tracksInFov = [];
    for iGps = 1:length(trackTruth_Struct.GpsTrack)
        gpsTrack = trackTruth_Struct.GpsTrack{iGps};
        idx = zeros(size(gpsTrack.dateNum));
        idx = idx | gpsTrack.Range < minRange;
        idx = idx | gpsTrack.Range > maxRange;
        idx = idx | gpsTrack.Elevation < minEl;
        idx = idx | gpsTrack.Elevation > maxEl;
        % Is the range with the Az FOV of any radar
        inAzFov = zeros(size(idx));
        for iRadar = 1:length(fov)
            if (fov(1,iRadar) < fov(2,iRadar)) % FOV doesn't wrap across 0
                inAzFov = inAzFov | (gpsTrack.Azimuth >= fov(1,iRadar) & gpsTrack.Azimuth <= fov(2,iRadar));
            else % FOV wraps across zero
                inAzFov = inAzFov | (gpsTrack.Azimuth >= fov(1,iRadar) | gpsTrack.Azimuth <= fov(2,iRadar));
            end
    
        end
        idx = idx | (~inAzFov);
        fns = fieldnames(gpsTrack);
        for iFns = 1:length(fns)
            %if ~iscell(gpsTrack.(fns{iFns})) && ~isdatetime(gpsTrack.(fns{iFns}))
            if ~iscell(gpsTrack.(fns{iFns}))
                gpsTrack.(fns{iFns}) = gpsTrack.(fns{iFns})(~idx);
            else
                gpsTrack.(fns{iFns}) = {gpsTrack.(fns{iFns}){~idx}};
            end
        end
        % if there were at least 10 updates in FOV, keep track
        if nnz(~idx) > 10
            trackTruth_Struct.GpsTrack{iGps} = gpsTrack;
            tracksInFov = [tracksInFov, iGps];
        end
    end
    trackTruth_Struct.GpsTrack = {trackTruth_Struct.GpsTrack{tracksInFov}};
    trackTruth_Struct.parameters.gpsTrackCount = length(trackTruth_Struct.GpsTrack);
    
    % Add the gpsTrk idx to each GpsTrack so that when the gpstrack array
    % is created there is an indication of which GpsTrack each entry is from
    for iGps = 1:length(trackTruth_Struct.GpsTrack)
        trackTruth_Struct.GpsTrack{iGps}.ID = iGps*ones(size(trackTruth_Struct.GpsTrack{iGps}.Alt));
    end
    
    % Make a GPS struct in the same format as tracks for convenience
    gpstrackAoS = [trackTruth_Struct.GpsTrack{:}];
    if ~isempty(gpstrackAoS)
        fns = fieldnames(gpstrackAoS);
        for iFn = 1:length(fns)
            gpstrack.(fns{iFn}) = [gpstrackAoS.(fns{iFn})];
        end
        trackTruth_Struct.gpstrack = gpstrack;
    end
end