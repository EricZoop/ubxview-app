function [radar] = parseparametersmultisequence(radar,filepath,varargin)
%read xml file that defines operating mode of radar
if ~contains(path, strcat(filesep, 'coverageMap'))
    % Adds radar_analysis_tools subdirectories to the path
    addpath(fileparts(mfilename('fullpath')))
    addpath2(fileparts(mfilename('fullpath')))
end
warningsOn = true;
if ~isempty(varargin)
    if any(contains(varargin,'nowarnings'))
        warningsOn = false;        
    end
end
%filename = sprintf('%s/%s/ProcParams.xml',BASE,fileName{file});
filename = fullfile(filepath,'ProcParams.xml');
A= xml2struct(filename);
radar.radar = A.Parameters.Attributes.Radar;
[radar.azBeamwidth, radar.elBeamwidth] = getBeamwidths(radar.radar);
radar.ProcParams.Fc = str2double(A.Parameters.Common.Fc.Text)*1e9;
radar.rxchannels = str2double(A.Parameters.Common.N_RX.Text);
try % eCHR 9 channel spreadsheet doesn't have these.
    radar.Npatches = str2double(A.Parameters.Common.Npatches.Text);
    radar.PatchPower = str2double(A.Parameters.Common.PatchPower.Text);
    radar.PatchGain = str2double(A.Parameters.Common.PatchGain.Text);
    radar.TaperingSignalGainLoss1stRx = str2double(A.Parameters.Common.TaperingSignalGainLoss1stRx.Text);
    radar.TaperingNoiseGainLoss1stRx = str2double(A.Parameters.Common.TaperingNoiseGainLoss1stRx.Text);
    radar.TaperingSignalGainLossRefRx = str2double(A.Parameters.Common.TaperingSignalGainLossRefRx.Text);
    radar.TaperingNoiseGainLossRefRx = str2double(A.Parameters.Common.TaperingNoiseGainLossRefRx.Text);
catch
end
try
radar.syncWindow = str2double(A.Parameters.Common.SyncWindow.Text) / 1e6;
radar.trackRevisitTime = str2double(A.Parameters.Common.TrackRevisitTime.Text);
radar.TIF_nPropellerSlots = str2double(A.Parameters.Common.TIF_nPropellerSlots.Text);
radar.TIF_nTrackSlots = str2double(A.Parameters.Common.TIF_nTrackSlots.Text);

catch
    
    radar.syncWindow = 1;
    radar.trackRevisitTime = 1;
    radar.TIF_nPropellerSlots = 1;
radar.TIF_nTrackSlots =1;

end

  
    


% number of pulses in a cpi for both processing channels
uniqueId = 100;
if(~iscell(A.Parameters.Sequence))
    b{1} = A.Parameters.Sequence;
    
    A.Parameters.Sequence = b;
