import { SimulationMessage } from "../../messages";

const createExports = (sendMessage: (message: SimulationMessage) => void) => {
  return Promise.resolve({
    runSimulation: (
      getNextPosition: (
        currentPosition: { x: number; y: number },
        currentVelocity: { x: number; y: number },
        timestep: number,
        getDrag: (velocity: { x: number; y: number }) => {
          x: number;
          y: number;
        }
      ) => { x: number; y: number; xVel: number; yVel: number },
      stepSize: number
    ) => {
      const G = 9.81; // Acceleration due to gravity (m/s^2)
      const RHO = 1.225; // Air density (kg/m^3)
      const A = 0.004; // Cross-sectional area of a tennis ball (m^2)
      const CD = 0.5; // Drag coefficient for a sphere
      const M = 0.058; // Mass of a tennis ball (kg)
      const SIMULATION_TIMESTEP = stepSize; // seconds (larger for simulation)
      const ACTUAL_TIMESTEP = 0.005; // seconds (smaller for actual)

      const INITIAL_SPEED = 50; // Initial speed
      const INITIAL_ANGLE = 0.23 * Math.PI; // Angle of inclination for launch
      const WIND_SPEED_X = -12; // Headwind speed in m/s (negative for headwind)

      const getDrag = (velocity: { x: number; y: number }) => {
        const EPS = 1e-8;
        const relativeVelocityX = velocity.x - WIND_SPEED_X;
        const relativeVelocityY = velocity.y;

        const relativeSpeed =
          Math.sqrt(relativeVelocityX ** 2 + relativeVelocityY ** 2) + EPS; // avoid division by zero

        const dragAccelerationMagnitude =
          (0.5 * RHO * A * CD * relativeSpeed ** 2) / M;

        return {
          x: -dragAccelerationMagnitude * (relativeVelocityX / relativeSpeed),
          y: -dragAccelerationMagnitude * (relativeVelocityY / relativeSpeed),
        };
      };

      let predictedPath: { x: number; y: number }[] = [];
      let actualPath: { x: number; y: number }[] = [];

      // Initial conditions
      let initial_velocity = {
        x: INITIAL_SPEED * Math.cos(INITIAL_ANGLE),
        y: INITIAL_SPEED * Math.sin(INITIAL_ANGLE),
      };
      let currentPositionPredicted = { x: 0, y: 1 };
      let currentVelocityPredicted = { ...initial_velocity };

      let currentPositionActual = { x: 0, y: 1 };
      let currentVelocityActual = { ...initial_velocity };

      predictedPath.push({ ...currentPositionPredicted });
      actualPath.push({ ...currentPositionActual });

      let isComplete = false;
      let simulatedTimeElapsed = 0;
      const FRAME_SIMULATED_TIME_ADVANCE = 0.05; // seconds of simulated time to advance per frame
      let currentAnimation: "predicted" | "actual" = "predicted";

      const getNextPositionActual = (
        currentPos: { x: number; y: number },
        currentVel: { x: number; y: number },
        dt: number
      ) => {
        const nextPosX = currentPos.x + dt * currentVel.x;
        const nextPosY = currentPos.y + dt * currentVel.y;

        const dragAcceleration = getDrag(currentVel); // Now returns acceleration
        const accelerationX = dragAcceleration.x;
        const accelerationY = dragAcceleration.y - G;

        const nextVelX = currentVel.x + accelerationX * dt;
        const nextVelY = currentVel.y + accelerationY * dt;

        return {
          position: { x: nextPosX, y: nextPosY },
          velocity: { x: nextVelX, y: nextVelY },
        };
      };

      const interval = setInterval(() => {
        if (!isComplete) {
          let currentFrameSimulatedTime = 0;
          while (currentFrameSimulatedTime < FRAME_SIMULATED_TIME_ADVANCE) {
            if (currentAnimation === "predicted") {
              // User's predicted path
              const nextPredicted = getNextPosition(
                currentPositionPredicted,
                currentVelocityPredicted,
                SIMULATION_TIMESTEP,
                getDrag
              );
              predictedPath.push({
                x: nextPredicted.x,
                y: nextPredicted.y,
              });
              currentVelocityPredicted.x = nextPredicted.xVel;
              currentVelocityPredicted.y = nextPredicted.yVel;
              currentPositionPredicted = {
                x: nextPredicted.x,
                y: nextPredicted.y,
              };

              if (
                currentPositionPredicted.y < 0 ||
                predictedPath.length > 500
              ) {
                currentAnimation = "actual";
              }
            } else if (currentAnimation === "actual") {
              // Actual path
              const actualResult = getNextPositionActual(
                currentPositionActual,
                currentVelocityActual,
                ACTUAL_TIMESTEP
              );
              currentPositionActual = actualResult.position;
              currentVelocityActual = actualResult.velocity;
              actualPath.push(currentPositionActual);

              if (currentPositionActual.y < 0) {
                isComplete = true;
                clearInterval(interval);
              }
            }
            currentFrameSimulatedTime += ACTUAL_TIMESTEP;
          }
          simulatedTimeElapsed += FRAME_SIMULATED_TIME_ADVANCE;
        }

        sendMessage({
          type: "simulationUpdate",
          predictedPath: predictedPath,
          actualPath: actualPath,
          ballPosition: currentPositionActual,
          isComplete: isComplete,
          currentAnimation: currentAnimation,
        });
      }, 50); // Update every 50ms
    },
  });
};

export default createExports;
