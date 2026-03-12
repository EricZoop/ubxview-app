function performAssociation(dataFolder)
    
    if strcmp(dataFolder(end), '/')||strcmp(dataFolder(end), '\')
    else
        dataFolder(end+1) = '/';
    end
    %Determine .json file from given folder
    dirStruct = dir([dataFolder + "*.json"]);
    jsonPath =  fullfile(dataFolder, dirStruct(1).name);

    fprintf('Loading JSON File: %s \n', jsonPath)
    jsonData = readstruct(jsonPath);
    fprintf('Finished Loading JSON \n')
    
    %Obtain relevant parameters for registrations
    trackTruthStruct.radar = populateRadar_JSON(jsonData);
    trackTruthStruct.radarParameters = populateRadarParameters_JSON(trackTruthStruct.radar, jsonData);
    trackTruthStruct.parameters.pathname = dataFolder;

    %Performing datetime() on the whole array is more efficient than in the loop
    dateTimestamps = datetime([jsonData.points(:).timestamp_milli]./1e3, 'ConvertFrom', 'epochtime', 'Format', 'dd-MMM-yyyy HH:mm:ss.SSS');
    dateTimestamps = datetime(datenum(dateTimestamps),'ConvertFrom', 'datenum');%Doing datetime on datenum resets any input format discrepancies, may be redundant if fixed in json

    %Parse and organize tracks and truth values
    trackCount = 0;
    truthIdx = zeros(1,length(datetime));
    trackTruthStruct.trackInfo.pathname = jsonPath;
    trackTruthStruct.tracks = struct;
    truthCount = 0;
    trackIdx = zeros(1,length(datetime));
    trackTruthStruct.gpstrack = struct;
    for idx = 1:length(jsonData.points)
        if isfield(jsonData.points(idx).source, 'Truth')
            truthCount = truthCount + 1;
            truthIdx(truthCount) = idx;
        elseif isfield(jsonData.points(idx).source, 'Radar')
            trackCount = trackCount + 1;
            trackIdx(trackCount) = idx;
        end
    end
    truthIdx(truthIdx==0) = [];
    trackIdx(trackIdx==0) = [];


    %Populate the truthStruct
    truthLocation = [jsonData.points(truthIdx).location];
    truthConf = [jsonData.points(truthIdx).source];
    truthConf = [truthConf(:).Truth];
    trackTruthStruct.gpstrack.datetime = dateTimestamps(truthIdx);
    trackTruthStruct.gpstrack.dateNum = datenum(trackTruthStruct.gpstrack.datetime);
    trackTruthStruct.gpstrack.trackID = [jsonData.points(truthIdx).track_id];
    trackTruthStruct.gpstrack.x_code = cellstr(["X" + string([trackTruthStruct.gpstrack(:).trackID])]);
    trackTruthStruct.gpstrack.Lat = [truthLocation(:).latitude]*(180/pi);
    trackTruthStruct.gpstrack.Lon = [truthLocation(:).longitude]*(180/pi);
    trackTruthStruct.gpstrack.Alt = [truthLocation(:).altitude];
    trackTruthStruct.gpstrack.registrationID = [jsonData.points(truthIdx).registration_id];
    trackTruthStruct.gpstrack.validTrack = [truthConf(:).confidence] > 0;
    trackTruthStruct.parameters.gpsTrackCount = length(unique(trackTruthStruct.gpstrack.trackID));

    %Organize the radar's status
    trackTruthStruct.status = struct;
    % trackTruthStruct.status.datetime = linspace(min(dateTimestamps),max(dateTimestamps),numel(jsonData.ins_data));%Ryan hotfix: basing the ins values on tracks until they're correct in the json
    trackTruthStruct.status.datetime = datetime([jsonData.ins_data(:).timestamp_milli]./1e3, 'ConvertFrom', 'epochtime', 'Format', 'dd-MMM-yyyy HH:mm:ss.SSS');
    trackTruthStruct.status.dateNum = datenum(trackTruthStruct.status.datetime);
    insPos = [jsonData.ins_data(:).position];
    insHpr = [jsonData.ins_data(:).hpr];
    trackTruthStruct.status.Alt = [insPos(:).altitude];
    trackTruthStruct.status.Lat = [insPos(:).latitude]*(180/pi);
    trackTruthStruct.status.Lon = [insPos(:).longitude]*(180/pi);
    trackTruthStruct.status.Yaw = [insHpr(:).heading]*(180/pi);
    trackTruthStruct.status.Roll = [insHpr(:).roll]*(180/pi);
    trackTruthStruct.status.Pitch = [insHpr(:).pitch]*(180/pi);

    %Sort entries by timestamp
    trackTruthStruct.gpstrack = sortStruct_ByTime(trackTruthStruct.gpstrack);
    trackTruthStruct.status = sortStruct_ByTime(trackTruthStruct.status);

    %Trim .status field by duplicated time entries
    trimIdx = [false, [diff(trackTruthStruct.status.dateNum) == 0]]';
    trackTruthStruct.status.datetime(trimIdx) = [];
    trackTruthStruct.status.dateNum(trimIdx) = [];
    trackTruthStruct.status.Alt(trimIdx) = [];
    trackTruthStruct.status.Lat(trimIdx) = [];
    trackTruthStruct.status.Lon(trimIdx) = [];
    trackTruthStruct.status.Yaw(trimIdx) = [];
    trackTruthStruct.status.Roll(trimIdx) = [];
    trackTruthStruct.status.Pitch(trimIdx) = [];

    %Populate the .tracks structure
    trackTruthStruct.tracks = populateTracks_JSON(jsonData, trackIdx, dateTimestamps, trackTruthStruct.radar);
    trackTruthStruct.tracks = sortStruct_ByTime(trackTruthStruct.tracks);
    trackTruthStruct.tracks.elapsedTime = trackTruthStruct.tracks.dateNum - trackTruthStruct.tracks.dateNum(1);

    %Filter tracks by last association
    lastAssoc_Filter = trackTruthStruct.tracks.lastAssocTgt_range == 0;
    trackFieldnames = fieldnames(trackTruthStruct.tracks);
    for iFn = 1:length(trackFieldnames)
        trackTruthStruct.tracks.(trackFieldnames{iFn})(lastAssoc_Filter) = [];
    end

    %Producing "GpsTrack" cell array
    offset =  min(trackTruthStruct.tracks.dateNum) - min(trackTruthStruct.gpstrack.dateNum);
    offset = round(offset * 24);
    trimGps = 'Yes';
    [trackTruthStruct.GpsTrack, trackTruthStruct.gpstrack]= formGpsTrack(trackTruthStruct, offset, trimGps);
    
    if ~isfield(trackTruthStruct.gpstrack, 'Heading')
        error('Error: Missing fields of interpolated truth data; Registration will fail. Poor matchup of truth to radar tracks. Check time indices')
    end
    
    %Perform Registration
    trackTruthStruct.angleSpacing = 20;%Hardcoded from radarDisplay
    trackTruthStruct.rangeSpacing = [];%Hardcoded from radarDisplay
    calibratemeplease_Callback(trackTruthStruct);%No output arguments, it will make a table upon completion without errors
    
    
    %Print out .csv path 
    % dirStruct2 = dir([dataFolder + "*.csv"]);
    % csvPath =  fullfile(dataFolder, dirStruct2(1).name);
    % fprintf('Created csv File: %s \n', csvPath)

end