%% convert_WGS842ECEF
function ECEF_pos = convert_WGS842ECEF(lat_deg, lon_deg, alt) %#codegen

%
% title: convert from WGS84 to ECEF frame
%           ECEF - Earth-Centered, Earth-Fixed
%
% input: [lat_deg, lon_deg, alt] - WGS84 location [deg, deg, m]
%
% returns: ECEF_pos - ECEF position
%

persistent DEG2RAD;
if isempty(DEG2RAD)
    DEG2RAD = pi / 180;
end % if isempty(DEG2RAD)

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

% convert to radians
lat = lat_deg * DEG2RAD;
lon = lon_deg * DEG2RAD;

%% convert Loc. from WGS84 to ECEF
% algorithm: Assume: a = the earth's semi-major axis length, e = earth
%            eccentricity. Then:
%            1) rP (primary radius of curvature) is given by:
%               rP = a / sqrt(1 - e * e * sin(lat) * sin(lat)).
%            2) Latitudinal radius is given by:
%               latRadius = (rP + alt) * cos(lat).
%            3) ECEF coordinates are given by:
%               x = latRadius * cos(lon).
%               y = latRadius * sin(lon).
%               z = (rP * (1 - e * e) + alt) * sin(lat).

prime_curv_radius = EARTH_MAJ_AXIS / sqrt(1 - e_sqr * sin(lat) ^ 2);

lat_radius = (prime_curv_radius + alt) * cos(lat);

ECEF_pos = [                                            ...
    lat_radius * cos(lon);                              ...
    lat_radius * sin(lon);                              ...
    (prime_curv_radius * (1 - e_sqr) + alt) * sin(lat); ...
    ];

end % function ECEF_pos = convert_WGS842ECEF(lat_deg, lon_deg, alt) %#codegen

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%