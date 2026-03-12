function [labelNames,labelPairs,translateNames,trackDetectionPairs,detectionNames] = labelmaster(radarParameters)
labelNames = {
    'Lat' 'LATITUDE \circ' 1;
    'Lon' 'LONGITUDE \circ' 1;
    'Heading' 'HEADING \circ' 1;
    'Range' 'RANGE (M)' 1;
    'dateNum' 'DAYS SINCE 0 AD' 1;
    'Azimuth' 'AZIMUTH \circ' 1;
    'AzimuthGeo' 'AZIMUTH GEOGRAPHIC \circ' 1;
    'Elevation' 'ELEVATION \circ' 1;
    'TargetType' 'TargetType (ID)' 1;
    'Alt' 'ALTITUDE (M)' 1;
    'Alt2' 'ALTITUDE (M)' 1;
    'lastAssocTgt_rcs' 'RCS (M^2)' 1;
    'lastAssocTgt_rcs_dB' 'RCS dBm^2' 1;
    'TgtRCSAct' 'RCS (M^2)' 1;
    'TgtRCSActdB' 'dBm^2' 1;
    'Speed' 'Speed M/S' 1;
    'VelDopp' 'V_{doppler} (M/S)' 1;
    'ID' 'TRACK ID' 1;
    'elapsedTime' 'TIME (SECONDS)' 1;
    'positionNorth' 'POSITION NORTH (RADAR ORIGIN) (M)' 1;
    'positionWest' 'POSITION WEST (RADAR ORIGIN)(M)' 1;
    'positionUp' 'POSITION UP (RADAR ORIGIN)(M)' 1;
    'velocityNorth' 'SPEED NORTH (RADAR ORIGIN)(M/S)' 1;
    'velocityWest' 'SPEED WEST (RADAR ORIGIN)(M/S)' 1;
    'velocityUp' 'SPEED UP (RADAR ORIGIN) (M/S)' 1;
    'accelerationNorth' 'ACCELERATION NORTH (RADAR ORIGIN)(M/S^2)' 1;
    'accelerationWest' 'ACCELERATION WEST (RADAR ORIGIN)(M/S^2)' 1;
    'accelerationUp' 'ACCELERATION UP (RADAR ORIGIN) (M/S^2)' 1;
    'errorRange' '\Delta RANGE (M)' 1;
    'errorAz' '\Delta AZIMUTH \circ' 1;
    'errorEl' '\Delta ELEVATION \circ' 1;
    'errorAlt' '\Delta ALTITUDE (M)' 1;
    'errorDop' '\Delta Doppler (M/S)' 1;
    'errorLastAssocRange' 'LastAssoc \Delta RANGE (M)' 1;
    'errorLastAssocSlantRange' 'LastAssoc \Delta Slant RANGE (M)' 1;    
    'errorLastAssocAz' 'LastAssoc \Delta AZIMUTH \circ' 1;
    'errorLastAssocEl' 'LastAssoc \Delta ELEVATION \circ' 1;
    'errorLastAssocAlt' 'LastAssoc \Delta ALTITUDE (M)' 1;
    'errorLastAssocDop' 'LastAssoc \Delta Doppler (M/S)' 1;
    'lastAssocTgt_range' 'LastAssoc RANGE (M)' 2;
    'lastAssocTgt_rangeStd' 'LastAssoc RANGE (M) Std' 2;
    'lastAssocTgt_dopplerVel' 'LastAssoc V_{doppler} (M/S)' 2;
    'lastAssocTgt_dopplerVelStd' 'LastAssoc V_{doppler} (M/S) Std' 2;
    'lastAssocTgt_az' 'LastAssoc AZIMUTH \circ' 2;
    'lastAssocTgt_azStd' 'LastAssoc AZIMUTH Std\circ' 2;
    'lastAssocTgt_el' 'LastAssoc ELEVATION \circ' 2;
    'lastAssocTgt_elStd' 'LastAssoc ELEVATION Std\circ' 2;
    'lastAssocTgt_snrDb' 'LastAssoc SNR (dB)' 2;
    'lastAssocTgt_power' 'lastAssoc Power(dB)' 2;
    'lastAssocTgt_noise' 'lastAssoc Noise(dB)' 2;
    'lastAssocTgt_radar' 'lastAssoc Radar' 2;
    'lastAssocTgt_batchNum' 'lastAssocTgt_batchNum' 2;
    'lastAssocTgt_idInBatch' 'lastAssocTgt_idInBatch' 2;
    'lastAssocTgt_carrier_freq' 'lastAssoc Carrier Frequency (Ghz)' 2;
    'fileNumber' 'BLOG FILE NUMBER' 1;
    'lastAssocAge' 'Last association age' 1;
	'poo_lat', 'POO LATITUDE \circ', 1;
	'poo_lon', 'POO LONGITUDE \circ', 1;
	'poo_alt', 'POO ALTITUDE (M)', 1;
	'poo_range', 'POO RANGE (M)', 1;
	'poo_azimuth', 'POO AZIMUTH \circ', 1;
	'poo_cep', 'POO CEP (M)', 1;
	'poo_time2Poo', 'POO Time to POO (s)', 1;
	'poo_launchQe', 'POO Qe', 1;      
	'poi_lat', 'POI LATITUDE \circ', 1;
	'poi_lon', 'POI LONGITUDE \circ', 1;
	'poi_alt', 'POI ALTITUDE (M)', 1;
	'poi_range', 'POI RANGE (M)', 1;
	'poi_azimuth', 'POI AZIMUTH \circ', 1;
	'poi_cep', 'POI CEP (M)', 1;
	'poi_time2Poi', 'POI Time to POI (s)', 1;       
	'poi_impactQe', 'POI Qe', 1;        
    'highPriTrack','HIGH PRIORITY TRACK FLAG',1;
    'datetime', 'DATETIME', 1;
	};

