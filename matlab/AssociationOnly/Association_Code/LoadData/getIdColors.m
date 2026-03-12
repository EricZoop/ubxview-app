function trackInfo = getIdColors(trackInfo, backgroundColor)
%#########################################################################%
%get track ID colors
colors = colororder;
% Don't pick background, white, black, or detection color
trackInfo.colors = distinguishable_colors(trackInfo.nonTrivialTrackLengthCount+1, [backgroundColor;[1 1 1];[0 0 0]; colors(1,:); [0 0 1];[255 255 0 ]]/255);
count = 1;
for id= 1:length(trackInfo.uniqueIds)
    if(trackInfo.trackLength(id)>15)
%         if(trackInfo.radarIndex(id)==1)
            trackInfo.uniqueIdColor{id} = trackInfo.colors(count,:);
%         else
%             trackInfo.uniqueIdColor{id} = .5*[255 0 0]/255;
%         end
        count = count + 1;
    else
        trackInfo.uniqueIdColor{id} = [100 200 0]/255;
    end
end