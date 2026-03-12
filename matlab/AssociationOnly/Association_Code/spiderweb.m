function [pos,flags,rangeSpacing,minRange,maxRange]= spiderweb(radar,angleSpacing,rangeSpacing)
%groupification
pos = [];
flags = [];
[I,IA] = unique(radar.group);
clear  legendText;
minRange = 10E6;
maxRange = 0;
minAngle = 10e6; 
maxAngle = -10E6;
for groupId = 1:numel(I)
    
    if(I(groupId)>=100)
        sq = find(radar.group==I(groupId));
        range{groupId} = ([1:radar.NRG(sq)]-1)*(radar.TChip(sq)/radar.Fs)*3E8/4 + radar.rangeOffset(sq);
        staggerGain = 10*log10(radar.NStaggers(sq(1)));    
        
    else
        sq = find(radar.group==I(groupId));
        NRG = min(radar.NRG(sq));
        rangeOffset =  min( [radar.rangeOffset(sq)]);
        range{groupId} = ((1:NRG)-1)*(radar.TChip(sq(1))/radar.Fs)*3E8/4 + radar.rangeOffset(sq(1));
        
        
    end
    if(radar.beamCode(sq)==1)
        az = radar.azsteer(sq);
        minAngle = min(az{1});
        maxAngle = max(az{1});
    end
   
end
minRange = radar.minRange;
if(isfield(radar,'maxTargetRange'))
    
    maxRange = radar.maxTargetRange;
else
maxRange = radar.maxRange;
end
if(minAngle<-38)
    minAngle = -45;
end
if(maxAngle>38)
    maxAngle = 45;
end
if(isempty(rangeSpacing))
    rangeSpacing=(maxRange-minRange)/5;
end
%get wedge of pie
angles = minAngle:angleSpacing:maxAngle;
angles = angles - mean(angles);
angles(angles<minAngle) = [];
angles(angles>maxAngle) = [];


if(numel(angles)<=1)
    if(minAngle ~=maxAngle)
        angles = [minAngle maxAngle];
    else
        angles = [minAngle-5 maxAngle+5];
    end
end
if(min(angles)~=-45)
    angles = [-45 angles];
end
if(max(angles)~=45)
    angles = [angles 45];
end
if(numel(angles>3))
    spiderAngles = angles(1):3:angles(end);
    spiderAngles(end) = max(angles);
else
    spiderAngles = angles;
end


ranges = minRange:rangeSpacing:maxRange;
if(numel(ranges)>=32)
    delta = (maxRange-minRange)/32;
    ranges = minRange:delta:maxRange;
end
if(numel(ranges)==1|min(ranges)==max(ranges))
    
    ranges = [minRange maxRange];
end
%draw rays
count = 1;
for ang=angles
    pos(count,1)= ranges(1)*sind(ang);
    pos(count,2) = ranges(1)*cosd(ang);
    pos(count,3) = 0;
    pos(count+1,1) = ranges(end)*sind(ang);
    pos(count+1,2) = ranges(end)*cosd(ang);
    pos(count+1,3) = 0;
    pos(count+2,1) = nan;
    pos(count+2,2) = nan;
    pos(count+2,3) = nan;
    count = count + 3;
end

for rng = ranges
    newPos = [rng*sind(spiderAngles); rng*cosd(spiderAngles); rng*zeros(size(spiderAngles))]';
    pos = [pos; newPos];
   
    pos(end+1,:) = nan;
    
end

newPos = [];
for ii = 1:numel(radar.enabled)
    if(radar.enabled(ii))
        A = Rrph_f(0,0,radar.vehicleToFixture.Heading(ii));
       newPos = [newPos;pos*A'];
    end
end
pos = newPos;
