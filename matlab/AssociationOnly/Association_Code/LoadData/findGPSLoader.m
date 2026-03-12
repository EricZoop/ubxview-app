function loader = findGPSLoader(filename)
% Try to find correct data parser based on file name
%
% Inputs:
%   - filename: (str) Path to gps data.
%
% Outputs:
%   - loader: (function_handle) Function to be called
%
% Author: Isaac Dekine
% Created: 2022
%
%  Edit History:
% ---[INTTST-878] Ray Goulet 2023-07-25---
% Last Edit:
%   David Monk 2024-10-18
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
loader = [];
if contains(filename, "DJIFlightRecord") || contains(filename, "dji_fr.csv")
%     loader = str2func("@parse_DJI_Mavic2"); %Removed for generalised Drone Link Parser
    loader = str2func("@parse_Dronelink");
elseif contains(filename, ".gpx")
    loader = str2func("@parse_gpx");    
elseif contains(filename, "Piccolo")
    loader = str2func("@parse_piccolo");    
elseif contains(filename, 'pod') && endsWith(filename, '.log')
    loader = str2func("@parse_pod");
elseif contains(filename, ".log")
    loader = str2func("@parse_log_opterra");
elseif contains(filename, "FLY")
    loader = str2func("@parse_DatCon");    
elseif contains(filename, "-data")
    loader = str2func("@parse_converted_kml");
elseif contains(filename, ".pos")
    loader = str2func("@parse_pos");      
elseif contains(filename, "APStruth.csv")
    loader = str2func("@parse_APSzipline");
elseif contains(filename, "adsblog.csv")
    loader = str2func("@parse_adsb");
elseif endsWith(filename, "assoc.csv")
    loader = str2func("@parse_assoc");
elseif contains(filename, "MP_GPS_") && contains(filename, ".csv")
    loader = str2func("@parse_MP_GPS");
elseif contains(filename, "Disco_") && contains(filename, ".csv")
    loader = str2func("@parse_disco");
elseif endsWith(filename, '.kml', 'IgnoreCase', true)...
        || endsWith(filename, '.kmz', 'IgnoreCase', true)
elseif contains(filename, "TTL") && contains(filename, ".csv")
    loader = str2func("@parse_ttl");
elseif contains(filename, "sim.csv") || contains(filename, ".drone")
    loader = str2func("@parse_sim");
elseif contains(filename, 'TSPI.csv')
    loader = str2func("@parse_tspi");
elseif contains(filename, '.ubx')
    loader = str2func("@parse_UBX");
elseif contains(filename, 'ITEL')
    loader = str2func("@parse_OrionGNSS");
elseif contains(filename, 'Plane1_Truth')
    loader = str2func("@parse_ubx1");
elseif contains(filename, 'Dronetag')
    loader = str2func("@parse_DroneTag");
    
    
end
