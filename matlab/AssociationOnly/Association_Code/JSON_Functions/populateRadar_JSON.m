function radar = populateRadar_JSON(jsonData)

    radar.lat = jsonData.radar_system.geod_location.latitude;
    if radar.lat == 0
        radar.otm = true;
    else
        radar.otm = false;
        radar.long = jsonData.radar_system.geod_location.longitude;
        radar.altitude = jsonData.radar_system.geod_location.altitude;
        radar.heading = jsonData.radar_system.llln_to_vehicle.heading;
        radar.roll = jsonData.radar_system.llln_to_vehicle.roll;
        radar.pitch = jsonData.radar_system.llln_to_vehicle.pitch;
    end
    
    radars = jsonData.radar_system.radars(:);
    vehicle_to_fixture = [radars(:).vehicle_to_fixture];
    fixture_coords = [radars(:).fixture_coords];
    fixture_body = [radars(:).fixture_body];
    body_coords = [radars(:).body_coords];
    
    radar.vehicleToFixture.Roll = [vehicle_to_fixture(:).roll];
    radar.vehicleToFixture.Pitch = [vehicle_to_fixture(:).pitch];
    radar.vehicleToFixture.Heading = [vehicle_to_fixture(:).heading];
    
    radar.FixtureCoords.VecX = [fixture_coords(:).x];
    radar.FixtureCoords.VecY = [fixture_coords(:).y];
    radar.FixtureCoords.VecZ = [fixture_coords(:).z];
    
    radar.FixtureToBody.Heading = [fixture_body(:).heading];
    radar.FixtureToBody.Pitch = [fixture_body(:).pitch];
    radar.FixtureToBody.Roll = [fixture_body(:).roll];
    
    radar.BodyCoords.VecX = [body_coords(:).x];
    radar.BodyCoords.VecY = [body_coords(:).y];
    radar.BodyCoords.VecZ = [body_coords(:).z];
    
    %TODO: Get enabled from .json 
    radar.enabled = ones(1,numel(radar.vehicleToFixture.Roll));
    radar.faceIds = [radars(:).id];
    % radar.enabled([radars(:).id]+1) = 1;
    %End TODO
    
    radar.UseEllipsoidAlt = jsonData.radar_system.use_ellipsoid_altitude;
    radar.PlatformName = jsonData.radar_system.system_id;
end