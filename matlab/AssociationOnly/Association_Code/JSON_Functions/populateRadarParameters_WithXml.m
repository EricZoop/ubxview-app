function [radar, radarParameters] = populateRadarParameters_WithXml(path)
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
    end

    if ~modeOnly
        [~,~,translateNames] = labelmaster(emlswid);
        %allDetections = [];
        detections= [];
        entryCount = [];
        detectionParameters =[];
    end
    % if(loadDetections)
    %     updateRate = 1;
    % else
        updateRate = 5;
    % end


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

        % fprintf('%s\n', temp_conf);

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

    
    radarParameters = radar;
    if ~modeOnly
        radarParameters.testpoints = emlswid.testpoints;
    end
    radarParameters.Fs = 80E6;
    try
        [radarParameters] = parseparametersmultisequence(radarParameters,path);
    catch ex
        fprintf('*********Error Parsing parameters file in path %s**********\n',path);
        rethrow(ex)
    end

    %TODO Revisit Hard Coded Value
    radarParameters.externalTracks = false;
end