function trackStruct = loadradardir_Callback(pathname)
    
    useDetections = false;

    evalin( 'base',...
        'clearvars tracks radar status detections radarParameters detectionParameters tab_*')
    
    % --- Start of Robust File Search ---
    matfolderPath = fullfile(pathname, 'matfolder');
    matFiles = dir(fullfile(matfolderPath, '*BlogData.mat'));
    
    if ~isempty(matFiles)
        % Grab the first matching .mat file found in the directory
        savefile = fullfile(matfolderPath, matFiles(1).name);
        disp(['Loading automatically found file: ', savefile]);
    else
        % Fallback to original behavior if no file is found
        disp('No matching *BlogData.mat found. Falling back to default getsavefile.');
        savefile = getsavefile(pathname, useDetections);
    end
    % --- End of Robust File Search ---

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
    
end