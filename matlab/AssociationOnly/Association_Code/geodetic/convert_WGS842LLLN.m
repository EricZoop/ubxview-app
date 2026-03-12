%% convert_WGS842LLLN
function LLLN_pos = convert_WGS842LLLN(ref_lat_deg, ref_lon_deg, ref_alt, tgt_lat_deg, tgt_lon_deg, tgt_alt) %#codegen

%
% title: convert from WGS84 to Locally-Level Local North frame
%
% input: [ref_lat_deg, ref_lon_deg, ref_alt] - reference    WGS84 location [deg, deg, m]
%        [tgt_lat_deg, tgt_lon_deg, tgt_alt] - target       WGS84 location [deg, deg, m]
%
% returns: LLLN_pos - LLLN position
%

%% set target ECEF
tgt_ECEF = convert_WGS842ECEF(tgt_lat_deg, tgt_lon_deg, tgt_alt);

%% convert ECEF to LLLN
LLLN_pos = convert_ECEF2LLLN(ref_lat_deg, ref_lon_deg, ref_alt, tgt_ECEF);

end % function LLLN_pos = convert_WGS842LLLN(ref_lat_deg, ref_lon_deg, ref_alt, tgt_lat_deg, tgt_lon_deg, tgt_alt) %#codegen

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
