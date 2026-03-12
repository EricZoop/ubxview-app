clear all;
close all;
rab= fusioncode('.');
rab.initfusion();
latPlatform1 = 40.7484;
longPlatform1 = -73.9857;
altPlatform1 = 0;
xEast=500;
yNorth= 0;
zUp = 0;

altPlatform2 = 0;


[X, Y, Z] = geodetic2ecef(referenceEllipsoid('WGS84'),latPlatform1,longPlatform1,altPlatform1);
ecefPlatform1 = [X;...
    Y;...
    Z;...
    ];

[X, Y, Z] = enu2ecef(xEast, yNorth, zUp,...
    latPlatform1, longPlatform1, altPlatform1, wgs84Ellipsoid);
[latPlatform2, longPlatform2,altPlatform2] =ecef2geodetic(wgs84Ellipsoid, X, Y, Z);

ecefPlatform2 = [X;...
    Y;...
    Z;...
    ];

platformMhr.plaform = 'MHR';
platformMhr.platformId = 1;
platformMhr.type = 'RADAR';
 platformMhr.trackCoordinates = 'ECEF'; 
rab.initplatform(platformMhr);

platformGps.plaform = 'MHR';
platformGps.platformId = 2;
platformGps.type = 'RADAR';
 platformGps.trackCoordinates = 'ECEF'; 
rab.initplatform(platformGps);


alttarget1 = 0;

%
stdR = 1;
stdAz = 1.5;
stdEl = 1.5;
stdD = .1;
trials = 1000;




close all;
figure(1);
hold off;
plot(0,0,'ro','markersize',16);
hold on;
plot(xEast, yNorth,'bo','markersize',16);
plot(0,1000,'gx','markersize',16);
grid on
xlabel('EAST (M)');
ylabel('NORTH (M)');
xlim([-755 755])
ylim([-10 1500])
v = [-1 -1 1];
%%
pos2 = [0 1000 0];
for ii = 1:trials%numel(times )
    tnow = ii;
    if(rand(1)>.9)
        v = [-1 -1 1] + .5*randn(1,3);
    end
    pos2 = pos2 + v;
    [lattarget1, lontarget1,alttarget1] = enu2geodetic(pos2(1), pos2(2), pos2(3), latPlatform1, longPlatform1, altPlatform1, wgs84Ellipsoid);
    [xEast, yNorth, zUp] = geodetic2enu(lattarget1, lontarget1, alttarget1, latPlatform1, longPlatform1, altPlatform1, ...
        wgs84Ellipsoid);
    xt = xEast;
    yt = yNorth;
    plot(xEast, yNorth,'ks');
    % update radar 1
    platformpos.platform = 'MHR';
    platformpos.platformId = 1;
    platformpos.format = 'ECEF';
    platformMhr.trackCoordinates = 'ECEF'; 
    platformpos.platformPosEcef= ecefPlatform1;
    
    
    platformpos.platformPosAttitude= [0;0;0];
    platformpos.platformPosStd= [10; 10; 10];
    platformpos.time =ii;
    rab.updateplatform( platformpos);
    % update radar 2
    platformpos.platform = 'MHR';
    platformpos.platformId = 2;
    platformpos.format = 'ECEF';
   
    platformpos.platformPosEcef= ecefPlatform2;
    
    
    platformpos.platformPosAttitude= [0;0;0];
    platformpos.platformPosStd= [10; 10; 10];
    platformpos.time =ii;
    rab.updateplatform( platformpos);
    
    Xo(ii) = rab.mState.platform(platformMhr.platformId).platformTrack.mState.xCurr(1);
    Yo(ii) = rab.mState.platform(platformMhr.platformId).platformTrack.mState.xCurr(3);
    Zo(ii) = rab.mState.platform(platformMhr.platformId).platformTrack.mState.xCurr(5);

    datapoint.platform = 'MHR';
    datapoint.platformId = 1;
    datapoint.format = 'RAED';
    datapoint.trackId = 1;
    datapoint.time = ii;
    [AZ, ELEV, slantRange] = geodetic2aer(lattarget1, lontarget1, alttarget1, latPlatform1, longPlatform1, altPlatform1, ...
        wgs84Ellipsoid);
    [xEast, yNorth, zUp] = geodetic2enu(lattarget1, lontarget1, alttarget1, latPlatform1, longPlatform1, altPlatform1, ...
        wgs84Ellipsoid);
    v1 = [xEast; yNorth; zUp];
    v2 = v;
    
    d =  dot(v1,v2)./slantRange;
    
    datapoint.pos =[slantRange;...
        AZ*pi/180;...
        ELEV*pi/180;...`
        d];
    datapoint.posStd = [stdR;...
        stdAz*pi/180;...
        stdEl*pi/180;...
        stdD];
     datapoint.pos = datapoint.pos + randn(4,1).*[datapoint.posStd];
    rab.insertpoint(datapoint);
    
    datapoint.platform = 'MHR';
    datapoint.platformId = 2;
    datapoint.format = 'RAED';
    datapoint.trackId = 2;
    datapoint.time = ii;
    [AZ, ELEV, slantRange] = geodetic2aer(lattarget1, lontarget1, alttarget1, latPlatform2, longPlatform2, altPlatform2, ...
        wgs84Ellipsoid);
    [xEast, yNorth, zUp] = geodetic2enu(lattarget1, lontarget1, alttarget1, latPlatform2, longPlatform2, altPlatform2, ...
        wgs84Ellipsoid);
    v1 = [xEast; yNorth; zUp];
    v2 = v;
    
    d =  dot(v1,v2)./slantRange;
    datapoint.pos =[slantRange;...
        AZ*pi/180;...
        ELEV*pi/180;...`
        d];
    datapoint.posStd = [stdR;...
        stdAz*pi/180;...
        stdEl*pi/180;...
        stdD];
     datapoint.pos = datapoint.pos + randn(4,1).*[datapoint.posStd];
    rab.insertpoint(datapoint);
    

