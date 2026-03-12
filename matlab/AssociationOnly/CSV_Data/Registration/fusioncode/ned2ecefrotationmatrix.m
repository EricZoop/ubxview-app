function R = ned2ecefrotationmatrix(lat, lon)
    R = eye(3,3);
    lat = pi/180 * lat;
    lon = pi/180 * lon;
    c  = 1;
    R(0+c, 0+c) = -cos(lon) * sin(lat);
    R(1+c, 1+c) = cos(lon);
    R(2+c, 2+c) = -sin(lat);
    R(0+c, 1+c) = -sin(lon);
    R(0+c, 2+c) = -cos(lon) * cos(lat);
    R(1+c, 2+c) = -sin(lon) * cos(lat);
    R(1+c, 0+c) = -sin(lon) * sin(lat);
    R(2+c, 1+c) = 0.;
    R(2+c, 0+c) = cos(lat);
end