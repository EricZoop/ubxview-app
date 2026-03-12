classdef Cat21Processor < handle
    properties
       uap; % User Application Profile
       msgTable;
    end
    methods
        function obj = Cat21Processor()
            % processing function, string array of output fields, number of
            % output fieds
            % Indexed by FRN ID
            cat21UAP = {};
            cat21UAP{1} = @processDataSrcIdentifier;
            cat21UAP{2} = @processTargetReportDescriptor;
            cat21UAP{3} = @processTrackNumber;
            cat21UAP{4} = @processServiceIdentification;
            cat21UAP{5} = @processTimeOfApplicabilityForPosition;
            cat21UAP{6} = @processPositionInWgs84Coordinates;
            cat21UAP{7} = @processPositionInWgs84CoordinatesHighRes;
            cat21UAP{8} = @processFx;
            cat21UAP{9} = @processTimeOfApplicabilityForVelocity;
            cat21UAP{10} = @processAirSpeed;
            cat21UAP{11} = @processTrueAirSpeed;
            cat21UAP{12} = @processTargetAddress;
            cat21UAP{13} = @processTimeOfMessageReceptionForPosition;
            cat21UAP{14} = @processTimeOfMessageReceptionForPositionHighRes;
            cat21UAP{15} = @processTimeOfMessageReceptionForVelocity;
            cat21UAP{16} = @processFx;
            cat21UAP{17} = @processTimeOfMessageReceptionForVelocityHighPrecision;
            cat21UAP{18} = @processGeometricHeight;
            cat21UAP{19} = @processQualityIndicators;
            cat21UAP{20} = @processMopsVersion;
            cat21UAP{21} = @processMode3aCode;
            cat21UAP{22} = @processRollAngle;
            cat21UAP{23} = @processFlightLevel;
            cat21UAP{24} = @processFx;
            cat21UAP{25} = @processMagneticHeading;
            cat21UAP{26} = @processTargetStatus;
            cat21UAP{27} = @processBarometricVerticalRate;
            cat21UAP{28} = @processGeometricVerticalRate;
            cat21UAP{29} = @processAirborneGroundVector;
            cat21UAP{30} = @processTrackAngleRate;
            cat21UAP{31} = @processTimeOfReportTransmission;
            cat21UAP{32} = @processFx;
            cat21UAP{33} = @processTargetIdentification;
            cat21UAP{34} = @processEmitterCategory;
            cat21UAP{35} = @processMetInformation;
            cat21UAP{36} = @processSelectedAltitude;
            cat21UAP{37} = @processFinalStateSelectedAltitude;
            cat21UAP{38} = @processTrajectoryIntent;
            cat21UAP{39} = @processServiceManagement;
            cat21UAP{40} = @processFx;
            cat21UAP{41} = @processAircraftOperationalStatus;
            cat21UAP{42} = @processSurfaceCapabilitiesAndCharacteristics;
            cat21UAP{43} = @processMessageAmplitude;
            cat21UAP{44} = @processBdsRegisterData;
            cat21UAP{45} = @processAcasResolutionAdvisoryReport;
            cat21UAP{46} = @processReceiverId;
            cat21UAP{47} = @processDataAges;
            cat21UAP{48} = @processFx;
            cat21UAP{49} = @processNotUsed;
            cat21UAP{50} = @processNotUsed;
            cat21UAP{51} = @processNotUsed;
            cat21UAP{52} = @processNotUsed;
            cat21UAP{53} = @processNotUsed;
            cat21UAP{54} = @processReservedExpansionField;
            cat21UAP{55} = @processSpecialPurposeField;
            cat21UAP{56} = @processFx;
            obj.uap = cat21UAP;
            obj.msgTable = TableHandle;

        end

        function initTable(obj, n)
            for ii = 1:length(obj.uap)
                obj.uap{ii}(obj.msgTable, [], NaN, n);
            end
            obj.msgTable.tbl.dateVal = repmat("", n, 1);
        end

        function processCat21Msg(obj,msg,n)
            msgIdx = 1;
            cat = msg(msgIdx);
            msgIdx = msgIdx + 1;
            len = msg(msgIdx)*2^8 + msg(msgIdx+1);
            msgIdx = msgIdx + 2;
            frn = 0;
            frnOctet = msg(msgIdx);
            octetCount = 0;
            while (bitand(frnOctet, 1))
                frn = frn*2^8+frnOctet;
                msgIdx = msgIdx + 1;
                frnOctet = msg(msgIdx);
                octetCount = octetCount + 1;
            end
            msgIdx = msgIdx + 1;
            if octetCount > 7
                disp("FRN Overflow Likely");
            end
            frnBitCount = 1;
            while (frnBitCount < octetCount * 8 + 1)
                if bitand(frn, 2^(octetCount*8-frnBitCount))
                    msgIdx = obj.uap{frnBitCount}(obj.msgTable, msg, msgIdx, n);
                end
                frnBitCount = frnBitCount + 1;
            end



       end


    end