%Variable name, description, continuous color, unknown
% Continous color 0 if variable has limited number of values.
detectionNames = {
    'steer_ind' 'STEERING INDEX (ID)' 0 1;
    'beam_type' 'BEAM TYPE' 0 1;
    'seq_id' 'SEQ ID' 0 1;
    'chan_id' 'CHAN ID' 0 1;
    'range' 'RANGE (M)' 1 1;
    'range_std' 'RANGE STD (M)' 1 1;
    'vel' 'DOPPLER VELOCITY (M/S)' 1 1;
    'vel_std' 'DOPPLER VELOCITY STD (M/S)' 1 1;
    'az' 'AZIMUTH (RADIANS)' 1 1;
    'az_std' 'AZIMUTH STD (RADIANS)' 1 1;
    'el' 'ELEVATION (RADIANS)' 1 1;
    'el_std' 'ELEVATION STD (RADIANS)' 1 1;
    'rcs_act' 'ACTUAL RADAR CROSS SECTION (M^2)' 1 1;
    'rcs_act_dB' 'ACTUAL RADAR CROSS SECTION (dBm^2)' 1 1;
    'rcs_prc' 'PROCESSED RADAR CROSS SECTION (M^2)' 1 1;
    'snr_dB' 'SNR (dB)' 1 1;
    'pwr_dBm' 'DETECTION POWER (dBm)' 1 1;
    'noise_dBm' 'NOISE POWER (dBm)' 1 1;
    'guard_noise_dBm' 'GUARD NOISE POWER (dBm)' 1 1;
    'rx_max2min_ratio' 'RECEIVER MAX2MIN RATIO' 1 1;
    'rdr_id' 'RADAR ID' 0 1;
    'n_dets' 'NUMBER DETECTION' 0 1;
    'det_lim_reached' 'DETECTION LIMIT REACHED' 0 1;
    'elGeo' 'ELEVATION \circ' 1 1;
    'azGeo' 'AZIMUTH \circ' 1 1;
    'Alt' 'ALTITUDE (M)' 1 1;
    'Lat' 'LATITUDE \circ' 1 1;
    'Lon' 'LONGITUDE \circ' 1 1;
    'datetime' 'DATETIME' 1 1;
    'carrier_freq' 'CARRIER FREQUENCY (GHz)' 0 1;
	};
