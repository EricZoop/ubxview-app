function trackStruct = loadradardir_Callback(pathname)
    
    useDetections = false;

    evalin( 'base',...
        'clearvars tracks radar status detections radarParameters detectionParameters tab_*')
    savefile = getsavefile(pathname, useDetections);

    [tracks,radar,status,detections,radarParameters,detectionParameters] = load_blogmatfile2(savefile);
    
    if(isempty(tracks))
        tracks = detections;
    end

    if isfield(tracks, 'dateNum')
        radardisplay.Name = sprintf('Loaded Directory: %s TIME %s',...
            pathname,datestr(min(tracks.dateNum)));
        tracks.loadId = ones(size(tracks.Lat));
        % If you select Y loadId this allows the T button to show where associated
        % detections are without Y changes to make it harder to see missed
        % association. Doesn't work with load additional track data.
        tracks.lastAssocTgt_loadId = tracks.loadId;
        tracks.lastAssocTgt_loadId(isnan(tracks.lastAssocTgt_alt)) = nan;
    else
        radardisplay.Name = sprintf('Loaded Directory: %s',...
            pathname);
    end
    
    if isfield(status, 'Lat')
        index = find(isnan(status.Lat)|isinf(status.Lat));
        f_status = fieldnames(status);
        for i = 1:length(f_status)
            status.(f_status{i})(index) = [];
            [~,ia] = unique(status.dateNum);
            status.(f_status{i}) = status.(f_status{i})(ia);
        end
    end

    try
        % handles.guiData.trackInfo = getTrackInfo(tracks,handles);
        trackInfo = getTrackInfo(tracks);
    catch ME
        % handles.guiData.trackInfo = [];
        trackInfo = [];
    end
    trackStruct.radarParameters = radarParameters;
    trackStruct.radar = radar;
    trackStruct.trackInfo = trackInfo;
    trackStruct.trackInfo.pathname = pathname;
    % trackStruct.tracks = tracks;
    trackStruct.detections = detections;
    trackStruct.detectionParameters = detectionParameters;
    trackStruct.status = status;
    
    % ext = {'*.csv','*.gpx','*.log','*.pos'};
    % list = [];
    % n = 1;
    % while isempty(list) && n <= numel(ext)
    %     list = dir(strcat(pathname, ['\',ext{n}]));
    %     n = n + 1;
    % end
    % list = list(~contains({list.name}, 'Exp_Comm')&~contains({list.name}, 'assoc'));
    % 
    % if numel(list) == 1
    %     keyboard
    %     % handles.parameters.gpsreader = findGPSLoader(list.name);
    %     gpsreader = findGPSLoader(list.name);
    % 
    %     % if isempty(handles.parameters.gpsreader)
    %     if isempty(gpsreader)
    %         fprintf('gps file ignored, no reader for %s\n', list.name);
    %     else
    %         handles = gpsload(handles, false, pathname, list.name);
    % 
    %         % Add the gpsTrk idx to each GpsTrack so that when the gpstrack array
    %         % is created there is an indication of which GpsTrack each entry is from
    %         if length(handles.GpsTrack) > handles.parameters.gpsTrackCount
    %             handles.GpsTrack = handles.GpsTrack(1:handles.parameters.gpsTrackCount);
    %         end
    % 
    %         % Add the gpsTrk idx to each GpsTrack so that when the gpstrack array
    %         % is created there is an indication of which GpsTrack each entry is from
    %         for iGps = 1:length(handles.GpsTrack)
    %             handles.GpsTrack{iGps}.ID = iGps*ones(size(handles.GpsTrack{iGps}.Alt));
    %         end
    % 
    %         % Make a GPS struct in the same format as tracks for convenience
    %         gpstrackAoS = [handles.GpsTrack{:}];
    %         if ~isempty(gpstrackAoS)
    %             fns = fieldnames(gpstrackAoS);
    %             for iFn = 1:length(fns)
    %                 gpstrack.(fns{iFn}) = [gpstrackAoS.(fns{iFn})];
    %             end
    %             handles.gpstrack = gpstrack;
    %         end
    %     end
    % end
    
end