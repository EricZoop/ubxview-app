%Script to load tracks & Truth from CSV
close all
clear
clc

addpath(genpath(pwd))

blogPathname = ['Z:\__Datasets\USA\2025_06_12_Butlers_Germantown_MD_US_exMHR\blogs\sessions\rt_2025-06-12_20-43-44'];
trackTruthStruct = loadradardir_Callback(blogPathname);
trackTruthStruct.parameters.pathname = blogPathname;

truthCSV = 'Z:\__Datasets\USA\2025_06_12_Butlers_Germantown_MD_US_exMHR\experiment_files\adsb_truth\experiment_fr24_rt_2025-06-12_20-43-44_tracks_chunk_0.csv';
trackCSV = 'Z:\__Datasets\USA\2025_06_12_Butlers_Germantown_MD_US_exMHR\csv\raw_tracker_v0.0.7\rt_2025-06-12_20-43-44_tracks_chunk_0.csv';



[trackTruthStruct.gpstrack, trackTruthStruct.tracks] = loadFromCSV(truthCSV, trackCSV);

trackTruthStruct.gpstrack.Alt = trackTruthStruct.gpstrack.Alt * 0.3048;

%Producing "GpsTrack" cell array
offset =  min(trackTruthStruct.tracks.dateNum) - min(trackTruthStruct.gpstrack.dateNum);
offset = round(offset * 24);
trimGps = 'No';

% --- Diagnostic Time Check ---
disp('------------------------------------');
disp(['Track Start: ', datestr(min(trackTruthStruct.tracks.dateNum))]);
disp(['Track End:   ', datestr(max(trackTruthStruct.tracks.dateNum))]);
disp(['Truth Start: ', datestr(min(trackTruthStruct.gpstrack.dateNum))]);
disp(['Truth End:   ', datestr(max(trackTruthStruct.gpstrack.dateNum))]);
disp('------------------------------------');
% -----------------------------

% --- NEW: Loosen the association tolerance ---
% Force a massive threshold to ignore the barometric/quantized altitude gap
trackTruthStruct.klThreshold = 24000; 

% Perform Association
trackTruthStruct.angleSpacing = 20; % Hardcoded from radarDisplay
trackTruthStruct.rangeSpacing = []; % Hardcoded from radarDisplay


trackTruthStruct.acceptProb = 0.0;   % accept anything
trackTruthStruct.maxSTD     = 99999;
trackTruthStruct.maxAz      = 360;
trackTruthStruct.maxMhd     = 99999;


% Ensure retrack field exists just in case it is required by the callback
if ~isfield(trackTruthStruct, 'retrack')
    trackTruthStruct.retrack = false; 
end



[trackTruthStruct.GpsTrack, trackTruthStruct.gpstrack]= formGpsTrack(trackTruthStruct, offset, trimGps);

if ~isfield(trackTruthStruct.gpstrack, 'Heading')
    error('Error: Missing fields of interpolated truth data; Registration will fail. Poor matchup of truth to radar tracks. Check time indices')
end


% --- Visual Spatial Check ---
% --- Altitude and Time Diagnostic ---
figure('Name', 'Altitude and Time Check');
plot(trackTruthStruct.tracks.dateNum, trackTruthStruct.tracks.Alt, 'b.', 'MarkerSize', 8, 'DisplayName', 'Radar Altitude');
hold on;
plot(trackTruthStruct.gpstrack.dateNum, trackTruthStruct.gpstrack.Alt, 'ro', 'MarkerSize', 4, 'DisplayName', 'FR24 Truth Altitude');
datetick('x', 'HH:MM:SS');
legend('show');
xlabel('Time'); 
ylabel('Altitude (Raw Units)');
title('Are the Altitudes and Times Aligned?');
grid on;
% ----------------------------

calibratemeplease_Callback(trackTruthStruct);%No output arguments, it will make a table upon completion without errors

%% Diagnostic: Verify truth-to-radar track associations
% Run this AFTER calibratemeplease_Callback (or after radarfuse returns)
% Assumes trackTruthStruct is still in workspace

tracks   = trackTruthStruct.tracks;
gpstrack = trackTruthStruct.gpstrack;

% --- Extract the matched IDs from console output ---
matchedRadarID = 99792;
matchedTruthCode = '00043';

% Also check the candidate that had Prob=0
candidateRadarID = 104499;
candidateTruthCode = '00182';

%% Figure 1: Lat/Lon overlay of matched tracks
figure('Name','Association Verification - Lat/Lon','Position',[100 100 1200 900]);

% --- All radar tracks (grey background) ---
subplot(2,2,1);
plot(tracks.Lon, tracks.Lat, '.', 'Color', [0.8 0.8 0.8], 'MarkerSize', 4, 'DisplayName', 'All Radar');
hold on;

% --- All truth tracks (light orange background) ---
plot(gpstrack.Lon, gpstrack.Lat, '.', 'Color', [1 0.8 0.6], 'MarkerSize', 4, 'DisplayName', 'All Truth');

