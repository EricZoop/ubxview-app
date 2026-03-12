%% convert_ECEF2WGS84
function [lat_deg, lon_deg, alt] = convert_ECEF2WGS84(ECEF_pos) %#codegen

%
% title: convert from ECEF frame to WGS84
%           ECEF - Earth-Centered, Earth-Fixed
%
% input: ECEF_pos - ECEF position
%
% returns: [lat_deg, lon_deg, alt] - WGS84 location [deg, deg, m]
%

persistent RAD2DEG;
if isempty(RAD2DEG)
    RAD2DEG = 180 / pi;
end % if isempty(RAD2DEG)

% earth's major axis length - equatorial radius
persistent EARTH_MAJ_AXIS;
if isempty(EARTH_MAJ_AXIS)
    EARTH_MAJ_AXIS = 6378137.0;
end % if isempty(EARTH_MAJ_AXIS)

% first earth's eccentricity
persistent EARTH_ECCENT;
if isempty(EARTH_ECCENT)
    EARTH_ECCENT = 0.0818191908426135; 
end % if isempty(EARTH_ECCENT)

% eccentricity squared
persistent e_sqr;
if isempty(e_sqr)
    e_sqr = EARTH_ECCENT ^ 2;
end % if isempty(e_sqr)

% constants
MAX_ITER    = 10;
MIN_ITER    = 2;
MAX_LAT_ERR = 1e-6;

x_ECEF = ECEF_pos(1);
y_ECEF = ECEF_pos(2);
z_ECEF = ECEF_pos(3);

%% convert ECEF to WGS84
% algorithm: 1) Longitude = atan2(y, x).
%            2) Let p = sqrt(x * x + y * y).
%            3) Compute geodetic latitude and altitude:
%               3.1) Set initial value: lat = atan(z / (p * (1 - e_sqr))).
%               3.2) Iterate a maximum of MAX_ITER iterations:
%                    3.2.1) Let n = EARTH_MAJ_AXIS / sqrt(1 - e_sqr * sin(lat) ^ 2).
%                    3.2.2) alt = p / cos(lat) - n.
%                    3.2.3) lat = atan(z / (p * (1 - e_sqr * n / (n + alt)))).
%                    3.2.4) If performed a minimum of MIN_ITER iterations and
%                           latitude change since last iteration is <=
%                           MAX_LAT_ERR - assume convergence.

if x_ECEF == 0
    lon = pi; % [rad]
else
    lon = atan2(y_ECEF, x_ECEF); % [rad]
end % if x_ECEF == 0

p = sqrt(x_ECEF ^ 2 + y_ECEF ^ 2);
lat = atan(z_ECEF / (p * (1 - e_sqr)));

if p == 0
    lat = (pi / 2 * (z_ECEF >= 0) + -pi / 2 * (z_ECEF < 0));
    alt = z_ECEF - EARTH_MAJ_AXIS;
else
    for i_iter = 1 : MAX_ITER
        lat_prev = lat;

        n = EARTH_MAJ_AXIS / sqrt(1 - e_sqr * sin(lat) ^ 2);

        alt = p / cos(lat) - n;

        lat = atan(z_ECEF / (p * (1 - e_sqr * n / (n + alt))));

        if i_iter > MIN_ITER && abs(lat - lat_prev) < MAX_LAT_ERR
            % convert to degrees
            lat_deg = lat * RAD2DEG;
            lon_deg = lon * RAD2DEG;
            return;
        end % if i_iter > n_min_iter && abs(lat - lat_prev) < MAX_LAT_ERR

    end % for i_iter = 1 : n_iter
end % if p == 0

% convert to degrees
lat_deg = lat * RAD2DEG;
lon_deg = lon * RAD2DEG;

end % function [lat_deg, lon_deg, alt] = convert_ECEF2WGS84(ECEF_pos) %#codegen

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