track_detectionNames = {
    'steer_ind' 'STEERING INDEX (ID)' 0 1;
    'beam_type' 'BEAM TYPE' 0 1;
    'range' 'RANGE (M)' 1 1;
    'range_std' 'RANGE STD (M)' 1 1;
    'vel' 'DOPPLER VELOCITY (M/S)' 1 1;
    'vel_std' 'DOPPLER VELOCITY STD (M/S)' 1 1;
    'az' 'AZIMUTH (RADIANS)' 1 1;
    'az_std' 'AZIMUTH STD (RADIANS)' 1 1;
    'el' 'ELEVATION (RADIANS)' 1 1;
    'el_std' 'ELEVATION STD (RADIANS)' 1 1;
    'rcs_act' 'ACTUAL RADAR CROSS SECTION (M^2)' 1 1;
    'rcs_prc' 'PROCESSED RADAR CROSS SECTION (M^2)' 1 1;
    'snr_dB' 'SNR (dB)' 1 1;
    'pwr_dBm' 'DETECTION POWER (dBm)' 1 1;
    'noise_dBm' 'NOISE POWER (dBm)' 1 1;
    'guard_noise_dBm' 'GUARD NOISE POWER (dBm)' 1 1;
    'rx_max2min_ratio' 'RECEIVER MAX2MIN RATIO' 1 1;
    'rcs_act_dB' 'RADAR CROSS SECTION (dBm^2)' 1 1;
    'rdr_id' 'RADAR ID' 0 1;
    'n_dets' 'NUMBER DETECTION' 0 1;
    'det_lim_reached' 'DETECTION LIMIT REACHED' 0 1;
    'elGeo' 'ELEVATION \circ' 1 1;
    'azGeo' 'AZIMUTH \circ' 1 1;
    'Alt' 'ALTITUDE (M)' 1 1;
    'Lat' 'LATITUDE \circ' 1 1;
    'Lon' 'LONGITUDE \circ' 1 1;
    'datetime' 'DATETIME' 1 1;
    };

% Display name, variable name, scale factor
translateNames = {
    'Lat' 'track_lat' 180/pi;
    'Lon' 'track_lon' 180/pi;
    'Range' 'track_range' 1;
    %'Heading' 'Heading' 1;
    'RangeStd' 'track_rangeStd' 1;
    'dateNum' 'dateNum' 1;
    'Azimuth' 'track_az' 180/pi;
    'Elevation' 'track_el' 180/pi;
    'TargetType' 'targetType' 1;
    'headerTimeTag' 'headerTimeTag' 1;
    'Alt' 'track_alt' 1;
    'TgtRCSAct' 'trackRcs' 1;
    'VelDopp' 'track_doppVel' 1;
    'ID' 'trackIdInt' 1;
    'extID' 'trackIdExt' 1;
    'lastAssocTgt_range' 'lastAssocTgt_range' 1;
    'lastAssocTgt_rangeStd' 'lastAssocTgt_rangeStd' 1;
    'lastAssocTgt_dopplerVel' 'lastAssocTgt_dopplerVel' 1;
    'lastAssocTgt_dopplerVelStd' 'lastAssocTgt_dopplerVelStd' 1;
    'lastAssocTgt_az' 'lastAssocTgt_az' 180/pi;
    'lastAssocTgt_azStd' 'lastAssocTgt_azStd' 180/pi;
    'lastAssocTgt_el' 'lastAssocTgt_el' 180/pi;
    'lastAssocTgt_elStd' 'lastAssocTgt_elStd' 180/pi;
    'lastAssocTgt_snrDb' 'lastAssocTgt_snrDb' 1;
    'lastAssocTgt_rcs' 'lastAssocTgt_rcs' 1;
    'lastAssocTgt_power' 'lastAssocTgt_power' 1;
    'lastAssocTgt_noise' 'lastAssocTgt_noise' 1;
    'lastAssocTgt_radar' 'lastAssocTgt_info' 1;
    'lastAssocTgt_batchNum' 'lastAssocTgt_batchNum' 1;
    'lastAssocTgt_idInBatch' 'lastAssocTgt_idInBatch' 1;
    %'lastAssocTgt_carrier_freq' 'lastAssocTgt_carrier_freq' 1;
    'batchtime' 'trackTtUs' 1;
    'lastAssocAge' 'lastAssocAge' 1;
    'flags' 'flags' 1;
	'poo_lat', 'poo_lat', 180/pi;
	'poo_lon', 'poo_lon', 180/pi;
	'poo_alt', 'poo_alt', 1;
	'poo_range', 'poo_range', 1;
	'poo_azimuth', 'poo_azimuth', 180/pi;
	'poo_cep', 'poo_cep', 1;
	'poo_time2Poo', 'poo_time2Poo', 1;
	'poo_launchQe', 'poo_launchQe', 1;            
	'poi_lat', 'poi_lat', 180/pi;
	'poi_lon', 'poi_lon', 180/pi;
	'poi_alt', 'poi_alt', 1;
	'poi_range', 'poi_range', 1;
	'poi_azimuth', 'poi_azimuth', 180/pi;
	'poi_cep', 'poi_cep', 1;
	'poi_time2Poi', 'poi_time2Poi', 1;
	'poi_impactQe', 'poi_impactQe', 1;    
    'positionNorth','track_posNo', 1;
    'positionNorthStd','track_posNoStd',1;
    'positionWest','track_posWe', 1;
    'positionWestStd','track_posWeStd', 1;
    'positionUp','track_posUp', 1;
    'positionUpStd','track_posUpStd', 1;
    'velocityNorth','track_velNo', 1;
    'velocityNorthStd','track_velNoStd',1;
    'velocityWest','track_velWe',1;
    'velocityWestStd','track_velWeStd', 1;
    'velocityUp','track_velUp', 1;
    'velocityUpStd','track_velUpStd', 1;
	%Only in version 14 track records. Set to NaN for earlier data
    'flags2' 'flags2' 1;
    'highPriTrack' 'highPriTrack' 1;
    'EBF_reason' 'EBF_reason' 1;    
    };

