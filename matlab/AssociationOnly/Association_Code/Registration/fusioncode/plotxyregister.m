function handles = plotxyregister(handles)
handles.guiData.yfield = 'Lat';
handles.guiData.xfield = 'Lon';
cellfind = @(string)(@(cell_contents)(strcmp(string,cell_contents)));
[labelNames,labelPairs,~,trackDetectionPairs,detectionNames] = labelmaster(handles.radarParameters);

% if (strcmp(handles.showthegps.State,'on'))
theGPSVisible = 'on';
% else
%     theGPSVisible = 'off';
% end
tracksVisible = 'on';
if(handles.parameters.gpsTrackCount>0)
    gpsyfieldalt = handles.guiData.yfield;
    gpsyalt = cellfun(cellfind(gpsyfieldalt),labelPairs(:,1));
    if(any(gpsyalt))
        gpsyfieldalt = labelPairs{gpsyalt,2};
    end
    handles.guiData.gpsplot = [];
    for gpsTrk = 1:handles.parameters.gpsTrackCount
        if(isfield(handles.GpsTrack{gpsTrk},gpsyfieldalt)&...
                isfield(handles.GpsTrack{gpsTrk},handles.guiData.xfield))
            %plot gps track
            
%             handles.guiData.gpsplot{gpsTrk}(1) = plot(handles.mainAxes,handles.GpsTrack{gpsTrk}.(handles.guiData.xfield),...
%                 handles.GpsTrack{gpsTrk}.(gpsyfieldalt),'.','MarkerSize',4,'MarkerFaceColor',[.7,.7,.7], ...
%                 'MarkerEdgeColor',[.7,.7,.7], 'Visible', theGPSVisible);
            handles.guiData.gpsplot{gpsTrk}(1) = plot(handles.mainAxes,handles.GpsTrack{gpsTrk}.(handles.guiData.xfield),...
                handles.GpsTrack{gpsTrk}.(handles.guiData.yfield),'k','linewidth',2);
            hold(handles.mainAxes,'on');
            handles.guiData.gpsplot{gpsTrk}(2) = plot(handles.mainAxes,handles.GpsTrack{gpsTrk}.(handles.guiData.xfield),...
                handles.GpsTrack{gpsTrk}.(handles.guiData.yfield),'w','linewidth',1);
            handles.guiData.gpsplot{gpsTrk}(3) =  scatter(handles.mainAxes,0,...
            0,20,0,'Visible','off','Marker','o');
        else
            handles.guiData.gpsplot{gpsTrk} = [];
        end
    end
end

if(strcmp(handles.guiData.yfield,'Lat')&&strcmp(handles.guiData.xfield,'Lon'))
    if(1)%~handles.radar.otm)
        [pos,~,rangeSpacing] = spiderweb(handles.radarParameters,handles.angleSpacing,handles.rangeSpacing);
        handles.rangeSpacing = rangeSpacing;
        [latOut,lonOut] =  convertspidertogeo(pos,handles.status.Lat(1),handles.status.Lon(1),handles.radar.heading,0);
        
        hold(handles.mainAxes,'on');
        plot(handles.mainAxes,lonOut,latOut,'c','linewidth',1,'Visible','on');
        hold(handles.mainAxes,'on');
        try
            if(strcmp(handles.loadmaptiles.State,'on'))
                [~,cmap] = plot_openstreetmap(handles.mainAxes,'Alpha', .8, 'Scale', 4,'BaseUrl',handles.mapTileServerUrl);
                colors = distinguishable_colors(4,cmap);
            else
                colors = distinguishable_colors(4,handles.guiData.backgroundColor);
            end
        catch
            progressbar(1);
            colors = distinguishable_colors(4,handles.guiData.backgroundColor);
            %errordlg('Error loading map- skipping');
            % cla(handles.mainAxes,'reset');
            plot(handles.mainAxes,lonOut,latOut,'c','linewidth',1,'Visible','on');
            hold(handles.mainAxes,'on');
        end
        plot(handles.mainAxes,lonOut,latOut,'Color',colors(1,:),'linewidth',1,'Visible','on');
        %end
        LATLON = true;
    end
