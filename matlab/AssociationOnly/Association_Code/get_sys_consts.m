
function sys_consts = get_sys_consts() %#codegen

%
% title: convey various common system constants (of CHR and MHR systems)
%
% returns: sys_consts - a structure comprising various system constants
%

%%
sys_consts = struct(                        ...
    'MIN_TIME_QUANTUM',     1e-3,           ... minimum system time quantum [sec]
    ...
    'KT_dBm2Hz',            -174,           ... dBm/Hz
    ...
    'int2double_factor',    1 / (2 ^ 14),   ... conversion factor from int16 to single or double
    ...
    'memory_layout', struct(                ... row major / column major memory layout
        'rowMajor',         true,           ...     apply row major
        'cRowMajor',     '-layout:rowMajor' ...     string need to be inserted in coder.ceval()
        ),                                  ...
    ...
    'ADC', struct(                          ... ADC parameters
        'Fs',               80e6,           ...     sample frequency [Hz]
        'Ts',               0.0125e-6,      ...     sample period [sec]
        'BW',               40e6,           ...     bandwidth [Hz]
        'noise_lvl_dBm',    -65             ...     dBm
        ),                                  ...
    ...
    'DAC', struct(                          ... DAC parameters
        'Fs',               320e6,          ...     sample frequency [Hz]
        'Fs_PhCh',          320e6           ...     phase sample frequency [Hz]
        ),                                  ...
    ...
   'mode_opt_masks', struct(                ... mode option masks
        ...'NO_ASM',           uint32(2^00),    ...     adjust SNR matrix
        'LCFAR',            uint32(2^00),   ...     local CFAR
        'STC',              uint32(2^01),   ...     sensitivity time control
        'OPD',              uint32(2^02),   ...     only positive doppler
        'OND',              uint32(2^03),   ...     only negative doppler
        'CAB',              uint32(2^04),   ...     check across beams
        'XPDR',             uint32(2^05),   ...     allow transponder targets
        ...'IBP',              uint32(2^06),    ...     inter-batch processing
        'RX_PHC',           uint32(2^07),   ...     rx phase calibration
        'AE_CHM',           uint32(2^08),   ...     anechoic chamber
        'GCFAR',            uint32(2^09),   ...     global CFAR
        'BBR',              uint32(2^10),   ...     barker based range estimation
        'CEF',              uint32(2^11),   ...     check energy fit
        'NFCFAR',           uint32(2^12),   ...     noise floor CFAR
        'UDOPP',            uint32(2^13)    ...     uDoppler waveform
        ),                                  ...
    ...
    'DynSeqIDs',            uint32([6, 7, 8, 9, 10, 11, 12]),   ... IDs of dynamic   sequences
    'TrackSeqIDs',          uint32([6, 7, 8]),                  ... IDs of track     sequences
    'PropSeqIDs',           uint32([9, 10, 11]),                ... IDs of propeller sequences
    'SeqIDs4seqRep',        uint32([6, 7, 8, 9, 10, 11, 12]),   ... IDs for sequential repetition
    ...
    'uDopp_det_type', struct(               ... Types of uDoppler detections
        'main',             uint32(0),      ...     Single det not included in stripe or found fuselage (or main sidelobe)
        'sidelobe',         uint32(1),      ...     found sidelobes with Nxfr
        'undefined',        uint32(2),      ...     2 dets in stripe or stripe without uDoppler
        'outlier',          uint32(3)       ...     dets not associated to uDoppler from the same stripe
        ),                                  ...     
    ...
    'TgtTypeIDs', struct(                   ... IDs of target types
        'UNC',              0,              ...     Unclassified
        'UNK',              1,              ...     Unknown
        'AC',               2,              ...     Aircraft
        'RAM',              3,              ...     RAM (Rocket / Artillery / Mortar)
        'BIRD',             4,              ...     Bird
        'MAN',              5,              ...     Man
        'GVHC',             6,              ...     Ground Vehicle
        'SHIP',             7               ...     Ship
        ),                                  ...     
    ...
    'nRxChCodeMap', uint32([4, 5, 9]),      ... number of channels according to RADAR_N_RX_CH_CODE, see read_batch_header.m file (and shared.h)
    ...     nRxChCode == 0 --> 4 channels are used
    ...     nRxChCode == 1 --> 5 channels are used 
    ...     nRxChCode == 2 --> 9 channels are used 
    ...
    'TrkId', struct(                        ... Unique ID for each track application
        'TAS_K1ST',                     01, ...      
        'TSS_K1ST',                     02, ...     
        'APS_KBALLISTIC',               03, ...     
        'APS_KBALLISTIC_FULL',          04, ...    
        'APS_KBALLISTIC_FULL_wLPi',     05, ...     
        'APS_KBALLISTIC_FULL4IDF',      06, ...     
        'APS_K1ST',                     07, ...     
        'APS_K2ND_7D',                  08  ...     
    ),                                      ...
    ...
    'MSG_TYPE', struct(                     ... System level log printing 
        'CRT_ERR',          uint32(0),      ...     Crytical Error
        'ERR',              uint32(1),      ...     Error log messege
        'WARN',             uint32(2),      ...     Warning log messege
        'INFO',             uint32(3),      ...     Info log messege
        'MATLAB_LEVEL',     uint32(2)       ...     Matlab playback command window log prints
        ),                                  ... 
    ...
    'EBF_REJECT_REASON', struct(            ... EBF rejection reason per track
        'NO_REJECT',        uint32(0),      ...     track not rejected 
        'LUT_INVALID',      uint32(1),      ...     Lookup table invalid % change this - RT should print a message in this case (instead of per track)
        'AMBIGUOUS_TRK',    uint32(2),      ...     Ambiguous track
        'IN_MOTION',        uint32(3),      ...     Vehicle in motion
        'RANGE_BOUNDS',     uint32(4),      ...     Outside range bounds
        'ELEVATION_BOUNDS', uint32(5),      ...     Outside elevation bounds
        'TGT_INVALID',      uint32(6),      ...     target not valid
        'TRK_INVALID',      uint32(7)       ...     track not valid
        ),                                  ...      
    ...
    'SeqId4IMI', struct(                    ... IMI convertion table for SeqId - Playback
                                            ... Track (odd)  -> "Track 1" = 6
                                            ... Track (even) -> "Track 2" = 7
                                            ... Track3       -> "Track 3" = 8
                                            ... Longrevisit2 ->           = 4
                                            ... Revisit      -> "Revisit" = 2
        'SeqId',        uint32([4,5,6,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]), ...     [Track1, Track2, Track3, RevisitRevisit2]
        'SeqId_IMI',    uint32([6,7,8,4,6,7 ,6 ,7 ,6 ,7 ,6 ,7 ,6 ,7 ,6 ,7 ,6 ,7, 6 , 2, 2, 2, 2, 2, 2, 2, 2])   ...         
        )                                   ... 
    ...
    ); % sys_consts = struct(                ...
    
end % function sys_consts = get_sys_consts() %#codegen
