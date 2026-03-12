function trackInfo = getTrackInfo(track,varargin)
%#########################################################################%
%get track info
trackInfo.uniqueIds = unique(track.ID);
trackInfo.nonTrivialTrackLengthCount= 0;
trackInfo.SelectedTracks = [];

% Efficiently make list of indexes of track data for each
% track id. Full day of data too slow to process with old method
% Sort preserves order of identical elements so we will have a
% list by id in the original sample order of the track
[values, indexes] = sort(track.ID);
% Find locations where ID changes
changes = find(diff(values) > 0);
changes(end+1) = numel(values);
last = 1;
% Make data for each track
for id= 1:length(trackInfo.uniqueIds)
    indexId = indexes(last:changes(id));
    last = changes(id)+1;
    if(isfield(track,'loadId'))
        trackInfo.radarIndex(id) = min(track.loadId(indexId));
    else
        trackInfo.radarIndex(id) = 1;
    end
    trackInfo.indexId{id} = indexId ;
    trackInfo.trackLength(id) = max(track.elapsedTime(indexId))-min(track.elapsedTime(indexId));
    if(trackInfo.trackLength(id)>15)
        trackInfo.nonTrivialTrackLengthCount=trackInfo.nonTrivialTrackLengthCount+1;
    end
end
if(nargin>1)
    handles = varargin{1};
    
end
if(nargin==3)
    managed = varargin{2};
    
end
if(exist('managed'))
    if(isfield(managed, 'same_colors'))
        if(managed.same_colors == true)
            mgd.colors = handles.guiData.trackInfo.colors;
            trackInfo = getIdColors(trackInfo,handles.guiData.backgroundColor, mgd);
        end
    end
end
if(~isfield(trackInfo,'uniqueIdColor'))
    if(exist('handles'))
        trackInfo = getIdColors(trackInfo,handles.guiData.backgroundColor);
    else
        trackInfo = getIdColors(trackInfo,[250 250 210]/255);
    end
end