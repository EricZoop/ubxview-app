
function [dcm_body2earth, dcm_earth2body] = dcm_transform(heading, pitch, roll, units) %#codegen

%
% title: return DCMs from Body2Earth / Earth2Body
%
% input: heading    - heading   [rad/deg] - X to Y  !!! heading of body with respect to earth !!!
%        pitch      - pitch     [rad/deg] - Z to X  !!! pitch of body with respect to earth   !!!
%        roll       - roll      [rad/deg] - Y to Z  !!! roll of body with respect to earth    !!!
%        units      - units of the angles (rad/deg), default rad
%
% returns: dcm_body2earth: Vearth = dcm_body2earth * Vbody
%          dcm_earth2body: Vbody  = dcm_earth2body * Vearth
%

persistent DEG2RAD;
if isempty(DEG2RAD)
    DEG2RAD = pi / 180;
end % if isempty(DEG2RAD)

% check number of input arguments
if nargin < 3
    error('myApp:argChk', 'Wrong number of input arguments');
end % if nargin < 3

% check number of input arguments
if nargin == 4
    % convert DEG2RAD if needed
    if strcmp(units, 'deg')
        heading = heading * DEG2RAD;
        pitch   = pitch *   DEG2RAD;
        roll    = roll *    DEG2RAD;
    elseif ~strcmp(units, 'rad')
        warning('Unknown units!');
        dcm_body2earth = eye(3);
        dcm_earth2body = eye(3);
        return;
    end % if strcmp(units, 'deg')
end % if nargin == 4

%% define rotation matrices (earth to body)
Wh = [ ... heading rotation matrix
     cos(heading), sin(heading), 0; ...
    -sin(heading), cos(heading), 0; ...
     0,            0,            1; ...
    ];

Wp = [ ... pitch rotation matrix
    cos(pitch),  0, -sin(pitch); ...
             0,  1,  0;          ...
    sin(pitch),  0,  cos(pitch); ...
    ];

Wr = [ ... roll rotation matrix
    1,  0,         0;         ...
    0,  cos(roll), sin(roll); ...
    0, -sin(roll), cos(roll); ...
    ];

%% DCMs: Earth->Body / Body->Earth
dcm_earth2body = Wr * Wp * Wh;
dcm_body2earth = dcm_earth2body.';

% %% calculate DCM transform in given units (NED / NWU coordinate system)
% if coder.target('MATLAB')
%     % dir_cos_mat - Body -> Earth transformation matrix
%     dir_cos_mat = [                                                             ...
%         cos(pitch)  * cos(heading),                                             ...
%         sin(roll)   * sin(pitch) * cos(heading) - cos(roll) * sin(heading),     ...
%         cos(roll)   * sin(pitch) * cos(heading) + sin(roll) * sin(heading);     ...
%         ...
%         cos(pitch)  * sin(heading),                                             ...
%         sin(roll) * sin(pitch) * sin(heading) + cos(roll) * cos(heading),       ...
%         cos(roll) * sin(pitch) * sin(heading) - sin(roll) * cos(heading);       ...
%         ...
%         -sin(pitch),                                                            ...
%         sin(roll) * cos(pitch),                                                 ...
%         cos(roll) * cos(pitch)                                                  ...
%         ];
%     if any(dir_cos_mat(:) ~= dcm_body2earth(:))
%         errpr('Error in DCMs!');
%     end % if any(dir_cos_mat(:) ~= dcm_body2earth(:))
% end % if coder.target('MATLAB')

end % function [dcm_body2earth, dcm_earth2body] = dcm_transform(heading, pitch, roll, units) %#codegen
