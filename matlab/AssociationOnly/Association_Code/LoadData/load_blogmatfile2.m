function [tracks,radar,status,detections,radarParameters,detectionParameters] = load_blogmatfile2(input_file)


load(input_file);

%% handle the case where I saved out detectionParameters2 and 3
if exist("detectionParameters2", 'var')
    if ~isempty(detectionParameters2)
        for ii = 1:size(detectionParameters2, 3)
            temp_struct(ii).steer_inx   = squeeze(detectionParameters2(1, :, ii)');
            temp_struct(ii).steer_range = squeeze(detectionParameters2(2, :, ii)');
            temp_struct(ii).steer_az    = squeeze(detectionParameters2(3, :, ii)');
            temp_struct(ii).steer_el    = squeeze(detectionParameters2(4, :, ii)');
            temp_struct(ii).track_id    = squeeze(detectionParameters3(1, :, ii)');
        end
        temp_table = struct2table2(temp_struct);
        detectionParameters = [detectionParameters, temp_table];
    end
end
%% handle the case where rx_data is saved out specificly from the detections structure
if exist("rx_data", 'var')
    if ~isempty(rx_data)
        temp_rx = struct;
        for i = 1:size(rx_data,2)
            temp_rx_data{i} = rx_data(:,i);
        end
        temp_rx.rx_data = temp_rx_data;
        temp_rx = struct2table2(temp_rx);
        detections = [detections, temp_rx];
    end
end
%% for the cases where I save off data that has dp_ aka detectionParameters or detects_ detection fields saved as their own variables
variables = whos;

for i_vars = 1:length(variables)
    variable = variables(i_vars).name;
    if startsWith(variable, 'dp_')
        temp_struct = struct;
        eval_str = strcat('temp_struct.(variable) =  num2cell(', variable, ',1);');
        eval(eval_str);
        temp_table = struct2table2(temp_struct);
        if size(detectionParameters, 1) == size(temp_table, 1)
            detectionParameters = [detectionParameters, temp_table];
        end
        clear(variable)
    end
    if startsWith(variable, 'detects')
        temp_struct = struct;
        eval_str = strcat('temp_struct.(variable) =  num2cell(', variable, ',1);');
        eval(eval_str);
        temp_table = struct2table2(temp_struct);
        detections = [detections, temp_table];
        clear(variable)
    end
end

if istable(tracks)
    tracks = table2struct(tracks, "ToScalar", true);
    tracks = structfun(@transpose, tracks, 'UniformOutput', false);
end
if istable(status)
    status = table2struct(status, "ToScalar", true);
    status = structfun(@transpose, status, 'UniformOutput', false);
end
if istable(detections)
    detections = table2struct(detections, "ToScalar", true);
    detections = structfun(@transpose, detections, 'UniformOutput', false);
end
if istable(detectionParameters)
    detectionParameters = table2struct(detectionParameters, "ToScalar", true);
    detectionParameters = structfun(@transpose, detectionParameters, 'UniformOutput', false);
    detectionParameters = soa2aos(detectionParameters);
end