function [tracks] = radar2radarfuse(tracks,status,tracksSr,statusSr,handles,info)

getTrackMessages= false;
%if(nargout==5)
    getTrackMessages= true;
%end
%find out if truth and radar have times in common
SHOWPLOTS = false;
radarTimeRange = [min(tracks.dateNum) max(tracks.dateNum)];
radar2TimeRange = [min(tracksSr.dateNum) max(tracksSr.dateNum)];
if(radarTimeRange(2)<radar2TimeRange(1)||radarTimeRange(1)>radar2TimeRange(2))
    
    errorString = sprintf('Radar Data Times :%s THROUGH %s have no times in common with Radar2 data times: %s THROUGH %s',...
        datestr(radarTimeRange(1)),datestr(radarTimeRange(2)),....
        datestr(radar2TimeRange(1)),datestr(radar2TimeRange(2)));
    
    a = errordlg(errorString, 'No Times in Common Error', 'modal');
    
    ButtonName = questdlg('Do you want to try and correct times?', ...
        'FUZEEM', ...
        'Yes', 'No','Maybe');
    switch ButtonName
        case {'Yes','Maybe'}
            prompt = {'Enter Time Offset in hours: (Cancel to Auto Determine)'};
            title = 'Input';
            dims = [5];
            definput = {'0'};
            answer = inputdlg(prompt,title,dims,definput);
            if(~isempty(answer))
                houroffset =  str2num(answer{1});
                offset= houroffset;
            else
                offset =  min(tracks.dateNum) - min(tracksSr.dateNum);
                offset = round(offset * 24);
            end
            tracksSr.dateNum = tracksSr.dateNum-offset/24;
            radarTimeRange = [min(tracks.dateNum) max(tracks.dateNum)];
            radar2TimeRange = [min(tracksSr.dateNum) max(tracksSr.dateNum)];
            if(radarTimeRange(2)<radar2TimeRange(1)||radarTimeRange(1)>radar2TimeRange(2))
                errorString = sprintf('Radar Data Times :%s THROUGH %s still have no times in common with Radar2 data times: %s THROUGH %s Reseting offset',...
                    datestr(radarTimeRange(1)),datestr(radarTimeRange(2)),....
                    datestr(radar2TimeRange(1)),datestr(radar2TimeRange(2)));
                close(a);
                errordlg(errorString, 'No Times in Common Error', 'modal');
                tracksSr.dateNum = tracksSr.dateNum+offset/24;
            end
            [tracks] = radar2radarfuse(tracks,status,tracksSr,statusSr,handles,info);
            return;
        case 'No'
            error( 'No Times in Common Error');
        otherwise
    end
end
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%get unique track IDS and times
quetsName = questdlg('Do you want to calibrate second face?', ...
    'FUZEEM', ...
    'Yes', 'No','No','radar');
switch quetsName
    case 'Yes'
        [~,~,~,alignFace] = radarcalibration(info,tracksSr,statusSr);
        [tracksSr] = applyalignment(tracksSr,statusSr,...
            info.radar,alignFace);
    case 'No'
end
IDs = unique(tracks.ID);
lastDateNum = 0;
uniqueDateNum = unique([tracks.dateNum tracksSr.dateNum]);
minTime = min(uniqueDateNum);

tup = 1;
meanVehPos = [mean(status.Lat); mean(status.Lon); mean(status.Alt)];
meanVehPosSr = [mean(statusSr.Lat); mean(statusSr.Lon); mean(statusSr.Alt)];

[h,i] = max((meanVehPos(1)-status.Lat)+abs(meanVehPos(2)-status.Lon));
if(h>0.0001)
    uiwait(msgbox(sprintf('Radar 1 appears to be in motion. Fuse need static radar\nProcede with caution'),'Warning','modal'));
end
[h,i] = max((meanVehPosSr(1)-statusSr.Lat)+abs(meanVehPosSr(2)-statusSr.Lon));
if(h>0.0001)
    uiwait(msgbox(sprintf('Radar 2 appears to be in motion. Fuse need static radar\nProcede with caution'),'Warning','modal'));
end

