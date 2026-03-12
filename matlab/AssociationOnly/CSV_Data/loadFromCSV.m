function [gpstrack, tracks] = loadFromCSV(truthCSV, trackCSV)

truth = readtable(truthCSV);
truth = table2struct(truth);
truth = aos2soa(truth);

%Truth from JSON
gpstrack.datetime = cellfun(@(x)datetimeHelper(x), truth.timestamp);
gpstrack.dateNum = datenum(gpstrack.datetime);
gpstrack.trackID = truth.track;
gpstrack.x_code = cellstr(["X" + string([gpstrack(:).trackID])]);
gpstrack.Lat = truth.lat;
gpstrack.Lon = truth.lon;
gpstrack.Alt = truth.alt;
% gpstrack.registrationID = [jsonData.points(truthIdx).registration_id];
% gpstrack.validTrack = [truthConf(:).confidence] > 0;


fulltracks = readtable(trackCSV);
fulltracks = table2struct(fulltracks);
fulltracks = aos2soa(fulltracks);
%Tracks from JSON
%Begin populating track entries
tracks.datetime = cellfun(@(x) datetime(x, 'InputFormat','uuuu-MM-dd HH:mm:ss:SSS'), fulltracks.DateTime);
tracks.dateNum = datenum(tracks.datetime);
tracks.elapsedTime = fulltracks.Time;
tracks.ID = fulltracks.ID; 
tracks.Lat = fulltracks.Lat;
tracks.Lon = fulltracks.Lon;
tracks.Alt = fulltracks.Alt;
tracks.Azimuth = fulltracks.Azimuth;
tracks.Elevation = fulltracks.Elevation;
tracks.Range = fulltracks.Range;
% tracks.registrationID = [jsonData.points(trackIdx).registration_id];

%Populate the position & velocity fields 
tracks.positionNorth = fulltracks.PosNorth;
tracks.positionWest = fulltracks.PosWest;
tracks.positionUp = fulltracks.PosUp;
tracks.positionNorthStd = fulltracks.PosNorthStd;
tracks.positionWestStd = fulltracks.PosWestStd;
tracks.positionUpStd = fulltracks.PosUpStd;

tracks.velocityNorth = fulltracks.VelNorth;
tracks.velocityWest = fulltracks.VelWest;
tracks.velocityUp = fulltracks.VelUp;
tracks.velocityNorthStd = fulltracks.VelNorthStd;
tracks.velocityWestStd = fulltracks.VelWestStd;
tracks.velocityUpStd = fulltracks.VelUpStd;


tracks.lastAssocAge = fulltracks.LastAssocAge;
%Need to find last associated stuff
tracks.lastAssocTgt_range = fulltracks.TgtRange;
tracks.lastAssocTgt_rangeStd = fulltracks.TgtRangeStd;

tracks.lastAssocTgt_az = fulltracks.TgtAz; 

tracks.lastAssocTgt_azStd = fulltracks.TgtAzStd;
tracks.lastAssocTgt_el = fulltracks.TgtEl;
tracks.lastAssocTgt_elStd = fulltracks.TgtEl;
tracks.lastAssocTgt_dopplerVel = fulltracks.TgtVel;
tracks.lastAssocTgt_dopplerVelStd = fulltracks.TgtVelStd;

%TODO: Determine if the +1 should come from json
tracks.lastAssocTgt_radar = fulltracks.RadarID;
%End TODO

[lat,lon, h] = aer2geodetic( tracks.lastAssocTgt_az,tracks.lastAssocTgt_el,tracks.lastAssocTgt_range,...
    fulltracks.INSLatitude,fulltracks.INSLongitude, fulltracks.INSAltitude,wgs84Ellipsoid);
tracks.lastAssocTgt_Lat = lat;
tracks.lastAssocTgt_Lon = lon;
tracks.lastAssocTgt_alt = tracks.lastAssocTgt_range.*sind(tracks.lastAssocTgt_el) + fulltracks.INSAltitude;%One option to correct the alt values
% tracks.lastAssocTgt_alt = h;%The other option


    function out = datetimeHelper(x)
        out = datetime(x(1:end-1), 'InputFormat','uuuu-MM-dd''T''HH:mm:ss');
    end
end