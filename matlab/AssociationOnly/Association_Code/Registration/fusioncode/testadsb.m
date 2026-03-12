clear all;
close all;
x = load('adsb1.mat');
tracks=x.tracks;
addpath('./fusioncode');
adsbPath = 'E:\Programs\MLIDS\2022-10-24  St. Louis, MO\2022-10-24  St. Louis Stryker Testing\2022-10-28  Testing Day 4\6.4 Test 2\adsblog.csv';
[adsbTrackAssociation,IDs] =fuse_adsb( adsbPath,tracks,x.status);
%%

keys = adsbTrackAssociation.keys;
for ii = 1:numel(adsbTrackAssociation.keys)
    trackVector = adsbTrackAssociation(keys{ii});
    index = find(trackVector>0);
    trackVector = IDs(index);
    if(~isempty(trackVector))
        if(numel(trackVector)>1)
            ch = 's';
        else
            ch = '';
        end
        fprintf(1,'ADBS Track, %s, matches radar track%s: ',keys{ii},ch)
        for jj = 1:numel(trackVector)
            fprintf(1,'%d ',trackVector(jj));
        end
        fprintf(1,'\n');
    end
        
end
%%
%range, Az, El, bias in degrees


rae = [10000 30*pi/180 10*pi/180];

Rp = buildmeasurenoisematrix(rae, bias);
a= [1 0; 0 1];

vae = [100 30*pi/180 10*pi/180];
b = [0 1;1 0];
Rv = buildmeasurenoisematrix(vae, bias);
%%
speed = 100;
range = 1000
rae = [10000 30*pi/180 10*pi/180];
bias = [10 2*pi/180 2*pi/180];

Rp = buildmeasurenoisematrix(rae, bias)
R = Renu2ecef*R*Renu2ecef';