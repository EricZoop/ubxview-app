
function align_state = update_align_state(MAX_RDRS, curr_alignment, align_state) %#codegen

%
% title: update align_state
%
% input: MAX_RDRS       - constant - maximum number of radars per system
%        curr_alignment - current alignment parameters applicable to this batch
%        align_state    - struct of all axes definitions and relevant dcm transformations
%
% returns: align_state - updated align_state
%

EPS_SINGLE = double(eps('single'));

persistent DEG2RAD;
if isempty(DEG2RAD)
    DEG2RAD = pi / 180;
end % if isempty(DEG2RAD)

persistent MSG_TYPE;
if isempty(MSG_TYPE)
    sys_consts  = get_sys_consts();
    MSG_TYPE    = sys_consts.MSG_TYPE;
end % if isempty(MSG_TYPE)

persistent sys_alignments;
if isempty(sys_alignments)
    per_rdr_align = struct(     ...
        'active',       false,  ...
        ...
        'DCM_RDR2VHC',  eye(3), ...
        'DCM_VHC2RDR',  eye(3), ...
        ...
        'CTM_RDR2VHC',  eye(4), ...
        'CTM_VHC2RDR',  eye(4)  ...
        ); % per_rdr_align = struct(     ...
    
    sys_alignments = repmat(per_rdr_align, [1, MAX_RDRS]);
end % if isempty(sys_alignments)

persistent ref_loc;
if isempty(ref_loc)
    ref_loc.lat_deg     = 0;
    ref_loc.lon_deg     = 0;
    ref_loc.alt         = 0;
    ref_loc.loc_std     = 0;
    ref_loc.tot_shift   = zeros(3, 1); % [m]
end % if isempty(ref_loc)

%% initialize ref_loc
if ~align_state.initialized
    if curr_alignment.loc_valid
        align_state.initialized = true;
        align_state.time_tag    = curr_alignment.time_tag;
        
        ref_loc.lat_deg     = curr_alignment.vhc_lat_deg;
        ref_loc.lon_deg     = curr_alignment.vhc_lon_deg;
        ref_loc.alt         = curr_alignment.vhc_alt;
        ref_loc.loc_std     = curr_alignment.vhc_loc_std;
        ref_loc.tot_shift   = zeros(3, 1); % [m]
    else
        return;
    end % if curr_alignment.loc_valid
end % if ~align_state.initialized

%% update radar-to-vehicle transformations
curr_rdr_id = curr_alignment.rdr_id;

if ~sys_alignments(curr_rdr_id).active
    % prepare DCMs and CTs
    
    %% radar->fixture
    DCM_RDR2FXT = dcm_transform(        ...
        -curr_alignment.rdr_heading,    ...
        -curr_alignment.rdr_pitch,      ...
        +curr_alignment.rdr_roll,       ...
        'rad');
    
    rdr_pos_xyz = [                 ...
        curr_alignment.rdr_pos_x;   ...
        curr_alignment.rdr_pos_y;   ...
        curr_alignment.rdr_pos_z;   ...
        ];
    
    CTM_RDR2FXT = [DCM_RDR2FXT, rdr_pos_xyz; [zeros([1, 3]), 1]];
    
    %% fixture->vehicle
    DCM_FXT2VHC = dcm_transform(        ...
        -curr_alignment.fxt_heading,    ...
        -curr_alignment.fxt_pitch,      ...
        +curr_alignment.fxt_roll,       ...
        'rad');
    
    fxt_pos_xyz = [                 ...
        curr_alignment.fxt_pos_x;   ...
        curr_alignment.fxt_pos_y;   ...
        curr_alignment.fxt_pos_z;   ...
        ];
    
    CTM_FXT2VHC = [DCM_FXT2VHC, fxt_pos_xyz; [zeros([1, 3]), 1]];
    
    %% radar->vehicle
    DCM_RDR2VHC = DCM_FXT2VHC * DCM_RDR2FXT;
    DCM_VHC2RDR = DCM_RDR2VHC.';
    
    CTM_RDR2VHC = CTM_FXT2VHC * CTM_RDR2FXT;
    CTM_VHC2RDR = [CTM_RDR2VHC(1 : 3, 1 : 3).', -CTM_RDR2VHC(1 : 3, 1 : 3).' * CTM_RDR2VHC(1 : 3, 4); [zeros([1, 3]), 1]];
    
    %% update sys_alignments
    sys_alignments(curr_rdr_id).active      = true;
    
    % rdr <-> vehicle
    sys_alignments(curr_rdr_id).DCM_RDR2VHC = DCM_RDR2VHC;
    sys_alignments(curr_rdr_id).DCM_VHC2RDR = DCM_VHC2RDR;
    
    sys_alignments(curr_rdr_id).CTM_RDR2VHC = CTM_RDR2VHC;
    sys_alignments(curr_rdr_id).CTM_VHC2RDR = CTM_VHC2RDR;
    
end % if ~sys_alignments(curr_rdr_id).active

% update align state RDR <-> VHC (DCM)
align_state.DCM_RDR2VHC = sys_alignments(curr_rdr_id).DCM_RDR2VHC;
align_state.DCM_VHC2RDR = sys_alignments(curr_rdr_id).DCM_VHC2RDR;

% update align state RDR <-> VHC (CTM)
align_state.CTM_RDR2VHC = sys_alignments(curr_rdr_id).CTM_RDR2VHC;
align_state.CTM_VHC2RDR = sys_alignments(curr_rdr_id).CTM_VHC2RDR;

%% update vehicle attitudes
if curr_alignment.att_valid
    
    % update attitudes STDs
    align_state.vhc_heading_std = curr_alignment.vhc_heading_std;
    align_state.vhc_pitch_std   = curr_alignment.vhc_pitch_std;
    align_state.vhc_roll_std    = curr_alignment.vhc_roll_std;
    
    %% update VHC <-> LLLN /INS transformations
    DCM_VHC2LLLN = dcm_transform(       ...
        -curr_alignment.vhc_heading,    ...
        -curr_alignment.vhc_pitch,      ...
        +curr_alignment.vhc_roll,       ...
        'rad');
    DCM_LLLN2VHC = DCM_VHC2LLLN.';
    
    vhc_pos_xyz = [0; 0; 0;];
    
    % coordinate transformation matrix VEHICLE to LLLN and vise versa
    CTM_VHC2LLLN = [DCM_VHC2LLLN, vhc_pos_xyz; [zeros([1, 3]), 1]];
    CTM_LLLN2VHC = [CTM_VHC2LLLN(1 : 3, 1 : 3).', -CTM_VHC2LLLN(1 : 3, 1 : 3).' * CTM_VHC2LLLN(1 : 3, 4); [zeros([1, 3]), 1]];
    
    %% update VHC <-> LVL /INS transformations
    
    % vehicle->level
    DCM_VHC2LVL = dcm_transform(    ...
        0,                          ...
        -curr_alignment.vhc_pitch,  ...
        +curr_alignment.vhc_roll,   ...
        'rad');
    
    DCM_LVL2VHC = DCM_VHC2LVL.';
    
    CTM_VHC2LVL = [DCM_VHC2LVL, vhc_pos_xyz; [zeros([1, 3]), 1]];
    CTM_LVL2VHC = [CTM_VHC2LVL(1 : 3, 1 : 3).', -CTM_VHC2LVL(1 : 3, 1 : 3).' * CTM_VHC2LVL(1 : 3, 4); [zeros([1, 3]), 1]];
    
    %% update align state 
    
    % (VHC <-> LLLN) (DCM)
    align_state.DCM_VHC2LLLN = DCM_VHC2LLLN;
    align_state.DCM_LLLN2VHC = DCM_LLLN2VHC;
    
    % (VHC <-> LLLN) (CTM)
    align_state.CTM_VHC2LLLN = CTM_VHC2LLLN;
    align_state.CTM_LLLN2VHC = CTM_LLLN2VHC;
    
    % (VHC <-> LVL) (DCM)
    align_state.DCM_VHC2LVL = DCM_VHC2LVL;
    align_state.DCM_LVL2VHC = DCM_LVL2VHC;
    
    % (VHC <-> LVL) (CTM)
    align_state.CTM_VHC2LVL = CTM_VHC2LVL;
    align_state.CTM_LVL2VHC = CTM_LVL2VHC;

end % if curr_alignment.att_valid

%% compute DCM RADAR to LLLN and vise versa
DCM_RDR2LLLN = align_state.DCM_VHC2LLLN * align_state.DCM_RDR2VHC;
DCM_LLLN2RDR = DCM_RDR2LLLN.';

align_state.DCM_RDR2LLLN = DCM_RDR2LLLN;
align_state.DCM_LLLN2RDR = DCM_LLLN2RDR;

%% compute coordinate transformation RADAR to LLLN and vise versa
CTM_RDR2LLLN = align_state.CTM_VHC2LLLN * align_state.CTM_RDR2VHC;
CTM_LLLN2RDR = [CTM_RDR2LLLN(1 : 3, 1 : 3).', -CTM_RDR2LLLN(1 : 3, 1 : 3).' * CTM_RDR2LLLN(1 : 3, 4); [zeros([1, 3]), 1]];

align_state.CTM_RDR2LLLN = CTM_RDR2LLLN;
align_state.CTM_LLLN2RDR = CTM_LLLN2RDR;

%% compute DCM RADAR to LEVEL and vise versa
DCM_RDR2LVL = align_state.DCM_VHC2LVL * align_state.DCM_RDR2VHC;
DCM_LVL2RDR = DCM_RDR2LVL.';

align_state.DCM_RDR2LVL = DCM_RDR2LVL;
align_state.DCM_LVL2RDR = DCM_LVL2RDR;
  
%% compute coordinate transformation RADAR to LEVEL and vise versa
CTM_RDR2LVL = align_state.CTM_VHC2LVL * align_state.CTM_RDR2VHC;
CTM_LVL2RDR = [CTM_RDR2LVL(1 : 3, 1 : 3).', -CTM_RDR2LVL(1 : 3, 1 : 3).' * CTM_RDR2LVL(1 : 3, 4); [zeros([1, 3]), 1]];

align_state.CTM_RDR2LVL = CTM_RDR2LVL;
align_state.CTM_LVL2RDR = CTM_LVL2RDR;

%% update vehicle velocity
if curr_alignment.vel_valid && curr_alignment.OTM
    
    vhc_prev_vel = align_state.vhc_vel;
    vhc_curr_vel = [                    ...
        curr_alignment.vhc_vel_north;   ...
        curr_alignment.vhc_vel_west;    ...
        curr_alignment.vhc_vel_up;      ...
        ];
    
    vhc_prev_speed = max(abs(vhc_prev_vel));
    vhc_curr_speed = max(abs(vhc_curr_vel));
    
    vhc_prev_vel_std = min([   align_state.vhc_vel_std, vhc_prev_speed]);
    vhc_curr_vel_std = min([curr_alignment.vhc_vel_std, vhc_curr_speed]);
    
    % update vehicle vel/vel_std
    align_state.vhc_vel     = vhc_curr_vel;
    align_state.vhc_vel_std = vhc_curr_vel_std;
    
    %% velocity based LLLN shift
    avg_vel = (vhc_curr_vel + vhc_prev_vel) / 2;
    
    avg_vel_std = sqrt(vhc_prev_vel_std ^ 2 + vhc_curr_vel_std ^ 2) / 2;
    
    time_step = curr_alignment.time_tag - align_state.time_tag;
    
    % update vehicle shift/_std
    align_state.vhc_shift     =     time_step  * avg_vel;
    align_state.vhc_shift_std = abs(time_step) * avg_vel_std;
    
    % update reference total shift
    ref_loc.tot_shift = ref_loc.tot_shift + align_state.vhc_shift;
    
else
    align_state.vhc_vel         = zeros(3, 1);
    align_state.vhc_vel_std     = 0;
    
    align_state.vhc_shift       = zeros(3, 1);
    align_state.vhc_shift_std   = 0;
    
end %if curr_alignment.vel_valid && curr_alignment.OTM

%% update vehicle location
align_state.vhc_loc.dynamic = curr_alignment.OTM; % dynamic_location

max_abs_shift = max(abs(ref_loc.tot_shift));

if curr_alignment.loc_valid
    
    % update vehicle location
    align_state.vhc_loc.lat_deg = curr_alignment.vhc_lat_deg;
    align_state.vhc_loc.lon_deg = curr_alignment.vhc_lon_deg;
    align_state.vhc_loc.alt     = curr_alignment.vhc_alt;
    align_state.vhc_loc.std     = curr_alignment.vhc_loc_std;
    
    %% INS drift test
    if max_abs_shift > 3 * ref_loc.loc_std || (~curr_alignment.vel_valid && curr_alignment.OTM)
        
        tot_loc_std = sqrt(ref_loc.loc_std ^ 2 + curr_alignment.vhc_loc_std ^ 2);
        
        % location based LLLN shift
        vhc_loc_based_shift = convert_WGS842LLLN(ref_loc.lat_deg, ref_loc.lon_deg, ref_loc.alt, ...
            curr_alignment.vhc_lat_deg, curr_alignment.vhc_lon_deg, curr_alignment.vhc_alt);
        
        ins_drift_err   = vhc_loc_based_shift - ref_loc.tot_shift;
        max_err         = max(abs(ins_drift_err));
        
        if max_err > tot_loc_std
            ref_loc.lat_deg     = curr_alignment.vhc_lat_deg;
            ref_loc.lon_deg     = curr_alignment.vhc_lon_deg;
            ref_loc.alt         = curr_alignment.vhc_alt;
            ref_loc.loc_std     = curr_alignment.vhc_loc_std;
            ref_loc.tot_shift   = zeros(3, 1); % [m]
            
            warning('(WARN) update_align_state: INS drifted! (max err %0.f, curr time %0.3f)', ...
                max_err, curr_alignment.time_tag);
            
            % update vehicle shift and its std
            align_state.vhc_shift     = align_state.vhc_shift + ins_drift_err;
            align_state.vhc_shift_std = min([tot_loc_std, max_err]);
            
        elseif curr_alignment.vel_valid
            % update ref_loc
            [ref_loc.lat_deg, ref_loc.lon_deg, ref_loc.alt] = convert_LLLN2WGS84( ...
                ref_loc.lat_deg, ref_loc.lon_deg, ref_loc.alt, ref_loc.tot_shift);
            ref_loc.tot_shift = zeros(3, 1);
        end % if max_err > tot_loc_std
        
    end % if max_abs_shift > 3 * ref_loc.loc_std
    
else
    if max_abs_shift > EPS_SINGLE
        [align_state.vhc_loc.lat_deg, align_state.vhc_loc.lon_deg, align_state.vhc_loc.alt] = convert_LLLN2WGS84( ...
            ref_loc.lat_deg, ref_loc.lon_deg, ref_loc.alt, ref_loc.tot_shift);
        ref_loc.tot_shift = zeros(3, 1);
    else
        align_state.vhc_loc.lat_deg = ref_loc.lat_deg;
        align_state.vhc_loc.lon_deg = ref_loc.lon_deg;
        align_state.vhc_loc.alt     = ref_loc.alt;
    end % if max_abs_shift > EPS_SINGLE
    
    align_state.vhc_loc.std = ref_loc.loc_std;
end % if curr_alignment.loc_valid

%% update align time tag
align_state.time_tag = curr_alignment.time_tag;

%% update angular velocity
if curr_alignment.ang_vel_valid && curr_alignment.OTM
    align_state.vhc_body_w          = [curr_alignment.vhc_w_x; curr_alignment.vhc_w_y; curr_alignment.vhc_w_z];
    align_state.vhc_body_w_std      = curr_alignment.vhc_w_std;
else
    align_state.vhc_body_w          = zeros(3, 1);
    align_state.vhc_body_w_std      = 0;
end % if if curr_alignment.ang_vel_valid && curr_alignment.OTM

end % function align_state = update_align_state(MAX_RDRS, curr_alignment, align_state) %#codegen

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%{
%% DCM_srcLLLN2tgtLLLN
src_lat = src_lat_deg * DEG2RAD;
src_lon = src_lon_deg * DEG2RAD;
DCM_LLLN2ECEF_SRC = [                                                           ...
    -cos(src_lon) * sin(src_lat), +sin(src_lon), +cos(src_lon) * cos(src_lat);  ...
    -sin(src_lon) * sin(src_lat), -cos(src_lon), +sin(src_lon) * cos(src_lat);  ...
    +cos(src_lat),                +0,            +sin(src_lat);                 ...
    ];

tgt_lat = tgt_lat_deg * DEG2RAD;
tgt_lon = tgt_lon_deg * DEG2RAD;
DCM_ECEF2LLLN_TGT = [                                                           ...
    -cos(tgt_lon) * sin(tgt_lat), +sin(tgt_lon), +cos(tgt_lon) * cos(tgt_lat);  ...
    -sin(tgt_lon) * sin(tgt_lat), -cos(tgt_lon), +sin(tgt_lon) * cos(tgt_lat);  ...
    +cos(tgt_lat),                +0,            +sin(tgt_lat);                 ...
    ].';

DCM_srcLLLN2tgtLLLN = DCM_ECEF2LLLN_TGT * DCM_LLLN2ECEF_SRC;
%}