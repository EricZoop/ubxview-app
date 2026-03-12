function matvtrack = converttoplotdataform(tracks,status)
%UNTITLED2 Summary of this function goes here
%   Detailed explanation goes here

%method = 'nearest';
method = 'spline';

[C,IA] = unique( tracks.headerTimeTag);

timeTag = min( tracks.headerTimeTag):25:max(tracks.headerTimeTag);
%timeTag = tracks.headerTimeTag(IA);
r1 = tracks.headerTimeTag(IA);
r2 = tracks.dateNum(IA);
[~,IB] = unique(r2);

matvtrack.dateNum= interp1(r1(IB),r2(IB),status.headerTimeTag,'linear','extrap');
[C2,IA2] = unique(status.headerTimeTag);
matvtrack.dateNum =  interp1(status.headerTimeTag(IA2),matvtrack.dateNum(IA2),timeTag,'linear');
matvtrack.Alt = interp1(status.headerTimeTag(IA2),status.loc_alt(IA2),timeTag,method);
matvtrack.Lat  = interp1(status.headerTimeTag(IA2),status.loc_lat(IA2),timeTag,method)*180/pi;
matvtrack.Lon= interp1(status.headerTimeTag(IA2),status.loc_lon(IA2),timeTag,method)*180/pi;
matvtrack.Yaw = interp1(status.headerTimeTag(IA2),status.att_heading(IA2),timeTag,method)*180/pi;
matvtrack.Roll= interp1(status.headerTimeTag(IA2),status.att_roll(IA2),timeTag,method)*180/pi;
matvtrack.Pitch= interp1(status.headerTimeTag(IA2),status.att_pitch(IA2),timeTag,method)*180/pi;
index = isnan(matvtrack.Yaw) | isnan(matvtrack.dateNum);
matvtrack.dateNum (index) = [];
matvtrack.Alt(index) = [];
matvtrack.Lat(index) = [];
matvtrack.Lon(index) = [];
matvtrack.Yaw(index) = [];
matvtrack.Roll(index) = [];
matvtrack.Pitch(index) = [];