end
for id= 1:length(handles.guiData.trackInfo.uniqueIds)
    if(ismember(id,handles.guiData.trackInfo.SelectedTracks))
        %cnew = .5*handles.guiData.trackInfo.uniqueIdColor{id};
        if(~handles.guiData.showAll)
            MarkerSize = handles.guiData.MarkerSize(1);
        else
            MarkerSize = handles.guiData.MarkerSize(2);
        end
        if isequal(size(handles.guiData.trackInfo.uniqueIdColor{id}),[1 3])
            handles.guiData.xyplot{id} = plot(handles.mainAxes,handles.tracks.(handles.guiData.xfield)(handles.guiData.trackInfo.indexId{id}),...
                handles.tracks.(handles.guiData.yfield)(handles.guiData.trackInfo.indexId{id}),...
                '.','Color',handles.guiData.trackInfo.uniqueIdColor{id},'MarkerSize',MarkerSize,'Visible',tracksVisible);
        else
            handles.guiData.xyplot{id} = scatter(handles.mainAxes,handles.tracks.(handles.guiData.xfield)(handles.guiData.trackInfo.indexId{id}), ...
                handles.tracks.(handles.guiData.yfield)(handles.guiData.trackInfo.indexId{id}), ...
                MarkerSize,handles.guiData.trackInfo.uniqueIdColor{id},'.','Visible',tracksVisible);
        end
        
        
    else
        if(handles.guiData.showAll||isempty(handles.guiData.trackInfo.uniqueIds))
            %  cnew = .5*handles.guiData.trackInfo.uniqueIdColor{id};
            if isequal(size(handles.guiData.trackInfo.uniqueIdColor{id}),[1 3])
                handles.guiData.xyplot{id} = plot(handles.mainAxes,handles.tracks.(handles.guiData.xfield)(handles.guiData.trackInfo.indexId{id}),...
                    handles.tracks.(handles.guiData.yfield)(handles.guiData.trackInfo.indexId{id}),...
                    '.','Color',handles.guiData.trackInfo.uniqueIdColor{id},'MarkerSize',handles.guiData.MarkerSize(1),'Visible',tracksVisible);
            else
                handles.guiData.xyplot{id} = scatter(handles.mainAxes,handles.tracks.(handles.guiData.xfield)(handles.guiData.trackInfo.indexId{id}), ...
                    handles.tracks.(handles.guiData.yfield)(handles.guiData.trackInfo.indexId{id}), ...
                    handles.guiData.MarkerSize(1),handles.guiData.trackInfo.uniqueIdColor{id},'.','Visible',tracksVisible);
            end
           
        else
            if isequal(size(handles.guiData.trackInfo.uniqueIdColor{id}),[1 3])
                handles.guiData.xyplot{id} = plot(handles.mainAxes,handles.tracks.(handles.guiData.xfield)(handles.guiData.trackInfo.indexId{id}),...
                    handles.tracks.(handles.guiData.yfield)(handles.guiData.trackInfo.indexId{id}),...
                    '.','MarkerFaceColor',handles.guiData.trackInfo.uniqueIdColor{id},'Visible','off','MarkerSize',3);
            else
                handles.guiData.xyplot{id} = scatter(handles.mainAxes,handles.tracks.(handles.guiData.xfield)(handles.guiData.trackInfo.indexId{id}),...
                    handles.tracks.(handles.guiData.yfield)(handles.guiData.trackInfo.indexId{id}),...
                    handles.guiData.MarkerSize(1),handles.guiData.trackInfo.uniqueIdColor{id},'.','Visible','off');
            end
        end
    end
