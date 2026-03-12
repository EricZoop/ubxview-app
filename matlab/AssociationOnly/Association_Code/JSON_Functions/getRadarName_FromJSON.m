function radarName = getRadarName_FromJSON(radar_type)
    switch radar_type
        case 0
            radarName = 'UNKNOWN';
        case 1
            radarName = 'MHR';
        case 2
            radarName = 'exMHR';
        case 3
            radarName = 'aCHR';
        case 4
            radarName = 'ieMHR';
        case 5
            radarName = 'nMHR';
        case 6
            radarName = 'eCHR';
        otherwise
            error('Unknown Radar Type')
    end
end
