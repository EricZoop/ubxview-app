function [result] = aos2soa(input)
 result  = [];
if ~isempty(input)
 names = fieldnames(input);
 for ii = 1:numel(names)    
     checkstring = sprintf('numel(input(1).%s)',names{ii});
     if(eval(checkstring)==1)
         dothis = sprintf('result.%s = [input(:).%s];', names{ii},names{ii});
         eval(dothis);
     else
         dothis = sprintf('result.%s = {input(:).%s};', names{ii},names{ii});
         eval(dothis);
     end
 end
end