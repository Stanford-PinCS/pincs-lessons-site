function sumForces(forces) {
  let netForce = { x: 0, y: 0 };
  // Write your code in place of this line.
  return netForce;
}

const forces = [
  { x: 10, y: 10 },
  { x: -15, y: -5 },
  { x: -15, y: 5 },
];

for (let force of forces) {
  drawForce(force, "black");
}

drawForce(sumForces(forces), "green");
