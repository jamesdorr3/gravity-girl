import Noun from '../classes/Noun';
import * as enums from '../constants/enums';
import * as keys from '../constants/keys';
import * as numbers from '../constants/numbers';

const jumpKeysDown = (keysDown) =>
  keysDown.includes(keys.space) || keysDown.includes(keys.shift);

export const distance = (velocityFinal, velocityInitial, time) =>
  (1 / 2) * (velocityFinal + velocityInitial) * time;

export const getMouseCoordsInCanvas = (e, canvas) => {
  const { x, y, height, width } = canvas.current.getBoundingClientRect();
  const mouseX = (e.clientX - x) * (numbers.canvasWidth / width);
  const mouseY = (e.clientY - y) * (numbers.canvasHeight / height);
  return { mouseX, mouseY };
};

export const keyNorth = (keysDown, gravityDirection) =>
  keysDown.includes(keys.w) ||
  keysDown.includes(keys.up) ||
  (gravityDirection === enums.gravityDirections.south &&
    jumpKeysDown(keysDown));

export const keyEast = (keysDown, gravityDirection) =>
  keysDown.includes(keys.d) ||
  keysDown.includes(keys.right) ||
  (gravityDirection === enums.gravityDirections.west && jumpKeysDown(keysDown));

export const keySouth = (keysDown, gravityDirection) =>
  keysDown.includes(keys.s) ||
  keysDown.includes(keys.down) ||
  (gravityDirection === enums.gravityDirections.north &&
    jumpKeysDown(keysDown));

export const keyWest = (keysDown, gravityDirection) =>
  keysDown.includes(keys.a) ||
  keysDown.includes(keys.left) ||
  (gravityDirection === enums.gravityDirections.east && jumpKeysDown(keysDown));

export const mouse = (e) => new Noun({ ...e, height: 1, width: 1 });

export const firstNumber = (...args) =>
  args.find((arg) => typeof arg === 'number');
