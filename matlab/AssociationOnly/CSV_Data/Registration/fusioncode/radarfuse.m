function [calibrationTruthTrackIds,calibrationRadarTrackIds,IDs,handles,tracks] = radarfuse(tracks,status,drone, radarParameters,truthTrackIds,flightnums,...
    truthTrackAssociation,varargin)
%RADARFUSE Reads radar files and ADSB csv data to calculate registration values
%
%
% Input:
%   - tracks (structure): structure containing all messages stored from
%   reading blog data for the tracks extended message
%   - status (structure): if stationary the extended status message in blog
%   data, if OTM the INS data filtered down to the dateNum values for the
%   tracks structure
%   -drone (table): for each individual flight for adsb truth
%   data or each drone file loaded, contains timing information as well as
%   position information usually lattitude and longitude on truth data
%   -truthTrackIds: map of associated truth track names to radar track IDs
%   -flightnums: names of each adsb flight (xcode) or drone flights
%   -truthTrackAssociation: associated tracks map to flightnums
%
% Output:
%   - calibrationTruthTrackIds(cell): map of associated truth x_codes to
%   track IDs
%   - calibrationRadarTrackIds(cell): map of associated track IDs to
%   x_codes in drone table
%   - IDs: unique IDs within tracks structure
%   - handles (optional) handle structure for guide .fig file calling
%   - tracks: (optional) updated tracks structure if there is actually
%   radar to radar fusion
%
%% Variable Constants I would like to make options to pass in eventually
[acceptProb, maxSTD, maxAz, maxMhd] = getRegistrationInfo(radarParameters);
%%
headless = false;
prntID = 1;
if(nargin==8) && isstruct(varargin{1})
    handles = varargin{1};
    if isfield(handles, 'acceptProb')
        acceptProb = handles.acceptProb;
        maxSTD     = handles.maxSTD;
        maxAz      = handles.maxAz;
        maxMhd     = handles.maxMhd;
    end
    if isfield(handles, 'GpsTrack')
        gpsTrack = handles.GpsTrack;
    end
    if isfield(handles, 'useFastAssoc')
        useFast = handles.useFastAssoc;
    else
        useFast = false;
    end
else
    handles = [];
end

if useFast
    MINTIMETOASSOCIATE = 10;
    MHDTHRESH = 10;

    %get unique track IDS and times
    IDs = unique(tracks.ID);
    if size(IDs, 1) > size(IDs,2)
        IDs = IDs';
    end
    [calibrationTruthTrackIds,calibrationRadarTrackIds,times] = fastassign(gpsTrack, tracks, MINTIMETOASSOCIATE, MHDTHRESH);
    calibrationTruthTrackIdsCell = {};
    for ii = 1:length(calibrationTruthTrackIds)
        truthTrackId = flightnums(calibrationTruthTrackIds(ii));
        if iscell(truthTrackId)
            truthTrackId = cell2mat(truthTrackId);
        end
        calibrationTruthTrackIdsCell{ii} = truthTrackId;
        truthTrackAssociation(truthTrackId) = truthTrackAssociation(truthTrackId) | (IDs == calibrationRadarTrackIds(ii))';
        disp(strcat("Truth Track ID ", truthTrackId, " matches radar track ", num2str(calibrationRadarTrackIds(ii))));
    end
    calibrationTruthTrackIds = calibrationTruthTrackIdsCell;
    return;
end

for i_v = 1:length(varargin)
    if ~isstring(varargin{i_v}) && ~ischar(varargin{i_v})
        continue
    end
    if strcmp(varargin{i_v}, 'headless')
        headless = true;
    elseif strcmp(varargin{i_v}, 'outdir')
        outdir = fullfile(varargin{i_v + 1});
        if ~isfile(fullfile(outdir, '100_correlation.log'))
            logF = fopen(fullfile(outdir, '100_correlation.log'), 'w');
        else
            logF = fopen(fullfile(outdir, '100_correlation.log'), 'a');
        end
        prntID = logF;
    end
end
getTrackMessages= false;
if(nargout==5)
    getTrackMessages= true;
end
%find out if truth and radar have times in common
SHOWPLOTS = false;
radarTimeRange = [min(tracks.dateNum) max(tracks.dateNum)];
truthTimeRange = [min(drone.dateNum) max(drone.dateNum)];
if(radarTimeRange(2)<truthTimeRange(1)||radarTimeRange(1)>truthTimeRange(2))
    
    errorString = sprintf('Radar Data Times :%s THROUGH %s have no times in common with Truth data times: %s THROUGH %s',...
        datestr(radarTimeRange(1)),datestr(radarTimeRange(2)),....
        datestr(truthTimeRange(1)),datestr(truthTimeRange(2)));
    
    errordlg(errorString, 'No Times in Common Error', 'modal');
    error( 'No Times in Common Error');
    
