function outStruct = sortStruct_ByTime(inputStruct)

    [~,sortInds] = sort(inputStruct.datetime);
    
    fields = fieldnames(inputStruct);
    outStruct = inputStruct;
    for iField = 1:length(fields)
        outStruct.(fields{iField}) = outStruct.(fields{iField})(sortInds); 
    end
end