% First is track field, second is track associated detection field, third
% is detection field.
trackDetectionPairs = {
    'errorRange'  'lastAssocTgt_range' 'errorRange';
    'Range'  'lastAssocTgt_range' 'range';
    'errorAz' '' 'errorAz';    
    'Azimuth' 'lastAssocTgt_az' 'azGeo';
    'errorEl' '' 'errorEl';
    'Elevation' 'lastAssocTgt_el' 'elGeo';
    'errorDop' 'lastAssocTgt_dopplerVel' 'errorDop';
    'VelDopp' 'lastAssocTgt_dopplerVel' 'vel';
    'TgtRCSAct' 'lastAssocTgt_rcs' 'rcs_act';
    'TgtRCSActdB' 'lastAssocTgt_rcs_dB' 'rcs_act_dB';
    '', 'lastAssocTgt_snrDb', 'snr_dB';
    'errorAlt' 'lastAssocTgt_alt', 'errorAlt';    
    'Alt' 'lastAssocTgt_alt', 'Alt';
    'elapsedTime' 'elapsedTime' 'elapsedTime';
    'dateNum' 'dateNum' 'dateNum';
    'Lat' 'lastAssocTgt_Lat' 'Lat';
    'Lon' 'lastAssocTgt_Lon' 'Lon';
    % rdr_id isn't really right but not sure this is really useful.
    'loadId', 'lastAssocTgt_loadId', 'rdr_id';
    'datetime', 'datetime', 'datetime';
    };
% First is track associated detection field, second is track field
labelPairs= {
    'lastAssocTgt_range' 'Range' ;
    'lastAssocTgt_az' 'Azimuth';
    'lastAssocTgt_el' 'Elevation' ;
    'lastAssocTgt_alt' 'Alt' ;
    'lastAssocTgt_rcs' 'TgtRCSAct';
    'lastAssocTgt_rcs_dB', 'TgtRCSActdB';
    'lastAssocTgt_dopplerVel', 'VelDopp';
    };
try
% Add the test point variables from emlswid.txt
if exist('radarParameters','var')
    index = strfind(radarParameters.testpoints, 'TF #');
    index = find(~cellfun(@isempty,index'));
    if numel(index) > 0
        lastTest = 0;
        for n = (index(1)+1):numel(radarParameters.testpoints)
            num = regexp(radarParameters.testpoints{n}, ' (.*):','tokens');
            num = num{1};
            num = num2str(str2double(num{1}));
            if str2double(num) < lastTest
                break;
            end
            lastTest = str2double(num);
            labelNames{end+1, 1} = ['Test' num];
            labelNames{end, 2} = radarParameters.testpoints{n};
            labelNames{end, 3} = 1;
            
            track_detectionNames{end+1, 1} = ['Test' num2str(n)];
            track_detectionNames{end, 2} = radarParameters.testpoints{n};
            track_detectionNames{end, 3} = 1;
            track_detectionNames{end, 4} = 1;
            
            translateNames{end+1, 1} = ['Test' num];
            translateNames{end, 2} = ['test' num];
            translateNames{end, 3} = 1;            
        end
    end
end
catch
end
