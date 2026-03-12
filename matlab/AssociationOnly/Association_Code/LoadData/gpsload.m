function [GpsTrack, parameters] = gpsload(gpsreader, askTrim, path, name, trackStruct)
%computeError
    tracks = trackStruct.tracks;
    status = trackStruct.status;
    radarParameters = trackStruct.radarParameters;

    parameters.gpsPathname = path;
    parameters.gpsfilename = name;
    computeError.Enable = 'on';
    
    %Ryan Addition
    parameters.gpsTrackCount = 0;
    %End Ryan Addition
    currNumGpsLoaded = parameters.gpsTrackCount;
    parameters.gpsTrackCount = parameters.gpsTrackCount + 1;
    haveTimeOffset = false;
    
    if(strcmp(func2str(gpsreader),'parse_anduril_bird_dir'))
        GpsTrack{parameters.gpsTrackCount} = ...
            gpsreader(fullfile(parameters.gpsPathname), ...
            status.Alt(1), status.Lat(1), status.Lon(1));
    elseif (strcmp(func2str(gpsreader), 'parse_gpx'))
        GpsTrack{parameters.gpsTrackCount} = ...
            gpsreader(fullfile(parameters.gpsPathname,parameters.gpsfilename), ...
            status.Alt(1), status.Lat(1), status.Lon(1), radarParameters);
    elseif(strcmp(func2str(gpsreader),'parse_DJI_Dir'))
        GpsTrack{parameters.gpsTrackCount} = ...
            gpsreader(fullfile(parameters.gpsPathname), ...
            status.Alt(1), status.Lat(1), status.Lon(1));
    elseif (strcmp(func2str(gpsreader),'parse_DJI_Mavic2'))
        [ GpsTrack{parameters.gpsTrackCount}, ...
            GpsTrackInfo{parameters.gpsTrackCount} ] = ...
            gpsreader(fullfile(parameters.gpsPathname,parameters.gpsfilename), ...
            status.Alt(1), status.Lat(1), status.Lon(1));
    elseif(strcmp(func2str(gpsreader),'parse_ttl_dir'))
        GpsTrack{parameters.gpsTrackCount} = ...
            gpsreader(fullfile(parameters.gpsPathname));
    elseif(strcmp(func2str(gpsreader),'parse_krfs2'))
        GpsTrack{parameters.gpsTrackCount} = ...
            gpsreader(fullfile(parameters.gpsPathname,parameters.gpsfilename), ...
            min(tracks.dateNum), max(tracks.dateNum));
    elseif(strcmp(func2str(gpsreader),'parse_adsb_dumb') || strcmp(func2str(gpsreader),"parseAsterix")||strcmp(func2str(gpsreader), "parse_adsb_raw"))||(strcmp(func2str(gpsreader),'loadCSV_Asterisk'))
        allTracks = gpsreader(fullfile(parameters.gpsPathname,parameters.gpsfilename));
        for iGps = 1:length(allTracks)
            GpsTrack{parameters.gpsTrackCount} = allTracks{iGps};
            parameters.gpsTrackCount = parameters.gpsTrackCount + 1;
        end
        parameters.gpsTrackCount = parameters.gpsTrackCount - 1;
    elseif(strcmp(func2str(gpsreader),'parse_adsb')||strcmp(func2str(gpsreader),'parse_adsb_bh')||strcmp(func2str(gpsreader),'parse_misb')|| strcmp(func2str(gpsreader),'parse_pingstation'))
        [gps,haveTimeOffset,calibrationTruthTrackIds,calibrationRadarTrackIds, ~] = ...
            gpsreader(parameters.gpsPathname,parameters.gpsfilename, ...
            status.Alt(1), status.Lat(1), status.Lon(1),tracks,status, radarParameters);
        if(~isempty(calibrationTruthTrackIds))
            calibrationTruthTrackIds = calibrationTruthTrackIds;
            calibrationRadarTrackIds = calibrationRadarTrackIds;
        end
        if(~haveTimeOffset)
            if contains(parameters.gpsfilename, 'OFFSET')
                offset = regexp(parameters.gpsfilename, 'OFFSET_([-0123456789.]*)','tokens');
                offset = str2double(offset{1});
            else
                %offset =  min(tracks.dateNum) - min(GpsTrack{parameters.gpsTrackCount}.dateNum);
    
                prompt = {'Enter Time Offset in hours: (Cancel to Auto Determine)'};
                title = 'Input';
                dims = [5];
                definput = {'0'};
                answer = inputdlg(prompt,title,dims,definput);
                if(~isempty(answer))
                    houroffset =  str2num(answer{1});
                    offset= houroffset;
                else
                    offset =  min(tracks.dateNum) - min(gps{parameters.gpsTrackCount}.dateNum);
                    offset = round(offset * 24);
                end
            end
        else
            offset = 0;
        end
        if askTrim
            trimGps = questdlg('Remove GPS with no overlapping times?');
        else
            trimGps = 'Yes';
        end
        if strcmp(trimGps, "Yes")
            trimGps = true;
        else
            trimGps = false;
        end
        minTime = min(min(tracks.dateNum),min(tracks.dateNum));
        maxTime = max(max(tracks.dateNum), max(tracks.dateNum));
        parameters.gpsTrackCount = parameters.gpsTrackCount - 1;
        for ii=1:numel(gps)
            parameters.gpsTrackCount = parameters.gpsTrackCount + 1;
            GpsTrack{parameters.gpsTrackCount} = gps{ii};
            GpsTrack{parameters.gpsTrackCount}.dateNum = GpsTrack{parameters.gpsTrackCount}.dateNum + offset / 24;
            GpsTrack{parameters.gpsTrackCount}.elapsedTime = (GpsTrack{parameters.gpsTrackCount}.dateNum- ...
                (tracks.dateNum(1) - tracks.elapsedTime(1)/(24*3600)))*24*3600;
            fprintf('GPS adjusted %d hours, remaining offset %f hours\n', offset,  ...
                24 * (min(tracks.dateNum) - min(GpsTrack{parameters.gpsTrackCount}.dateNum)))
            % comment out the try statement below to see all tracks just to
            % prove they exist
            try
                GpsTrack{parameters.gpsTrackCount} = calcgps2radar(GpsTrack{parameters.gpsTrackCount},...
                    status,trimGps,minTime,maxTime,radarParameters);
            catch
                GpsTrack{parameters.gpsTrackCount} = []; %
                parameters.gpsTrackCount = parameters.gpsTrackCount - 1;
                continue
            end
            if length(GpsTrack) > parameters.gpsTrackCount
                parameters.GpsTrack = parameters.GpsTrack(1:parameters.gpsTrackCount);
            end
            if isempty(GpsTrack{parameters.gpsTrackCount})
                %             GpsTrack{parameters.gpsTrackCount} = [];
                GpsTrack = GpsTrack(1:end-1);
                parameters.gpsTrackCount = parameters.gpsTrackCount - 1;
            end
    
        end
        % Enable generateAnalysisPlots tool
        gpsreadergenerateAnalysisPlots.Enable = 'on';
    
        % gpsreaderhistotool.State = 'off';
        % pathname = parameters.gpsPathname;
        % gpsreadershowTracks.Enable = 'on';
        % gpsreadershowthegps.Enable = 'on';
        % save(fullfile(pwd, 'Defaults\defaultgpspath.mat'), 'pathname');%save defaultgpspath pathname;
        % handlesRet = handles;
        % Add Table View of Loaded GPS Data
        tab_gps = {};
        if parameters.gpsTrackCount >0
            for i = 1:length(parameters.gpsTrackCount)
                tab_gps{i} = struct2table2(GpsTrack{i});
            end
        end
        return;
    elseif strcmp(func2str(gpsreader), 'parse_solipsys')
        n_gpsInit = parameters.gpsTrackCount;
        [~, fullGPS] = ...
            gpsreader(fullfile(parameters.gpsPathname,parameters.gpsfilename), ...
            status.Alt(1), status.Lat(1), status.Lon(1));
        ids = fieldnames(fullGPS);
        cell_src = unique(fullGPS.all.source1);
        cell_src = [{'all'}; cell_src];
        i_src = listdlg('PromptString', 'Select Source',...
            'ListString', cell_src);
        if isempty(i_src)
            i_trk = listdlg('PromptString', 'Select Track/Callsign to Plot',...
                'ListString', ids);
            trk = ids{i_trk};
        elseif strcmp('all', cell_src{i_src})
            src = 'all';
            trk = 'all';
        else
            src = cell_src{i_src};
            cell_trk = unique(...
                fullGPS.all.trackSerialNum(strcmp(fullGPS.all.source1, src)));
            for i_tsn = 1:length(cell_trk)
                cell_trk{i_tsn} = ids{startsWith(ids,cell_trk{i_tsn})};
            end
            cell_trk = [{'all'}; cell_trk];
            i_trk = listdlg('PromptString', 'Select Track to Plot',...
                'ListString', cell_trk);
            trk = cell_trk{i_trk};
        end
        if strcmp(src, 'all') && strcmp(trk, 'all')
            parameters.gpsTrackCount =...
                parameters.gpsTrackCount - 1;
            for i = 2:length(ids)
                parameters.gpsTrackCount =...
                    parameters.gpsTrackCount + 1;
                GpsTrack{parameters.gpsTrackCount} =...
                    table2struct(fullGPS.(ids{i}), 'ToScalar', true);
            end
        elseif ~strcmp(src, 'all') && strcmp(trk, 'all')
            parameters.gpsTrackCount =...
                parameters.gpsTrackCount - 1;
            for i = 2:length(cell_trk)
                parameters.gpsTrackCount =...
                    parameters.gpsTrackCount + 1;
                GpsTrack{parameters.gpsTrackCount} =...
                    table2struct(fullGPS.(cell_trk{i}), 'ToScalar', true);
            end
        else
            GpsTrack{parameters.gpsTrackCount} =...
                table2struct(fullGPS.(trk), 'ToScalar', true);
        end
    
        minTime = min(min(tracks.dateNum),min(tracks.dateNum));
        maxTime = max(max(tracks.dateNum), max(tracks.dateNum));
    
        for i = n_gpsInit:parameters.gpsTrackCount
            GpsTrack{i}.elapsedTime = (GpsTrack{i}.dateNum...
                - (tracks.dateNum(1) - tracks.elapsedTime(1)/(24*3600)))*24*3600;
            GpsTrack{i} = calcgps2radar(...
                GpsTrack{i}, status, true,...
                minTime, maxTime, radarParameters);
    
            if isempty(GpsTrack{i})
                parameters.gpsTrackCount = i - 1;
            end
    
        end
        % Enable generateAnalysisPlots tool
        gpsreadergenerateAnalysisPlots.Enable = 'on';
    
        gpsreaderhistotool.State = 'off';
        pathname = parameters.gpsPathname;
        gpsreadershowTracks.Enable = 'on';
        gpsreadershowthegps.Enable = 'on';
        save(fullfile(pwd, 'Defaults\defaultgpspath.mat'), 'pathname');%save defaultgpspath pathname;
        handlesRet = handles;
        % Add Table View of Loaded GPS Data
        tab_gps = {};
        for i = 1:length(parameters.gpsTrackCount)
            tab_gps{i} = struct2table2(GpsTrack{i});
        end
        return;
    elseif (strcmp(func2str(gpsreader),'parse_sim'))
        GpsTrack{parameters.gpsTrackCount} = ...
            gpsreader(fullfile(parameters.gpsPathname,parameters.gpsfilename), ...
            tracks, gpsreaderdetections, status);
        handlesRet = handles;
    else
        GpsTrack{parameters.gpsTrackCount} = ...
            gpsreader(fullfile(parameters.gpsPathname,parameters.gpsfilename), ...
            status.Alt(1), status.Lat(1), status.Lon(1));
    end
    if(~isempty(GpsTrack{parameters.gpsTrackCount}))
        try
            % set(gpsreaderloadradardir,'enable','off');
            radardisplay.Name = sprintf('Loaded Radar Directory: %s and GPS File:%s ',parameters.pathname,parameters.gpsfilename);
        catch
            gpsreaderradardisplay.Name = sprintf('Loaded GPS File:%s ',parameters.gpsfilename);
        end
        if(~haveTimeOffset)
            if contains(parameters.gpsfilename, 'OFFSET')
                offset = regexp(parameters.gpsfilename, 'OFFSET_([-0123456789.]*)','tokens');
                offset = str2double(offset{1});
            else
                %offset =  min(tracks.dateNum) - min(GpsTrack{parameters.gpsTrackCount}.dateNum);
                if askTrim
                    prompt = {'Enter Time Offset in hours: (Cancel to Auto Determine)'};
                    title = 'Input';
                    dims = [5];
                    definput = {'0'};
                    answer = inputdlg(prompt,title,dims,definput);
                else
                    answer = [];
                end

                if(~isempty(answer))
                    houroffset =  str2num(answer{1});
                    offset= houroffset;
                else
                    offset =  min(tracks.dateNum) - min(GpsTrack{parameters.gpsTrackCount}.dateNum);
                    offset = round(offset * 24);
                end
            end
        else
            offset = 0;
        end
        % There are a number of places in the code that won't work currently if no
        % tracks loaded. Below is the first.
        if isempty(tracks)
            modeOnly = true;
            tracks= struct();
            tracks.dateNum = [0, inf];
            tracks.elapsedTime = 0;
        elseif numel(tracks.dateNum) == 0
            error('No tracks loaded. Unable to continue');
        else
            modeOnly = false;
        end
    
        if askTrim
            trimGps = questdlg('Trim GPS to track/detection data?');
        else
            trimGps = 'Yes';
        end
    
        numGpsLoaded = parameters.gpsTrackCount;
        validGpsCount = currNumGpsLoaded + 1;
        for iGps = validGpsCount:numGpsLoaded
            GpsTrack{iGps}.dateNum =...
                GpsTrack{iGps}.dateNum...
                + offset / 24;
            GpsTrack{iGps}.elapsedTime =...
                (GpsTrack{iGps}.dateNum ...
                - (tracks.dateNum(1) ...
                - tracks.elapsedTime(1)/(24*3600)))*24*3600;
            GpsTrack{iGps}.datetime =...
                datetime(...
                GpsTrack{iGps}.dateNum,...
                'ConvertFrom', 'datenum');
    
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
                validGpsCount = validGpsCount+1;
            end
        end
        if length(GpsTrack) > (validGpsCount-1)
            GpsTrack = GpsTrack(1:validGpsCount-1);
        end
        if (strcmp(func2str(gpsreader),'parse_sim'))
            handles = update_sim_data(handles, false);
        end
        % Enable generateAnalysisPlots tool
        % gpsreadergenerateAnalysisPlots.Enable = 'on';
        % 
        % gpsreaderhistotool.State = 'off';
        % pathname = parameters.gpsPathname;
        % gpsreadershowTracks.Enable = 'on';
        % gpsreadershowthegps.Enable = 'on';
        % save(fullfile(pwd, 'Defaults\defaultgpspath.mat'), 'pathname');%save defaultgpspath pathname;
        % handlesRet = handles;
    end
end