end

function newIdx = processNotUsed(tableToPop, msg, msgIdx, n)
    newIdx = msgIdx;
end

function newIdx = processFx(tableToPop, msg, msgIdx, n)
    newIdx = msgIdx;
end

function newIdx = processReservedExpansionField(tableToPop, msg, msgIdx, n)
    newIdx = msgIdx;
end

function newIdx = processSpecialPurposeField(tableToPop, msg, msgIdx, n)
    newIdx = msgIdx;
end

function newIdx = processAircraftOperationalStatus(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.TcasResolutionAdvisory = NaN(n,1);
        tableToPop.tbl.TargetTrajectoryChangeReportCapability = NaN(n,1);
        tableToPop.tbl.TargetStateReportCapability = NaN(n,1);
        tableToPop.tbl.AirReferenedVelocityReportCapability = NaN(n,1);
        tableToPop.tbl.CockpitDisplayOfTrafficInformationAirborne = NaN(n,1);
        tableToPop.tbl.TcasSystemStatus = NaN(n,1);
        tableToPop.tbl.SingleAntenna = NaN(n,1);
        newIdx = NaN;
    else
        tableToPop.tbl.TcasResolutionAdvisory(n) = logical(bitand(msg(msgIdx),2^7));
        tableToPop.tbl.TargetTrajectoryChangeReportCapability(n) = uint8(bitshift(bitand(msg(msgIdx), 96),-5));
        tableToPop.tbl.TargetStateReportCapability(n) = logical(bitand(msg(msgIdx), 2^4));
        tableToPop.tbl.AirReferenedVelocityReportCapability(n) = logical(bitand(msg(msgIdx), 2^3));
        tableToPop.tbl.CockpitDisplayOfTrafficInformationAirborne(n) = logical(bitand(msg(msgIdx), 2^2));
        tableToPop.tbl.TcasSystemStatus(n) = logical(bitand(msg(msgIdx), 2^1));
        tableToPop.tbl.SingleAntenna(n) = logical(bitand(msg(msgIdx), 2^0));
        newIdx = msgIdx + 1;
    end
end

function newIdx = processDataSrcIdentifier(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.SystemAreaCode = NaN(n,1);
        tableToPop.tbl.SystemIdentifactionCode = NaN(n,1);
        newIdx = NaN;
    else
        tableToPop.tbl.SystemAreaCode(n) = uint8(bitshift(bitand(msg(msgIdx), hex2dec('FF00')),-8));
        tableToPop.tbl.SystemIdentifactionCode(n) = uint8(bitand(msg(msgIdx), hex2dec('FF')));
        newIdx = msgIdx + 2;
    end
end

function newIdx = processServiceIdentification(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.ServiceIdentification = NaN(n,1);
        newIdx = NaN;
    else
        tableToPop.tbl.ServiceIdentification(n) = uint8(msg(msgIdx));
        newIdx = msgIdx + 1;
    end
end

function newIdx = processServiceManagement(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.ServiceManagement = NaN(n,1);
        newIdx = NaN;
    else
        tableToPop.tbl.ServiceManagement(n) = msg(msgIdx)*0.5;
        newIdx = msgIdx + 1;
    end
end

function newIdx = processEmitterCategory(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.EmitterCategory = NaN(n,1);
        tableToPop.tbl.EmitterCategoryString = repmat("",n,1);
        newIdx = NaN;
    else
        tableToPop.tbl.EmitterCategory(n) = uint8(msg(msgIdx));
        newIdx = msgIdx + 1;
        switch msg(msgIdx)
            case 0
                tableToPop.tbl.EmitterCategoryString(n) = "No ADSB-B Emitter Category Information";
            case 1
                tableToPop.tbl.EmitterCategoryString(n) = "Light Aircraft <= 15500 lbs";
            case 2
                tableToPop.tbl.EmitterCategoryString(n) = "15500 lbs < small aircraft <75000 lbs";
            case 3
                tableToPop.tbl.EmitterCategoryString(n) = "75000 lbs < medium a/c < 300000 lbs";
            case 4
                tableToPop.tbl.EmitterCategoryString(n) = "High Vortex Large";
            case 5
                tableToPop.tbl.EmitterCategoryString(n) = "300000 lbs <= heavy aircraft";
            case 6
                tableToPop.tbl.EmitterCategoryString(n) = "highly manoeuvrable (5g acceleration capability) and high speed (>400 knots cruise)";
            case 7
                tableToPop.tbl.EmitterCategoryString(n) = "Reserved";
            case 8
                tableToPop.tbl.EmitterCategoryString(n) = "Reserved";
            case 9
                tableToPop.tbl.EmitterCategoryString(n) = "Reserved";
            case 10
                tableToPop.tbl.EmitterCategoryString(n) = "Rotorcraft";
            case 11
                tableToPop.tbl.EmitterCategoryString(n) = "Glider / Sailplane";
            case 12
                tableToPop.tbl.EmitterCategoryString(n) = "Lighter than air";
            case 13
                tableToPop.tbl.EmitterCategoryString(n) = "Unmanned Aerial Vehicle";
            case 14
                tableToPop.tbl.EmitterCategoryString(n) = "space / transatmospheric vehicle";
            case 15
                tableToPop.tbl.EmitterCategoryString(n) = "ultralight / handglider / paraglider";
            case 16
                tableToPop.tbl.EmitterCategoryString(n) = " parachutist / skydiver";
            case 17
                tableToPop.tbl.EmitterCategoryString(n) = "Reserved";
            case 18
                tableToPop.tbl.EmitterCategoryString(n) = "Reserved";
            case 19
                tableToPop.tbl.EmitterCategoryString(n) = "Reserved";
            case 20
                tableToPop.tbl.EmitterCategoryString(n) = "surface emergency vehicle";
            case 21
                tableToPop.tbl.EmitterCategoryString(n) = "surface service vehicle";
            case 22
                tableToPop.tbl.EmitterCategoryString(n) = "fixed ground or tethered obstruction";
            case 23
                tableToPop.tbl.EmitterCategoryString(n) = "cluster obstacle";
            case 24
                tableToPop.tbl.EmitterCategoryString(n) = "line obstacle";
            otherwise
                tableToPop.tbl.EmitterCategoryString(n) = "Invalid - parsing error?";
        end
    end
end

function newIdx = processTargetReportDescriptor(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.AddressType = NaN(n,1);
        tableToPop.tbl.AltitudeReportingCapability = NaN(n,1);
        tableToPop.tbl.RangeCheck = NaN(n,1);
        tableToPop.tbl.ReportType= NaN(n,1);
        tableToPop.tbl.DifferentialCorrection = NaN(n,1);
        tableToPop.tbl.GroundBitSetting = NaN(n,1);
        tableToPop.tbl.SimulatedTarget = NaN(n,1);
        tableToPop.tbl.TestTarget = NaN(n,1);
        tableToPop.tbl.SelectedAltitudeAvailable = NaN(n,1);
        tableToPop.tbl.ConfidenceLevel = NaN(n,1);
        tableToPop.tbl.ListLookupCheck = NaN(n,1);
        tableToPop.tbl.IndependentPositionCheck = NaN(n,1);
        tableToPop.tbl.NoGoBitStatus = NaN(n,1);
        tableToPop.tbl.CompactPositionReporting = NaN(n,1);
        tableToPop.tbl.LocalDecodingPositionJump = NaN(n,1);
        tableToPop.tbl.RangeChange2 = NaN(n,1);
        tableToPop.tbl.TotalBitsCorrectedElementPopulated = NaN(n,1);
        tableToPop.tbl.TotalBitsCorrected = NaN(n,1);
        tableToPop.tbl.MaximumBitsCorrectedElementedPopulated = NaN(n,1);
        tableToPop.tbl.MaximumBitsCorrected = NaN(n,1);
        newIdx = NaN;
    else
        newIdx = msgIdx;
        tableToPop.tbl.AddressType(n) = uint8(bitshift(bitand(msg(newIdx), bin2dec('11100000')), -5));
        tableToPop.tbl.AltitudeReportingCapability(n) = uint8(bitshift(bitand(msg(newIdx), bin2dec('11000')), -3));
        tableToPop.tbl.RangeCheck(n) = logical(bitshift(bitand(msg(newIdx), bin2dec('100')), -2));
        tableToPop.tbl.ReportType(n) = logical(bitshift(bitand(msg(newIdx), bin2dec('10')), -1));
        if ~bitand(msg(newIdx), 1)
            newIdx = newIdx + 1;
            return;
        end
        newIdx = newIdx + 1;
        tableToPop.tbl.DifferentialCorrection(n) = logical(bitshift(bitand(msg(newIdx), bin2dec('10000000')), -7));
        tableToPop.tbl.GroundBitSetting(n) = logical(bitshift(bitand(msg(newIdx), bin2dec('1000000')), -6));
        tableToPop.tbl.SimulatedTarget(n) = logical(bitshift(bitand(msg(newIdx), bin2dec('100000')), -5));
        tableToPop.tbl.TestTarget(n) = logical(bitshift(bitand(msg(newIdx), bin2dec('10000')),-4));
        tableToPop.tbl.SelectedAltitudeAvailable(n) = uint8(bitshift(bitand(msg(newIdx), bin2dec('110')),-1));
        if ~bitand(msg(newIdx), 1)
            newIdx = newIdx + 1;
            return;
        end
        newIdx = newIdx + 1;
        tableToPop.tbl.ListLookupCheck(n) = logical(bitshift(bitand(msg(newIdx), bin2dec('1000000')), -6));
        tableToPop.tbl.IndependentPositionCheck(n) = logica(bitshift(bitand(msg(newIdx), bin2dec('100000')), -5));
        tableToPop.tbl.NoGoBitStatus(n) = logical(bitshift(bitand(msg(newIdx), bin2dec('10000')), -4));
        tableToPop.tbl.CompactPositionReporting(n) = logical(bitshift(bitand(msg(newIdx), bin2dec('1000')), -3));
        tableToPop.tbl.LocalDecodingPositionJump(n) = logical(bitshift(bitand(msg(newIdx), bin2dec('100')), -2));
        tableToPop.tbl.RangeCheck2(n) = logica(bitshift(bitand(msg(newIdx), bin2dec('10')), -1)); 
        if ~bitand(msg(newIdx), 1)
            newIdx = newIdx + 1;
            return;
        end
        newIdx = newIdx + 1;
        tableToPop.tbl.TotalBitsCorrectedElementPopulated(n) = logica(bitshift(bitand(msg(newIdx), bin2dec('10000000')), -7));
        tableToPop.tbl.TotalBitsCorrected(n) = bitshift(bitand(msg(newIdx), bin2dec('1111110')),-1);
        if ~bitand(msg(newIdx), 1)
            newIdx = newIdx + 1;
            return;
        end
        newIdx = newIdx + 1;
        tableToPop.tbl.MaximumBitsCorrectedElementPopulated(n) = logical(bitshift(bitand(msg(newIdx), bin2dec('10000000')), -7));
        tableToPop.tbl.MaximumBitsCorrected(n) = bitshift(bitand(msg(newIdx), bin2dec('1111110')),-1);
        newIdx = newIdx + 1;
    end
end

function newIdx = processMode3aCode(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.mode3aReply = NaN(n,1);
        newIdx = NaN;
    else
        tableToPop.tbl.mode3aReply(n) = bitor(bitshift(msg(msgIdx),8),msg(msgIdx+1));
        newIdx = msgIdx + 2;
    end
end

function newIdx = processTimeOfApplicabilityForPosition(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.TimeOfApplicabilityForPosition = NaN(n,1);
        newIdx = NaN;
    else
        tableToPop.tbl.TimeOfApplicabilityForPosition(n) = 2^-7*(bitshift(msg(msgIdx),16)+bitshift(msg(msgIdx+1),8)+msg(msgIdx+2));
        newIdx = msgIdx + 3;
    end
end

function newIdx = processTimeOfApplicabilityForVelocity(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.TimeOfApplicabilityForVelocity = NaN(n,1);
        newIdx = NaN;
    else
        tableToPop.tbl.TimeOfApplicabilityForVelocity(n) = 2^-7*(bitshift(msg(msgIdx),16)+bitshift(msg(msgIdx+1),8)+msg(msgIdx+2));
        newIdx = msgIdx + 3;
    end
end

function newIdx = processTimeOfMessageReceptionForPosition(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.TimeOfMessageReceptionForPosition = NaN(n,1);
        newIdx = NaN;
    else
        tableToPop.tbl.TimeOfMessageReceptionForPosition(n) = 2^-7*(bitshift(msg(msgIdx),16)+bitshift(msg(msgIdx+1),8)+msg(msgIdx+2));
        newIdx = msgIdx + 3;
    end
end

function newIdx = processTimeOfMessageReceptionForPositionHighRes(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.TimeOfMessageReceptionForPositionHighRes = NaN(n,1);
        newIdx = NaN;
    else
        FSI = bitshift(bitand(msg(msgIdx), bin2dec('1100000')),6);
        switch FSI
            case 3
                wholeSecond = NaN;
            case 2
                wholeSecond = -1;
            case 1
                wholeSecond = 1;
            case 0
                wholeSecond = 0;
            otherwise
                wholeSecond = NaN;
        end
        tableToPop.tbl.TimeOfMessageReceptionForPositionHighRes(n) = wholeSecond + 2^-30*(bitshift(bitand(msg(msgIdx),bin2dec('111111')),24)+bitshift(msg(msgIdx+1),16)+bitshift(msg(msgIdx+2),8)+msg(msgIdx+3));
        newIdx = msgIdx + 4;
    end
end

function newIdx = processTimeOfMessageReceptionForVelocity(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.TimeOfMessageReceptionForVelocity = NaN(n,1);
        newIdx = NaN;
    else
        tableToPop.tbl.TimeOfMessageReceptionForVelocity(n) = 2^-7*(bitshift(msg(msgIdx),16)+bitshift(msg(msgIdx+1),8)+msg(msgIdx+2));
        newIdx = msgIdx + 3;
    end
end


function newIdx = processTimeOfMessageReceptionForVelocityHighPrecision(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.TimeOfMessageReceptionForVelocityHighPrecision = NaN(n,1);
        newIdx = NaN;
    else
        FSI = bitshift(bitand(msg(msgIdx), bin2dec('1100000')),6);
        switch FSI
            case 3
                wholeSecond = NaN;
            case 2
                wholeSecond = -1;
            case 1
                wholeSecond = 1;
            case 0
                wholeSecond = 0;
            otherwise
                wholeSecond = NaN;
        end
        tableToPop.tbl.TimeOfMessageReceptionForVelocityHighPrecision(n) = wholeSecond + 2^-30*(bitshift(bitand(msg(msgIdx),bin2dec('111111')),24)+bitshift(msg(msgIdx+1),16)+bitshift(msg(msgIdx+2),8)+msg(msgIdx+3));
        newIdx = msgIdx + 4;
    end
end

function newIdx = processTimeOfReportTransmission(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.TimeOfReportTransmission = NaN(n,1);
        newIdx = NaN;
    else
        tableToPop.tbl.TimeOfReportTransmission(n) = 2^-7*(bitshift(msg(msgIdx),16)+bitshift(msg(msgIdx+1),8)+msg(msgIdx+2));
        newIdx = msgIdx + 3;
    end
end

function newIdx = processTargetAddress(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.TargetAddress = repmat("",n,1);
        newIdx = NaN;
    else
        tableToPop.tbl.TargetAddress(n) = dec2hex(bitshift(msg(msgIdx),16)+bitshift(msg(msgIdx+1),8)+(msg(msgIdx+2)));
        newIdx = msgIdx + 3;
    end
end

function newIdx = processQualityIndicators(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.NUCrOrNACv = NaN(n,1);
        tableToPop.tbl.NUCpOrNIC = NaN(n,1);
        tableToPop.tbl.NICbaro = NaN(n,1);
        tableToPop.tbl.SourceIntegrityLevel = NaN(n,1);
        tableToPop.tbl.NACp = NaN(n,1);
        tableToPop.tbl.SilSupplement = NaN(n,1);
        tableToPop.tbl.HorizontalPositionSDA = NaN(n,1);
        tableToPop.tbl.GeometricAltitudeAccuracy= NaN(n,1);
        tableToPop.tbl.PositionIntegrityCategory = NaN(n,1);
        newIdx = NaN;
    else
        newIdx = msgIdx;
        tableToPop.tbl.NUCrOrNACv(n) = uint8(bitshift(bitand(msg(newIdx), bin2dec('1110000')),-5));
        tableToPop.tbl.NUCpOrNIC(n)  = uint8(bitshift(bitand(msg(newIdx), bin2dec('11110')),-1));
        if ~bitand(msg(newIdx), 1)
            newIdx = newIdx + 1;
            return;
        end
        newIdx = newIdx + 1;
        tableToPop.tbl.NICbaro(n) = logical(bitshift(bitand(msg(newIdx), bin2dec('10000000')),-7));
        tableToPop.tbl.SourceIntegrityLevel(n) = uint8(bitshift(bitand(msg(newIdx), bin2dec('1100000')),-5));
        tableToPop.tbl.NACp(n) = uint8(bitshift(bitand(msg(newIdx), bin2dec('11110')),-1));
        if ~bitand(msg(newIdx), 1)
            newIdx = newIdx + 1;
            return;
        end
        newIdx = newIdx + 1;
        tableToPop.tbl.SilSupplement(n) = logical(bitshift(bitand(msg(newIdx), bin2dec('100000')),-5));
        tableToPop.tbl.HorizontalPositionSDA(n) = uint8(bitshift(bitand(msg(newIdx), bin2dec('11000')),-3));
        tableToPop.tbl.GeometricAltitudeAccuracy(n) = uint8(bitshift(bitand(msg(newIdx), bin2dec('110')),-1));
        if ~bitand(msg(newIdx), 1)
            newIdx = newIdx + 1;
            return;
        end
        newIdx = newIdx + 1;
        tableToPop.tbl.PositionIntegrityCategory(n) = uint8(bitshift(bitand(msg(newIdx), bin2dec('11110000')),-4));
        newIdx = newIdx + 1;
    end
end

function newIdx = processTrajectoryIntent(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.TrajectoryIntent = NaN(n,1);
        newIdx = NaN;
    else
        disp("Trajectory Intent received - Add Processing Support");
        newIdx = NaN;
    end
end

function newIdx = processPositionInWgs84Coordinates(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.LatitudeWgs84 = NaN(n,1);
        tableToPop.tbl.LongitudeWgs84 = NaN(n,1);
        newIdx = NaN;
    else
        tableToPop.tbl.LatitudeWgs84(n) = (bitshift(msg(msgIdx),16)+bitshift(msg(msgIdx+1),8)+(msg(msgIdx+2)))/2^23;
        if tableToPop.tbl.LatitudeWgs84(n) > 1
            tableToPop.tbl.LatitudeWgs84(n) = tableToPop.tbl.LatitudeWgs84(n) - 2;
        end
        tableToPop.tbl.LatitudeWgs84(n) = tableToPop.tbl.LatitudeWgs84(n) * 180;
        tableToPop.tbl.LongitudeWgs84(n) = (bitshift(msg(msgIdx+3),16)+bitshift(msg(msgIdx+4),8)+(msg(msgIdx+5)))/2^23;
        if tableToPop.tbl.LongitudeWgs84(n) > 1
            tableToPop.tbl.LongitudeWgs84(n) = tableToPop.tbl.LongitudeWgs84(n) - 2;
        end
        tableToPop.tbl.LongitudeWgs84(n) = tableToPop.tbl.LongitudeWgs84(n) * 180;
        newIdx = msgIdx + 6;
    end
end

function newIdx = processPositionInWgs84CoordinatesHighRes(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.LatitudeWgs84HighRes = NaN(n,1);
        tableToPop.tbl.LongitudeWgs84HighRes = NaN(n,1);
        newIdx = NaN;
    else
        tableToPop.tbl.LatitudeWgs84HighRes(n) = (bitshift(msg(msgIdx),24)+bitshift(msg(msgIdx+1),16)+bitshift(msg(msgIdx+2),8) + msg(msgIdx+3));
        if tableToPop.tbl.LatitudeWgs84HighRes(n) > 2^31
            tableToPop.tbl.LatitudeWgs84HighRes(n) = tableToPop.tbl.LatitudeWgs84HighRes(n) - 2^32;
        end
        tableToPop.tbl.LatitudeWgs84HighRes(n) = tableToPop.tbl.LatitudeWgs84HighRes(n)*180/2^30;

        tableToPop.tbl.LongitudeWgs84HighRes(n) = (bitshift(msg(msgIdx+4),24)+bitshift(msg(msgIdx+5),16)+bitshift(msg(msgIdx+6),8) + msg(msgIdx+7));
        if tableToPop.tbl.LongitudeWgs84HighRes(n) > 2^31
            tableToPop.tbl.LongitudeWgs84HighRes(n) = tableToPop.tbl.LongitudeWgs84HighRes(n) - 2^32;
        end
        tableToPop.tbl.LongitudeWgs84HighRes(n) = tableToPop.tbl.LongitudeWgs84HighRes(n)*180/2^30;
        newIdx = msgIdx + 8;
    end
end

function newIdx = processMessageAmplitude(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.MessageAmplitude = NaN(n,1);
        newIdx = NaN;
    else
        tableToPop.tbl.MessageAmplitude(n) = msg(msgIdx);
        newIdx = msgIdx + 1;
    end
end

function newIdx = processGeometricHeight(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.GeometricHeight = NaN(n,1);
        newIdx = NaN;
    else
        octetValue = (bitshift(msg(msgIdx),8) + msg(msgIdx+1));
        if octetValue > 2^15
            octetValue = octetValue - 2^16;
        end
        tableToPop.tbl.GeometricHeight(n) = 0.3048*octetValue*6.25;
        newIdx = msgIdx + 2;
    end
end

function newIdx = processFlightLevel(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.FlightLevel = NaN(n,1);
        newIdx = NaN;
    else
        tableToPop.tbl.FlightLevel(n) = (bitshift(msg(msgIdx),8) + msg(msgIdx+1))*0.25-15;
        newIdx = msgIdx + 2;
    end
end

function newIdx = processSelectedAltitude(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.SelectedAltitude = NaN(n,1);
        tableToPop.tbl.SelectedAltitudeSource = NaN(n,1);
        newIdx = NaN;
    else
        tableToPop.tbl.SelectedAltitudeSource(n) = uint8(bitshift(bitand(msg(msgIdx), bin2dec('1100000')),-5));
        tableToPop.tbl.SelectedAltitude(n) = 0.3048*((bitshift(bitand(msg(msgIdx),bin2dec('11111')),8) + msg(msgIdx+1))*25);
        newIdx = msgIdx + 2;
    end
end

function newIdx = processFinalStateSelectedAltitude(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.ManageVerticalMode = NaN(n,1);
        tableToPop.tbl.AltitudeHoldMode = NaN(n,1);
        tableToPop.tbl.ApproachMode = NaN(n,1);
        tableToPop.tbl.FsaAltitude = NaN(n,1);
        newIdx = NaN;
    else
        tableToPop.tbl.ManageVerticalMode(n) = logical(bitshift(bitand(msg(msgIdx),bin2dec('10000000')),-7));
        tableToPop.tbl.AltitudeHoldMode(n) = logical(bitshift(bitand(msg(msgIdx),bin2dec('1000000')),-6));
        tableToPop.tbl.ApproachMode(n) = logical(bitshift(bitand(msg(msgIdx),bin2dec('100000')),-5));
        tableToPop.tbl.FsaAltitude(n) = 0.3048*((bitshift(bitand(msg(msgIdx),bin2dec('11111')),8) + msg(msgIdx+1))*25);
        newIdx = msgIdx + 2;
    end
end

function newIdx = processAirSpeed(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.AirSpeedUnit = NaN(n,1);
        tableToPop.tbl.AirSpeed = NaN(n,1);
        newIdx = NaN;
    else
        iasOrMach = bitand(msg(msgIdx), bin2dec('10000000'));
        if iasOrMach
            tableToPop.tbl.AirSpeedUnit(n) = "Mach";
            tableToPop.tbl.AirSpeed(n) = (bitshift(bitand(msg(msgIdx), bin2dec('1111111')),8) + msg(msgIdx+1))*0.001;
        else
            tableToPop.tbl.AirSpeedUnit(n) = "NM/s";
            tableToPop.tbl.AirSpeed(n) = (bitshift(bitand(msg(msgIdx), bin2dec('1111111')),8) + msg(msgIdx+1))*2^-14;
        end
        newIdx = msgIdx + 2;
    end
end

function newIdx = processTrueAirSpeed(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.TrueAirSpeed = NaN(n,1);
        newIdx = NaN;
    else
        if ~bitand(msg(msgIdx), bin2dec('10000000'))
            tableToPop.tbl.TrueAirSpeed(n) = bitshift(msg(msgIdx),8) + msg(msgIdx+1);
        end
        newIdx = msgIdx + 2;
    end
end

function newIdx = processMagneticHeading(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.MagneticHeading = NaN(n,1);
        newIdx = NaN;
    else
        tableToPop.tbl.MagneticHeading(n) = (bitshift(msg(msgIdx),8) + msg(msgIdx+1))*360/2^16;
        newIdx = msgIdx + 2;
    end
end

function newIdx = processBarometricVerticalRate(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.BarometricVerticalRate = NaN(n,1);
        newIdx = NaN;
    else
        if ~bitand(msg(msgIdx), bin2dec('10000000'))
            tableToPop.tbl.BarometricVerticalRate(n) = (bitshift(msg(msgIdx),8) + msg(msgIdx+1));
            if bitand(msg(msgIdx), bin2dec('1000000'))
                tableToPop.tbl.BarometricVerticalRate(n) = tableToPop.tbl.BarometricVerticalRate(n) - 2^15;
            end
            tableToPop.tbl.BarometricVerticalRate(n) = tableToPop.tbl.BarometricVerticalRate(n) * 6.25;
        end
        newIdx = msgIdx + 2;
    end
end

function newIdx = processGeometricVerticalRate(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.GeometricVerticalRate = NaN(n,1);
        newIdx = NaN;
    else
        if ~bitand(msg(msgIdx), bin2dec('10000000'))
            tableToPop.tbl.GeometricVerticalRate(n) = (bitshift(msg(msgIdx),8) + msg(msgIdx+1));
            if bitand(msg(msgIdx), bin2dec('1000000'))
                tableToPop.tbl.GeometricVerticalRate(n) = tableToPop.tbl.GeometricVerticalRate(n) - 2^15;
            end
            tableToPop.tbl.GeometricVerticalRate(n) = tableToPop.tbl.GeometricVerticalRate(n) * 6.25;
        end
        newIdx = msgIdx + 2;
    end
end

function newIdx = processAirborneGroundVector(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.GroundSpeed = NaN(n,1);
        tableToPop.tbl.TrackAngle = NaN(n,1);
        newIdx = NaN;
    else
        if ~bitand(msg(msgIdx), bin2dec('10000000'))
            tableToPop.tbl.GroundSpeed(n) = 2^-14*(bitshift(msg(msgIdx),8) + msg(msgIdx+1));
        end
       tableToPop.tbl.TrackAngle(n) = (bitshift(msg(msgIdx+2),8) + msg(msgIdx+3))*360/2^16;
       newIdx = msgIdx + 4;
    end
end

function newIdx = processTrackNumber(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.TrackNumber = NaN(n,1);
        newIdx = NaN;
    else
        tableToPop.tbl.TrackNumber(n) = (bitshift(msg(msgIdx),8) + msg(msgIdx+1));
        newIdx = msgIdx + 2;
    end
end

function newIdx = processTrackAngleRate(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.TrackAngleRate = NaN(n,1);
        newIdx = NaN;
    else
        tableToPop.tbl.TrackAngleRate(n) = (bitshift(msg(msgIdx),8) + msg(msgIdx+1));
        if bitand(tableToPop.tbl.TrackAngleRate(n), 2^9)
            tableToPop.tbl.TrackAngleRate(n) = tableToPop.tbl.TrackAngleRate(n) -2^10;
        end
        tableToPop.tbl.TrackAngleRate(n) = tableToPop.tbl.TrackAngleRate(n)/32;
        newIdx = msgIdx + 2;
    end
end

% Phoning in the ones from here down - will update ones that actually get
% populated
function newIdx = processTargetIdentification(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.TargetIdentifaction = NaN(n,1);
        newIdx = NaN;
    else
        tableToPop.tbl.TargetIdentifaction(n) = bitshift(msg(msgIdx), 8*5) + ...
            bitshift(msg(msgIdx+1), 8*4) + ...
            bitshift(msg(msgIdx+2), 8*3) + ...
            bitshift(msg(msgIdx+3), 8*2) + ...
            bitshift(msg(msgIdx+4), 8*1) + ...
            bitshift(msg(msgIdx+5), 8*0);
        newIdx = msgIdx + 6;
    end
end

function newIdx = processTargetStatus(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.IntentChangeFlag = NaN(n,1);
        tableToPop.tbl.LnavMode = NaN(n,1);
        tableToPop.tbl.MilitaryEmergency = NaN(n,1);
        tableToPop.tbl.PriorityStatus = NaN(n,1);
        tableToPop.tbl.SurveillanceStatus = NaN(n,1);
        newIdx = NaN;
    else
        tableToPop.tbl.IntentChangeFlag(n) = logical(bitshift(bitand(msg(msgIdx),bin2dec('10000000')),-7));
        tableToPop.tbl.LnavMode(n) = logical(bitshift(bitand(msg(msgIdx),bin2dec('1000000')),-6));
        tableToPop.tbl.MilitaryEmergency(n) = logical(bitshift(bitand(msg(msgIdx),bin2dec('100000')),-5));
        tableToPop.tbl.PriorityStatus(n) = uint8(bitshift(bitand(msg(msgIdx),bin2dec('11100')),-2));
        tableToPop.tbl.SurveillanceStatus(n) = uint8(bitand(msg(msgIdx), bin2dec('11')));
        newIdx = msgIdx + 1;
    end
end

function newIdx = processMopsVersion(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.MopsVersion = NaN(n,1);
        tableToPop.tbl.LinkTechnologyType = NaN(n,1);
        newIdx = NaN;
    else
        tableToPop.tbl.MopsVersion(n) = uint8(bitshift(bitand(msg(msgIdx),bin2dec('111000')),-3));
        tableToPop.tbl.LinkTechnologyType(n) = uint8(bitand(msg(msgIdx),bin2dec('111')));
        newIdx = msgIdx + 1;
    end
end

function newIdx = processMetInformation(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.WindSpeed = NaN(n,1);
        tableToPop.tbl.WindDirection = NaN(n,1);
        tableToPop.tbl.Temperature = NaN(n,1);
        tableToPop.tbl.Turbulence = NaN(n,1);
        newIdx = NaN;
    else
        hasWindSpeed = bitshift(bitand(msg(msgIdx), bin2dec('10000000')),7);
        hasWindDirection = bitshift(bitand(msg(msgIdx), bin2dec('1000000')),6);
        hasTemperature = bitshift(bitand(msg(msgIdx), bin2dec('100000')),5);
        hasTurbulence = bitshift(bitand(msg(msgIdx), bin2dec('10000')),4);
        msgIdx = msgIdx + 1;
        if hasWindSpeed
            tableToPop.tbl.WindSpeed(n) = msg(msgIdx:msgIdx+1);
            msgIdx = msgIdx+2;
        end
        if hasWindDirection
            tableToPop.tbl.WindDirection(n) = bitshift(msg(msgIdx),8)+msg(msgIdx+1);
            msgIdx = msgIdx+2;
        end
        if hasTemperature
            tableToPop.tbl.Temperature(n) = 0.25*(bitshift(msg(msgIdx),8)+msg(msgIdx+1));
            msgIdx = msgIdx+2;
        end
        if hasTurbulence
            tableToPop.tbl.Turbulence(n) = msg(msgIdx);
            msgIdx = msgIdx+1;
        end
        newIdx = msgIdx;
    end
end

function newIdx = processRollAngle(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.RollAngle = NaN(n,1);
        newIdx = NaN;
    else
        tableToPop.tbl.RollAngle(n) = (bitshift(msg(msgIdx),8) + msg(msgIdx+1))*0.01;
        if tableToPop.tbl.RollAngle(n) > 180
            tableToPop.tbl.RollAngle(n) = tableToPop.tbl.RollAngle(n) - 360;
        end
        newIdx = msgIdx + 2;
    end
end

function newIdx = processBdsRegisterData(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.BdsRegisterData = NaN(n,1);
        newIdx = NaN;
    else
        disp("BDS register data in msg - add support");
        newIdx = NaN;
    end
end

function newIdx = processAcasResolutionAdvisoryReport(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.AcasResolutionAdvisoryReport = NaN(n,1);
        newIdx = NaN;
    else
        disp("AcasResolutionAdvisoryReport in msg - add support");
        newIdx = NaN;
    end
end

function newIdx = processSurfaceCapabilitiesAndCharacteristics(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.SurfaceCapabilitiesAndCharacteristics = NaN(n,1);
        newIdx = NaN;
    else
        disp("SurfaceCapabilitiesAndCharacteristics in msg - add support");
        newIdx = NaN;
    end
end

function newIdx = processDataAges(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.DataAges = NaN(n,1);
        newIdx = NaN;
    else
        disp("DataAges in msg - add support");
        newIdx = NaN;
    end
end

function newIdx = processReceiverId(tableToPop, msg, msgIdx, n)
    if isempty(msg)
        tableToPop.tbl.ReceiverId = NaN(n,1);
        newIdx = NaN;
    else
        disp("ReceiverId in msg - add support");
        newIdx = NaN;
    end
end

