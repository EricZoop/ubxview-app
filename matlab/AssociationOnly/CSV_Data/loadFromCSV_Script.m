%Script to load tracks & Truth from CSV
close all
clear
clc

addpath(genpath(pwd))

blogPathname = [cd '\rt_2021-02-26_15-12-25'];
trackTruthStruct = loadradardir_Callback(blogPathname);
trackTruthStruct.parameters.pathname = blogPathname;

truthCSV = '.\Truth\experiment_fr24_rt_2021-02-26_15-12-25_tracks_chunk_0.csv';
trackCSV = '.\Tracker\rt_2021-02-26_15-12-25_tracks_chunk_0.csv';

[trackTruthStruct.gpstrack, trackTruthStruct.tracks] = loadFromCSV(truthCSV, trackCSV);

%Producing "GpsTrack" cell array
offset =  min(trackTruthStruct.tracks.dateNum) - min(trackTruthStruct.gpstrack.dateNum);
offset = round(offset * 24);
trimGps = 'Yes';
[trackTruthStruct.GpsTrack, trackTruthStruct.gpstrack]= formGpsTrack(trackTruthStruct, offset, trimGps);

if ~isfield(trackTruthStruct.gpstrack, 'Heading')
    error('Error: Missing fields of interpolated truth data; Registration will fail. Poor matchup of truth to radar tracks. Check time indices')
end

%Perform Association
trackTruthStruct.angleSpacing = 20;%Hardcoded from radarDisplay
trackTruthStruct.rangeSpacing = [];%Hardcoded from radarDisplay
calibratemeplease_Callback(trackTruthStruct);%No output arguments, it will make a table upon completion without errors