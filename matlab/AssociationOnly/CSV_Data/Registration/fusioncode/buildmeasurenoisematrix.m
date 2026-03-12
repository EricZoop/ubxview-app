function R = buildmeasurenoisematrix(posRad,sigmaRad)
b1 = exp(-sigmaRad(2).^2/2);
b2 = exp(-sigmaRad(3).^2/2);
R11 = ((b1*b2)^-2-2)*(posRad(1)*cos(posRad(2))*cos(posRad(3)))^2+...
    .25*(posRad(1)^2+sigmaRad(1)^2)*(1+b1^4*cos(2*posRad(2)))*(1+b2^4*cos(2*posRad(3)));
R22 = ((b1*b2)^-2-2)*(posRad(1)*sin(posRad(2))*cos(posRad(3)))^2+...
    .25*(posRad(1)^2+sigmaRad(1)^2)*(1-b1^4*cos(2*posRad(2)))*(1+b2^4*cos(2*posRad(3)));
R33 = (b2^-2-2)*posRad(1)^2*sin(posRad(3))^2+.5*(posRad(1)^2+sigmaRad(1)^2)*(1-b2^4*cos(2*posRad(3)));

R12 = ((b1*b2)^-2-2)*posRad(1)^2*sin(posRad(2))*cos(posRad(2))*cos(posRad(3))^2+...
    .25*(posRad(1)^2+sigmaRad(1)^2)*b1^4*sin(2*posRad(2))*(1+b2^4*cos(2*posRad(3)));
R13 = (1/b1*1/b2^2-1/b1-b1)*posRad(1)^2*cos(posRad(2))*sin(posRad(3))*cos(posRad(3))+...
    .5*(posRad(1)^2+sigmaRad(1)^2)*b1*b2^4*cos(posRad(2))*sin(2*posRad(3));
R23 = (1/b1*1/b2^2-1/b1-b1)*posRad(1)^2*sin(posRad(2))*sin(posRad(3))*cos(posRad(3))+...
    .5*(posRad(1)^2+sigmaRad(1)^2)*b1*b2^4*sin(posRad(2))*sin(2*posRad(3));
R = [R11 R12 R13;R12 R22 R23;R13 R23 R33];

end