y = colormap(jet);
x_space = linspace(0,1,size(y,1));
if(~isempty(handles))
    handles = plotxyregister(handles);
    set(handles.mainAxes,'XLim',[max([min(tracksSr.Lon) min(tracks.Lon)]) min([max(tracksSr.Lon) max(tracks.Lon)])]);
    set(handles.mainAxes,'YLim',[max([min(tracksSr.Lat) min(tracks.Lat)]) min([max(tracksSr.Lat) max(tracks.Lat)])])
    drawnow;
end
tnow = tic;
progressbar('FINDING RADAR 2 TRACKS THAT MATCH OUR RADAR  1 TRACKS!!!...');
progressbar(0);
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

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%initialize second radar track track
platformRadar2.plaform = 'RADAR';
platformRadar2.platformId = 2;
platformRadar2.type = 'RADAR';
platformRadar2.alignReference = false;
platformRadar2.trackCoordinates = 'ECEF';
rab.initplatform(platformRadar2);
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%start fusion
%rotate north east down 2 north west up
nwu2ned = [1 0 0;0 -1 0;0 0 -1];

if(getTrackMessages)
    
    
    fuseTrackCount= 1;
end
updates = [0 0];
for dn = 1:numel(uniqueDateNum)
    
    if(toc(tnow)>tup)
        progressbar(dn/numel(uniqueDateNum));
        tnow= tic;
        
        
        tup =.5;
        
    end
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %platform 1 update
    trackIndex = find(tracks.dateNum==uniqueDateNum(dn));
    nonNanTracks = find(~isnan(tracks.lastAssocTgt_az(trackIndex)));
    if(~isempty(nonNanTracks))
        trackIndex = trackIndex(nonNanTracks);
        % update radar MHR
        platformpos.platform = 'MHR';
        platformpos.platformId = 1;
        platformpos.format = 'ECEF';
        platformMhr.trackCoordinates = 'ECEF';
        [h,i] = min(abs(status.dateNum- uniqueDateNum(dn)));
        
        statusIndex = i;
        [X, Y, Z] = geodetic2ecef(wgs84Ellipsoid, status.Lat(statusIndex), status.Lon(statusIndex), status.Alt(statusIndex));
        
        platformpos.platformPosEcef= [X;Y;Z];
        platformpos.platformPosAttitude= [0;0;0];
        platformpos.platformPosStd= [10; 10; 10];
        platformpos.time = (uniqueDateNum(dn)-minTime)*24*3600;
        rab.updateplatform( platformpos);
        
        
        % insert radar data points
        clear datapoint;
        for ti = 1:numel(trackIndex)
            datapoint.platform = 'MHR';
            datapoint.platformId = 1;
            datapoint.format = 'RAED';
            datapoint.trackId = tracks.ID(trackIndex(ti));
            datapoint.time = (uniqueDateNum(dn)-minTime)*24*3600;
            datapoint.pos =[tracks.lastAssocTgt_range(trackIndex(ti));...
                tracks.lastAssocTgt_az(trackIndex(ti))*pi/180;...
                tracks.lastAssocTgt_el(trackIndex(ti))*pi/180;...`
                tracks.lastAssocTgt_dopplerVel(trackIndex(ti))];
            datapoint.posStd = [tracks.lastAssocTgt_rangeStd(trackIndex(ti));...
                tracks.lastAssocTgt_azStd(trackIndex(ti))*pi/180;...
                tracks.lastAssocTgt_elStd(trackIndex(ti))*pi/180;...`
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
            updates(1) = 1;
        end
    end
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %platform 2 update
    trackIndex = find(tracksSr.dateNum==uniqueDateNum(dn));
    nonNanTracks = find(~isnan(tracksSr.lastAssocTgt_az(trackIndex)));
    if(~isempty(nonNanTracks))
        trackIndex = trackIndex(nonNanTracks);
        % update radar MHR
        platformpos.platform = 'MHR';
        platformpos.platformId = 2;
        platformpos.format = 'ECEF';
        platformMhr.trackCoordinates = 'ECEF';
        [h,i] = min(abs(statusSr.dateNum- uniqueDateNum(dn)));
        
        statusIndex = i;
        [X, Y, Z] = geodetic2ecef(wgs84Ellipsoid, statusSr.Lat(statusIndex), statusSr.Lon(statusIndex), statusSr.Alt(statusIndex));
        
        platformpos.platformPosEcef= [X;Y;Z];
        platformpos.platformPosAttitude= [0;0;0];
        platformpos.platformPosStd= [10; 10; 10];
        platformpos.time = (uniqueDateNum(dn)-minTime)*24*3600;
        rab.updateplatform( platformpos);
        
        platformpos.platform = 'RADAR';
        platformpos.platformId = 2;
        rab.updateplatform( platformpos);
        % insert radar data points
        clear datapoint;
        for ti = 1:numel(trackIndex)
            datapoint.platform = 'MHR';
            datapoint.platformId = 2;
            datapoint.format = 'RAED';
            datapoint.trackId = tracksSr.ID(trackIndex(ti));
            datapoint.time = (uniqueDateNum(dn)-minTime)*24*3600;
            datapoint.pos =[tracksSr.lastAssocTgt_range(trackIndex(ti));...
                tracksSr.lastAssocTgt_az(trackIndex(ti))*pi/180;...
                tracksSr.lastAssocTgt_el(trackIndex(ti))*pi/180;...`
                tracksSr.lastAssocTgt_dopplerVel(trackIndex(ti))];
            datapoint.posStd = [tracksSr.lastAssocTgt_rangeStd(trackIndex(ti));...
                tracksSr.lastAssocTgt_azStd(trackIndex(ti))*pi/180;...
                tracksSr.lastAssocTgt_elStd(trackIndex(ti))*pi/180;...`
                tracksSr.lastAssocTgt_dopplerVelStd(trackIndex(ti))];
            Renu2ecef = ned2ecefrotationmatrix(statusSr.Lat(statusIndex), statusSr.Lon(statusIndex));
            
            
            [X, Y, Z] = geodetic2ecef(wgs84Ellipsoid, tracksSr.Lat(trackIndex(ti)), tracksSr.Lon(trackIndex(ti)), tracksSr.Alt(trackIndex(ti)));
            datapoint.ecef = [X;Y;Z];
            velnwuStd = [ tracksSr.velocityNorthStd(trackIndex(ti)); tracksSr.velocityWestStd(trackIndex(ti));tracksSr.velocityUpStd(trackIndex(ti))];
            datapoint.ecefVelStd =Renu2ecef*nwu2ned* velnwuStd;
            posnwuStd = [ tracksSr.positionNorthStd(trackIndex(ti)); tracksSr.positionWestStd(trackIndex(ti));tracksSr.positionUpStd(trackIndex(ti))];
            datapoint.ecefStd =Renu2ecef*nwu2ned* posnwuStd;
            Renu2ecef = ned2ecefrotationmatrix(statusSr.Lat(statusIndex), statusSr.Lon(statusIndex));
            nwuVelocity = [ tracksSr.velocityNorth(trackIndex(ti)); tracksSr.velocityWest(trackIndex(ti));tracksSr.velocityUp(trackIndex(ti))];
            datapoint.ecefVelocity = Renu2ecef*nwu2ned*nwuVelocity;
            
            [xEast, yNorth, zUp] = geodetic2enu(tracksSr.Lat(trackIndex(ti)),tracksSr.Lon(trackIndex(ti)), tracksSr.Alt(trackIndex(ti)), ...
                statusSr.Lat(statusIndex), statusSr.Lon(statusIndex), statusSr.Alt(statusIndex), wgs84Ellipsoid);
            if(SHOWPLOTS)
                plot(xEast/1000,yNorth/1000,'m.');
            end
            
            rab.insertpoint(datapoint);
            updates(2) = 1;
        end
    end
    if(updates(1)&&updates(2))
        rab.fusetwo(platformpos.time);
        rab.deletestaletracks(platformpos.time);
        fusedTracks = rab.getfusedecef(platformpos.time);
        
        
        if(rab.mState.fusion.radarTrackIds.Count>0)
            z = 1;
            
            k = rab.mState.fusion.radarTrackIds.keys;
            val = values(rab.mState.fusion.radarTrackIds) ;
            if(numel(k)>5)
                a = 1;
            end
            for i = 1:length(k)
                
                amm = split(k{i},',');
                radarId = str2num(amm{1});
                radar2Index = str2num(amm{2});
                if(rab.mState.fusion.radarTracks{val{i}}.mState.acceptanceProb>.1)
                    fusedId = str2num(amm{1}) + 2^20*str2num(amm{2});
                    index = find(IDs == radarId);
                    if(getTrackMessages)
                        fusedTracksSt(fuseTrackCount) = getrrackstructure(rab.mState.fusion,val{i},fusedId,uniqueDateNum(dn));
                        fuseTrackCount = fuseTrackCount + 1;
                    end
%                     z = truthTrackAssociation(radar2Index) ;
%                     z(index)=1;
%                     truthTrackAssociation(radar2Index) = z;
                end
                fprintf(1,'*Time: %f Fused Tracks: %s %d Prob: %f\n',...
                    platformpos.time,k{i},radar2Index,rab.mState.fusion.radarTracks{val{i}}.mState.acceptanceProb);
                for aa = 1:10
                    fprintf(1,'%.1f ',rab.mState.fusion.radarTracks{val{i}}.mState.acceptanceMemory(aa));
                end
                
                
                
                
%                 if(~isempty(handles))
%                     xPos = rab.mState.fusion.radarTracks{val{i}}.mState.xPred;
%                     [LAT, LON, H] = ecef2geodetic(wgs84Ellipsoid, xPos(1), xPos(3), xPos(5));
%                     for ii = 1:3
%                         colorvalues(:,ii) = interp1(x_space,y(:,ii),rab.mState.fusion.radarTracks{val{i}}.mState.acceptanceProb,'linear','extrap');
%                     end
%                     if(handles.guiData.gpsplot{radar2Index}(3).Visible)
%                         handles.guiData.gpsplot{radar2Index}(3).XData(end+1) = LON;
%                         handles.guiData.gpsplot{radar2Index}(3).YData(end+1) = LAT;
%                         handles.guiData.gpsplot{radar2Index}(3).CData(end+1,:) = colorvalues;
%                     else
%                         
%                         handles.guiData.gpsplot{radar2Index}(3).XData = LON;
%                         handles.guiData.gpsplot{radar2Index}(3).YData = LAT;
%                         handles.guiData.gpsplot{radar2Index}(3).CData = colorvalues;
%                         handles.guiData.gpsplot{radar2Index}(3).Visible = true;
%                     end
%                 end
                % handles.guiData.gpsplot{radar2Index}(1).Color =  colorvalues';
                fprintf(1,'\n');
            end
            fprintf(1,'****\n');
            
        end
        updates = [0 0];
    end
    lastDateNum = uniqueDateNum(dn);
    
end



if(getTrackMessages)
    
    trackSt = soa2aos(tracks);
    trackSt = [trackSt fusedTracksSt];
    [dates] = [trackSt(:).dateNum];
    [~,I] = sort((dates));
    trackSt = trackSt(I);
    tracks = aos2soa(trackSt);
end
progressbar(1);
% keys = truthTrackAssociation.keys;
% RadarTrackIds = [];
% count = 1;
% %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% %check track associations
% for ii = 1:numel(truthTrackAssociation.keys)
%     trackVector = truthTrackAssociation(keys{ii});
%     index = find(trackVector>0);
%     trackVector = IDs(index);
%     if(~isempty(trackVector))
%         
%         if(numel(trackVector)>1)
%             ch = 's';
%         else
%             ch = '';
%         end
%         Radar2TrackIds{count} = keys{ii};
%         RadarTrackIds{count} = trackVector;
%         count = count + 1;
%         fprintf(1,'Radar2 Track, %s, matches radar track%s: ',keys{ii},ch)
%         for jj = 1:numel(trackVector)
%             fprintf(1,'%d ',trackVector(jj));
%         end
%         fprintf(1,'\n');
%     end
%     
% end
% %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% %report track associations
% if(~isempty(RadarTrackIds))
%     uiwait(msgbox(sprintf('Operation Completed found: %d associated tracks',numel(Radar2TrackIds)),'Success','modal'));
% else
%     uiwait(msgbox(sprintf('Operation Failed found: 0 associated tracks, exiting'),'Error','modal'));
%     error(sprintf('Operation Failed found: 0 associated tracks, exiting'));
%     
% end