function [tracks] = applyalignment(tracks,status,radar,alignFace)
% meanVehPos = [mean(status.Lat); mean(status.Lon); mean(status.Alt)];
meanVehPos = [median(status.Lat); median(status.Lon); median(status.Alt)];

ButtonName = questdlg('Apply Alignment to last associated values?', ...
                         'VIQ', ...
                         'Yes', 'No','Yes');
lastAssociated = false;
if(strcmp(ButtonName,'Yes'))
    lastAssociated =  true;
end
for face = 1:4
    if ~alignFace.goodCal{face}
        continue;
    end
    trackInd = find(tracks.lastAssocTgt_radar==face);
    %     svRadar  = [tracks.Range(trackInd).*sind(tracks.Azimuth(trackInd)).*cosd(tracks.Elevation(trackInd));...
    %                tracks.Range(trackInd).*cosd(tracks.Azimuth(trackInd)).*cosd(tracks.Elevation(trackInd));...
    %                tracks.Range(trackInd).*sind(tracks.Elevation(trackInd))];
    svRadar =[tracks.positionNorth(trackInd);tracks.positionWest(trackInd);tracks.positionUp(trackInd)];
    svRadar = alignFace.radar2geoDCM{face}* alignFace.radarDcm{face}*svRadar;
    tracks.positionNorth(trackInd) = svRadar(1,:);
    tracks.positionWest(trackInd) = svRadar(2,:);
    tracks.positionUp(trackInd) = svRadar(3,:);
    [tracks.Lat(trackInd), tracks.Lon(trackInd), tracks.Alt(trackInd)] = ned2geodetic(tracks.positionNorth(trackInd), ...
        -tracks.positionWest(trackInd),...
        -tracks.positionUp(trackInd),...
        meanVehPos(1),meanVehPos(2),meanVehPos(3), wgs84Ellipsoid);
    [tracks.Azimuth(trackInd), tracks.Elevation(trackInd), tracks.Range(trackInd)]  =   geodetic2aer(tracks.Lat(trackInd),...
        tracks.Lon(trackInd),...
        tracks.Alt(trackInd),...
        meanVehPos(1),meanVehPos(2),meanVehPos(3), wgs84Ellipsoid);
    if(lastAssociated)
        [xNorth, yEast, zDown] = aer2ned(tracks.lastAssocTgt_az(trackInd), tracks.lastAssocTgt_el(trackInd), tracks.lastAssocTgt_range(trackInd));
        svRadar =[xNorth;-yEast;-zDown];
        svRadar = alignFace.radar2geoDCM{face}* alignFace.radarDcm{face}*svRadar;
        
        [az,el,range] = ned2aer(svRadar(1,:), ...
            -svRadar(2,:),...
            -svRadar(3,:));
        tracks.lastAssocTgt_az(trackInd) = az;
        tracks.lastAssocTgt_el(trackInd) = el;
        tracks.lastAssocTgt_range(trackInd) = range;
    end
end