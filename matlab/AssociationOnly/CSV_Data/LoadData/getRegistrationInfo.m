function  [acceptProb, maxSTD, maxAz, maxMhd] = ...
    getRegistrationInfo(radarParameters)
% get the acceptance probability maxSTD maxAz and maxMhd based on the
% radarType

radartype = radarParameters.radar;
switch lower(radartype)
    case 'mhr'
        acceptProb = .9;
        maxSTD     = 500;
        maxAz      = 10;
        maxMhd     = 4;
    case 'exmhr'
        acceptProb = .9;
        maxSTD     = 500;
        maxAz      = 10;
        maxMhd     = 4;
    case 'iemhr'
        acceptProb = .9;
        maxSTD     = 500;
        maxAz      = 10;
        maxMhd     = 4;
    case 'echr'
        acceptProb = .5;
        maxSTD     = 1000;
        maxAz      = 10;
        maxMhd     = 4;
    case 'achr'
        acceptProb = .5;
        maxSTD     = 1000;
        maxAz      = 10;
        maxMhd     = 4;
    case 'nmhr'
        acceptProb = .9;
        maxSTD     = 500;
        maxAz      = 10;
        maxMhd     = 4;
    otherwise
        uiwait(msgbox(sprintf('Unknown Radar, %s\nExiting Sensor Registration Task...',radartype),'Failure','modal'));
        error('Unknown Radar, %s\nExiting Sensor Registration Task...',radartype);
end
