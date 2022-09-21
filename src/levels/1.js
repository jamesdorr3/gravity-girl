import Door from '../classes/Door';
import GravitySwitchStatic from '../classes/GravitySwitchStatic';
import Level from '../classes/Level';
import Platform from '../classes/Platform';

import nextLevel from './2';

import * as enums from '../constants/enums';
import * as numbers from '../constants/numbers';

const level1 = 
  new Level({
    order: 1,
    name: 'Where Am I?',
    elements: [
      new Door({
        centerX: 1550,
        nextLevel,
        south: 500,
      }),
      new GravitySwitchStatic({ // n
        gravityDirection: enums.cardinalDirections.south,
        centerX: 850,
        north: 25,
      }),
      new GravitySwitchStatic({ // ne
        gravityDirection: enums.cardinalDirections.north,
        centerX: 1300,
        south: 525,
      }),
      new GravitySwitchStatic({ // s
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
  });

export default level1;
