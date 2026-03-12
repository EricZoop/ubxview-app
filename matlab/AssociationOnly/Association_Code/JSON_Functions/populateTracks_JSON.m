function tracks = populateTracks_JSON(jsonData, trackIdx, dateTimestamps, radar)
    
    %Obtain the lastAssoc fields, if interpolated, trace back to most recent value
    sourceRadar = [jsonData.points(trackIdx).source];
    sourceRadar = [sourceRadar(:).Radar];
    try
        lastAssoc = [sourceRadar(:).last_associated_target];%Will succeed without interpolated track values
    catch
        %Interpolated track case
        
        uniqueTracks = unique([jsonData.points(trackIdx).track_id]);
        removeIndices = zeros(1,length(trackIdx));
        removeCount = 0;
        nanStruct = struct('range', NaN, 'range_sd', NaN, 'azimuth', NaN, 'azimuth_sd', NaN,...
                                           'elevation', NaN, 'elevation_sd', NaN, 'doppler_vel', NaN, 'doppler_vel_sd', NaN);
        for iTrack = 1:numel(uniqueTracks)
            %Obtain track indices
            currentIndices = [jsonData.points(trackIdx).track_id] == uniqueTracks(iTrack);
            currentIndices = find(currentIndices == 1);
            currentSourceRadar = sourceRadar(currentIndices);

            %Identify the entries that have been populated
            nonMissingIndices = ~arrayfun(@ismissing, [currentSourceRadar(:).radar_face]);
            nonMissingIndices = find(nonMissingIndices==1);
            
            %Fill in the missing (interpolated) indices
            for iFill = 1:numel(nonMissingIndices)
                
                if iFill ~= numel(nonMissingIndices) && iFill ~= 1%Fill indices between the first and the last one
                    betweenInds = nonMissingIndices(iFill)+1:nonMissingIndices(iFill+1)-1;
                elseif iFill ~= numel(nonMissingIndices) && iFill == 1
                    if nonMissingIndices(iFill) == 1%First index isn't missing, proceed as normal
                        betweenInds = 2:nonMissingIndices(iFill+1)-1;
                    else%First few indices are missing, fill with NaNs
                        [currentSourceRadar(1:nonMissingIndices(iFill)-1).radar_face] = deal(NaN);
                        % nanStruct = struct('range', NaN, 'range_sd', NaN, 'azimuth', NaN, 'azimuth_sd', NaN,...
                        %                    'elevation', NaN, 'elevation_sd', NaN, 'doppler_vel', NaN, 'doppler_vel_sd', NaN);
                        [currentSourceRadar(1:nonMissingIndices(iFill)-1).last_associated_target] = deal(nanStruct);

                        betweenInds = nonMissingIndices(iFill)+1:nonMissingIndices(iFill+1)-1;
                    end
                else%Last fill index case, just repeat until the end of currentSourceRadar
                    betweenInds = nonMissingIndices(iFill)+1:length(currentSourceRadar);
                end
                [currentSourceRadar(betweenInds).radar_face] = deal(currentSourceRadar(nonMissingIndices(iFill)).radar_face);
                % [currentSourceRadar(betweenInds).last_associated_target] = deal(currentSourceRadar(nonMissingIndices(iFill)).last_associated_target);
                [currentSourceRadar(betweenInds).last_associated_target] = deal(nanStruct);
                
            end
            sourceRadar(currentIndices) = currentSourceRadar;
        end
        
        lastAssoc = [sourceRadar(:).last_associated_target];
    end

    %Begin populating track entries 
    tracks.datetime = dateTimestamps(trackIdx);
    tracks.dateNum = datenum(tracks.datetime);
    tracks.ID = [jsonData.points(trackIdx).track_id];

    trackLocation = [jsonData.points(trackIdx).location];
    tracks.Lat = [trackLocation(:).latitude].*(180/pi);
    tracks.Lon = [trackLocation(:).longitude].*(180/pi);
    tracks.Alt = [trackLocation(:).altitude];
    tracks.registrationID = [jsonData.points(trackIdx).registration_id];
    
    [a,e,r] = geodetic2aer(tracks.Lat, tracks.Lon, tracks.Alt, ...
                           radar.lat, radar.long, radar.altitude, wgs84Ellipsoid);
    tracks.Azimuth = a;
    tracks.Elevation = e;
    tracks.Range = r;
    
    tracks.lastAssocTgt_range = [lastAssoc(:).range];
    tracks.lastAssocTgt_rangeStd = [lastAssoc(:).range_sd];
    
    tracks.lastAssocTgt_az = [lastAssoc(:).azimuth].*(180/pi);
    tracks.lastAssocTgt_az(tracks.lastAssocTgt_az < 0) = 360 + tracks.lastAssocTgt_az(tracks.lastAssocTgt_az < 0);%Correcting for any values below 0
    tracks.lastAssocTgt_az(tracks.lastAssocTgt_az > 360) = tracks.lastAssocTgt_az(tracks.lastAssocTgt_az > 360) - 360;%Correcting for any values above 360

    tracks.lastAssocTgt_azStd = [lastAssoc(:).azimuth_sd].*(180/pi);
    tracks.lastAssocTgt_el = [lastAssoc(:).elevation].*(180/pi);
    tracks.lastAssocTgt_elStd = [lastAssoc(:).elevation_sd].*(180/pi);
    tracks.lastAssocTgt_dopplerVel = [lastAssoc(:).doppler_vel];
    tracks.lastAssocTgt_dopplerVelStd = [lastAssoc(:).doppler_vel_sd];

    %TODO: Determine if the +1 should come from json
    tracks.lastAssocTgt_radar = [sourceRadar(:).radar_face]+1;
    %End TODO

    [lat,lon, h] = aer2geodetic( real(tracks.lastAssocTgt_az),real(tracks.lastAssocTgt_el),real( tracks.lastAssocTgt_range),...
        radar.lat,radar.long, radar.altitude,wgs84Ellipsoid);
    tracks.lastAssocTgt_Lat = lat;
    tracks.lastAssocTgt_Lon = lon;
    tracks.lastAssocTgt_alt = tracks.lastAssocTgt_range.*sind(tracks.lastAssocTgt_el) + radar.altitude;%One option to correct the alt values
    % tracks.lastAssocTgt_alt = h;%The other option
    

    tracks.lastAssocAge = [sourceRadar(:).time_since_last_association];
    
    %Populate the position & velocity fields
    sourceRadarPosition = [sourceRadar(:).position];
    sourceRadarPositionStd = [sourceRadarPosition(:).vector3_error];
    sourceRadarPosition = [sourceRadarPosition(:).vector3];
    
    sourceRadarVelocity = [sourceRadar(:).velocity];
    sourceRadarVelocityStd = [sourceRadarVelocity(:).vector3_error];
    sourceRadarVelocity = [sourceRadarVelocity(:).vector3];

    tracks.positionNorth = [sourceRadarPosition(:).x];
    tracks.positionWest = [sourceRadarPosition(:).y];
    tracks.positionUp = [sourceRadarPosition(:).z];
    tracks.positionNorthStd = [sourceRadarPositionStd(:).x];
    tracks.positionWestStd = [sourceRadarPositionStd(:).y];
    tracks.positionUpStd = [sourceRadarPositionStd(:).z];
    
    tracks.velocityNorth = [sourceRadarVelocity(:).x];
    tracks.velocityWest = [sourceRadarVelocity(:).y];
    tracks.velocityUp = [sourceRadarVelocity(:).z];
    tracks.velocityNorthStd = [sourceRadarVelocityStd(:).x];
    tracks.velocityWestStd = [sourceRadarVelocityStd(:).y];
    tracks.velocityUpStd = [sourceRadarVelocityStd(:).z];

end