end
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%get unique track IDS and times
IDs = unique(tracks.ID);
if size(IDs, 1) > size(IDs,2)
    IDs = IDs';
end
lastDateNum = 0;
uniqueDateNum = unique(tracks.dateNum);
minTime = min(uniqueDateNum);
if ~istable(tracks)
     tracks = struct2table2(tracks);
end
    
tracks = sortrows(tracks, 'dateNum');
timeChanges = find(diff(tracks.dateNum)>0);
associations = [];
tup = 1;
meanVehPos = [median(status.Lat); median(status.Lon); median(status.Alt)];
[h,i] = max((meanVehPos(1)-status.Lat)+abs(meanVehPos(2)-status.Lon));
if(h>0.0001) && ~headless
    uiwait(msgbox(sprintf('Radar appears to be in motion. Calibration need static radar\nProcede with caution'),'Warning','modal'));
end

% if(~isempty(handles))
if(~isempty(handles)) && isfield(handles, 'guiData')%Ryan Edit
    y = colormap(jet);
    x_space = linspace(0,1,size(y,1));
    handles = plotxyregister(handles);
    set(handles.mainAxes,'XLim',[max([min(drone.Lon) min(tracks.Lon)]) min([max(drone.Lon) max(tracks.Lon)])]);
    set(handles.mainAxes,'YLim',[max([min(drone.Lat) min(tracks.Lat)]) min([max(drone.Lat) max(tracks.Lat)])])
    drawnow;
end
tnow = tic;

if ~headless
    wb = waitbar(0,'Finding truth tracks that match our radar tracks...');
end
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%initialize fusion code
rab= fusioncode('.');
rab.initfusion();

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%initialize radar track platform
platformMhr.plaform = 'RADAR';
platformMhr.platformId = 1;
platformMhr.type = 'RADAR';
platformMhr.trackCoordinates = 'ECEF';
platformMhr.alignReference = false;

rab.initplatform(platformMhr);
rab.mConfig.maxSTD = maxSTD;
rab.mConfig.maxAz  = maxAz;
rab.mConfig.maxMhd = maxMhd;
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%initialize truth track track
platformTruth.plaform = 'TRUTH';

platformTruth.platformId = 2;
platformTruth.type = 'TRUTH';
platformTruth.alignReference = true;
platformTruth.trackCoordinates = 'ECEF';
rab.initplatform(platformTruth);
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%start fusion
%rotate north east down 2 north west up
nwu2ned = [1 0 0;0 -1 0;0 0 -1];

if(getTrackMessages)
   
   
    fuseTrackCount= 1;
