function [fields] = reademlswid(filename)
%READEMLSWID
% read in emlswid file to specify data structure for parsing .blog file
%INPUTS
%   path- path to .txt file
%outputs
%   fields- fields in file or empty if nothing found
fp = fopen(filename);
if(fp==-1)
    fprintf(1,'ERROR OPENING FILE: %s\n',filename);
end
fields = [];
go = false;
count = 1;
while (1)
    tline = fgets(fp) ;
    
    if(tline==-1)
        break;
    end
    tline = deblank (tline);
    if(~isempty(tline))
        if(tline==-1)
            return;
        end
        
        if(contains(tline,'['))
            if(strcmpi(tline,'[DET_OFFS]'))
                go =true;
            else
                go = false;
            end
        elseif(go)
            s = textscan(deblank(tline),'%[^ ]');
            s = s{1};
            if(numel(s)==7)
			    % Change . to _ to allow name to be used as structure name
                fields(count).name = replace(s{1}, '.', '_');
                fields(count).skipBytes = str2num(s{3});
                fields(count).byteOffsetFromStructure = str2num(s{4});
                fields(count).elementSizeInBytes = str2num(s{5});
                fields(count).totalSizeInBytes = str2num(s{6});
                fields(count).dataType = str2num(s{7});
                count = count + 1;
            elseif(numel(s)==6)
                if(str2num(s{3})~=0)
                    fields(count).name = 'dummy';
                    fields(count).skipBytes = 0;
                    fields(count).byteOffsetFromStructure =str2num(s{5})-str2num(s{3});
                    fields(count).elementSizeInBytes = str2num(s{3});
                    fields(count).totalSizeInBytes = str2num(s{3});
                    fields(count).dataType = 1;
                end
                a = 1;
            end
        end
    end
end
fclose(fp);
end
