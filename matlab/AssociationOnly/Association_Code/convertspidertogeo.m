function [latOut,lonOut] =  convertspidertogeo(pos,lat,lon,yaw,minEl)

Rspider_to_geo = Rrph_f(0,0,yaw);
beamLooksInSpace = real((Rspider_to_geo * pos')');
azGeo = atan2d(beamLooksInSpace(:,1), beamLooksInSpace(:,2));
r  = sqrt(beamLooksInSpace(:,1).^2  + beamLooksInSpace(:,2).^2)*cosd( minEl);

[latOut,lonOut] = reckon(lat,lon, real(r),real(azGeo),earthRadius);
