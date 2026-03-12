function gpstrack = loadCSV_Asterisk(fname,~,~,~)
    % keyboard
    tableIn = readtable(fname);
    
    unique_AA  = unique(tableIn.TargetAddress);
    valid = tableIn.TimeOfApplicabilityForPosition > 0 & ...
        tableIn.LatitudeWgs84HighRes ~= 0 & ...
        tableIn.LongitudeWgs84HighRes ~= 0 & ...
        tableIn.GeometricHeight > 0;
    gpstrack = {};
    cnt = 1;
    % prompt = 'Enter the collection date (YYYY-MM-DD): ';
    % progressbar(1);
    % dateStr = inputdlg(prompt); % Use 's' to read input as a string

    [~, csvName] = fileparts(fname);
    splitName = strsplit(csvName, '_');
    xDate = splitName{2};
    dateStr = strjoin({xDate(2:5), xDate(6:7), xDate(8:9)},'-');

    try
        dateObj = datetime(dateStr, 'InputFormat', 'yyyy-MM-dd');
    catch
        disp('Invalid date format. Please enter the date in YYYY-MM-DD format.');
    end

    for ix=1:length(unique_AA)
        idx = string(tableIn.TargetAddress) == unique_AA(ix);
        idx = idx & valid;
        if any(idx)
            gpstrack{cnt}.dateNum = [datenum(dateObj) + tableIn.TimeOfApplicabilityForPosition(idx)/24/60/60]';
            gpstrack{cnt}.Lat = tableIn.LatitudeWgs84HighRes(idx)';
            gpstrack{cnt}.Lon = tableIn.LongitudeWgs84HighRes(idx)';
            gpstrack{cnt}.Alt = tableIn.GeometricHeight(idx)';
            gpstrack{cnt}.x_code = tableIn.TargetAddress(idx)';
            cnt = cnt + 1;
        end
    end
end