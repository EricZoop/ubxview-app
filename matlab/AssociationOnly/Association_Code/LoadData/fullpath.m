function output_path =  fullpath(input_folder, appended_folder)
% I was tired of having to check if the folder existed when creating a new
% folder and then mkdir that folder so this function will do all the work
% for me without the extra characters
arguments
    input_folder {mustBeFolder}
    appended_folder {mustBeText}
end

output_path = fullfile(input_folder, appended_folder);
if ~isfolder(output_path)
    mkdir(output_path);
end