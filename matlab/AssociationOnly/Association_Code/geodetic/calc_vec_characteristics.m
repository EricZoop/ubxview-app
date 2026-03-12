%% calc_vec_characteristics
function [v_abs, v_abs_std, v_az, v_az_std, v_el, v_el_std, v_doa_std] = calc_vec_characteristics(vec, cov_mat) %#codegen

%
% title: calculate vector characteristics for 2D and 3D case
%
% input:
%       vec     - vector            [3x1]
%       cov_mat - covariance matrix [3x3]
%
% output:
%       v_abs, v_abs_std, v_az, v_az_std, v_el, v_el_std, v_doa_std, sph_cm
%

is_single = isa(vec(1), 'single');

EPS_SINGLE = double(eps('single'));

persistent MSG_TYPE;
if isempty(MSG_TYPE)
    sys_consts  = get_sys_consts();
    MSG_TYPE    = sys_consts.MSG_TYPE;
end % if isempty(MSG_TYPE)

vec        = double(vec);
cov_mat    = double(cov_mat);

if length(vec) == 3 % && ~any(size(cov_mat) ~= 3)
    %% 3D case
    
    % calculate state vector characteristics
    v_hor = norm(vec(1 : 2));
    v_abs = norm(vec(1 : 3));
    
    if v_hor < EPS_SINGLE, v_hor = EPS_SINGLE; end % protection against infinities
    if v_abs < EPS_SINGLE, v_abs = EPS_SINGLE; end % ditto
    
    v_az = atan2(vec(2), vec(1));
    v_el = atan2(vec(3), v_hor);
    
    % state vector spherical covariance matrix
    dcm_los2xyz = dcm_transform(v_az, -v_el, 0, 'rad'); % covariance matrix in LOS frame (LLLN)
    
    los_cm = dcm_los2xyz.' * cov_mat * dcm_los2xyz;
    
    %% sanity check - should not occur
    var_vec = diag(los_cm);
    if any(var_vec < 0)
        warning('(ERR 1) calc_vec_characteristics: negative variance detected!');
        for ii = 1 : length(var_vec)
            if var_vec(ii) < 0
                los_cm(ii, ii) = -var_vec(ii);
            end % if var_vec(ii) < 0
        end % for ii = 1 : length(var_vec)
    end % if any(diag(sv_cm)) < 0
    
    %% cont
    v_abs_std   = sqrt(los_cm(1, 1));
    v_az_std    = sqrt(los_cm(2, 2)) / (v_abs * cos(v_el));
    v_el_std    = sqrt(los_cm(3, 3)) / v_abs;
    % v_doa_std   = sqrt(v_az_std ^ 2 * cos(v_el) ^ 2 + v_el_std ^ 2);
    
    eig_values  = svd(los_cm(2 : 3, 2 : 3));
    v_doa_std   = sqrt(eig_values(1)) / v_abs;
    
elseif length(vec) == 2 % && ~any(size(cov_mat) ~= 2)
    %% 2D case
    
    % calculate state vector characteristics - 2D case
    x = vec(1); y = vec(2);
    
    v_abs = norm(vec(1 : 2));
    
    if v_abs < EPS_SINGLE, v_abs = EPS_SINGLE; end % protection against infinities
    
    v_az = atan2(vec(2), vec(1));
    
    % state vector spherical covariance matrix
    v_abs2 = v_abs * v_abs;
    
    H1 = [ x / v_abs,  y / v_abs ];
    H2 = [-y / v_abs2, x / v_abs2];
    
    H = [H1; H2;];
    
    sph_cm = H * cov_mat * H.';
    
    %% sanity check - should not occur
    var_vec = diag(sph_cm);
    if any(var_vec < 0)
        warning('(ERR 2) calc_vec_characteristics: negative variance detected!');
        for ii = 1 : length(var_vec)
            if var_vec(ii) < 0
                sph_cm(ii, ii) = -var_vec(ii);
            end % if var_vec(ii) < 0
        end % for ii = 1 : length(var_vec)
    end % if any(diag(sv_cm)) < 0
    
    %% cont
    v_abs_std   = sqrt(sph_cm(1, 1));
    v_az_std    = sqrt(sph_cm(2, 2));
    
    v_el        = 0;
    v_el_std    = 0;
    v_doa_std   = 0;
    
