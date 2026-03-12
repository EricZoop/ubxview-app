function radarParameters = populateRadarParameters_JSON(radar, jsonData)
    %Following the convention from parseparametersmultisequence
    radarParameters = radar;
    radarParameters.Fs = 80E6;

    radarParameters.radar = getRadarName_FromJSON(jsonData.radar_system.radar_type);
    [radarParameters.azBeamwidth, radarParameters.elBeamwidth] = getBeamwidths(radarParameters.radar);

    
    sequences = [jsonData.radar_system.sequences(:)];
    procChan = [sequences(:).proc_chan];
    radarParameters.beamType = {sequences(:).beam_type};
    radarParameters.numChan = [sequences(:).num_chan];
    radarParameters.beamCode = [procChan(:).beam_code];
    radarParameters.NStaggers = [procChan(:).n_staggers]';
    radarParameters.minVelocity = [procChan(:).min_velocity]';
    radarParameters.maxVelocity = [procChan(:).max_velocity]';    
    radarParameters.rangeOffset = [procChan(:).range_offset]';
    radarParameters.minRange = min([10e6; radarParameters.rangeOffset]);
    radarParameters.rangeMax = [procChan(:).range_max]';
    radarParameters.maxTargetRange = max([procChan(:).max_target_range, radarParameters.rangeMax']);
    radarParameters.NRG = [procChan(:).nrg]';
    radarParameters.TChip = [procChan(:).tchip]';
    
    radarParameters.azsteer = cell(length(radarParameters.TChip),1);
    radarParameters.elsteer = cell(length(radarParameters.TChip),1);
    
    for iSeq = 1:length(radarParameters.TChip)
        if isempty(procChan(iSeq).beam_steering)

        else
            radarParameters.azsteer{iSeq} = [procChan(iSeq).beam_steering(:).az_steer];
            radarParameters.elsteer{iSeq} = [procChan(iSeq).beam_steering(:).el_steer];
        end
    end
    
    radarParameters.group = [sequences(:).group];
    
    %TODO: Determine what this should be
    radarParameters.externalTracks = 0;
    
    %Out of order hotfix
    % radarParameters.beamType(2:10) = radarParameters.beamType([3:10, 2]);
    % radarParameters.NRG(2:10) = radarParameters.NRG([3:10, 2]);
    % radarParameters.TChip(2:10) = radarParameters.TChip([3:10, 2]);
    % radarParameters.azsteer(2:10) = radarParameters.azsteer([3:10, 2]);
    % radarParameters.elsteer(2:10) = radarParameters.elsteer([3:10, 2]);
    % radarParameters.group(2:10) = radarParameters.group([3:10, 2]);
    % radarParameters.maxVelocity(2:10) = radarParameters.maxVelocity([3:10, 2]);
    % radarParameters.minVelocity(2:10) = radarParameters.minVelocity([3:10, 2]);
    % radarParameters.rangeOffset(2:10) = radarParameters.rangeOffset([3:10, 2]);
    % radarParameters.rangeMax(2:10) = radarParameters.rangeMax([3:10, 2]);
    %End hotfix
end