end
firstTi = 1;
numTimeChanges = numel(timeChanges);
for iTimeChange = 1:numTimeChanges
    
    if(toc(tnow)>tup)
        if ~headless
            waitbar(iTimeChange/numTimeChanges, wb, "Associating...");
        end
        tnow= tic;        
        tup = 5;     
    end
    
    lastTi = timeChanges(iTimeChange);
    trackIndex = firstTi:lastTi;
    nonNanTracks = find(~isnan(tracks.lastAssocTgt_az(trackIndex)));
    if(~isempty(nonNanTracks))
        trackIndex = trackIndex(nonNanTracks);
        % update radar MHR
        platformpos.platform = 'MHR';
        platformpos.platformId = 1;
        platformpos.format = 'ECEF';
        platformMhr.trackCoordinates = 'ECEF';
        [~,statusIndex] = min(abs(status.dateNum- tracks.dateNum(firstTi)));
        
        [X, Y, Z] = geodetic2ecef(wgs84Ellipsoid, status.Lat(statusIndex), status.Lon(statusIndex), status.Alt(statusIndex));
        
        platformpos.platformPosEcef= [X;Y;Z];
        platformpos.platformPosAttitude= [0;0;0];
        platformpos.platformPosStd= [10; 10; 10];
        platformpos.time = (tracks.dateNum(firstTi)-minTime)*24*3600;
        rab.updateplatform( platformpos);
        platformpos.platform = 'GPS';
        platformpos.platformId = 2;
        rab.updateplatform( platformpos);
        % insert radar data points
        %clear datapoint;
        datapoint = [];
        for ti = 1:numel(trackIndex)
            datapoint.platform = 'MHR';
            datapoint.platformId = 1;
            datapoint.format = 'RAED';
            datapoint.trackId = tracks.ID(trackIndex(ti));
            datapoint.time = (tracks.dateNum(firstTi)-minTime)*24*3600;
            datapoint.pos =[tracks.lastAssocTgt_range(trackIndex(ti));...
                tracks.lastAssocTgt_az(trackIndex(ti))*pi/180;...
                tracks.lastAssocTgt_el(trackIndex(ti))*pi/180;...`
                tracks.lastAssocTgt_dopplerVel(trackIndex(ti))];
            if(tracks.lastAssocTgt_el(trackIndex(ti))<16)
                stdBump = 5;
            else
                stdBump = 0;
            end
            
            datapoint.posStd = [tracks.lastAssocTgt_rangeStd(trackIndex(ti));...
                tracks.lastAssocTgt_azStd(trackIndex(ti))*pi/180;...
                (stdBump+tracks.lastAssocTgt_elStd(trackIndex(ti)))*pi/180;...`
                tracks.lastAssocTgt_dopplerVelStd(trackIndex(ti))];
            Renu2ecef = ned2ecefrotationmatrix(status.Lat(statusIndex), status.Lon(statusIndex));
            
            
            [X, Y, Z] = geodetic2ecef(wgs84Ellipsoid, tracks.Lat(trackIndex(ti)), tracks.Lon(trackIndex(ti)), tracks.Alt(trackIndex(ti)));
            datapoint.ecef = [X;Y;Z];
            velnwuStd = [ tracks.velocityNorthStd(trackIndex(ti)); tracks.velocityWestStd(trackIndex(ti));tracks.velocityUpStd(trackIndex(ti))];
            datapoint.ecefVelStd =Renu2ecef*nwu2ned* velnwuStd;
            posnwuStd = [ tracks.positionNorthStd(trackIndex(ti)); tracks.positionWestStd(trackIndex(ti));tracks.positionUpStd(trackIndex(ti))];
            datapoint.ecefStd =Renu2ecef*nwu2ned* posnwuStd;
            Renu2ecef = ned2ecefrotationmatrix(status.Lat(statusIndex), status.Lon(statusIndex));
            nwuVelocity = [ tracks.velocityNorth(trackIndex(ti)); tracks.velocityWest(trackIndex(ti));tracks.velocityUp(trackIndex(ti))];
            datapoint.ecefVelocity = Renu2ecef*nwu2ned*nwuVelocity;
            
            [xEast, yNorth, zUp] = geodetic2enu(tracks.Lat(trackIndex(ti)),tracks.Lon(trackIndex(ti)), tracks.Alt(trackIndex(ti)), ...
                status.Lat(statusIndex), status.Lon(statusIndex), status.Alt(statusIndex), wgs84Ellipsoid);
            if(SHOWPLOTS)
                plot(xEast/1000,yNorth/1000,'m.');
            end
            
            rab.insertpoint(datapoint);
            
        end
        indexTruth = find(drone.dateNum>=lastDateNum& drone.dateNum <tracks.dateNum(firstTi));
        % insert adsb data points
        a = 1;
        clear datapoint;
