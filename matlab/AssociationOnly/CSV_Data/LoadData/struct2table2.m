function [t] = struct2table2(s)
%STRUCT2TABLE2 Creates a table from a struct and checks that all fields are
%oreiented properly
%
% Inputs:
%   - s: (struct) Struct to convert.
%
% Output:
%   - t: (table) Table
%
% Moved from mode_files/tools/beam_position_viewer.mlapp
% File Author: Ray Goulet
% Moved: 2023-05-18
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
if istable(s) || isempty(s)
    t = s;
    return;
end
if ~isstruct(s)
    error('Input variable must be a struct.')
end
if size(s, 2) ==1
    fn = fieldnames(s);
    for i = 1:length(fn)
        sz = size(s.(fn{i}));
        if sz(2) > sz(1)
            s.(fn{i}) = s.(fn{i})';
        end
    end
end
t = struct2table(s);
end