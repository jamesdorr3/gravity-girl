import Button from '../classes/Button';
import Door from '../classes/Door';
import GravitySwitch from '../classes/GravitySwitch';
import Level from '../classes/Level';
import Platform from '../classes/Platform';
import level2 from './2';
import * as enums from '../constants/enums';
import * as numbers from '../constants/numbers';

const level1 = (game) =>
  new Level({
    buttons: [
      new Button({ action: game.stop, east: 0, north: 0, text: 'STOP' }),
    ],
    elements: [
      new Door({
        action: () => game.changeLevels(level2),
        east: 0,
        south: 0,
      }),
      new GravitySwitch({
        gravityDirection: enums.gravityDirections.north,
        x: 800,
        south: 25,
      }),
      new GravitySwitch({
        gravityDirection: enums.gravityDirections.south,
        x: 600,
        north: 25,
      }),
      new GravitySwitch({
        gravityDirection: enums.gravityDirections.east,
        x: 25,
        y: 400,
      }),
      new GravitySwitch({
        gravityDirection: enums.gravityDirections.west,
        east: 25,
        y: 400,
      }),
      new Platform({
        centerX: numbers.canvasWidth / 2 - 200,
        height: 50,
        south: 100,
        width: 300,
      }),
    ],
    frameLength: numbers.frameLength,
    game,
  });

export default level1;
