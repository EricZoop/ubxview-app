classdef aligner < handle
    properties (SetAccess = public, GetAccess = public)
        memoryLength ;
        maxPanels ;
        totalPoints;
        referenceFrame;
        bodyFrame;
        Attitude;
        Error;
        radarDcm;
        referenceDcm;
        radar2geoDCM;
        ctmLLLN2rdr;
        goodCal;
        covariance;
        BMATRIX;
        condition;
        USEWEIGHT;
    end
    methods (Access = public)
        function obj =aligner(numberPanels)
            
            obj.memoryLength = 16384;
            obj.maxPanels = numberPanels;
            
            
            for ii = 1:numberPanels
                obj.totalPoints{ii} = 0;
                obj.Error{ii} = 1E9;
                obj.referenceFrame{ii} = zeros(3, obj.memoryLength);
                obj.bodyFrame{ii} = zeros(3, obj.memoryLength);
                obj.covariance{ii} = zeros(1,obj.memoryLength);
                obj.Attitude{ii} = eye(3);
                obj.radarDcm{ii} = eye(3);
                obj.ctmLLLN2rdr{ii} = [];
                obj.referenceDcm{ii} = eye(3);
                obj.radar2geoDCM{ii} = eye(3);
                obj.goodCal{ii} = false;
                obj.condition{ii} = 1E9;
                obj.BMATRIX{ii} = zeros(3,3);
                obj.USEWEIGHT = true;
                
            end
        end
        function obj = setRadar2GeoDCM(obj,good,panel,DCM)
            obj.radar2geoDCM{panel} = DCM;
            obj.goodCal{panel} = good;
        end
        function obj =insertPoint(obj,referencePoint,bodyPoint,varargin)
            
            assert(size(referencePoint,1)==3);
            assert(size(bodyPoint,1)==3);
            assert(size(referencePoint,2)==size(bodyPoint,2));
            
            if(nargin>=4)
                panel = varargin{1};
                assert(sum(panel==0|panel>obj.maxPanels)==0);
                
            else
                panel = ones(1,size(referencePoint,2));
            end
            if(obj.USEWEIGHT&nargin==5)
                bodyStd = varargin{2};
                assert(size(bodyPoint,2)==size(bodyStd,2));
                
            else
                bodyStd = ones(1,size(bodyPoint,2));
            end
            for ii = 1:size(referencePoint,2)
                memoryPoint = mod(obj.totalPoints{panel(ii)},obj.memoryLength)+1;
                obj.referenceFrame{panel(ii)}(:,memoryPoint) = obj.referenceDcm{panel(ii)}*referencePoint(:,ii)./norm(referencePoint(:,ii));
                bodyNorm = norm( bodyPoint(:,ii));
                if(~isempty(obj.ctmLLLN2rdr{panel(ii)}))
                    ct_in           = [bodyPoint(:,ii); 1];
                    ct_out          = obj.ctmLLLN2rdr{panel(ii)} * ct_in;
                    point    = ct_out(1 : 3);
                    obj.bodyFrame{panel(ii)}(:,memoryPoint) = point/bodyNorm;
                else
                    obj.bodyFrame{panel(ii)}(:,memoryPoint) = obj.radarDcm{panel(ii)}*bodyPoint(:,ii)./bodyNorm;
                end
                if(~(abs(bodyStd(ii)-1)<1E-3))
                    
                    obj.covariance{panel(ii)}(memoryPoint) = (bodyStd(ii)./bodyNorm).^2;
                else
                    obj.covariance{panel(ii)}(memoryPoint) = 1;
                end
                obj.totalPoints{panel(ii)}= obj.totalPoints{panel(ii)}+ 1;
            end
            allPanels = unique(panel);
