% === 1. Load GNGGA Text/UBX File ===
gngga_file = 'adam3.ubx';
fid = fopen(gngga_file, 'r');
if fid == -1, error('Cannot open GNGGA file.'); end

% Init storage
times_gngga = []; latitudes = []; longitudes = []; altitudes = [];

while ~feof(fid)
    line = fgetl(fid);
    if startsWith(line, '$GNGGA')
        parts = strsplit(line, ',');
        if length(parts) < 10, continue; end

        % Parse time
        try
            t = parts{2}; hh = str2double(t(1:2)); mm = str2double(t(3:4)); ss = str2double(t(5:end));
            time_sec = hh*3600 + mm*60 + ss;
        catch
            continue;
        end

        % Parse lat/lon
        lat_s = parts{3}; lat_d = parts{4};
        lon_s = parts{5}; lon_d = parts{6};
        if isempty(lat_s) || isempty(lon_s), continue; end

        lat = str2double(lat_s(1:2)) + str2double(lat_s(3:end)) / 60;
        if strcmp(lat_d, 'S'), lat = -lat; end
        lon = str2double(lon_s(1:3)) + str2double(lon_s(4:end)) / 60;
        if strcmp(lon_d, 'W'), lon = -lon; end

        alt = str2double(parts{10});

        % Append
        times_gngga(end+1) = time_sec;
        latitudes(end+1) = lat;
        longitudes(end+1) = lon;
        altitudes(end+1) = alt;
    end
end
fclose(fid);


% === 2. Load Custom CSV ===
custom_csv_file = 'mavic_adam3.csv';  % <-- Update with your CSV
custom = readtable(custom_csv_file, 'TextType', 'string');

% Ensure correct variable names (check yours using: custom.Properties.VariableNames)
lat_custom = double(custom.OSD_latitude);
lon_custom = double(custom.OSD_longitude);
alt_custom = double(custom.OSD_altitude_m_);

% Parse time from [UTC] string: format is like "3:55:21.06 PM"
time_strs = custom.CUSTOM_updateTime_TEXT_UTC_;
n = length(time_strs);
times_csv = zeros(n, 1);
for i = 1:n
    try
        t = datetime(time_strs(i), 'InputFormat', 'h:mm:ss.SS a', 'Format', 'HH:mm:ss.SS');
        times_csv(i) = hour(t)*3600 + minute(t)*60 + second(t);  % seconds since midnight
    catch
        times_csv(i) = NaN;
    end
end

% Remove NaNs (if any)
valid = ~isnan(times_csv) & ~isnan(lat_custom) & ~isnan(lon_custom) & ~isnan(alt_custom);
times_csv = times_csv(valid);
lat_custom = lat_custom(valid);
lon_custom = lon_custom(valid);
alt_custom = alt_custom(valid);


% === 3. Interpolate GNGGA to CSV Timebase ===
lat_interp = interp1(times_gngga, latitudes, times_csv(:), 'linear', 'extrap');
lon_interp = interp1(times_gngga, longitudes, times_csv(:), 'linear', 'extrap');
alt_interp = interp1(times_gngga, altitudes, times_csv(:), 'linear', 'extrap');

% Ensure all vectors are column vectors
lat_interp = lat_interp(:);
lon_interp = lon_interp(:);
alt_interp = alt_interp(:);


% === 4. Plot Both in 3D ===
figure;
plot3(lon_custom, lat_custom, alt_custom, 'r.-', 'DisplayName', 'CSV');
hold on;
plot3(lon_interp, lat_interp, alt_interp, 'b.-', 'DisplayName', 'GNGGA Interpolated');
xlabel('Longitude'); ylabel('Latitude'); zlabel('Altitude (m)');
legend; grid on; view(45, 30);
title('3D GPS: Custom CSV vs Interpolated GNGGA');


% === 5. Export Combined CSV ===
combined = table(times_csv(:), ...
                 lat_custom(:), lon_custom(:), alt_custom(:), ...
                 lat_interp, lon_interp, alt_interp, ...
                 'VariableNames', {'Time_sec', ...
                                   'Lat_CSV', 'Lon_CSV', 'Alt_CSV', ...
                                   'Lat_GNGGA', 'Lon_GNGGA', 'Alt_GNGGA'});


writetable(combined, 'combined_gps_output.csv');
disp('Combined data exported to "combined_gps_output.csv"');
