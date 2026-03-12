%% convert_LLLN2WGS84
function [tgt_lat_deg, tgt_lon_deg, tgt_alt] = convert_LLLN2WGS84(ref_lat_deg, ref_lon_deg, ref_alt, LLLN_pos) %#codegen

%
% title: convert from Locally-Level Local North frame to WGS84.
%
% input: [ref_lat_deg, ref_lon_deg, ref_alt] - reference WGS84 location [deg, deg, m]
%        LLLN_pos - position in LLLN frame (xyz)
%
% returns: [tgt_lat_deg, tgt_lon_deg, tgt_alt] - target WGS84 location [deg, deg, m]
%

%% convert LLLN to ECEF
ECEF_pos = convert_LLLN2ECEF(ref_lat_deg, ref_lon_deg, ref_alt, LLLN_pos);

%% convert ECEF to WGS84
[tgt_lat_deg, tgt_lon_deg, tgt_alt] = convert_ECEF2WGS84(ECEF_pos);

end % function [tgt_lat_deg, tgt_lon_deg, tgt_alt] = convert_LLLN2WGS84(ref_lat_deg, ref_lon_deg, ref_alt, LLLN_pos) %#codegen

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
