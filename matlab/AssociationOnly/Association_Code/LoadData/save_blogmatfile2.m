function save_blogmatfile2(savefile,tracks,radar,status,detections,radarParameters,detectionParameters)
arguments
    savefile
    tracks              = [];
    radar               = [];
    status              = [];
    detections          = [];
    radarParameters     = [];
    detectionParameters = [];
end
% try
tracks              = struct2table2( tracks     );
status              = struct2table2( status     );
detections          = struct2table2( detections );
detectionParameters = struct2table2( detectionParameters );

if ~isempty(detectionParameters)
    vars = detectionParameters.Properties.VariableNames;
    for ii = 1 : length(vars)
        data = detectionParameters.(vars{ii});
        if iscell(data)
            eval(sprintf('%s = [data{:}];', strcat('dp_', vars{ii})));
            detectionParameters = removevars(detectionParameters, vars{ii});
        end
    end
end
if ~isempty(detections)
    vars = detections.Properties.VariableNames;
    for ii = 1 : length(vars)
        data = detections.(vars{ii});
        if iscell(data)
            eval(sprintf('%s = [data{:}];', strcat('detects_', vars{ii})));
            detections = removevars(detections, vars{ii});
        end
    end
end
clear vars ii data
save(savefile, '-v7.3');
