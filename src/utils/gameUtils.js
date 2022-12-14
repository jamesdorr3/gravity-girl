import Element from '../classes/Element';
import character from '../classes/Character';
import * as enums from '../constants/enums';
import * as keys from '../constants/keys';
import * as numbers from '../constants/numbers';
import { gravityGirlMaxLevel } from '../constants/strings';

// hoisted

export const isNum = (it) => typeof it === 'number';

// unhoisted

export const distance = (velocityFinal, velocityInitial, time) =>
  (1 / 2) * (velocityFinal + velocityInitial) * time;

export const getMouseCoordsInCanvas = (e, canvas) => {
  const { x, y, height, width } = canvas.current.getBoundingClientRect();
  const mouseX = (e.clientX - x) * (numbers.canvasWidth / width);
  const mouseY = (e.clientY - y) * (numbers.canvasHeight / height);
  return { mouseX, mouseY };
};

export const firstDefined = (...args) =>
  args.find((arg) => typeof arg !== 'undefined');

export const gravitySign = (gravityDirection) =>
  ({
    [enums.cardinalDirections.north]: -1,
    [enums.cardinalDirections.east]: 1,
    [enums.cardinalDirections.south]: 1,
    [enums.cardinalDirections.west]: -1,
  }[gravityDirection]);

export const isEastKeyDown = (keysDown) => // TO DO incorporate in keyboard?
  keysDown.includes(keys.d) || keysDown.includes(keys.right);

// export const isJumpKeyDown = (keysDown) =>
//   keysDown.includes(keys.space) || keysDown.includes(keys.shift);

export const isNorthKeyDown = (keysDown) =>
  keysDown.includes(keys.w) || keysDown.includes(keys.up);

export const isNorthSouth = (gravityDirection = character.gravityDirection) =>
  ['north', 'south'].includes(gravityDirection);

export const isSouthKeyDown = (keysDown) =>
  keysDown.includes(keys.s) || keysDown.includes(keys.down);

export const isWestKeyDown = (keysDown) =>
  keysDown.includes(keys.a) || keysDown.includes(keys.left);

export const mouse = (e) => new Element({ ...e, height: 1, width: 1 });

export const parseLocalStorage = (key = gravityGirlMaxLevel) => {
  const string = localStorage.getItem(key);
  return string ? parseInt(string) : 1
};

export const sign = (direction = character.gravityDirection) => {
  switch (direction) {
    case enums.cardinalDirections.north:
      return -1;
    case enums.cardinalDirections.west:
      return -1;
    default: // east and south
      return 1;
  }
};
