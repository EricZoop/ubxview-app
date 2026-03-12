function calibratemeplease_Callback(handles)

    %Check for missing data if it hasn't run into errors at this point
    if ~isfield(handles, 'tracks')
        error('No track data was received. Try again with next update.');
    end
    if sum(handles.radar.enabled) == 0
        error('No radar faces are enabled. Try again with next update.');
    end
    
    %These were hard-coded from Radar Analysis Tool (RAT), leaving as is for now
    if ~isfield(handles, 'klThreshold')
        handles.klThreshold = 4;
    end
    if ~isfield(handles, 'retrack')
        handles.retrack = 0;
    end

    %Begin registration (called calibration in RAT functions)
    radarcalibration(handles,handles.tracks,handles.status,handles.retrack, handles.klThreshold);

end