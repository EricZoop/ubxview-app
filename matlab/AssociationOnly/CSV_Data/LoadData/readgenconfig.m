function userConfig = readgenconfig(file)
ps = xml2struct(file);
ts = [];
topField = fieldnames(ps.Config);
for fid = 1:numel(topField)
    
    switch lower(topField{fid})
        case {'general','locationandattitude'}
            if(~isfield(ts,(topField{fid})))
                ts.(topField{fid}) = [];
            end
            middleField = fieldnames(ps.Config.(topField{fid}));
            for ix = 1:numel(middleField)
                
                if(strcmp(middleField{ix},'Frequencies'))
                    ts.LJF = str2double( ps.Config.(topField{fid}).(middleField{ix}).LJF.Enabled.Text);
                else
                    if(isstruct(ps.Config.(topField{fid}).(middleField{ix})))
                        bottomField = fieldnames(ps.Config.(topField{fid}).(middleField{ix}));
                        if(numel(bottomField)==1)
                            if(isfield(ps.Config.(topField{fid}).(middleField{ix}),'Text'))
                                if(isempty(str2double(ps.Config.(topField{fid}).(middleField{ix}).Text)))
                                    ts.(topField{fid}).(middleField{ix}) = ps.Config.(topField{fid}).(middleField{ix}).Text;
                                else
                                    ts.(topField{fid}).(middleField{ix}) = str2double(ps.Config.(topField{fid}).(middleField{ix}).Text);
                                end
                            end
                            
                        else
                            for jx = 1:numel(bottomField)
                                a = ps.Config.(topField{fid}).(middleField{ix}).(bottomField{jx});
                                if(isstruct(a))
                                    if(isfield(a,'Text'))
                                        if(isempty(str2double(a.Text)))
                                            
                                            ts.(topField{fid}).(middleField{ix}).(bottomField{jx}) =a.Text ;
                                        else
                                            if(~isfield(ts.(topField{fid}),middleField{ix}))
                                                ts.(topField{fid}).(middleField{ix}) = [];
                                            end
                                            ts.(topField{fid}).(middleField{ix}).(bottomField{jx}) = str2double(a.Text);
                                            
                                        end
                                        
                                    else
                                        extraBottomField = fieldnames(a);
                                        for kx = 1:numel(extraBottomField)
                                            if(isstruct(a.(extraBottomField{kx})))
                                                if isfield(a.(extraBottomField{kx}), 'Text')
                                                    if(isempty(double(a.(extraBottomField{kx}).Text)))
                                                        ts.(topField{fid}).(middleField{ix}).(bottomField{jx}).(extraBottomField{kx}) =a.(extraBottomField{kx}).Text ;
                                                    else
                                                        ts.(topField{fid}).(middleField{ix}).(bottomField{jx}).(extraBottomField{kx}) =str2double(a.(extraBottomField{kx}).Text);
                                                    end
                                                else
                                                    fieldInfo = a.(extraBottomField{kx});
                                                    extraBottomField2 = fieldnames(fieldInfo);
                                                    for kx2 = 1:numel(extraBottomField2)
                                                        if isstruct(fieldInfo.(extraBottomField2{kx2}))
                                                            temp = fieldInfo.(extraBottomField2{kx2});
                                                            if isfield(temp, 'Text')
                                                                if isempty(double(temp.Text))
                                                                    ts.(topField{fid}).(middleField{ix}).(bottomField{jx}).(extraBottomField{kx}).(extraBottomField2{kx2})...
                                                                        =temp.Text;
                                                                else
                                                                     ts.(topField{fid}).(middleField{ix}).(bottomField{jx}).(extraBottomField{kx}).(extraBottomField2{kx2})...
                                                                         =str2double(temp.Text);
                                                                end
                                                            end
                                                        else
                                                            aa=1;
                                                        end 
                                                    end
                                                end
                                            else
                                                aa = 1;
                                            end
                                            
                                        end
                                        aa = 1;
                                    end
                                else
                                    ts.(topField{fid}).(middleField{ix}).(bottomField{jx}) =a;
                                end
                            end
                        end
                    elseif(iscell(ps.Config.(topField{fid}).(middleField{ix})))
                        ts.(topField{fid}).(middleField{ix}){1}= [];
                        for jx = 1:numel(ps.Config.(topField{fid}).(middleField{ix}))
                            radarFields = fieldnames(ps.Config.(topField{fid}).(middleField{ix}){jx});
                            a = ps.Config.(topField{fid}).(middleField{ix}){jx};
                            for kx = 1:numel(radarFields)
                                if(isfield(a.(radarFields{kx}),'Text'))
                                    
                                    ts.(topField{fid}).(middleField{ix}){jx}.(radarFields{kx}) = str2double(a.(radarFields{kx}).Text);
                                else
                                    if(isstruct(a.(radarFields{kx})))
                                        bottomField = fieldnames(a.(radarFields{kx}));
                                        
                                        for lx = 1:numel(bottomField)
                                            try
                                            if(~isfield(ts.(topField{fid}).(middleField{ix}){jx},(radarFields{kx})))
                                                ts.(topField{fid}).(middleField{ix}){jx}.(radarFields{kx}) = [];
                                            end
                                            catch
                                            end
                                            if(isfield(a.(radarFields{kx}).(bottomField{lx}),'Text'))
                                                ts.(topField{fid}).(middleField{ix}){jx}.(radarFields{kx}).(bottomField{lx}) = str2double(a.(radarFields{kx}).(bottomField{lx}).Text);
                                            else
                                                ts.(topField{fid}).(middleField{ix}){jx}.(radarFields{kx}).(bottomField{lx}) = a.(radarFields{kx}).(bottomField{lx});
                                            end
                                        end
                                    end
                                end
                            end
                            
                        end
                    end
                end
            end
            
            
            a= 1;
        case {'hn'}
            if(iscell(ps.Config.(topField{fid})))
                for ii = 1:numel(ps.Config.(topField{fid}))
                    middleField = fieldnames(ps.Config.(topField{fid}){ii});
                    if(strcmp(middleField{1},'ConfigParams'))
                        if(numel(ps.Config.(topField{fid}){ii}.ConfigParams.Param)==1)
                            vals = split(ps.Config.(topField{fid}){ii}.ConfigParams.Param.Attributes.Name,'.');
                            if(numel(vals) ==1 )
                                ts.(topField{fid})(ii).(vals{1}) = ...
                                    str2double(ps.Config.(topField{fid}){ii}.ConfigParams.Param.Attributes.Value);
                            elseif(numel(vals) ==2)
                                ts.(topField{fid})(ii).(vals{1}).(vals{2}) = ...
                                    str2double(ps.Config.(topField{fid}){ii}.ConfigParams.Param.Attributes.Value);
                            elseif(numel(vals) ==3)
                                ts.(topField{fid})(ii).(vals{1}).(vals{2}).(vals{3}) = ...
                                    str2double(ps.Config.(topField{fid}){ii}.ConfigParams.Param.Attributes.Value);
                            elseif(numel(vals) ==4)
                                ts.(topField{fid})(ii).(vals{1}).(vals{2}).(vals{3}).(vals{4}) = ...
                                    str2double(ps.Config.(topField{fid}){ii}.ConfigParams.Param.Attributes.Value);
                            end
                        else
                            
                            for ix = 1:numel(ps.Config.(topField{fid}){ii}.ConfigParams.Param)
                                vals = split(ps.Config.(topField{fid}){ii}.ConfigParams.Param{ix}.Attributes.Name,'.');
                                if(numel(vals) ==1 )
                                    ts.(topField{fid})(ii).(vals{1}) = ...
                                        str2double(ps.Config.(topField{fid}){ii}.ConfigParams.Param{ix}.Attributes.Value);
                                elseif(numel(vals) ==2)
                                    ts.(topField{fid})(ii).(vals{1}).(vals{2}) = ...
                                        str2double(ps.Config.(topField{fid}){ii}.ConfigParams.Param{ix}.Attributes.Value);
                                elseif(numel(vals) ==3)
                                    ts.(topField{fid})(ii).(vals{1}).(vals{2}).(vals{3}) = ...
                                        str2double(ps.Config.(topField{fid}){ii}.ConfigParams.Param{ix}.Attributes.Value);
                                elseif(numel(vals) ==4)
                                    ts.(topField{fid})(ii).(vals{1}).(vals{2}).(vals{3}).(vals{4}) = ...
                                        str2double(ps.Config.(topField{fid}){ii}.ConfigParams.Param{ix}.Attributes.Value);
                                end
                                
                            end
                        end
                    end
                    
                end
            else
                middleField = fieldnames(ps.Config.(topField{fid}));
                if(strcmp(middleField{1},'ConfigParams'))
                    for ix = 1:numel(ps.Config.(topField{fid}).ConfigParams.Param)
                        vals = split(ps.Config.(topField{fid}).ConfigParams.Param{ix}.Attributes.Name,'.');
                        if(numel(vals) ==1 )
                            ts.(topField{fid}).(vals{1}) = ...
                                str2double(ps.Config.(topField{fid}).ConfigParams.Param{ix}.Attributes.Value);
                        elseif(numel(vals) ==2)
                            ts.(topField{fid}).(vals{1}).(vals{2}) = ...
                                str2double(ps.Config.(topField{fid}).ConfigParams.Param{ix}.Attributes.Value);
                        elseif(numel(vals) ==3)
                            ts.(topField{fid}).(vals{1}).(vals{2}).(vals{3}) = ...
                                str2double(ps.Config.(topField{fid}).ConfigParams.Param{ix}.Attributes.Value);
                        elseif(numel(vals) ==4)
                            ts.(topField{fid}).(vals{1}).(vals{2}).(vals{3}).(vals{4}) = ...
                                str2double(ps.Config.(topField{fid}).ConfigParams.Param{ix}.Attributes.Value);
                        end
                        
                    end
                end
            end
        case 'comment'
            ts.AppCode = ps.Config.Comment;
        case 'attributes'
            ts.Version = str2double(ps.Config.Attributes.Version);
        otherwise
    end
end
userConfig = ts;