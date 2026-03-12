function [tracks] = fuseem(handles,tracks,status)
alignFace = [];
%first get association between track and Truth data
SHOWPLOTS = false;
altCorr = [];
rpy = [];
fid = [];
handles.guiData.yfield = 'Lat';
handles.guiData.xfield = 'Lon';
cellfind = @(string)(@(cell_contents)(strcmp(string,cell_contents)));
ButtonName = questdlg('Do you want to fuse with radar, optic, or truth?', ...
    'FUZEEM', ...
    'radar', 'optic','truth','radar');
switch ButtonName
    case 'radar'
        try
            load defaultdatapath
        catch
            pathname = '.';
        end
        if(~ischar(pathname))
            pathname = '.';
        end
        try
            % set(handles.loadradardir,'enable','off');
            [pathname]= uigetdir(pathname,'Select Data Directory');
        catch
            % set(handles.loadradardir,'enable','on');
        end
        if isequal(handles.parameters.pathname,0)
            errordlg('No Directory Selected, No action taken', 'No thing (radar) loaded', 'modal');
            assert(-1);
        end
        [tracksSr,radarSr,statusSr,~,radarParametersSr] = loadtracksstatusanddetections(pathname,false);
        info = handles;
        info.parameters.pathname = pathname;
        info.tracks = tracksSr;
        info.status = statusSr;
        info.radar = radarSr;
        info.radarParameters = radarParametersSr;
        %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        %get track-truth association
        [tracks] = radar2radarfuse(tracks,status,...
            tracksSr,statusSr,handles,info);
    case 'optic'
        errordlg('NOT YET IMPLEMENTED', 'LAZY', 'modal');
        assert(-1);
    case 'truth'
        %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        %load adsb if we have no gps truth loaded ask, otherwise.
        if(~isfield(handles,'GpsTrack')||isempty(handles.GpsTrack))
            ButtonName = questdlg('Do you want to fuse with ADSB track (no GPS track loaded)?', ...
                'VIQ', ...
                'Yes', 'No','Yes');
            lastAssociated = false;
            if(strcmp(ButtonName,'Yes'))
                loadAdsb = true;
            else
                errordlg('You must load GPS track first (from file menu) and this was not done', 'No Truth data Error', 'modal');
                assert(-1);
            end
            if(~loadAdsb)
                
            end
        else
            ButtonName = questdlg('Use loaded track for fusion?', ...
                'VIQ', ...
                'Yes', 'No','Yes');
            lastAssociated = false;
            if(strcmp(ButtonName,'Yes'))
                loadAdsb = false;
            else
                loadAdsb = true;
            end
        end
        
        if(loadAdsb)
            %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
            %load adsb
            pathname = handles.parameters.pathname;
            try
                % set(handles.loadradardir,'enable','off');
                [filename,pathname]= uigetfile({'*.csv;*.json;*.gpx;*.log;*.pos','CSV File';'*.mat','MAT File';'*.*','All Files'},'Select Data Directory',pathname);
            catch
                % set(handles.loadradardir,'enable','on');
            end
            if isequal(filename,0)
                msgbox('No GPS File Selected, No action taken')
                error('No GPS File Selected, No action taken');
                
            end
            filename = fullfile(pathname,filename);
            A = dir(filename);
            name = fullfile(A(1).folder,A(1).name);
            dt = readtable(name);
            ds = table2struct(dt);
            drone = aos2soa(ds);
            drone.Lat = drone.lat;
            drone.Lon = drone.lon;
            drone.Alt = drone.alt;
            
            
            if contains(filename, 'OFFSET')
                offset = regexp(filename, 'OFFSET_([-0123456789.]*)','tokens');
                offset = str2double(offset{1});
            else
                %offset =  min(handles.tracks.dateNum) - min(handles.GpsTrack{handles.parameters.gpsTrackCount}.dateNum);
                offset =0;% round(offset * 24);
                prompt = {'Enter Time Offset in Hours:'};
                title = 'Input';
                dims = [5];
                definput = {'0'};
                answer = inputdlg(prompt,title,dims,definput);
                if(~isempty(answer))
                    houroffset =  str2num(answer{1});
                    offset= houroffset;
                else
                    offset =  min(handles.tracks.dateNum) - min(handles.GpsTrack{handles.parameters.gpsTrackCount}.dateNum);
                    offset =(offset * 24);
                end
            end
            
            drone.dateNum =datenum(drone.date,'mm:dd:yyyy_HH:MM:SS.FFF')+offset/24 ;
            a = 1;
            flightnums = unique(drone.x_code);
            truthTrackIds = containers.Map('KeyType','char','ValueType','double');
            truthTrackAssociation= containers.Map('KeyType','char','ValueType','any');
            z = zeros(size(unique(tracks.ID)));
            
            for ii = 1:numel(flightnums)
                truthTrackIds(flightnums{ii}) = ii;
                truthTrackAssociation(flightnums{ii}) = z ;
                
                if(isfield(handles,'GpsTrack'))
                    gpsTrackCount = numel(handles.GpsTrack)+1;
                    
                else
                    gpsTrackCount = 1;
                end
                %index = find(flightnums{ii}==drone.x_code);
                index = find(cellfun(cellfind(flightnums{ii}),drone.x_code)>0);
                handles.GpsTrack{gpsTrackCount}.dateNum = drone.dateNum(index);
                handles.GpsTrack{gpsTrackCount}.elapsedTime = (handles.GpsTrack{gpsTrackCount}.dateNum- ...
                    (handles.tracks.dateNum(1) - handles.tracks.elapsedTime(1)/(24*3600)))*24*3600;
                handles.GpsTrack{gpsTrackCount}.Lat = drone.Lat(index);
                handles.GpsTrack{gpsTrackCount}.Lon = drone.Lon(index);
                handles.GpsTrack{gpsTrackCount}.Alt = drone.Alt(index);
            end
            handles.parameters.gpsTrackCount = gpsTrackCount;
        else
            %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
            %stick loaded track into proper structure
            drone = [];
            for ii = 1:numel(handles.GpsTrack)
                track = handles.GpsTrack{ii};
                for ind = 1:numel(track.Lat)
                    track.x_code{ind} = sprintf('%05d',ii);
                end
                
                if(numel(handles.GpsTrack)>1)
                    
                    drone = [drone soa2aos(track)];
                end
            end
            if(numel(handles.GpsTrack)>1)
                drone = aos2soa(drone);
                
            else
                drone = track;
            end
            flightnums = unique(drone.x_code);
            truthTrackIds = containers.Map('KeyType','char','ValueType','double');
            truthTrackAssociation= containers.Map('KeyType','char','ValueType','any');
            z = zeros(size(unique(tracks.ID)));
            for ii = 1:numel(flightnums)
                truthTrackIds(flightnums{ii}) = ii;
                truthTrackAssociation(flightnums{ii}) = z ;
            end
        end
        [~,~,~,~,tracks] = radarfuse(tracks,status,drone,handles.radarParameters,truthTrackIds,flightnums,...
            truthTrackAssociation,handles);
    otherwise
        assert(-1);
        
end

% index = find(tracks.ID==5929);
% t = soa2aos(tracks);
% t = t(index);
% tracks = aos2soa(t);

a = 1;
