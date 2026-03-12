function [data] = getdataattime(time,soa,timefieldname,datafieldname,interpolationmethod,index)
if(~exist('index','var')||isempty(index))
    index = {1:numel(getfield(soa,timefieldname))};
else
    index = {index};
end
data = interp1(getfield(soa,timefieldname,index),getfield(soa,datafieldname,index),time,interpolationmethod,'extrap');



