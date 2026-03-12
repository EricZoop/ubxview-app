% Clear workspace, close figures
clear all;
close all;

% Define number of panels and create aligner object
numPanels = 4;
myAligner = aligner(numPanels);

% Initial velocity, position, time step, and rotation matrix
v = [10; 10; 10];
pos = [100; 100; 0];
dt = 1;
R = Rrph_f2(4, 7, 325);

% Create figures for plotting
figure(1);
title('Error vs Time');
xlabel('Time');
ylabel('Error');
hold on;

figure(2);
title('Norm of Rotation Matrix Error vs Time');
xlabel('Time');
ylabel('Norm of Error');
hold on;

raestd = [1; .5;.5];

% Main loop
c = 'brmk';
for time = 1:5000
    for jj = 1:numPanels
        % Update velocity and position with noise (random walk)
        v = v + randn(3,1);
        pos = pos + v*dt;

        % Calculate reference point
        referencePoint = pos;

        % Add noise to AER angles and slant range
        [az, elev, slantRange] = enu2aer(pos(1), pos(2), pos(3));
        az = az + raestd(2)*randn(1);
        elev = elev + raestd(3)*randn(1);
        slantRange = slantRange + raestd(1)*randn(1);

        % Update position using AER angles
        [pos(1), pos(2), pos(3)] = aer2enu(az, elev, slantRange);

        % Apply rotation matrix
        bodyPoint = R * pos;

        % Insert points into aligner
        myAligner.insertPoint(referencePoint, bodyPoint, jj);

        fprintf(1, 'Point: %d Error: %f\n', time, myAligner.Error{jj});

        % Plot errors after a few iterations
        if(time > 3)
            error(time,jj) = myAligner.Error{jj};
            % error between reference and body points
            

            % error between calculated and actual rotation matrix
            normError(time,jj) =  norm(myAligner.Attitude{jj} - R');
           
        end
    end
end
figure(1);
for jj = 1:numPanels
    plot(  error(:,jj), [c(jj) '.'], 'MarkerSize', 10);
end
figure(2);
for jj = 1:numPanels
    plot(  normError(:,jj), [c(jj) '.'], 'MarkerSize', 10);
end
% Legend and final touches for figures
figure(1);
legend('Panel 1', 'Panel 2', 'Panel 3', 'Panel 4');
hold off;
grid on;
figure(2);
legend('Panel 1', 'Panel 2', 'Panel 3', 'Panel 4');
hold off;
grid on