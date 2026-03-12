function [azBeam,elBeam] = getBeamwidths(radarName)
%GETBEAMWIDTHS Gets beamwidths for radars
%
% Inputs:
%   - radarName: (str) Radar type from ProcParams.xml
%
% Output:
%   - azBeam: (double) Azimuthal beamwidth in degrees.
%   - elBeam: (double) Elevation beamwidth in degrees.
%
% Moved from mode_files/tools/beam_position_viewer.mlapp
% File Author: Ray Goulet
% Moved: 2022-12-28
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
switch lower(radarName)
    case "mhr"
        azBeam = 15.1;
        elBeam = 15.1;
    case "echr"
        azBeam = 13.6;
        elBeam = 25.3;            
    case "achr"
        azBeam = 16.0;
        elBeam = 26.4;
    case "iemhr"
        azBeam = 8.6;
        elBeam = 8.6;
    case "nmhr"
        azBeam = [12.5, 23, 34];
        elBeam = 3;
    case "exmhr"
        azBeam = 7;
        elBeam = 7;
    otherwise
        warning('Radar type %s not recognized, assuming MHR', radarName)
        azBeam = 15.1;
        elBeam = 15.1;
end   
end

