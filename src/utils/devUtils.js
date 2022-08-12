import * as gameUtils from "./gameUtils";
import * as numbers from '../constants/numbers';

const frictionStopTime = numbers.runTerminalVelocity / numbers.runStopFriction;
const frictionStopDistance = gameUtils.distance(
  numbers.runTerminalVelocity,
  0,
  frictionStopTime
) * numbers.characterWidth;

// console.log({
//   frictionStopDistance,
// })