end
radar.beamType = cell(1, numel(A.Parameters.Sequence));
for sq = 1:numel(A.Parameters.Sequence)
    radar.beamType{sq} = A.Parameters.Sequence{sq}.Name.Text;
    radar.numChan(sq) = numel(A.Parameters.Sequence{sq}.ProcChan);
    for chan = 1:numel(A.Parameters.Sequence{sq}.ProcChan)
        if numel(A.Parameters.Sequence{sq}.ProcChan) == 1
            xx = A.Parameters.Sequence{sq}.ProcChan;
        else
            xx = A.Parameters.Sequence{sq}.ProcChan{chan};
        end
        if(regexp(radar.beamType{sq},'Search'))
            radar.beamCode(sq) = 1;
        elseif(regexp(radar.beamType{sq},'Track'))
            radar.beamCode(sq) = 2;
        else
            radar.beamCode(sq) = 3;
        end
        radar.NStaggers(sq,chan) = str2double(xx.NStaggers.Text);
        try
        radar.chirp_npulse(sq,chan) =str2double(xx.NPoints.Text);%<NPoints
        catch
        end
        radar.chirp_pri(sq,chan) = str2double(xx.PRI1.Text); %<PRI1
        radar.chirp_pri2(sq,chan) = str2double(xx.PRI2.Text);
        try
            radar.operOptions{sq, chan} = xx.OperOptions.Text;
        catch
            radar.operOptions{sq, chan} = '';
        end
        radar.STCInitRange(sq,chan) = str2double(xx.STCInitRange.Text);
        radar.clutterMargin(sq,chan) = str2double(xx.ClutterMargin.Text);
        radar.FFT2Doppler(sq,chan) = str2double(xx.FFT2Doppler.Text);
        radar.minVelocity(sq,chan) = str2double(xx.MinVelocity.Text);
        radar.maxVelocity(sq,chan) = str2double(xx.MaxVelocity.Text);
        radar.batchTime(sq,chan) = str2double(xx.BatchTime.Text);
        radar.SeqRepetition(sq,chan) = str2double(xx.SeqRepetition.Text);        
        
        %minimum ranges for both processing channels
        radar.rangeOffset(sq,chan) = str2double(xx.MinRange.Text);
        radar.rangeMax(sq,chan) = str2double(xx.MaxRange.Text);
        radar.rangeRes(sq,chan) = str2double(xx.RangeRes.Text);
        radar.maxTargetRange(sq,chan) = str2double(xx.MaxTgtRange.Text);
        radar.maxVelocity(sq,chan) = str2double(xx.MaxVelocity.Text);
        % get ActMin and Max if they exsit
        if isfield (xx, 'ActMinRange')
            radar.ActMinRange(sq, chan) = str2double(xx.ActMinRange.Text);
            radar.ActMaxRange(sq, chan) = str2double(xx.ActMaxRange.Text);
        else
            radar.ActMinRange(sq, chan) = str2double(xx.MinRange.Text);
            radar.ActMaxRange(sq, chan) = str2double(xx.MaxRange.Text);
        end
        radar.maxTargetRange(sq,chan) = max([radar.ActMaxRange(sq, chan), radar.rangeMax(sq,chan), radar.maxTargetRange(sq,chan)]);
        radar.pulseWidth(sq,chan) = str2double(xx.PulseWidth.Text);
        radar.batchTime(sq,chan) =  str2double(xx.BatchTime.Text);
        radar.PostDec(sq,chan) = str2double(xx.PostDec.Text);
        if(radar.beamCode(sq)==1)
            radar.numberOfBeamSteers(sq,chan) =  numel(xx.BeamSteering);
        else
            radar.numberOfBeamSteers(sq,chan) = 0;
        end
        radar.NRG(sq,chan)  =str2double(xx.NRangeGates.Text);
        radar.RGOverlap(sq,chan)  =str2double(xx.RGOverlap.Text);
        radar.overSample(sq,chan) = round(radar.Fs/str2double(xx.BandWidth.Text));
        radar.Nseries(sq,chan) =str2double( xx.NSeries.Text );
        radar.pulse(sq,chan) = 1;%barkercode( str2double(xx.NSeries.Text),1,0).';f
        radar.TChip(sq,chan) = str2double(xx.ChipSize.Text);
        if(radar.beamCode(sq)==1)
            if(iscell(xx.BeamSteering))
                for ii = 1:numel(xx.BeamSteering)
                    radar.azsteer{sq, chan}(ii) = str2double(xx.BeamSteering{ii}.SteerAz.Text) * 180/pi;
                    radar.elsteer{sq, chan}(ii) = str2double(xx.BeamSteering{ii}.SteerEl.Text) * 180/pi;
                    if isfield(xx.BeamSteering{ii}, 'TxBeamType')
                        radar.txBeamType{sq, chan}(ii) = str2double(xx.BeamSteering{ii}.TxBeamType.Text);
                    end
                end
            else
                for ii = 1:numel(xx.BeamSteering)
                    radar.azsteer{sq, chan}(ii) = str2double(xx.BeamSteering.SteerAz.Text) * 180/pi;
                    radar.elsteer{sq, chan}(ii) = str2double(xx.BeamSteering.SteerEl.Text) * 180/pi;
                    if isfield(xx.BeamSteering, 'TxBeamType')
                        radar.txBeamType{sq, chan}{ii} = str2double(xx.BeamSteering.TxBeamType.Text);
                    end
                end
            end
        else
            radar.azsteer{sq, chan}  = [] ;
            radar.elsteer{sq, chan}= [] ;
        end
        for ii = 1:numel(A.Parameters.Sequence{sq}.Beam)
            if iscell(A.Parameters.Sequence{sq}.Beam)
                radar.beam{sq}.procChanId(ii) = str2double(A.Parameters.Sequence{sq}.Beam{ii}.ProcChanId.Text);
                radar.beam{sq}.beamType(ii) = str2double(A.Parameters.Sequence{sq}.Beam{ii}.BeamType.Text);
                radar.beam{sq}.stagger(ii) = str2double(A.Parameters.Sequence{sq}.Beam{ii}.Stagger.Text);
                radar.beam{sq}.rcvPatchGrp(ii) = str2double(A.Parameters.Sequence{sq}.Beam{ii}.RcvPatchGrp.Text);
                radar.beam{sq}.tracking(ii) = str2double(A.Parameters.Sequence{sq}.Beam{ii}.Tracking.Text);
                radar.beam{sq}.stgPRISeqInChipUnits(ii) = str2double(A.Parameters.Sequence{sq}.Beam{ii}.StgPRISeqInChipUnits.Text);
            else
                radar.beam{sq}.procChanId = str2double(A.Parameters.Sequence{sq}.Beam.ProcChanId.Text);
                radar.beam{sq}.beamType = str2double(A.Parameters.Sequence{sq}.Beam.BeamType.Text);
                radar.beam{sq}.stagger = str2double(A.Parameters.Sequence{sq}.Beam.Stagger.Text);
                radar.beam{sq}.rcvPatchGrp = str2double(A.Parameters.Sequence{sq}.Beam.RcvPatchGrp.Text);
                radar.beam{sq}.tracking = str2double(A.Parameters.Sequence{sq}.Beam.Tracking.Text);
                radar.beam{sq}.stgPRISeqInChipUnits = str2double(A.Parameters.Sequence{sq}.Beam.StgPRISeqInChipUnits.Text);
            end
        end
        radar.numberShotgunBeams(sq, chan) = sum(radar.beam{sq}.procChanId == chan);
        % Is this correct, why numberShotgunBeams
        radar.duty(sq,chan) = radar.pulseWidth(sq,chan)/(radar.numberShotgunBeams(sq, chan)*radar.chirp_pri(sq, chan));
        if(isfield(A.Parameters.Sequence{sq},'Group'))
            radar.group(sq) =  str2double(A.Parameters.Sequence{sq}.Group.Text);
        else
            if ~isfield(radar,'group') || length(radar.group) < sq
                radar.group(sq) = uniqueId;
                uniqueId= uniqueId + 1;
            end
        end
        radar.threshold(sq,chan) = str2double(xx.ThresholdSNR.Text);
    end