%         if isempty(indexTruth)
%             continue;
%         end
        for ii = 1:numel(indexTruth)
            datapoint.platform = 'ADSB';
            datapoint.platformId = 2;
            datapoint.format = 'ECEF';
            if length(flightnums) == 1
                datapoint.trackId =...
                    truthTrackIds(flightnums{1});
            else
                datapoint.trackId =...
                    truthTrackIds(drone.x_code{indexTruth(ii)});
            end
            
            datapoint.time = (drone.dateNum(indexTruth(ii))-minTime)*24*3600;
            [X, Y, Z] = geodetic2ecef(wgs84Ellipsoid, drone.Lat(indexTruth(ii)),  drone.Lon(indexTruth(ii)),  drone.Alt(indexTruth(ii)));
            
            datapoint.pos =[X;Y;Z];
            datapoint.posStd = [3;3;7];
            rab.insertpoint(datapoint);
            
        end
        
        rab.fusetwo(platformpos.time, 'fid', prntID);
        rab.deletestaletracks(platformpos.time);
        fusedTracks = rab.getfusedecef(platformpos.time);
        if(rab.mState.fusion.radarTrackIds.Count>0)

            k = rab.mState.fusion.radarTrackIds.keys;
            val = values(rab.mState.fusion.radarTrackIds) ;

            for i = 1:length(k)
                
                amm = split(k{i},',');
                radarId = str2num(amm{1});

                adsbIndex = str2num(amm{2});
                if(rab.mState.fusion.radarTracks{val{i}}.mState.acceptanceProb>acceptProb)
                    fusedId = str2num(amm{1}) + 2^20*str2num(amm{2});
                    index = find(IDs == radarId);
                    if(getTrackMessages)
                        fusedTracksSt(fuseTrackCount) = gettrackstructure(rab.mState.fusion,val{i},fusedId,tracks.dateNum(firstTi));
                        fuseTrackCount = fuseTrackCount + 1;
                    end
                    z = truthTrackAssociation(flightnums{adsbIndex}) ;
                    z(index)=1;
                    truthTrackAssociation(flightnums{adsbIndex}) = z;
                end
                fprintf(prntID,'*Time: %f Fused Tracks: %s %s Prob: %f\n',...
                    platformpos.time,k{i},flightnums{adsbIndex},rab.mState.fusion.radarTracks{val{i}}.mState.acceptanceProb);
                % for aa = 1:10
                %     fprintf(prntID,'%.1f ',rab.mState.fusion.radarTracks{val{i}}.mState.acceptanceMemory(aa));
                % end %Ryan commented to reduce print statements

                if(~isempty(handles))
                    xPos = rab.mState.fusion.radarTracks{val{i}}.mState.xPred;
                    [LAT, LON, H] = ecef2geodetic(wgs84Ellipsoid, xPos(1), xPos(3), xPos(5));
                    try
                        for ii = 1:3
                            colorvalues(:,ii) = interp1(x_space,y(:,ii),rab.mState.fusion.radarTracks{val{i}}.mState.acceptanceProb,'linear','extrap');
                        end
                        if(handles.guiData.gpsplot{adsbIndex}(3).Visible)
                            handles.guiData.gpsplot{adsbIndex}(3).XData(end+1) = LON;
                            handles.guiData.gpsplot{adsbIndex}(3).YData(end+1) = LAT;
                            handles.guiData.gpsplot{adsbIndex}(3).CData(end+1,:) = colorvalues;
                        else
                            
                            handles.guiData.gpsplot{adsbIndex}(3).XData = LON;
                            handles.guiData.gpsplot{adsbIndex}(3).YData = LAT;
                            handles.guiData.gpsplot{adsbIndex}(3).CData = colorvalues;
                            handles.guiData.gpsplot{adsbIndex}(3).Visible = true;
                        end
                    catch
                    end
                end
                % handles.guiData.gpsplot{adsbIndex}(1).Color =  colorvalues';
                % fprintf(prntID,'\n');%Ryan commented to reduce print statements
            end
            fprintf(prntID,'****\n');%Ryan commented to reduce print statements
            
        end
        
        lastDateNum = tracks.dateNum(firstTi);
        
    end
    
firstTi = lastTi+1;    
end
if(getTrackMessages)

    trackSt = soa2aos(tracks);
    trackSt = [trackSt fusedTracksSt];
    [dates] = [trackSt(:).dateNum];
    [~,I] = sort((dates));
    trackSt = trackSt(I);
    tracks = aos2soa(trackSt);
end
if ~headless
    close(wb);
end
keys = truthTrackAssociation.keys;
calibrationRadarTrackIds = [];
count = 1;
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%check track associations
for ii = 1:numel(truthTrackAssociation.keys)
    trackVector = truthTrackAssociation(keys{ii});
    index = find(trackVector>0);
    trackVector = IDs(index);
    if(~isempty(trackVector))
        
        if(numel(trackVector)>1)
            ch = 's';
        else
            ch = '';
        end
        calibrationTruthTrackIds{1,count} = keys{ii};
        calibrationRadarTrackIds{1,count} = trackVector;
        count = count + 1;
        fprintf(prntID,'ADBS Track, %s, matches radar track%s: ',keys{ii},ch);
        for jj = 1:numel(trackVector)
            fprintf(prntID,'%d ',trackVector(jj));
        end
        fprintf(prntID,'\n');
    end
    
end
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%report track associations
if ~headless
    if(~isempty(calibrationRadarTrackIds))
        %Ryan Commented
        % msg = sprintf('Operation Completed found: %d associated truth tracks',numel(calibrationTruthTrackIds));
        % msg = [msg sprintf('\n and %d radar tracks',numel(cell2mat((calibrationRadarTrackIds))))];
        % f = msgbox(msg,'Success','modal');
        % uiwait(f,5);
        % try
        %     close(f);
        % end
        %End Ryan Commented
    else
        % uiwait(msgbox(sprintf('Operation Failed found: 0 associated tracks, exiting'),'Error','modal'));%Ryan Commented
        error(sprintf('Operation Failed found: 0 associated tracks, exiting'));

    end
else
    if isempty(calibrationRadarTrackIds)
        calibrationTruthTrackIds = [];
    end
end
if prntID ~= 1
    fclose(prntID);
end
end
