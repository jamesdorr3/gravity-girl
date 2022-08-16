import Button from '../classes/Button';
import Door from '../classes/Door';
import GravitySwitch from '../classes/GravitySwitch';
import Level from '../classes/Level';
import Platform from '../classes/Platform';
import level3 from './3';
import * as enums from '../constants/enums';
import * as numbers from '../constants/numbers';

const level2 = (game) =>
  new Level({
    buttons: [
      new Button({ action: game.stop, east: 0, north: 0, text: 'STOP' }),
    ],
    elements: [
      new Door({
        action: () => game.changeLevels(level3),
        east: 0,
        south: 0,
      }),
      new GravitySwitch({ // bottom right
        gravityDirection: enums.cardinalDirections.north,
        x: 1000,
        south: 25,
      }),
      new GravitySwitch({ // top left
        centerX: 100,
        gravityDirection: enums.cardinalDirections.south,
        north: 25,
      }),
      new Platform({
        centerX: numbers.canvasWidth / 2,
        height: numbers.platformBreadth,
        south: numbers.hallHeightSmall,
        width: 300,
      }),
    ],
    game,
    name: 'What Happened?'
  });

export default level2;