end

%load procconfig.xml
filename = fullfile(filepath,'ProcConfig.xml');
if exist(filename, 'file')
    radar.procConfig = xml2struct(filename);
end

%load userconfig.xml
filename = fullfile(filepath,'UserConfig.xml');
if exist(filename, 'file')
    userConfig= xml2struct(filename);
    radar.userConfig = userConfig;
    radar.Fc = str2double(userConfig.Config.General.CarrierFrequency.Text);
    radar.agcSet = str2double(userConfig.Config.General.RxAgcDataset.Text);
end

do_cal = true;
try
    filename = fullfile(filepath,sprintf('Calib/Seq_C_%d.xml',radar.Fc));
    calib= xml2struct(filename);
catch
    try
    filename = fullfile(filepath,sprintf('Calib/Seq_C_%d.xml',radar.Fc/1000));
    calib= xml2struct(filename);
    catch
       if warningsOn
            fprintf('Unable to open calibration file, Ignoring calibration\n')
       end
       do_cal = false;
    end
end

if do_cal
    try
        x = calib.Calibration.Processing_Channels.Processing_Channel_1;
    catch
        x = calib.Calibration.ProcessingChannels.ProcessingChannel_1;
        y = calib.Calibration.ProcessingChannels.ProcessingChannel_2;
    end
    try
        P = 10.^([str2double(x.Rx_Chans.Rx_Chan_1.Power.Text) str2double(x.Rx_Chans.Rx_Chan_2.Power.Text) str2double(x.Rx_Chans.Rx_Chan_3.Power.Text) str2double(x.Rx_Chans.Rx_Chan_4.Power.Text)]/20);
        phase = exp(1i*[str2double(x.Rx_Chans.Rx_Chan_1.Phase.Text) str2double(x.Rx_Chans.Rx_Chan_2.Phase.Text) str2double(x.Rx_Chans.Rx_Chan_3.Phase.Text) str2double(x.Rx_Chans.Rx_Chan_4.Phase.Text)]*pi/180);
        radar.calibration= P.*phase;
        x = calib.Calibration.Processing_Channels.Processing_Channel_2;
        P = 10.^([str2double(x.Rx_Chans.Rx_Chan_1.Power.Text) str2double(x.Rx_Chans.Rx_Chan_2.Power.Text) str2double(x.Rx_Chans.Rx_Chan_3.Power.Text) str2double(x.Rx_Chans.Rx_Chan_4.Power.Text)]/20);
        phase = exp(1i*[str2double(x.Rx_Chans.Rx_Chan_1.Phase.Text) str2double(x.Rx_Chans.Rx_Chan_2.Phase.Text) str2double(x.Rx_Chans.Rx_Chan_3.Phase.Text) str2double(x.Rx_Chans.Rx_Chan_4.Phase.Text)]*pi/180);
        radar.calibrationChannel2 = P.*phase;
    catch
        
        try
            agcCal = getfield(getfield(x.AgcSets,sprintf('AgcSet_%d',radar.agcSet)),'RxChansNoWeighting');
            for ch = 1:radar.rxchannels
                chx =getfield(agcCal,sprintf('RxChan_%d',ch));
                P(ch) = 10.^(str2double(chx.Power.Text)/10);
                phase(ch) = exp(1i*pi/180*str2double(chx.Phase.Text));
                
            end
            radar.calibration = P.*phase;
            
            agcCal = getfield(getfield(y.AgcSets,sprintf('AgcSet_%d',radar.agcSet)),'RxChansNoWeighting');
            for ch = 1:radar.rxchannels
                chx =getfield(agcCal,sprintf('RxChan_%d',ch));
                P(ch) = 10.^(str2double(chx.Power.Text)/10);
                phase(ch) = exp(1i*pi/180*str2double(chx.Phase.Text));
                
            end
            radar.calibrationChannel2 = P.*phase;
        catch
            if warningsOn
                fprintf('Ignoring calibration\n')
            end
        end
    end
