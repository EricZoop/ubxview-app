function addpath2(path_in)
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%ADDPATH2 Adds path and subdirectories while avoiding hidden folcers.
%   Avoids hidden directories when adding path to Matlab, to decrease the
%   time required to run addpath by avoiding version control directories.
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
arguments
    path_in = pwd;
end
try
dirs = dir(path_in);
dirs = dirs([dirs.isdir]);
str_dir = strcat(dirs(1).folder, filesep);
for i = 1:length(dirs)
    if ~contains(dirs(i).name, '.')
            path_full = fullfile(str_dir, dirs(i).name);
        addpath(genpath(path_full));
    end
end
catch
end
end

