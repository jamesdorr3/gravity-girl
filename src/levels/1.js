import Door from '../classes/Door';
import GravitySwitch from '../classes/GravitySwitch';
import Level from '../classes/Level';
import Platform from '../classes/Platform';

import level2 from './2';

import * as enums from '../constants/enums';
import * as numbers from '../constants/numbers';

const level1 = (game) =>
  new Level({
    elements: [
      new Door({
        action: () => game.changeLevels(level2),
        south: 500,
        centerX: 1550
      }),
      new GravitySwitch({ // n
        gravityDirection: enums.cardinalDirections.south,
        centerX: 850,
        north: 25,
      }),
      new GravitySwitch({ // ne
        gravityDirection: enums.cardinalDirections.north,
        centerX: 1300,
        south: 525,
      }),
      new GravitySwitch({ // s
        gravityDirection: enums.cardinalDirections.north,
        centerX: 600,
        south: 25,
      }),
      new Platform({ // nw
        height: numbers.canvasHeight - numbers.hallHeightLarge,
        north: 0,
        west: 0,
        width: 500,
      }),
      new Platform({ // ne
        height: numbers.platformBreadth,
        south: 500 + numbers.hallHeightSmall,
        west: 1000,
        width: 200,
      }),
      new Platform({ // se
        east: 0,
        height: 500,
        south: 0,
        width: 900,
      }),
    ],
    game,
    name: 'Where Am I?',
  });

export default level1;