end

radar.Fc = radar.Fc*1000;
filename = fullfile(filepath,'GenConfig.xml');
A= xml2struct(filename);
radar.lat = str2double(A.Config.LocationAndAttitude.GeodLocation.Latitude.Text);
radar.long = str2double(A.Config.LocationAndAttitude.GeodLocation.Longitude.Text);
radar.altitude = str2double(A.Config.LocationAndAttitude.GeodLocation.Altitude.Text);
radar.heading = str2double(A.Config.LocationAndAttitude.LllnToVehicle.Heading.Text);
radar.roll = str2double(A.Config.LocationAndAttitude.LllnToVehicle.Roll.Text);
radar.pitch =str2double(A.Config.LocationAndAttitude.LllnToVehicle.Pitch.Text);
try
radar.EnableRxAttWeighting = str2double(A.Config.General.EnableRxAttWeighting.Text);
catch
    if warningsOn
        fprintf('Defaulting EnableRxAttWeighting to 0\n');
    end
    radar.EnableRxAttWeighting = 0;
end
% face rotation relative to platform %
% face rotation relative to platform %
try
    for ii = 1:numel(A.Config.LocationAndAttitude.Radar)
        radar.vehicleToFixture.Roll(ii) = str2double(A.Config.LocationAndAttitude.Radar{ii}.VehicleToFixture.Roll.Text);
        radar.vehicleToFixture.Pitch(ii) = str2double(A.Config.LocationAndAttitude.Radar{ii}.VehicleToFixture.Pitch.Text);
        radar.vehicleToFixture.Heading(ii) = str2double(A.Config.LocationAndAttitude.Radar{ii}.VehicleToFixture.Heading.Text);
    end
