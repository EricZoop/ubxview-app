function [GpsTrack, gpstrack]= formGpsTrack(trackStruct, offset, trimGps)
    tracks = trackStruct.tracks;
    status = trackStruct.status;
    gpstrack = trackStruct.gpstrack;
    radarParameters = trackStruct.radarParameters;


    cnt = 1;
    unique_AA  = unique(gpstrack.trackID);
    parameters.gpsTrackCount = length(unique_AA);
    for ix=1:length(unique_AA)
        idx = gpstrack.trackID == unique_AA(ix);
        % idx = idx & valid;
        if any(idx)
            GpsTrack{cnt}.dateNum = gpstrack.dateNum(idx);
            
            %Ryan Additions
            % if isfield(gpstrack, 'datetime')
            %     GpsTrack{cnt}.datetime = gpstrack.datetime(idx);
            % end
            %End Ryan Additions

            GpsTrack{cnt}.Lat = gpstrack.Lat(idx);
            GpsTrack{cnt}.Lon = gpstrack.Lon(idx);
            GpsTrack{cnt}.Alt = gpstrack.Alt(idx);
            % GpsTrack{cnt}.x_code = gpstrack.x_code(idx);
            cnt = cnt + 1;
        end
    end
    
    % numGpsLoaded = parameters.gpsTrackCount;
    currNumGpsLoaded = 0;
    validGpsCount = currNumGpsLoaded + 1;
    % for iGps = validGpsCount:numGpsLoaded
    for iGps = 1:numel(unique_AA)
        GpsTrack{iGps}.dateNum =...
            GpsTrack{iGps}.dateNum...
            + offset / 24;
        GpsTrack{iGps}.elapsedTime =...
            (GpsTrack{iGps}.dateNum ...
            - (tracks.dateNum(1) ...
            - tracks.elapsedTime(1)/(24*3600)))*24*3600;

        %Ryan Changes
        if isfield(GpsTrack{iGps}, 'datetime')
            GpsTrack{iGps}.datetime = GpsTrack{iGps}.datetime + hours(offset);
        else
            GpsTrack{iGps}.datetime =...
                datetime(...
                GpsTrack{iGps}.dateNum,...
                'ConvertFrom', 'datenum');
        end
        %End Ryan Changes
    
        fprintf('GPS adjusted %d hours, remaining offset %f hours\n', offset,  ...
            24 * (min(tracks.dateNum) - min(GpsTrack{iGps}.dateNum)))
    
    
        if(~strcmp(trimGps,'No'))
            minTime = min(min(tracks.dateNum),min(tracks.dateNum));
            maxTime = max(max(tracks.dateNum), max(tracks.dateNum));
            bTrimGps = true;
        else
            bTrimGps = false;
            minTime = [];
            maxTime = [];
        end
        calcGps = calcgps2radar(GpsTrack{iGps},status,bTrimGps,minTime,maxTime,radarParameters);
        if isempty(calcGps)
            parameters.gpsTrackCount = parameters.gpsTrackCount - 1;
        else
            GpsTrack{validGpsCount} = calcGps;
            GpsTrack{validGpsCount}.ID = iGps*ones(size(GpsTrack{validGpsCount}.Alt));
            validGpsCount = validGpsCount+1;
            
        end

        % GpsTrack{iGps}.ID = iGps*ones(size(GpsTrack{iGps}.Alt));
                
    end

    if length(GpsTrack) > (validGpsCount-1)
        GpsTrack = GpsTrack(1:validGpsCount-1);
    end
    
    % Make a GPS struct in the same format as tracks for convenience
    gpstrack = [];
    gpstrackAoS = [GpsTrack{:}];%%%=====change back to '{:}'
    if ~isempty(gpstrackAoS)
        fns = fieldnames(gpstrackAoS);
        for iFn = 1:length(fns)
            gpstrack.(fns{iFn}) = [gpstrackAoS.(fns{iFn})];
        end
        % handles.gpstrack = gpstrack;
    end
end