%             plot(datapoint.time,x.tracks.lastAssocTgt_range(ix),'b.');
%             hold on;
%             if(toc(aaa)>10)
%                 aaa = tic;
% 
%             drawnow;
%             end

%     tnow = 24*3600*(x.tracks.dateNum(ix)-mintime);
%     platformId,time,format,pos
    
rab.fuse(tnow);
%[tracksFused,confirm] =  rab.getfusedraed(tnow,ecefPlatform1);

c{1} = 'r.';
c{2} = 'b.';

for z = 1:2
    pos = rab.getcurrentecef(z,tnow);
    [xEast, yNorth, zUp] = ecef2enu( pos.ecef(1), pos.ecef(3), pos.ecef(5), latPlatform1, longPlatform1, altPlatform1, wgs84Ellipsoid);
    plot( xEast, yNorth,c{z});
    cov = pos.cov{1}(1:2:end,1:2:end);
    R = ned2ecefrotationmatrix(lattarget1, lontarget1);
    cov = R'*cov*R;
    covenu(1,1) = cov(2,2);
    covenu(2,2) = cov(1,1);
    covenu(1,2) = cov(2,1);
    covenu(2,1) = cov(1,2);
    if(ii>1)
        delete(h1{z});
    end
    h1{z} = error_ellipse(covenu,[xt, yt],'style',c{z});
end
fusedTracks = rab.getfusedecef(tnow);
cov = fusedTracks.ppred{1}(1:2:end,1:2:end);
R = ned2ecefrotationmatrix(lattarget1, lontarget1);
cov = R'*cov*R;
covenu(1,1) = cov(2,2);
covenu(2,2) = cov(1,1);
covenu(1,2) = cov(2,1);
covenu(2,1) = cov(1,2);

%tracks = rab.getcurrentraed(1,ii,'RAED',[]);
[xEast, yNorth, zUp] = ecef2enu(fusedTracks.ecef(1),fusedTracks.ecef(3),fusedTracks.ecef(5), latPlatform1, longPlatform1, altPlatform1, wgs84Ellipsoid);

if(~isempty(fusedTracks))
    plot( xEast, yNorth,'g.');
    if(exist('h','var'))
        delete(h)
    end
    h = error_ellipse(covenu,[xt, yt],'style','g');
end
xlim([-50 50]+xt);
ylim([-50 50] + yt);
drawnow;
%pause(.1);
% tracks = rab.getcurrentraed(2,ii,'RAED',[]);
% if(~isempty(tracks))
%     plot( tnow,tracks.raed(:,2),'b.');
%     hold on;
% end

%     
%     rab.deletestaletracks( tnow);
%     % update gps

%     datapoint.platform = 'GPS';
%     datapoint.platformId = 2;
%     datapoint.format = 'ECEF';
%     datapoint.trackId = 1;
%     datapoint.time = 24*3600*(times(ii)-mintime);
%     [X,Y,Z] = geodetic2ecef(wgs84Ellipsoid(),latGps(ii),longGps(ii),altGps(ii));
%     datapoint.pos =[X;...
%         Y;...
%         Z];
%     datapoint.posStd = [10;...
%         10;...
%         10];
%     rab.insertpoint(datapoint);
%     
    drawnow;
    a = 1;
end
 drawnow;
