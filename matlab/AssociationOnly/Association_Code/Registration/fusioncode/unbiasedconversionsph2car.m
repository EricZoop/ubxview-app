function z = unbiasedconversionsph2car(posRad,sigmaRad)
            b1 = 1./exp(-(sigmaRad(2,:).^2/2));
            b2 = 1./exp(-(sigmaRad(3,:).^2/2));
            z(1,:) = b1.*b2.*posRad(1,:).*cos(posRad(2,:)).*cos(posRad(3,:));
            z(2,:) = b1.*b2.*posRad(1,:).*sin(posRad(2,:)).*cos(posRad(3,:));
            z(3,:) = b1.*posRad(1,:).*sin(posRad(3,:));
end
        