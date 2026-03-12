function [tracks,radar,status,detections,radarParameters,detectionParameters] = loadtracksstatusanddetections(path,loadDetections,tOffset,varargin)
%LOADTARCKSSTATUSANDDETCTIONS
%Function loads radar blog data into structure
%Optional arguments (varargin):
%   "noprogressbar" : prevents progress bar from popping up
%
% Last Edit:
% [SYS-110] Ray Goulet 2023-07-26
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% Allow old true/false loadDetections or new 0 = don't load detections,
% 1 = load, 2 = load INS data only.
% loadDetections = 2;
tic
if islogical(loadDetections)
    if loadDetections
        loadDetections = 1;
    else
        loadDetections = 0;
    end
end
progressBarOn = true;
warningsOn = true;
if ~isempty(varargin)
    if any(contains(varargin,'noprogressbar'))
        progressBarOn = false;
    end
    if any(contains(varargin,'nowarnings'))
        warningsOn = false;
    end
    if any(contains(varargin, 'headless'))
        headless = true;
        progressBarOn = false;
        warningsOn = false;
        varargin{end + 1} = 'noprogressbar';
        varargin{end + 1} = 'nowarnings';
    end
end
if(~exist('tOffset'))
    tOffset = 0;
end
% % Check path and add radar_analysis_tool funtions to path
% if ~contains(path, strcat(filesep, 'coverageMap'))
%     % Adds radar_analysis_tools subdirectories to the path
%     addpath(fileparts(mfilename('fullpath')))
%     addpath2(fileparts(mfilename('fullpath')))
% end

% Read emlswid to get test field information.
filename = fullfile(path,'emlswid.txt');
try
    filetext = fileread(filename);
    emlswid.testpoints = regexp(filetext,'(Testing Parameters[^\r\n]*:|[^\r\n ]*Test \d\d:[^\r\n]*)','match');
    modeOnly = false;
catch
    beep
    fprintf('**********************************************************\n')
    warning('Unable to open file %s',  filename);
    fprintf('**********************************************************\n')
    tracks = struct([]);
    detections = struct([]);
    detectionParameters = struct([]);
    filename = fullfile(path, "ProcParams.xml");
    if isfile(filename)
        radar = struct();
        status = struct();
        modeOnly = true;
    else
        radar  = struct([]);
        status  = struct([]);
        radarParameters  = struct([]);
        return;
    end
end
if ~modeOnly
    [~,~,translateNames] = labelmaster(emlswid);
    %allDetections = [];
    detections= [];
    entryCount = [];
    detectionParameters =[];
end
if(loadDetections)
    updateRate = 1;
else
    updateRate = 5;