else
    
    warning('(ERR 3) calc_vec_characteristics: bad input sizes');
    v_abs = 0; v_abs_std = 0; v_az = 0; v_az_std = 0; v_el = 0; v_el_std = 0; v_doa_std = 0;
    return;
    
end % if length(vec) == 3 && ~any(size(cov_mat) ~= 3)

if is_single
    v_abs       = single(v_abs);
    v_abs_std   = single(v_abs_std);
    v_az        = single(v_az);
    v_el        = single(v_el);
    
    if v_az_std < double(eps('single'))
        v_az_std = eps('single');
    else
        v_az_std = single(v_az_std);
    end % if dv_az_std < double(eps('single'))
    
    if v_el_std < double(eps('single'))
        v_el_std = eps('single');
    else
        v_el_std = single(v_el_std);
    end % if dv_el_std < double(eps('single'))
    
    if v_doa_std < double(eps('single'))
        v_doa_std = eps('single');
    else
        v_doa_std = single(v_doa_std);
    end % if dv_doa_std < double(eps('single'))
end % if is_single

%% state vector spherical covariance matrix - ALTERNATIVE WAY
% sph2los_mat = [ ...
%     1,                 v_abs     * cos(v_el),     v_abs;                    ...
%     v_abs * cos(v_el), v_abs ^ 2 * cos(v_el) ^ 2, v_abs ^ 2 * cos(v_el);    ...
%     v_abs,             v_abs ^ 2 * cos(v_el),     v_abs ^ 2;                ...
%     ];
% los_cm = sph_cm .* sph2los_mat;

%{
% Jacobian
x = vec(1); y = vec(2); z = vec(3);

v_abs2 = v_abs * v_abs;
v_hor2 = v_hor * v_hor;

H1 = [ x     / v_abs,             y     / v_abs,            z     / v_abs ];
H2 = [-y     / v_hor2,            x     / v_hor2,           0,            ];
H3 = [-x * z / (v_hor * v_abs2), -y * z / (v_hor * v_abs2), v_hor / v_abs2];

H = [H1; H2; H3];

sph_cm = H * cov_mat * H.';

v_abs_std   = sqrt(sph_cm(1, 1));
v_az_std    = sqrt(sph_cm(2, 2));
v_el_std    = sqrt(sph_cm(3, 3));
v_doa_std   = sqrt(v_az_std ^ 2 * cos(v_el) ^ 2 + v_el_std ^ 2);
%}

%% uncertainty ellipse
%{
p1  = los_cm(2, 2) / v_abs ^ 2;
p12 = los_cm(2, 3) / v_abs ^ 2;
p2  = los_cm(3, 3) / v_abs ^ 2;

% p1  = sph_cm(2, 2) * cos(v_el) ^ 2;
% p12 = sph_cm(2, 3) * cos(v_el);
% p2  = sph_cm(3, 3);

ellipse_stds = zeros(2, 1); % initializing
if ((p1 - p2) ^ 2 + 4 * p12 ^ 2) >= 0
    ellipse_stds(1) = sqrt(1/2 * ( p1 + p2 + sqrt( (p1 - p2) ^ 2 + 4 * p12 ^ 2 ) ));
    ellipse_stds(2) = sqrt(1/2 * ( p1 + p2 - sqrt( (p1 - p2) ^ 2 + 4 * p12 ^ 2 ) ));
end % if ((p1 - p2) ^ 2 + 4 * p12 ^ 2) >= 0

beta = -1/2 * atan2(2 * p12, p2 - p1);

% v_doa_std = norm(ellipse_stds);
%}

end % function [v_abs, v_abs_std, v_az, v_az_std, v_el, v_el_std, v_doa_std] = calc_vec_characteristics(vec, cov_mat) %#codegen
