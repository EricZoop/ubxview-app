function [KL_Divergence,az_edges, el_edges, N] = compute_KL_divergence_and_plot(az, el, num_bins_az, num_bins_el,radarFace, radarParameters,status,elevationLimit)
    % Compute Kullback-Leibler Divergence between given points and a uniform distribution
    % and visualize the density distribution as a heatmap.
    %
    % az, el: Vectors of azimuth and elevation points (in degrees)
    % num_bins_az, num_bins_el: Number of bins in azimuth and elevation
    
    % Get min az / max az
    % Min / Max Elevation
    maxElCells = cellfun(@max, radarParameters.elsteer, 'UniformOutput', false);
    maxEl = -inf;
    for iMaxElCell = 1:length(maxElCells)
        if ~isempty(maxElCells{iMaxElCell})
            maxEl = max(maxEl, maxElCells{iMaxElCell});
        end
    end
    maxEl = maxEl + max(radarParameters.elBeamwidth)/2;
    maxEl = max(maxEl, max(el(:)));
    % Az width of one radar
    minAz = inf;
    maxAz = -inf;
    minAzCells = cellfun(@min,radarParameters.azsteer, 'UniformOutput', false);
    maxAzCells = cellfun(@max, radarParameters.azsteer, 'UniformOutput', false);
    for iMinAzCell = 1:length(minAzCells)
        if ~isempty(minAzCells{iMinAzCell})
            minAz = min(minAz, minAzCells{iMinAzCell});
        end
    end
    for iMaxAzCell = 1:length(maxAzCells)
        if ~isempty(maxAzCells{iMaxAzCell})
            maxAz = max(maxAz, maxAzCells{iMaxAzCell});
        end
    end
    minAz = minAz - max(radarParameters.azBeamwidth)/2;
    maxAz = maxAz + max(radarParameters.azBeamwidth)/2;
    % Radar Headings
    % vehicle to fixture heading already accounted for in radarcalibration
    % heading = mod(mean(status.Yaw)+radarParameters.vehicleToFixture.Heading(radarFace),360);
    % minAz = heading + minAz;
    % maxAz = heading + maxAz;

    % Define bin edges for Azimuth (0 to 90 degrees) and Elevation (20 to 45 degrees)
    az_edges = linspace(minAz+45, maxAz+45, num_bins_az + 1);
    el_edges = linspace(elevationLimit, maxEl, num_bins_el + 1);

    % Compute 2D histogram of given data
    [N, ~, ~] = histcounts2(az, el, az_edges, el_edges);
    
    if (sum(N(:))==0)
        % If no values in range, set arbitrary high divergence
        KL_Divergence = 999;
        fprintf('K-L Divergence: %.6g\n', KL_Divergence);
        return;
    end
    
    % Normalize to get empirical probability distribution
    P = N / sum(N(:)); 
    
    % Expected uniform probability distribution
    U = ones(size(N)) / numel(N);
    
    % Ensure no zero probabilities in P (avoid log(0), use a small epsilon)
    P(P == 0) = eps; 
    
    % Compute K-L Divergence: D_KL(P || U)
    KL_Divergence = sum(P(:) .* log(P(:) ./ U(:)));
    
    % Display result
    fprintf('K-L Divergence: %.6g\n', KL_Divergence);
    
    
    

end