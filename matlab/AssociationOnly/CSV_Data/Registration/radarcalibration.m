function radarcalibration(info,tracks,status,retrack,klThreshold)
aaa = tic;
tracks = struct2table2(tracks);
% set this to true to use last associated detection data to register a radar
useLastAssoc = true;
%retrack = true;
maxError = 3;
% set(groot, 'DefaultFigureVisible', 'off')
alignFace = [];
%first get association between track and Truth data
SHOWPLOTS = false;
altCorr = [];
rpy = [];
fid = [];
% info.guiData.yfield = 'Lat';
% info.guiData.xfield = 'Lon';
cellfind = @(string)(@(cell_contents)(strcmp(string,cell_contents)));
meanVehPos = [median(status.Lat); median(status.Lon); median(status.Alt)];

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%stick loaded track into proper structure
drone = [];
for ii = 1:numel(info.GpsTrack)
    track = info.GpsTrack{ii};
    if (isempty(track)|~isfield(track,'Heading'))
        continue;
    end
    for ind = 1:numel(track.Lat)
        track.x_code{ind} = sprintf('%05d',ii);
    end

    if(numel(info.GpsTrack)>1)
        try
            drone = [drone soa2aos(track)];
        catch
        end
    end
end
if(numel(info.GpsTrack)>1)
    drone = aos2soa(drone);

else
    drone = track;
end

minT = min(drone.dateNum) - 1/24/60;
maxT = max(drone.dateNum) + 1/24/60;
inds = tracks.dateNum >= minT & tracks.dateNum <= maxT;% & tracks.lastAssocAge < 1;
min_lat = min(drone.Lat); max_lat = max(drone.Lat); d_lat =abs( max_lat - min_lat);
min_lon = min(drone.Lon); max_lon = max(drone.Lon); d_lon =abs( max_lon - min_lon);
min_lat = min_lat - .10*d_lat;
max_lat = max_lat + .10*d_lat;
min_lon = min_lon - .10*d_lon;
max_lon = max_lon + .10*d_lon;

% We don't want to use tracks that more than 45 degrees off boresight
% for now just doing elevation, because face handover is more complicated
pitch = median(info.radar.vehicleToFixture.Pitch);
tooHigh = tracks.Elevation>(pitch+45);

inds = inds & tracks.Lat > min_lat & tracks.Lat < max_lat & ...
    tracks.Lon > min_lon & tracks.Lon < max_lon & ~tooHigh;
tracks = tracks(inds, :);

flightnums = unique(drone.x_code);
truthTrackIds = containers.Map('KeyType','char','ValueType','double');
truthTrackAssociation= containers.Map('KeyType','char','ValueType','any');
z = zeros(size(unique(tracks.ID)));
for ii = 1:numel(flightnums)
    truthTrackIds(flightnums{ii}) = ii;
    truthTrackAssociation(flightnums{ii}) = z ;
end


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%get track-truth association
registration_folder  = fullfile( info.parameters.pathname, 'Registration', filesep);

radarParameters = info.radarParameters;
if(retrack)
    uid = info.guiData.trackInfo.uniqueIds;
    tracks = refilter(tracks,...
    info.radar,uid );
end
[calibrationTruthTrackIds,calibrationRadarTrackIds,IDs,info] = radarfuse(tracks,status,drone,radarParameters,truthTrackIds,flightnums,truthTrackAssociation,info);
toc(aaa)

end