end
if(exist('path','var'))
    % get name of mode if the file is in the path
    dir_mode = dir(strcat(path, filesep, '*.mode'));
    if ~isempty(dir_mode) && length(dir_mode) == 1
        radar.modeFile = dir_mode.name;
        modeParts = split(radar.modeFile, '-');
        offset_mode = 0;
        if contains(radar.modeFile, "dualmode")
            offset_mode = offset_mode + 1;
        end
        if endsWith(radar.modeFile, "GEN3-WIN10.mode")
            radar.swVersion =...
                strcat(modeParts{end-3-offset_mode}(2:end),'-',...
                modeParts{end-2-offset_mode}(1:end));
        elseif endsWith(radar.modeFile, "GEN6-WIN10.mode")
            radar.swVersion =...
                strcat(modeParts{end-3-offset_mode}(2:end),'-',...
                modeParts{end-2-offset_mode}(1:end));
        else
            try
                radar.swVersion =...
                    strcat(modeParts{end-1- offset_mode}(2:end), '-',...
                    modeParts{end-offset_mode}(1:end-5*double(~offset_mode)));
            catch
                radar.swVersion = 'UnKnown';
            end
        end
    else
        warning('Unable to find mode file in %s\n', path)
        radar.modeFile = 'Unknown';
        radar.swVersion = 'Unknown';
    end
    fprintf('Radar Software Version: %s\n', radar.swVersion)
    fprintf('Mode File: %s\n', radar.modeFile)
    %log config file
    filename = fullfile(path,'GenConfig.xml');%sprintf('%s/GenConfig.xml',cvsdirname);
    A= xml2struct(filename);
    %read radar position and attitude data
    radar.lat = str2double(A.Config.LocationAndAttitude.GeodLocation.Latitude.Text);
    if(radar.lat==0)
        radar.otm = true;
    else
        radar.otm = false;
        radar.lat = str2double(A.Config.LocationAndAttitude.GeodLocation.Latitude.Text);
        radar.long = str2double(A.Config.LocationAndAttitude.GeodLocation.Longitude.Text);
        radar.altitude = str2double(A.Config.LocationAndAttitude.GeodLocation.Altitude.Text);
        radar.heading = str2double(A.Config.LocationAndAttitude.LllnToVehicle.Heading.Text);
        radar.roll = str2double(A.Config.LocationAndAttitude.LllnToVehicle.Roll.Text);
        radar.pitch =str2double(A.Config.LocationAndAttitude.LllnToVehicle.Pitch.Text);
    end
    %read radar position and attitude data

    try
        filename = fullfile(path,'UserConfig.xml');%sprintf('%s/GenConfig.xml',cvsdirname);
        B = xml2struct(filename);
        radar.Fc=.001* str2double(B.Config.General.CarrierFrequency.Text);
    catch
        radar.Fc=3349;
        B = struct([]);
    end
    try
        ProcConf = xml2struct(fullfile(path, 'ProcConfig.xml'));
        pcFields = fieldnames(ProcConf.Config);
        for i_pc = 1:length(pcFields)
            pcFn = pcFields{i_pc};
            if ~strcmp(pcFn, 'Attributes') && ~strcmp(pcFn, 'AssocBatchToTracker')
                
                % if a section only has a single entry the {} indexing
                % scheme won't work
                if length(ProcConf.Config.(pcFn).ConfigParams.Param) == 1
                    if ~isnan(str2double(ProcConf.Config.(pcFn).ConfigParams.Param.Attributes.Value))
                        radar.ProcConf.(pcFn).(matlab.lang.makeValidName(ProcConf.Config.(pcFn).ConfigParams.Param.Attributes.Name)) = ...
                            str2double(ProcConf.Config.(pcFn).ConfigParams.Param.Attributes.Value);
                    else
                        radar.ProcConf.(pcFn).(matlab.lang.makeValidName(ProcConf.Config.(pcFn).ConfigParams.Param.Attributes.Name)) = ...
                            ProcConf.Config.(pcFn).ConfigParams.Param.Attributes.Value;
                    end
                else
                    for j_pc = 1:length(ProcConf.Config.(pcFn).ConfigParams.Param)
                        if ~isnan(str2double(ProcConf.Config.(pcFn).ConfigParams.Param{j_pc}.Attributes.Value))
                            radar.ProcConf.(pcFn).(matlab.lang.makeValidName(ProcConf.Config.(pcFn).ConfigParams.Param{j_pc}.Attributes.Name)) = ...
                                str2double(ProcConf.Config.(pcFn).ConfigParams.Param{j_pc}.Attributes.Value);
                        else
                            radar.ProcConf.(pcFn).(matlab.lang.makeValidName(ProcConf.Config.(pcFn).ConfigParams.Param{j_pc}.Attributes.Name)) = ...
                                ProcConf.Config.(pcFn).ConfigParams.Param{j_pc}.Attributes.Value;
                        end
                    end
                end
            end
        end
    catch
        warning('Error reading %s', fullfile(path, 'ProcConfig.xml'))
        radar.ProcConf.error = true;
    end

    if(radar.lat==0)
        radar.otm = true;
    else
        radar.otm = false;
    end
    %radar.Fc =
    % face rotation relative to platform %
    try
        for ii = 1:numel(A.Config.LocationAndAttitude.Radar)
            radar.vehicleToFixture.Roll(ii)     = str2double(A.Config.LocationAndAttitude.Radar{ii}.VehicleToFixture.Roll.Text);
            radar.vehicleToFixture.Pitch(ii)    = str2double(A.Config.LocationAndAttitude.Radar{ii}.VehicleToFixture.Pitch.Text);
            radar.vehicleToFixture.Heading(ii)  = str2double(A.Config.LocationAndAttitude.Radar{ii}.VehicleToFixture.Heading.Text);
            radar.FixtureCoords.VecX(ii)        = str2double(A.Config.LocationAndAttitude.Radar{ii}.FixtureCoords.VecX.Text);
            radar.FixtureCoords.VecY(ii)        = str2double(A.Config.LocationAndAttitude.Radar{ii}.FixtureCoords.VecY.Text);
            radar.FixtureCoords.VecZ(ii)        = str2double(A.Config.LocationAndAttitude.Radar{ii}.FixtureCoords.VecZ.Text);
            radar.FixtureToBody.Roll(ii)        = str2double(A.Config.LocationAndAttitude.Radar{ii}.FixtureToBody.Roll.Text);
            radar.FixtureToBody.Pitch(ii)       = str2double(A.Config.LocationAndAttitude.Radar{ii}.FixtureToBody.Pitch.Text);
            radar.FixtureToBody.Heading(ii)     = str2double(A.Config.LocationAndAttitude.Radar{ii}.FixtureToBody.Heading.Text);
            radar.BodyCoords.VecX(ii)           = str2double(A.Config.LocationAndAttitude.Radar{ii}.BodyCoords.VecX.Text);
            radar.BodyCoords.VecY(ii)           = str2double(A.Config.LocationAndAttitude.Radar{ii}.BodyCoords.VecY.Text);
            radar.BodyCoords.VecZ(ii)           = str2double(A.Config.LocationAndAttitude.Radar{ii}.BodyCoords.VecZ.Text);

            radar.enabled(ii) = str2double(A.Config.LocationAndAttitude.Radar{ii}.Enabled.Text);

        end
    catch
        %faceRollOnPlatform
        try
            radar.vehicleToFixture.Roll = str2double(A.Config.LocationAndAttitude.Radar.FixtureToBody.Roll.Text);
            radar.vehicleToFixture.Pitch = str2double(A.Config.LocationAndAttitude.Radar.FixtureToBody.Pitch.Text);
            radar.vehicleToFixture.Heading = str2double(A.Config.LocationAndAttitude.Radar.VehicleToFixture.Heading.Text);
        catch
            radar.vehicleToFixture.Roll = str2double(A.Config.LocationAndAttitude.FixtureToBody.Roll.Text);
            radar.vehicleToFixture.Pitch = str2double(A.Config.LocationAndAttitude.FixtureToBody.Pitch.Text);
            radar.vehicleToFixture.Heading = str2double(A.Config.LocationAndAttitude.VehicleToFixture.Heading.Text);
        end
    end
    radar.faceLocationOnPlatform = [0, 0, 0];
    radar.UseEllipsoidAlt = str2double(A.Config.General.GPS.UseEllipsoidAltitude.Text);
    try
        radar.C2Interface = A.Config.General.C2Interfaces.C2Interface.Text;
    catch
        radar.C2Interface = 'Native';
        disp('No C2 Interface specified in GenConfig.')
    end
    radar.PlatformName = A.Config.General.PlatformName.Text;
    temp_confs = fieldnames(A.Config.General.SensorsConfig);
    for i_sen = 1:length(temp_confs)
        temp_conf = temp_confs{i_sen};

        fprintf('%s\n', temp_conf);

        % SensorConfig has new sections that are multi-field structs.
        % check for them and handle field by field

        if isstruct(A.Config.General.SensorsConfig.(temp_conf))
            if length(fieldnames(A.Config.General.SensorsConfig.(temp_conf))) == 1 ...
                    && isfield(A.Config.General.SensorsConfig.(temp_conf), 'Text')
                radar.SensorsConfig.(temp_conf) = A.Config.General.SensorsConfig.(temp_conf).Text;
            else
                subfieldNames = fieldnames(A.Config.General.SensorsConfig.(temp_conf));
                for j_sen = 1:length(subfieldNames)
                    temp_conf_j = subfieldNames{j_sen};
                    if isstruct(A.Config.General.SensorsConfig.(temp_conf).(temp_conf_j))
                        if(isfield(A.Config.General.SensorsConfig.(temp_conf).(temp_conf_j),'Text'))
                            radar.SensorsConfig.(temp_conf).(temp_conf_j) = A.Config.General.SensorsConfig.(temp_conf).(temp_conf_j).Text;
                        else
                            subsubfieldNames = fieldnames(A.Config.General.SensorsConfig.(temp_conf).(temp_conf_j));
                            for k_sen = 1:length(subsubfieldNames)
                                temp_conf_k = subsubfieldNames{k_sen};
                                if(isfield(A.Config.General.SensorsConfig.(temp_conf).(temp_conf_j).(temp_conf_k),'Text'))
                                    radar.SensorsConfig.(temp_conf).(temp_conf_j).(temp_conf_k) = A.Config.General.SensorsConfig.(temp_conf).(temp_conf_j).(temp_conf_k).Text;
                                end
                            end
                        end
                    end

                end
            end
        end



    end

    %% 6.4 New Values
    % if ~isempty(B)
    %     if isfield(B.Config, 'DarkSectors')
    %         radar.DarkSectors.Enabled = ...
    %             str2double(B.Config.DarkSectors.Enabled.Text);
    %         if radar.DarkSectors.Enabled
    %             radar.DarkSectors.DarkSector =...
    %                 cell(length(B.Config.DarkSectors.DarkSector), 1);
    %             for i_ds = 1:length(B.Config.DarkSectors.DarkSector)
    %                 temp_ds =...
    %                     [str2double(B.Config.DarkSectors.DarkSector{i_ds}.Attributes.Start), ...
    %                     str2double(B.Config.DarkSectors.DarkSector{i_ds}.Attributes.End)];
    %                 if temp_ds(1) == 0 && temp_ds(2) == 0 && i_ds > 1
    %                     continue
    %                 end
    %                 radar.DarkSectors.DarkSector{i_ds} = temp_ds;
    %             end
    %             % Clear Empty Sectors
    %             radar.DarkSectors.DarkSector = radar.DarkSectors.DarkSector...
    %                 (~cellfun('isempty',radar.DarkSectors.DarkSector));
    %         else
    %             radar.DarkSectors.DarkSector = {'N/A'};
    %         end
    %     end
    % end
