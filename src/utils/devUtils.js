import * as gameUtils from "./gameUtils";
import * as numbers from '../constants/numbers';

const frictionStopTime = numbers.runTerminalVelocity / numbers.runStopFriction * 1000;
const frictionStopDistance = gameUtils.distance(
  numbers.runTerminalVelocity,
  0,
  frictionStopTime
);

const jumpDistance = gameUtils.distance(
  numbers.jumpSpeed,
  numbers.jumpSpeed,
  numbers.jumpTime
);

const jumpFloatTime = numbers.jumpSpeed / numbers.gravityAcceleration * 1000;

const jumpFloatDistance = gameUtils.distance(
  numbers.jumpSpeed,
  0,
  jumpFloatTime
);

const runBackwardsTime = numbers.runTerminalVelocity / ( numbers.runStopFriction + numbers.runAcceleration) * 1000;
const runBackwardsDistance = gameUtils.distance(
  numbers.runTerminalVelocity,
  0,
  runBackwardsTime
);


// console.log({
//   frictionStopDistance,
//   jumpHeight: jumpDistance + jumpFloatDistance,
//   runBackwardsDistance
// })