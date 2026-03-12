function [GpsTrack, gpstrack, parameters] = gpsload_Callback(trackStruct, pathname, adsbReader_String) 

    [pathname, filename, extension] = fileparts(pathname);
    filename = [filename, extension];
    
    
    gpsreader = str2func(sprintf('@%s',adsbReader_String)); 
    askTrim = 0;
    [GpsTrack, parameters]= gpsload(gpsreader, askTrim, pathname, filename, trackStruct);
    parameters.pathname = pathname;
    parameters.gpsreader = gpsreader;
    
    % Add the gpsTrk idx to each GpsTrack so that when the gpstrack array
    % is created there is an indication of which GpsTrack each entry is from
    if length(GpsTrack) > parameters.gpsTrackCount
        GpsTrack = GpsTrack(1:parameters.gpsTrackCount);
    end
    
    for iGps = 1:length(GpsTrack)
        GpsTrack{iGps}.ID = iGps*ones(size(GpsTrack{iGps}.Alt));
    end
    
    % Make a GPS struct in the same format as tracks for convenience
    gpstrackAoS = [GpsTrack{:}];%%%=====change back to '{:}'
    if ~isempty(gpstrackAoS)
        fns = fieldnames(gpstrackAoS);
        for iFn = 1:length(fns)
            gpstrack.(fns{iFn}) = [gpstrackAoS.(fns{iFn})];
        end
        % handles.gpstrack = gpstrack;
    end
    
    fprintf('GPS data spans %s .. %s\n', datestr(GpsTrack{1}.dateNum(1)), datestr(GpsTrack{1}.dateNum(end)));
end