end
radarParameters = radar;
if ~modeOnly
    radarParameters.testpoints = emlswid.testpoints;
end
radarParameters.Fs = 80E6;
try
    [radarParameters] = parseparametersmultisequence(radarParameters,path,varargin{:});
catch ex
    fprintf('*********Error Parsing parameters file in path %s**********\n',path);
    rethrow(ex)
end
if ~modeOnly
    filename = fullfile(path,'emlswid.txt');%sprintf('%s/GenConfig.xml',cvsdirname);d
    if(loadDetections ~= 0)
        [fields] = reademlswid(filename);
    else
        fields = {};
    end
    Ac = dir(sprintf('%s/*.blog',path));
    % File number is only 3 digits so files will load in wrong order if >= 1000
    % Resort numerically
    names = string({Ac.name});
    names = string(regexp(names, 'Comm_(\d*)_','tokens'));
    [~, order] = sort(double(names));
    Ac = Ac(order);

    %status = [];
    tracks= {};

    %updateCount = 1;
    %trackFileCount = 1;
    allParameters = {};
    %maxAllParameterSize = 1000*length(Ac);
    %curParameterIdx = 1;
    statusCell = {};
    allDetectionsTemp = {};
    isNmhr = strcmpi(radarParameters.radar,'nmhr');
    M = 0;
    try
        curPool = gcp('nocreate');
    catch
        curPool = [];
    end
    if ~isempty(curPool)&&~isempty(Ac)
        M = curPool.NumWorkers;
        ppm = ParforProgressbar(length(Ac));
        wb = [];
    else
        wb= waitbar(100, 'Loading .blog files');
        ppm = [];
    end
    numBlogs = length(Ac);
    parfor (jj = 1:numBlogs, M)
    %for jj = 1:length(Ac)
        %loop over multiple csv files in directory

        fname = fullfile(path,Ac(jj).name);
        x = split(fname,'\');
        y = split(x{end},'_');
        fileNumber =  str2double(y{2});

        try
            tanda =blogTracksAndStatus(fname );
        catch
            fprintf('ERROR LOADING FILE:%s fname\n',fname);
            continue;
        end
        if(loadDetections ~= 0)
            if(isNmhr)
                [detections,parameters ] = parsedetections_nmhr(fname,fields,loadDetections);
            else
                %tic;
                %disp(fname);
                [detections,parameters ] = parseDetectionsInCpp(fname,fields,loadDetections);
                %[detections,parameters ] = parsedetections(fname,fields,loadDetections);
                %toc;
                doBoth = 0;
                if doBoth
                    [detections1,parameters1 ] = parsedetections(fname,fields,loadDetections);
                    if ~isequaln(detections1, detections)
                        diffFound = 0;
                        fns = fieldnames(detections1(1));
                        for iDet = 1:length(detections1)
                            for iFn = 1:length(fns)
                                if ~isequal(detections1(iDet).(fns{iFn}), detections(iDet).(fns{iFn}))
                                    try
                                        doPrint = abs(detections1(iDet).(fns{iFn})-detections(iDet).(fns{iFn}))>(128*eps);
                                    catch
                                        doPrint = 1;
                                    end
                                    if doPrint
                                        fprintf("Detections not equal at at least fn: %s, det: %i\n ", fns{iFn}, iDet);
                                        diffFound = 1;
                                    end
                                end
                            end
                        end
                        if diffFound
                            disp("Detections Not Equal");
                        end
                    end
                    if ~isequaln(parameters1, parameters)
                        diffFound = 0;
                        fns = fieldnames(parameters(1));
                        for iDet = 1:length(parameters1)
                            for iFn = 1:length(fns)
                                if ~isequal(parameters1(iDet).(fns{iFn}), parameters(iDet).(fns{iFn}))
                                    try
                                        doPrint = abs(parameters1(iDet).(fns{iFn})-parameters(iDet).(fns{iFn}))>(128*eps);
                                    catch
                                        doPrint = 1;
                                    end
                                    if doPrint
                                        fprintf("Detections not equal at at least fn: %s, det: %i\n ", fns{iFn}, iDet);
                                        diffFound = 1;
                                    end
                                end
                            end
                        end
                        if diffFound
                            disp("Parameters Not Equal");
                        end
                    end
                end
            end

            a = 1;
            %catch
            %    break;
            %end
            tempDetections = aos2soa(detections);
            allDetectionsTemp{jj} = tempDetections;
            allParameters{jj} = parameters;
            % if(isempty(allDetections))
            %     allDetections =aos2soa(detections);
            %     if isempty(allParameters)
            %         fns = fieldnames(parameters(end));
            %         for iFn = 1:length(fns)
            %             allParameters(maxAllParameterSize).(fns{iFn}) = parameters(end).(fns{iFn});
            %         end
            %     end
            %     allParameters(curParameterIdx:curParameterIdx+length(parameters)-1) = parameters;
            %     curParameterIdx = curParameterIdx + length(parameters);
            % else
            %     try
            %         tempDetections =aos2soa(detections);
            %         f = fieldnames(detections);
            %         f = unique(f);
            %         for k=1:numel(f)
            %             if(~isempty(tempDetections.(f{k})))
            %                 if(strcmp(f{k},'carrier_freq'))
            %                     a = 1;
            %                 end
            %                 allDetections.(f{k}) = [allDetections.(f{k}) tempDetections.(f{k})];
            %             end
            %         end
            %     catch
            %         disp('wrong');
            %     end
            %     if isempty(allParameters)
            %         fns = fieldnames(parameters(end));
            %         for iFn = 1:length(fns)
            %             allParameters(maxAllParameterSize).(fns{iFn}) = parameters(end).(fns{iFn});
            %         end
            %     end
            % TODO: When there is an error above, this code breaks due to
            % assignment of unlike types
            %allParameters(curParameterIdx:curParameterIdx+length(parameters)-1) = parameters;
            %curParameterIdx = curParameterIdx + length(parameters);
        end
        dt = tanda.trackInfo;
        dStatus = tanda.statusInfo;
        if(size(dStatus.loc_lat,2)~=0)
            dStatus= soa2aos(dStatus);
        else
            if warningsOn
                fprintf('Bad status file %s\n',fname);
            end
            dStatus.headerTimeTag = 0;
            dStatus.loc_lat = nan;
            dStatus.loc_lon= nan;
            dStatus.loc_alt= nan;
            dStatus.att_heading= nan;
            dStatus.att_pitch= nan;
            dStatus.att_roll= nan;
        end

        dt.dateNum  = datenum(dt.dateTime_year,  dt.dateTime_month,  dt.dateTime_day, dt. dateTime_hour, dt.dateTime_min, dt.dateTime_sec);
        dt.dateNum  = dt.dateNum  +(dt.dateTime_msec/1000)/(24*3600);
        % dt.dateNum = dt.dateNum + 5/24;    % Add/subtract 5 hours from second set of data
        dt.dateNum = dt.dateNum + tOffset/24;


        % Discard entries where time goes excessivly backward. Had some bad data from eCHR
        if numel(dt.dateNum) > 0
            bad = (dt.dateNum - dt.dateNum(1)) < -5e-8;
            if sum(bad) ~= 0
                fprintf('Discarding %d bad track entries blog %d\n', sum(bad), jj);
            end
            fns = fieldnames(dt);
            for iFld = 1:length(fns)
                field = fns{iFld};
                dt.(field)(bad) = [];
            end
        end
        dt.highPriTrack= bitand(dt.flags,2^(12))>0;
        radartrack = [];
        if(size(dt.track_lat,2)~=0)
            for fn = 1:size(translateNames,1)
                try
                    if(~strcmp(translateNames{fn,2},'dateNum')&& ...
                            ~strcmp(translateNames{fn,2},'trackTtUs') && ...
                            ~strcmp(translateNames{fn,2},'flags'))
                        radartrack.(translateNames{fn,1}) = translateNames{fn,3}*single(dt.(translateNames{fn,2}));
                    else
                        radartrack.(translateNames{fn,1}) = translateNames{fn,3}*(dt.(translateNames{fn,2}));
                    end
                catch
                    warning('Could not translate track parameter: %s', translateNames{fn,1})
                end
            end
            radartrack.fileNumber = ones(size(radartrack.Azimuth)).*fileNumber;
            radartrack.Speed = sqrt(dt.track_velNo.^2+dt.track_velWe.^2+dt.track_velUp.^2);
            radartrack.Azimuth(radartrack.Azimuth<0) = radartrack.Azimuth(radartrack.Azimuth<0)+360;

            radartrack.Azimuth(radartrack.Azimuth>360) =radartrack.Azimuth(radartrack.Azimuth>360)-360;
            radartrack.Heading = atan2d(dt.track_velWe,dt.track_velNo);
            %Make dB version of field
            radartrack.TgtRCSActdB = 10*log10(radartrack.TgtRCSAct);
            radartrack.aspect =  atan2d(-dt.track_velWe,dt.track_velNo);
            radartrack.aspect(radartrack.aspect<0) = radartrack.aspect(radartrack.aspect<0)  + 360;
            radartrack.aspect(radartrack.aspect>360) = radartrack.aspect(radartrack.aspect>360)  - 360;
            radartrack.lastAssocTgt_alt = radartrack.lastAssocTgt_range.*sind(radartrack.lastAssocTgt_el);
            index = find(radartrack.lastAssocTgt_range==0);
            radartrack.lastAssocTgt_range(index) = nan;
            radartrack.lastAssocTgt_rangeStd(index) = nan;
            radartrack.lastAssocTgt_dopplerVel(index) = nan;
            radartrack.lastAssocTgt_dopplerVelStd(index)=nan;
            radartrack.lastAssocTgt_az(index) = nan;
            radartrack.lastAssocTgt_azStd(index) = nan;
            radartrack.lastAssocTgt_el (index)= nan;
            radartrack.lastAssocTgt_elStd(index)=nan;
            radartrack.lastAssocTgt_snrDb(index)= nan;
            radartrack.lastAssocTgt_rcs(index) = nan;
            radartrack.lastAssocTgt_radar(index) = nan;
            radartrack.lastAssocTgt_noise(index) = nan;
            radartrack.lastAssocTgt_power(index) = nan;
            indexRadar = find(~isnan(radartrack.lastAssocTgt_radar));
            radartrack.lastAssocTgt_radar(indexRadar) = 1+double(bitshift(bitand(uint32(radartrack.lastAssocTgt_radar(indexRadar)),uint32(sum(2.^(7:8)))),-7));
            % Make dB version of field
            radartrack.lastAssocTgt_rcs_dB = 10*log10(radartrack.lastAssocTgt_rcs);
            radartrack.lastAssocTgt_rcs_dB(index) = nan;
            radartrack.lastAssocTgt_alt(index) = nan;
            tracks{jj}= radartrack;
            entryCount( jj) = numel(radartrack.Range);
            %trackFileCount = trackFileCount+1;
        end
        statusCell{jj} = dStatus;
        % if(~isempty(status))
        %     status= [status dStatus];
        % else
        %     status=  dStatus;
        % end
        % if length(Ac)>updateRate&&updateCount >updateRate
        %     updateCount = 0;
        %
        %     if progressBarOn
        %         progressbar(jj/length(Ac))
        %     end
        % end

        %updateCount = updateCount + 1;
        if (M > 0)
            ppm.increment();
        else
            waitbar(jj/numBlogs, wb);
        end
    end
    if (M > 0)
        delete(ppm);
    else
        close(wb);
    end

    if isempty([allDetectionsTemp{:}]) && loadDetections ~= 0
        loadDetections = 0;
    end

    % Load msgs captured from external srcs
    Ac = dir(sprintf('%s/*.bin',path));
    if ~isempty(Ac) && numBlogs==0
        externalTracks = true;
    else
        externalTracks = false;
    end
    if externalTracks
        for jj = 1:length(Ac)

            fname = fullfile(path,Ac(jj).name);
            x(jj) = externalTracksAndStatus(fname);
            trackInfo = x(jj).trackInfo;
            statusMrs = x(jj).statusMrs;

            % Make status from what's available

            radar.lat = 180/pi*median(statusMrs.latitude);
            radar.long = 180/pi*median(statusMrs.longitude);
            radar.altitude = median(statusMrs.altitude);

            dStatus = [];
            dStatus.headerTimeTag = statusMrs.headerTimeTag/1e3; % us -> sec
            dStatus.loc_lat = statusMrs.latitude;
            dStatus.loc_lon= statusMrs.longitude;
            dStatus.loc_alt= statusMrs.altitude;
            dStatus.att_heading= statusMrs.heading;
            dStatus.att_pitch= statusMrs.pitch;
            dStatus.att_roll= statusMrs.roll;
            statusCell{jj} = dStatus;

            % Make radartrack from trackInfo
            radartrack = [];
            radartrack.Lat = trackInfo.track_lat*180/pi;
            radartrack.Lon = trackInfo.track_lon*180/pi;
            radartrack.Alt = trackInfo.track_alt;
            radartrack.VelDopp = trackInfo.track_doppVel;
            radartrack.flags = trackInfo.flags;
            radartrack.flags2 = trackInfo.flags2;
            radartrack.highPriTrack = logical(trackInfo.flags & 2^12);
            radartrack.TargetType = trackInfo.target_type;

            radartrack.poo_lat = trackInfo.poo_lat*180/pi;
            radartrack.poo_lon = trackInfo.poo_lon*180/pi;
            radartrack.poo_alt = trackInfo.poo_alt;
            [a,~,r] = geodetic2aer(radartrack.poo_lat, radartrack.poo_lon, radartrack.poo_alt, radar.lat, radar.long, radar.altitude, wgs84Ellipsoid);
            radartrack.poo_range = r;
            radartrack.poo_azimuth = a;
            radartrack.poo_cep = trackInfo.poo_cep;
            radartrack.poo_time2Poo = trackInfo.time_to_origin;
            radartrack.poo_launchQe = NaN(size(trackInfo.track_lat));

            radartrack.poi_lat = trackInfo.poi_lat*180/pi;
            radartrack.poi_lon = trackInfo.poi_lon*180/pi;
            radartrack.poi_alt = trackInfo.poi_alt;
            [a,~,r] = geodetic2aer(radartrack.poi_lat, radartrack.poi_lon, radartrack.poi_alt, radar.lat, radar.long, radar.altitude, wgs84Ellipsoid);
            radartrack.poi_range = r;
            radartrack.poi_azimuth = a;
            radartrack.poi_cep = trackInfo.poi_cep;
            radartrack.poi_time2Poi = trackInfo.time_to_impact;
            radartrack.poi_impactQe = NaN(size(trackInfo.track_lat));

            radartrack.ID = trackInfo.trackIdExt;
            radartrack.extID = trackInfo.trackIdExt;

            radartrack.batchtime = NaN(size(trackInfo.track_lat));
            radartrack.lastAssocAge = trackInfo.time_since_association;
            radartrack.headerTimeTag = trackInfo.headerTimeTag/1e3; % ms -> sec
            radartrack.dateNum = datenum(trackInfo.dateTime_year,  trackInfo.dateTime_month,  trackInfo.dateTime_day, trackInfo.dateTime_hour, trackInfo.dateTime_min, trackInfo.dateTime_sec);
            radartrack.dateNum  = radartrack.dateNum  + (trackInfo.dateTime_msec/1000)/(24*3600);

            [a,e,r] = geodetic2aer(radartrack.Lat, radartrack.Lon, radartrack.Alt, radar.lat, radar.long, radar.altitude, wgs84Ellipsoid);
            radartrack.Azimuth = a;
            radartrack.Elevation = e;
            radartrack.Range = r;

            [n,e,d] = geodetic2ned(radartrack.Lat, radartrack.Lon, radartrack.Alt, radar.lat, radar.long, radar.altitude, wgs84Ellipsoid);
            radartrack.positionNorth = n;
            radartrack.positionWest = -e;
            radartrack.positionUp = -d;

            radartrack.RangeStd = sqrt(trackInfo.std_z.^2 + trackInfo.std_y.^2 + trackInfo.std_z.^2); % wrong
            radartrack.positionNorthStd = trackInfo.std_z;
            radartrack.positionWestStd = trackInfo.std_y;
            radartrack.positionUpStd = trackInfo.std_x;

            radartrack.velocityNorth = trackInfo.vel_x;
            radartrack.velocityWest = trackInfo.vel_y;
            radartrack.velocityUp = trackInfo.vel_z;

            radartrack.velocityNorthStd = trackInfo.std_vx;
            radartrack.velocityWestStd = trackInfo.std_vy;
            radartrack.velocityUpStd = trackInfo.std_vz;
            
            % Populating last assoc to simplify integration
            radartrack.lastAssocTgt_range = radartrack.Range;
            radartrack.lastAssocTgt_rangeStd = radartrack.RangeStd;
            radartrack.lastAssocTgt_dopplerVel = radartrack.VelDopp;
            radartrack.lastAssocTgt_dopplerVelStd = sqrt(trackInfo.std_vx.^2+trackInfo.std_vy.^2+ trackInfo.std_vz.^2); % wrong
            radartrack.lastAssocTgt_az = radartrack.Azimuth;
            radartrack.lastAssocTgt_azStd = 0.1*ones(size(radartrack.Azimuth)); % Wrong
            radartrack.lastAssocTgt_el = radartrack.Elevation;
            radartrack.lastAssocTgt_elStd = 0.1*ones(size(radartrack.Elevation)); % Wrong
            radartrack.lastAssocTgt_snrDb = NaN(size(trackInfo.dateTime_day));
            radartrack.lastAssocTgt_rcs = NaN(size(trackInfo.dateTime_day));
            radartrack.lastAssocTgt_power = NaN(size(trackInfo.dateTime_day));
            radartrack.lastAssocTgt_noise = NaN(size(trackInfo.dateTime_day));
            radartrack.lastAssocTgt_radar = NaN(size(trackInfo.dateTime_day));
            radartrack.lastAssocTgt_batchNum = NaN(size(trackInfo.dateTime_day));
            radartrack.lastAssocTgt_idInBatch = NaN(size(trackInfo.dateTime_day));
            radartrack.lastAssocTgt_alt = NaN(size(trackInfo.dateTime_day));

            radartrack.EBF_reason = trackInfo.flags2 & 2;

            radartrack.Test1 = trackInfo.test1;
            radartrack.Test2 = trackInfo.test2;
            radartrack.Test3 = trackInfo.test3;
            radartrack.Test4 = trackInfo.test4;
            radartrack.Test5 = trackInfo.test5;
            radartrack.Test6 = trackInfo.test6;
            radartrack.Test7 = trackInfo.test7;
            radartrack.Test8 = trackInfo.test8;
            radartrack.Test9 = trackInfo.test9;
            radartrack.Test10 = trackInfo.test10;

            tracks{jj} = radartrack;
            entryCount(jj) = length(radartrack.Test10);

        end

        allDetections = [];
        allParameters = [];
    end

    %allParameters(curParameterIdx:end) = [];
    % Now we need to change parameters to match the previous version
    % entryCount should be a 1x1068 double (no change needed)
    % tracks should be a 1x1068 cell (no change needed)
    if loadDetections ~= 0
        % allDetections should be a 1x1 struct with fns that are 1xN (N = # dets)
        % allParameters should be a 1xN struct (N = # params)
        allDetectionsTemp = [allDetectionsTemp{:}];
        fns = fieldnames(allDetectionsTemp);
        for iFns = 1:length(fns)
            allDetections.(fns{iFns}) = [allDetectionsTemp.(fns{iFns})];
        end
    end



    if loadDetections > 0
        for iParam = 1:length(allParameters)
            if isempty(allParameters{iParam})
                allParameters{iParam} = [];
            end
        end
        allParameters = [allParameters{:}];
    end

    if isempty(allParameters) && loadDetections == 2
        loadDetections = 0;
    end

    % status should be a 1xN array (N = # status)
    status = [statusCell{:}];

    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %% BRS remove all detections with a specific value less that isn't
    %% the value I want.  Edit as necessary

    filterEntries = false;

    if (filterEntries)
        value = 14.0;

        f = fieldnames(allDetections);
        originalFieldValues = allDetections.snr_dB;
        for k=1:numel(f)
            if(~isempty(allDetections.(f{k})))
                allDetections.(f{k}) = allDetections.(f{k})(originalFieldValues >= value);
            end
        end
    end

    %% BRS filter values end
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    firstNonEmpty = find(entryCount>0, 1, 'first');
    if(~isempty(entryCount))
        arraySize = sum(entryCount);
        if(~isempty(tracks))
            allTracks = [];
            for fn = fieldnames(tracks{firstNonEmpty})'
                allTracks.(fn{1}) = (zeros(1,arraySize));
                endCount = 0;
                for ii = firstNonEmpty:numel(tracks)
                    if (~isempty(tracks{ii}) && entryCount(ii)>0 && ~isempty(tracks{ii}.(fn{1})))
                        allTracks.(fn{1})((1:entryCount(ii))+endCount) = (tracks{ii}.(fn{1}));
                        endCount = endCount + entryCount(ii);
                    end
                end
            end
        end
    else
        detections = allDetections;
        detectionParameters = allParameters;
        if progressBarOn
            progressbar(1);
        end
        return;
    end
    if ~externalTracks
        status = aos2soa(status);
    end

    % Sort Radar Status by Time if Not Already
    if sum(diff(status.headerTimeTag) < 0) > 0
        temp_s = struct2table2(status);
        temp_s2 = sortrows(temp_s, 'headerTimeTag');
        status = table2struct(temp_s2, 'ToScalar', true);
        clearvars temp_s temp_s2
    end
    tracks = allTracks;
    %check for bad range in Track
    if ~externalTracks
        index = find(tracks.Range>radarParameters.maxTargetRange*2.2); % I want to see ranges < 0 bc we want to see errors|tracks.Range<0);
        if(~isempty(index))
            fprintf('WARNING %d BAD RANGES FOUND IN TRACK\n',numel(index));
            for fn = fieldnames(tracks)'
                tracks.(fn{1})(index) = [];
            end
        end
    end
    DateString = '19-May-1999';
    formatIn = 'dd-mmm-yyyy';
    tooSmall = datenum(DateString,formatIn);
    index = find((tracks.dateNum-tooSmall)<0);
    if(~isempty(index))
        for fn = fieldnames(tracks)'
            tracks.(fn{1})(index) = [];
        end
    end
    %check for bad times in track
    if( (tracks.dateNum(end)-tracks.dateNum(1)) *24*3600<(.1*(1E-6*(tracks.batchtime(end)-tracks.batchtime(1)))))
        %we have timestamp problem
        if progressBarOn
            progressbar(1);

            button = questdlg('Repeated Timestamps detected in data...Correct?');
            if(strcmpi(button,'yes'))
                dateNum1 = tracks.dateNum(1);

                dateNumNew = tracks.batchtime*1E-6 * (1/(24*3600))+dateNum1;
                tracks.dateNum = dateNumNew;
            end
        end
    end
    %check forzero lat /long
    index = find(abs(tracks.Lat-median(tracks.Lat))>2|abs(tracks.Lon-median(tracks.Lon))>2);
    if(~isempty(index))
        fprintf('WARNING %d BAD LAT OR LONGS FOUND IN TRACK\n',numel(index));
        for fn = fieldnames(tracks)'
            tracks.(fn{1})(index) = [];
        end
    end
    %tracks = aos2soa(tracks);
    if (sum(isnan((status.loc_lat)))/numel(status.loc_lat)>.8) && (~radar.otm || loadDetections ==0)
        status = [];
        status.headerTimeTag(1) = min(tracks.headerTimeTag);
        status.loc_lat(1)       = radar.lat*pi/180;
        status.loc_lon(1)       = radar.long*pi/180;
        status.loc_alt(1)       = radar.altitude;
        status.att_heading(1)   = radar.heading*pi/180;
        status.att_pitch(1)     = radar.pitch*pi/180;
        status.att_roll(1)      = radar.roll*pi/180;
        status.headerTimeTag(2) = max(tracks.headerTimeTag);
        status.loc_lat(2)       = radar.lat*pi/180;
        status.loc_lon(2)       = radar.long*pi/180;
        status.loc_alt(2)       = radar.altitude;
        status.att_heading(2)	= radar.heading*pi/180;
        status.att_pitch(2)     = radar.pitch*pi/180;
        status.att_roll(2)      = radar.roll*pi/180;
    elseif radar.otm && loadDetections ~=0
        status = [];
        [~,IA] = unique( tracks.batchtime);
        r1 = tracks.batchtime(IA);
        r2 = tracks.dateNum(IA);
        [~,IB] = unique(r2);

        status.dateNum =        interp1(r1(IB),r2(IB),double(allDetections.batchTime),'linear','extrap');
        status.Alt   =       allDetections.ins_alt;
        status.Lat   =       allDetections.ins_lat;
        status.Lon   =       allDetections.ins_lon;
        status.Yaw   =       allDetections.ins_heading;
        status.Roll  =       allDetections.ins_roll;
        status.Pitch =       allDetections.ins_pitch;
        radar.lat       = median(status.Lat);
        radar.long      = median(status.Lon);
        radar.altitude  = median(status.Alt);
        radar.heading   = median(status.Yaw);
        radar.roll      = median(status.Roll);
        radar.pitch     = median(status.Pitch);
    else
        radar.heading =  mean(status.att_heading(~isnan(status.att_heading)))*180/pi;
    end
    try
        status = converttoplotdataform(tracks,status);
    end
    [~,IA] = unique(status.dateNum);
    tracks.lastAssocTgt_alt=tracks.lastAssocTgt_alt+...
        interp1(status.dateNum(IA),status.Alt(IA),double(tracks.dateNum),'nearest','extrap');
    negaz = tracks.lastAssocTgt_az < 0;
    tracks.lastAssocTgt_az(negaz) = tracks.lastAssocTgt_az(negaz) + 360;
    tracks = convertassocdetectiontogeo(tracks,status);

    % When doing replay the first track value had a time much less than
    % the rest. This ignores it.
    start = min(tracks.dateNum);
    t = tracks.dateNum;
    t(tracks.dateNum == start) = [];
    start2 = min(t);
    trim_time = [];
    if (start2 - start > .005)
        trim_time = start2;
        discard = tracks.dateNum < trim_time;
        for field = fieldnames(tracks)'
            tracks.(field{1})(discard) = [];
        end
        start = start2;
        discard = status.dateNum < trim_time;
        for field = fieldnames(status)'
            status.(field{1})(discard) = [];
        end
    end
    %start = start - 20.2/60/60/24;
    tracks.elapsedTime = (tracks.dateNum-start)*24*3600;
    status.elapsedTime = (status.dateNum-start)*24*3600;

    if(loadDetections ~= 0)
        if(~isempty(allDetections))
            detections = (allDetections);
            detectionParameters = allParameters;
            [C,IA] = unique( tracks.batchtime);
            r1 = tracks.batchtime(IA);
            r2 = tracks.dateNum(IA);
            [~,IB] = unique(r2);

            times= interp1(r1(IB),r2(IB),double(uint64([detectionParameters(:).res_time]*1E6)),'linear','extrap');
            for ii = 1:numel(detectionParameters)
                detectionParameters(ii).dateNum = times(ii);
                detectionParameters(ii).elapsedTime = (times(ii)-start)*24*3600;
            end

            % Convert to more convienent form]
            if isfield(detections, 'rcs_act')
                detections.rcs_act_dB = 10*log10(detections.rcs_act+eps);
            end
            % detections = convertdetectiontogeo(detections,tracks,status,radar,varargin{:});
            filename = fullfile(path,'GenConfig.xml');
            otm = radar.otm;
            radar.path = path;
            if(otm)
                radar.heading = median(detections.ins_heading);

            end
            if loadDetections == 1
                if progressBarOn
                    detections = convertdetectiontogeonew(...
                        detections,tracks,status,radar,'otm');
                else
                    detections = convertdetectiontogeonew(...
                        detections,tracks,status,radar,'otm', 'noprogressbar');
                end

                detections.elapsedTime = (detections.dateNum-start)*24*3600;
                if ~isempty(trim_time)
                    discard = detections.dateNum < trim_time;
                    for field = fieldnames(detections)'
                        detections.(field{1})(discard) = [];
                    end
                end
                try
                    [tracks, detections] = DetectionAssociation(tracks, detections);
                catch ME
                    disp_error_Info(ME);
                end
                % If we only loaded INS data all we need to do is update time variables
            elseif loadDetections == 2
                [~,IA] = unique( tracks.batchtime);
                r1 = tracks.batchtime(IA);
                r2 = tracks.dateNum(IA);
                [~,IB] = unique(r2);

                detections.dateNum = interp1(r1(IB),r2(IB),double(detections.batchTime),'linear','extrap');
                detections.elapsedTime = (detections.dateNum-start)*24*3600;
            end
        end
    end
    % Overwrite Radar Status with INS Data if OTM
    if radar.otm && ~isempty(detections)
        disp(['GenConfig specifies OTM Mission, overwriting Radar Status ',...
            'with INS data.'])
        status = [];
        status.dateNum =    detections.dateNum;
        status.Alt =        detections.ins_alt;
        status.Lat =        detections.ins_lat;
        status.Lon =        detections.ins_lon;
        status.Yaw =        detections.ins_heading;
        status.Roll =       detections.ins_roll;
        status.Pitch =      detections.ins_pitch;
        status.elapsedTime = (status.dateNum-start)*24*3600;
    elseif radar.otm && isempty(detections)
        warning(['GenConfig specifies and OTM mission but no detection ',...
            'data has been loaded, no INS data available.'])
    end
    if(radar.otm)
        radar.lat       = median(status.Lat);
        radar.long      = median(status.Lon);
        radar.altitude  = median(status.Alt);
        radar.heading   = median(status.Yaw);
        radar.roll      = median(status.Roll);
        radar.pitch     = median(status.Pitch);
    end
    if length(status.dateNum) ~= length(unique(status.dateNum))
        fprintf('Removing duplicate time values from status messages.\n')
        fn_S = fieldnames(status);
        [~, i_u, ~] = unique(status.dateNum);
        for i_f = 1:length(fn_S)
            status.(fn_S{i_f}) = status.(fn_S{i_f})(i_u);
        end
    end
    % get radar face for all associated plots, if needed
    if(sum(~isnan(tracks.lastAssocTgt_radar))==0)
        %only 6.4 radars write out radar ID so we need to guess
        indexLast = find(~isnan(tracks.lastAssocTgt_range));
        if(sum(radar.enabled)==1)
            tracks.lastAssocTgt_radar(indexLast) = tracks.lastAssocTgt_range(indexLast)>0;
        else
            if(~isempty(detections) && loadDetections == 1)
                % if progressBarOn
                %     selection =  questdlg('Find radar face IDs?');
                % else
                %     selection = 'Yes';
                % end
                selection = 'Yes';
                switch selection
                    case 'Yes'
                        if progressBarOn
                            progressbar('Finding Radar Face IDs')
                        end
                        at = tic;
                        for ii = 1:numel(indexLast)
                            if(toc(at)>3)
                                if progressBarOn
                                    progressbar(ii/numel(indexLast));
                                end
                                at = tic;
                            end
                            inz = find(abs(detections.elapsedTime-tracks.elapsedTime(indexLast(ii)))<1E-2);

                            delta = abs(tracks.lastAssocTgt_az(indexLast(ii))-detections.azGeo(inz))+...
                                abs(tracks.lastAssocTgt_el(indexLast(ii))-detections.elGeo(inz));
                            [h,i] = min(delta);
                            if(h<1)
                                tracks.lastAssocTgt_radar(indexLast(ii)) = detections.rdr_id(inz(i(1)));
                                tracks.lastAssocTgt_elStd(indexLast(ii)) = detections.el_std(inz(i(1)))*180/pi;
                            else
                                a = 1;
                            end
                        end
                        if progressBarOn
                            progressbar(1);
                        end
                    case 'No'
                        deal;
                    otherwise
                        deal;
                end

            end
        end
    end

    if ~isempty(detections)
        detections.datetime = datetime(detections.dateNum,...
            'ConvertFrom', 'datenum',...
            'TimeZone', 'UTC', 'Format', 'yyyy-MM-dd HH:mm:ss.SSS');
    end
    if ~isempty(status)
        status.datetime = datetime(status.dateNum,...
            'ConvertFrom', 'datenum',...
            'TimeZone', 'UTC', 'Format', 'yyyy-MM-dd HH:mm:ss.SSS');
    end
    if isfield(radarParameters, 'UseLocalTime')
        if radarParameters.UseLocalTime
            disp(['Radar is using local time, analysis is setting datetime',...
                ' variables to UTC, but be aware that there could be a ,'...
                'time offset of ' num2str(timezone(status.Lat(1))) ' +/- 1 for DST.'])
        end
    end

    radarParameters.externalTracks = externalTracks;

    % Correct EBF test altitude value to have true altitude so it an be compared to
    % normal Alt
    if(sum(isnan(tracks.lastAssocTgt_radar))<numel(tracks.lastAssocTgt_radar))
        %we have radar ids in track so let's assign a face ID to all points in track
        %granted it's really only valid for point with associated detections
        %(well not even that because a track can be a mixture of two faces....)

        uniqueIds = unique(tracks.ID);
        for ii = 1:numel(uniqueIds)
            ind = find(tracks.ID ==uniqueIds(ii));
            tracks.lastAssocTgt_radar(ind) = fillmissing(tracks.lastAssocTgt_radar(ind),'previous');
        end
    end
    try
        for n = 1:numel(radarParameters.testpoints)
            if contains(radarParameters.testpoints{n},'Z Position')
                tracks.(['Test' num2str(n)]) = tracks.(['Test' num2str(n)]) + status.Alt(1);
            end
        end
    catch
    end
    if loadDetections == 2
        detectionParameters = [];
    end
    if progressBarOn
        progressbar(1);

        fprintf('BLOG data spans %s .. %s\n', datetime(tracks.dateNum(1), "ConvertFrom", "datenum"),...
            datetime(tracks.dateNum(end), "ConvertFrom", "datenum"));

    end
    radarParameters.modeOnly = false;
else % Mode Only code
    status.Alt = [radar.altitude, radar.altitude];
    status.Lat = [radar.lat, radar.lat];
    status.Lon = [radar.long, radar.long];
    status.Yaw = [radar.heading, radar.heading];
    status.Roll = [radar.roll, radar.roll];
    status.Pitch = [radar.pitch, radar.pitch];
    status.dateNum = [0, datenum(datetime)+1e9];
    radarParameters.externalTracks = false;
    radarParameters.modeOnly = true;
end

if ~isempty(tracks)
    tracks.datetime = datetime(tracks.dateNum,...
        'ConvertFrom', 'datenum',...
        'TimeZone', 'UTC', 'Format', 'yyyy-MM-dd HH:mm:ss.SSS');
end
if ~isempty(tracks)
    tracks.isDrone = isTrackAThing(tracks.TargetType, ["drone", "uav"]);
    tracks.isClutter = isTrackAThing(tracks.TargetType, ["unclassified", "unknown", "bird"]);
    tracks.isCram = isTrackAThing(tracks.TargetType, ["mortar", "artillery", "rocket", "ram"]);
    tracks.isAircraft = isTrackAThing(tracks.TargetType, ["aircraft", "airplane", "fighter", "hta", "helicopter"]);
end

% t = diff(tracks.dateNum);
% inds = find(tracks.dateNum<tracks.dateNum(1));
% tracks = struct2table2(tracks);
% tracks(inds, :) = [];
% tracks = table2struct(tracks, "ToScalar", true);
% tracks = structfun(@transpose, tracks, 'UniformOutput', false);
% tracks.elapsedTime =( tracks.dateNum - tracks.dateNum(1) )* 24*60*60;
toc;
a=1;
