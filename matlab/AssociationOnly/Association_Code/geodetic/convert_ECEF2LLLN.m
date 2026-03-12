%% convert_ECEF2LLLN
function [LLLN_pos, dcm_ECEF2LLLN] = convert_ECEF2LLLN(ref_lat_deg, ref_lon_deg, ref_alt, ECEF_pos) %#codegen

%
% title: convert from ECEF frame to LLLN frame
%           LLLN - Locally-Level Local North
%           ECEF - Earth-Centered, Earth-Fixed
%
% input: [ref_lat_deg, ref_lon_deg, ref_alt] - reference WGS84 location [deg, deg, m]
%        ECEF_pos - position in ECEF frame (xyz)
%
% returns: LLLN_pos - position in LLLN frame (xyz)
%          dcm_ECEF2LLLN - DCM LLLN to ECEF
%

persistent DEG2RAD;
if isempty(DEG2RAD)
    DEG2RAD = pi / 180;
end % if isempty(DEG2RAD)

% convert to radians
ref_lat = ref_lat_deg * DEG2RAD;
ref_lon = ref_lon_deg * DEG2RAD;

%% set ECEF offset
ECEF_offset = convert_WGS842ECEF(ref_lat_deg, ref_lon_deg, ref_alt);

%% convert ECEF to LLLN
% algorithm: Given a vector (N,W,U) in LLLN frame, its ECEF coordinates are:
%            X = -cos(lon) * sin(lat) * N + sin(lon) * W + cos(lon) * cos(lat) * U
%            Y = -sin(lon) * sin(lat) * N - cos(lon) * W + sin(lon) * cos(lat) * U
%            Z =  cos(lat)            * N + 0        * W + sin(lat)            * U
dcm_LLLN2ECEF = [                                                               ...
    -cos(ref_lon) * sin(ref_lat), +sin(ref_lon), +cos(ref_lon) * cos(ref_lat);  ...
    -sin(ref_lon) * sin(ref_lat), -cos(ref_lon), +sin(ref_lon) * cos(ref_lat);  ...
    +cos(ref_lat),                +0,            +sin(ref_lat);                 ...
    ];
dcm_ECEF2LLLN = dcm_LLLN2ECEF.';

LLLN_pos = dcm_ECEF2LLLN * (ECEF_pos - ECEF_offset);

end % function [LLLN_pos, dcm_ECEF2LLLN] = convert_ECEF2LLLN(ref_lat_deg, ref_lon_deg, ref_alt, ECEF_pos) %#codegen

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
