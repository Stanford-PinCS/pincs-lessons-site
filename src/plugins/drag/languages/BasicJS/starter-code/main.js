function getNextPosition(currentPosition, currentVelocity, timestep, getDrag) {
  const nextPosY = currentPosition.y + timestep * currentVelocity.y;

  const accelerationY = 0;

  const nextVelY = currentVelocity.y;

  return {
    x: currentPosition.x,
    y: nextPosY,
    xVel: currentVelocity.x,
    yVel: nextVelY,
  };
}

runSimulation(getNextPosition, 0.2);
