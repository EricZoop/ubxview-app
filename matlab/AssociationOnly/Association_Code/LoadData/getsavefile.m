function savefile = getsavefile(input_folder, loadDetections)
arguments
    input_folder {mustBeFolder} = uigetdir(".", "Select Radar Data Folder to Load");
    loadDetections {mustBeNumericOrLogical} = 1;
end

savefolder = fullpath(input_folder, 'matfolder');
switch loadDetections
    case 0
        savefile = fullfile(savefolder, 'NoDetectionsBlogData.mat');
    case 1
        savefile = fullfile(savefolder, 'DetectionsBlogData.mat');
    case 2
        savefile = fullfile(savefolder, 'INSDetectionsBlogData.mat');
    otherwise
        savefile = fullfile(savefolder, 'NoDetectionsBlogData.mat');
end