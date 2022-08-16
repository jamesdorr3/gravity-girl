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
      new Button({ action: game.stop, west: 0, north: 0, text: 'STOP' }), // DEV
    ],
    elements: [
      new Door({
        action: () => game.changeLevels(level2),
        centerX: numbers.canvasWidth - 100,
        north: 0,
      }),
      new GravitySwitch({
        gravityDirection: enums.cardinalDirections.north,
        centerX: numbers.canvasWidth - 100,
        south: 25,
      }),
      new Platform({
        height: numbers.canvasHeight - numbers.hallHeightLarge,
        width: numbers.canvasWidth - 200,
        x: 0,
        y: 0,
      }),
    ],
    game,
    name: 'Where Am I?',
  });

export default level1;