catch
    %faceRollOnPlatform
    radar.vehicleToFixture.Roll = str2double(A.Config.LocationAndAttitude.Radar.FixtureToBody.Roll.Text);
    radar.vehicleToFixture.Pitch = str2double(A.Config.LocationAndAttitude.Radar.FixtureToBody.Pitch.Text);
    radar.vehicleToFixture.Heading = str2double(A.Config.LocationAndAttitude.Radar.VehicleToFixture.Heading.Text);
end
radar.faceLocationOnPlatform = [0, 0, 0];

% Below seems wrong so removed and replaced with min and max range set from
% search
radar.minRange = 10E6;
radar.maxRange = 0;
radar.maximumTargetRange = 0;
for sq = find(radar.beamCode == 1)
    for chan = 1:radar.numChan(sq)
        radar.minRange = min([radar.minRange radar.rangeOffset(sq,chan)]);
        radar.maxRange = max([ radar.maxRange radar.rangeMax(sq,chan)]);
        try
            radar.maximumTargetRange = max([ radar.maximumTargetRange radar.maxTargetRange(sq,chan)]);
        catch
        end
    end
end
radar.maxTargetRangeBySeq = radar.maxTargetRange;
radar.maxTargetRange = max([radar.maximumTargetRange radar.maxRange]);
radar.UseLocalTime = strcmp(A.Config.General.GPS.UseLocalTime.Text, '1');

%groupification
% [I,IA] = unique(radar.group);
% clear  legendText;
% radar.minRange = 10E6;
% radar.maxRange = 0;
% minAngle = 10e6;
% maxAngle = -10E6;
% for groupId = 1:numel(I)
%     for chan = 1:numel(radar.TChip)
%         if(I(groupId)>=100)
%             sq = find(radar.group==I(groupId));
%             range{groupId} = ((1:radar.NRG(sq))-1)*(radar.TChip(sq)/radar.Fs)*3E8/2 + radar.rangeOffset(sq);
%             staggerGain = 10*log10(radar.NStaggers(sq(1)));
%             
%         else
%             sq = find(radar.group==I(groupId));
%             NRG = min(radar.NRG(sq));
%             rangeOffset =  min(radar.rangeOffset(sq));
%             range{groupId} = ((1:NRG)-1)*(radar.TChip(sq(1))/radar.Fs)*3E8/2 + radar.rangeOffset(sq(1));
%         end
%     end
%     if(radar.beamCode(sq)==1)
%         az = radar.azsteer(sq);
%         minAngle = min(az{1});
%         maxAngle = max(az{1});
%     end
%     radar.minRange = min([ radar.minRange range{groupId}]);
%     radar.maxRange = max([ radar.maxRange range{groupId}]);
%end
a = 1;