end
dz = .05;
if(handles.guiData.showAll||isempty(handles.guiData.trackInfo.SelectedTracks))
    
    handles.guiData.xDelta = max(handles.tracks.(handles.guiData.xfield))-min(handles.tracks.(handles.guiData.xfield));
    handles.guiData.yDelta = max(handles.tracks.(handles.guiData.yfield))-min(handles.tracks.(handles.guiData.yfield));
    handles.guiData.xmin = min(handles.tracks.(handles.guiData.xfield))-dz*handles.guiData.xDelta;
    handles.guiData.xmax = max(handles.tracks.(handles.guiData.xfield))+dz*handles.guiData.xDelta;
    handles.guiData.ymin = min(handles.tracks.(handles.guiData.yfield))-dz*handles.guiData.yDelta;
    handles.guiData.ymax = max(handles.tracks.(handles.guiData.yfield))+dz*handles.guiData.yDelta;
else
    %get track IDs
    trackIds = handles.guiData.trackInfo.uniqueIds(handles.guiData.trackInfo.SelectedTracks);
    index = ismember(handles.tracks.ID,trackIds);
    handles.guiData.xDelta = max(handles.tracks.(handles.guiData.xfield)(index))-min(handles.tracks.(handles.guiData.xfield)(index));
    handles.guiData.yDelta = max(handles.tracks.(handles.guiData.yfield)(index))-min(handles.tracks.(handles.guiData.yfield)(index));
    handles.guiData.xmin = min(handles.tracks.(handles.guiData.xfield)(index))-dz*handles.guiData.xDelta;
    handles.guiData.xmax = max(handles.tracks.(handles.guiData.xfield)(index))+dz*handles.guiData.xDelta;
    handles.guiData.ymin = min(handles.tracks.(handles.guiData.yfield)(index))-dz*handles.guiData.yDelta;
    handles.guiData.ymax = max(handles.tracks.(handles.guiData.yfield)(index))+dz*handles.guiData.yDelta;
end
if(strcmp(handles.guiData.yfield,'Lat')&&strcmp(handles.guiData.xfield,'Lon'))
    if(~handles.radar.otm)
        
        handles.guiData.xmin = min(lonOut)-dz*handles.guiData.xDelta;
        handles.guiData.xmax = max(lonOut)+dz*handles.guiData.xDelta;
        handles.guiData.ymin = min(latOut)-dz*handles.guiData.yDelta;
        handles.guiData.ymax = max(latOut)+dz*handles.guiData.yDelta;
    end
end
ss = sort(unique(handles.tracks.(handles.guiData.xfield)));
handles.guiParameters.dt =median(abs(diff((ss))));
grid(handles.mainAxes,'on');




xlabelString = labelNames(cellfun(cellfind(handles.guiData.xfield),labelNames(:,1)),2);
ylabelString = labelNames(cellfun(cellfind(handles.guiData.yfield),labelNames(:,1)),2);
xlabel(handles.mainAxes,xlabelString);
ylabel(handles.mainAxes,ylabelString );

if(~isempty(handles.guiData.trackInfo.SelectedTracks))
    seletectTrackString = sprintf('%d ',sort(handles.guiData.trackInfo.uniqueIds(handles.guiData.trackInfo.SelectedTracks)));
    handles.guiData.title = title(handles.mainAxes,sprintf('%s vs. %s\nSelected Tracks: %s ' ,...
        labelNames{cellfun(cellfind(handles.guiData.xfield),labelNames(:,1)),2},...
        labelNames{cellfun(cellfind(handles.guiData.yfield),labelNames(:,1)),2},seletectTrackString));
else
    handles.guiData.title = title(handles.mainAxes,sprintf('%s vs. %s ' ,...
        labelNames{cellfun(cellfind(handles.guiData.xfield),labelNames(:,1)),2},...
        labelNames{cellfun(cellfind(handles.guiData.yfield),labelNames(:,1)),2}));
end

set(handles.mainAxes,'Color',handles.guiData.backgroundColor)
set(handles.mainAxes,'LineWidth',1)