%             for thisPanel = allPanels
%                 if(obj.totalPoints{thisPanel}>2)
%                     obj.calculateAttitude(thisPanel);
%                 end
%             end
        end
        function obj =calculateAttitude(obj,panel)
            if(obj.totalPoints{panel}>obj.memoryLength)
                index = 1:obj.memoryLength;
            else
                index = 1:obj.totalPoints{panel};
            end
            %calculate attitude profile matrix
            
            %B=obj.ransac(obj.referenceFrame{panel}(:,index),bf);
            bb = obj.referenceFrame{panel}(:,index);
            is = find(~isnan(bb(1,:)));
            index = index(is);
            bf = obj.bodyFrame{panel}(:,index).*1./obj.covariance{panel}(index);
            B = obj.referenceFrame{panel}(:,index)*bf';
            obj.BMATRIX{panel} = B;
            obj.condition{panel} = cond(B);
            %calculate attitude matrix using svd
            [U,~,V] = svd(B);
            obj.Attitude{panel} = U*diag([1 1 det(U)*det(V)])*V';
            
            referenceFrameNew = obj.Attitude{panel}*obj.bodyFrame{panel}(:,index);
            %get delta between body->reference and reference
            errorOld =  mean(acosd(dot(obj.referenceFrame{panel}(:,index),obj.bodyFrame{panel}(:,index))));
            dp = dot(obj.referenceFrame{panel}(:,index),referenceFrameNew);
            dp(dp>1) = 1;
            obj.Error{panel} = mean(acosd(dp));
            if( obj.Error{panel}<8)
                obj.goodCal{panel} = true;
            end
            if(obj.Error{panel}>errorOld)
                obj.Attitude{panel} = eye(3);
            end
        end
        function obj =calculateAttitudeRobust(obj,panel)
            if(obj.totalPoints{panel}>obj.memoryLength)
                index = 1:obj.memoryLength;
            else
                index = 1:obj.totalPoints{panel};
            end
            %calculate attitude profile matrix
            
            %B=obj.ransac(obj.referenceFrame{panel}(:,index),bf);
            bb = obj.referenceFrame{panel}(:,index);
            is = find(~isnan(bb(1,:)));
            index = index(is);
            bf = obj.bodyFrame{panel}(:,index);%.*1./obj.covariance{panel}(index);
            cov = 1./obj.covariance{panel}(index);
            [R_best, inliers_best] = obj.wahba_ransac( bf,obj.referenceFrame{panel}(:,index), numel(index), 3);
            index = index(inliers_best);
             bf = bf(:,index).*cov(index);
         
            B = obj.referenceFrame{panel}(:,index)*bf';
            obj.BMATRIX{panel} = B;
            obj.condition{panel} = cond(B);
            %calculate attitude matrix using svd
            [U,~,V] = svd(B);
            obj.Attitude{panel} = U*diag([1 1 det(U)*det(V)])*V';
            
            referenceFrameNew = obj.Attitude{panel}*obj.bodyFrame{panel}(:,index);
            %get delta between body->reference and reference
            errorOld =  mean(acosd(dot(obj.referenceFrame{panel}(:,index),obj.bodyFrame{panel}(:,index))));
            dp = dot(obj.referenceFrame{panel}(:,index),referenceFrameNew);
            dp(dp>1) = 1;
            obj.Error{panel} = mean(acosd(dp));
            if( obj.Error{panel}<8)
                obj.goodCal{panel} = true;
            end
            if(obj.Error{panel}>errorOld)
                obj.Attitude{panel} = eye(3);
            end
            
        end
        function [R_best, inliers_best] = wahba_ransac(obj,bodyVecs, refVecs, maxIter, thresholdDeg)
            
            % Inputs:
            % bodyVecs: 3 x N matrix of body-frame vectors
            % refVecs:  3 x N matrix of reference vectors
            % maxIter:  number of RANSAC iterations
            % thresholdDeg: inlier threshold in degrees
            thresholdDeg = .1;
            go = true;
            while(go)
                N = size(bodyVecs, 2);
                minSubset =4;  % minimal number of points to estimate rotation
                thresholdRad = deg2rad(thresholdDeg);
                
                bestInlierCount = 0;
                R_best = eye(3);
                inliers_best = false(1, N);
                
                for iter = 1:maxIter
                    
                    % Randomly select minimal subset
                    subsetIdx = randperm(N, minSubset);
                    bodySubset = bodyVecs(:, subsetIdx);
                    refSubset  = refVecs(:, subsetIdx);
                    
                    % Solve Wahba on minimal subset
                    R = solve_wahba(obj,bodySubset, refSubset)';
                    
                    % Apply rotation to all body vectors
                    rotatedBody = R * bodyVecs;
                    
                    % Compute angular error (cosine inverse of dot product)
                    cosTheta = sum(rotatedBody .* refVecs, 1);
                    cosTheta = max(min(cosTheta, 1), -1);  % clamp for safety
                    angles = acos(cosTheta);
                    
                    % Find inliers
                    inliers = angles < thresholdRad;
                    inlierCount = sum(inliers);
                    
                    % Update best model if more inliers
                    if inlierCount > bestInlierCount
                        bestInlierCount = inlierCount;
                        R_best = R;
                        inliers_best = inliers;
                    end
                end
                if( (bestInlierCount/N)<.65||N<30)
                    thresholdDeg = thresholdDeg + .1;
                    if(thresholdDeg>1)
                        go = false;
                    end
                else
                    go = false;
                end
            end
            % Recompute final solution using all inliers
            if bestInlierCount >= minSubset
                R_best = solve_wahba(obj,bodyVecs(:, inliers_best), refVecs(:, inliers_best))';
            end
            
        end
  
        function R = solve_wahba(obj,bodyVecs, refVecs)
            % Classic Wahba’s solution using SVD
            B = bodyVecs * refVecs';
            [U, ~, V] = svd(B);
            D = diag([1, 1, det(U * V')]);
            R = U * D * V';
        end
    end
end
