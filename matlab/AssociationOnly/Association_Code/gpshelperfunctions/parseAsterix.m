function gpstrack = parseAsterix(fname,~,~,~)

startTime = tic;
fid = fopen(fname, 'rb');
A = fread(fid,inf,'uint8','ieee-le');
cat21Processor = Cat21Processor;
cat21Processor.initTable(1);

ii = 1;
cnt = 1;
progressbar;
while ii < length(A)
   progressbar(ii/length(A));
   switch A(ii)
        case 21
            len = A(ii+1)*2^8 + A(ii+2);
            msg = A(ii:ii+len-1);
            cat21Processor.processCat21Msg(msg,cnt);
            ii = ii + len;
            cnt = cnt + 1;
        otherwise
            disp("Unhandled category" + num2str(A(ii)));
            break;
    end
end
toc(startTime);
% Remove NaN columns in table and write to csv
for iVarName = fieldnames(cat21Processor.msgTable.tbl)
    varName = iVarName{:};
    if isnumeric(cat21Processor.msgTable.tbl.(varName)(1)) && all(isnan(cat21Processor.msgTable.tbl.(varName)(:)))

        if isstruct(cat21Processor.msgTable.tbl)
            cat21Processor.msgTable.tbl = rmfield(cat21Processor.msgTable.tbl, varName);
        else
            cat21Processor.msgTable.tbl = removevars(cat21Processor.msgTable.tbl, varName);
        end
    end
end

unique_AA  = unique(cat21Processor.msgTable.tbl.TargetAddress);

% Fields that were not in the last messages may be too short
maxIdx = max([length(cat21Processor.msgTable.tbl.TimeOfApplicabilityForPosition), ...
    length(cat21Processor.msgTable.tbl.LatitudeWgs84HighRes), ...
    length(cat21Processor.msgTable.tbl.LongitudeWgs84HighRes), ...
    length(cat21Processor.msgTable.tbl.GeometricHeight)]);
cat21Processor.msgTable.tbl.TimeOfApplicabilityForPosition(end:maxIdx) = 0;
cat21Processor.msgTable.tbl.LatitudeWgs84HighRes(end:maxIdx) = 0;
cat21Processor.msgTable.tbl.LongitudeWgs84HighRes(end:maxIdx) = 0;
cat21Processor.msgTable.tbl.GeometricHeight(end:maxIdx) = 0;
cat21Processor.msgTable.tbl.TimeOfReportTransmission(end:maxIdx) = 0;
cat21Processor.msgTable.tbl.FlightLevel(end:maxIdx) = 0;

replaceIdx = cat21Processor.msgTable.tbl.TimeOfApplicabilityForPosition == 0 & cat21Processor.msgTable.tbl.TimeOfReportTransmission > 0;
cat21Processor.msgTable.tbl.TimeOfApplicabilityForPosition(replaceIdx) = cat21Processor.msgTable.tbl.TimeOfReportTransmission(replaceIdx);

%replaceIdx = cat21Processor.msgTable.tbl.GeometricHeight == 0 & cat21Processor.msgTable.tbl.FlightLevel > 0;
%cat21Processor.msgTable.tbl.GeometricHeight(replaceIdx) = cat21Processor.msgTable.tbl.FlightLevel(replaceIdx) * 100 * 0.3048;

valid = cat21Processor.msgTable.tbl.TimeOfApplicabilityForPosition > 0 & ...
        cat21Processor.msgTable.tbl.LatitudeWgs84HighRes ~= 0 & ...
        cat21Processor.msgTable.tbl.LongitudeWgs84HighRes ~= 0 & ...
        cat21Processor.msgTable.tbl.GeometricHeight > 0;
gpstrack = {};
cnt = 1;
prompt = 'Enter the collection date (YYYY-MM-DD): ';
progressbar(1);
dateStr = inputdlg(prompt); % Use 's' to read input as a string

try
  dateObj = datetime(dateStr, 'InputFormat', 'yyyy-MM-dd');
catch
  disp('Invalid date format. Please enter the date in YYYY-MM-DD format.');
end
for ix=1:length(unique_AA)
    idx = cat21Processor.msgTable.tbl.TargetAddress == unique_AA(ix);
    idx = idx & valid;
    if any(idx)
        gpstrack{cnt}.dateNum = datenum(dateObj) + cat21Processor.msgTable.tbl.TimeOfApplicabilityForPosition(idx)/24/60/60;
        gpstrack{cnt}.Lat = cat21Processor.msgTable.tbl.LatitudeWgs84HighRes(idx);
        gpstrack{cnt}.Lon = cat21Processor.msgTable.tbl.LongitudeWgs84HighRes(idx);
        gpstrack{cnt}.Alt = cat21Processor.msgTable.tbl.GeometricHeight(idx);
        gpstrack{cnt}.x_code = cat21Processor.msgTable.tbl.TargetAddress(idx);
        cnt = cnt + 1;
    end
end

[pathname, name, ext] = fileparts(fname);
%eval(['parsed_', char(genvarname(name)), ' = cat21Processor.msgTable.tbl;']);
%save([char(pathname), char(filesep),'parsed_', char(genvarname(name)), '.csv'], ['parsed_', char(genvarname(name))]);

fns = fieldnames(cat21Processor.msgTable.tbl);
for iFn = 1:length(fns)
    if length(cat21Processor.msgTable.tbl.(fns{iFn})) ~=maxIdx
        cat21Processor.msgTable.tbl = rmfield(cat21Processor.msgTable.tbl, fns{iFn});
    end
end
tbl = struct2table2(cat21Processor.msgTable.tbl);
writetable(tbl,[char(pathname), char(filesep),'parsed_', char(genvarname(name)), '.csv']);