% --- Matched radar track ---
idxR = tracks.ID == matchedRadarID;
plot(tracks.Lon(idxR), tracks.Lat(idxR), 'b.', 'MarkerSize', 10, 'DisplayName', sprintf('Radar %d', matchedRadarID));

% --- Matched truth track ---
if iscell(gpstrack.x_code)
    idxT = strcmp(gpstrack.x_code, matchedTruthCode);
else
    idxT = gpstrack.x_code == str2double(matchedTruthCode);
end
plot(gpstrack.Lon(idxT), gpstrack.Lat(idxT), 'r.', 'MarkerSize', 10, 'DisplayName', sprintf('Truth %s', matchedTruthCode));

legend('show','Location','best');
xlabel('Longitude'); ylabel('Latitude');
title(sprintf('MATCHED: Truth %s \\leftrightarrow Radar %d', matchedTruthCode, matchedRadarID));
grid on; axis equal;

% --- Candidate (Prob=0) ---
subplot(2,2,2);
plot(tracks.Lon, tracks.Lat, '.', 'Color', [0.8 0.8 0.8], 'MarkerSize', 4, 'DisplayName', 'All Radar');
hold on;
plot(gpstrack.Lon, gpstrack.Lat, '.', 'Color', [1 0.8 0.6], 'MarkerSize', 4, 'DisplayName', 'All Truth');

idxR2 = tracks.ID == candidateRadarID;
plot(tracks.Lon(idxR2), tracks.Lat(idxR2), 'm.', 'MarkerSize', 10, 'DisplayName', sprintf('Radar %d', candidateRadarID));

if iscell(gpstrack.x_code)
    idxT2 = strcmp(gpstrack.x_code, candidateTruthCode);
else
    idxT2 = gpstrack.x_code == str2double(candidateTruthCode);
end
plot(gpstrack.Lon(idxT2), gpstrack.Lat(idxT2), 'g.', 'MarkerSize', 10, 'DisplayName', sprintf('Truth %s', candidateTruthCode));

legend('show','Location','best');
xlabel('Longitude'); ylabel('Latitude');
title(sprintf('REJECTED (Prob=0): Truth %s \\leftrightarrow Radar %d', candidateTruthCode, candidateRadarID));
grid on; axis equal;

%% Time-synced altitude comparison
subplot(2,2,3);
plot(tracks.dateNum(idxR), tracks.Alt(idxR), 'b.', 'MarkerSize', 8, 'DisplayName', sprintf('Radar %d', matchedRadarID));
hold on;
plot(gpstrack.dateNum(idxT), gpstrack.Alt(idxT), 'r.', 'MarkerSize', 8, 'DisplayName', sprintf('Truth %s', matchedTruthCode));
datetick('x','HH:MM:SS');
xlabel('Time'); ylabel('Altitude');
title('Matched Pair - Altitude vs Time');
legend('show'); grid on;

subplot(2,2,4);
plot(tracks.dateNum(idxR2), tracks.Alt(idxR2), 'm.', 'MarkerSize', 8, 'DisplayName', sprintf('Radar %d', candidateRadarID));
hold on;
plot(gpstrack.dateNum(idxT2), gpstrack.Alt(idxT2), 'g.', 'MarkerSize', 8, 'DisplayName', sprintf('Truth %s', candidateTruthCode));
datetick('x','HH:MM:SS');
xlabel('Time'); ylabel('Altitude');
title('Rejected Pair - Altitude vs Time');
legend('show'); grid on;

sgtitle('Association Diagnostic: Do These Tracks Actually Overlap?', 'FontSize', 14);

%% Figure 2: Time coverage - are truth and radar overlapping in time?
figure('Name','Time Coverage Diagnostic','Position',[150 150 1000 400]);

radarIDs = unique(tracks.ID);
hold on;
for k = 1:length(radarIDs)
    idx = tracks.ID == radarIDs(k);
    tRange = [min(tracks.dateNum(idx)) max(tracks.dateNum(idx))];
    plot(tRange, [k k], 'b-', 'LineWidth', 2);
    text(tRange(1), k, sprintf(' R%d', radarIDs(k)), 'FontSize', 7, 'Color', 'b');
end

if iscell(gpstrack.x_code)
    truthCodes = unique(gpstrack.x_code);
else
    truthCodes = num2cell(unique(gpstrack.x_code));
end
yOff = length(radarIDs);
for k = 1:length(truthCodes)
    if iscell(truthCodes)
        idx = strcmp(gpstrack.x_code, truthCodes{k});
        lbl = truthCodes{k};
    else
        idx = gpstrack.x_code == truthCodes{k};
        lbl = num2str(truthCodes{k});
    end
    tRange = [min(gpstrack.dateNum(idx)) max(gpstrack.dateNum(idx))];
    plot(tRange, [yOff+k yOff+k], 'r-', 'LineWidth', 2);
    text(tRange(1), yOff+k, sprintf(' T:%s', lbl), 'FontSize', 7, 'Color', 'r');
end

datetick('x','HH:MM:SS');
xlabel('Time');
title('Blue = Radar Tracks, Red = Truth Tracks (time spans)');
grid on;