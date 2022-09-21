import Door from '../classes/Door';
import GravitySwitchStatic from '../classes/GravitySwitchStatic';
import Level from '../classes/Level';
import Platform from '../classes/Platform';
import Spikes from '../classes/Spikes';
import character from '../classes/Character';

import nextLevel from './3';

import * as enums from '../constants/enums';
import * as numbers from '../constants/numbers';

const level2 = 
  new Level({
    order: 2,
    name: 'What Just Happened?',
    elements: [
      new Door({
        gravityDirection: 'south',
        east: 0,
        nextLevel,
        north: 300,
      }),
      new GravitySwitchStatic({ // bottom center
        gravityDirection: enums.cardinalDirections.north,
        south: 100,
        west: 900,
      }),
      new GravitySwitchStatic({ // top left
        gravityDirection: enums.cardinalDirections.south,
        north: 25,
        west: 25,
      }),
      new Platform({ // door cover left
        north: 300,
        east: numbers.doorWidth,
        height: numbers.doorHeight,
        width: numbers.platformBreadth,
      }),
      new Platform({ // door cover bottom
        north: 300 + numbers.doorHeight,
        east: 0,
        height: numbers.platformBreadth,
        width: numbers.doorWidth + numbers.platformBreadth,
      }),
      new Platform({ // low
        height: numbers.platformBreadth,
        south: numbers.hallHeightSmall,
        west: 200,
        width: 200,
      }),
      new Platform({ // medium
        height: numbers.platformBreadth,
        south: 225,
        west: 0,
        width: 200,
      }),
      new Platform({ // high left
        height: numbers.platformBreadth,
        south: 350,
        west: 200,
        width: 200,
      }),
      new Platform({ // high middle
        height: numbers.platformBreadth,
        south: 475,
        west: 600,
        width: 100,
      }),
      new Platform({ // high right
        height: numbers.platformBreadth,
        south: 600,
        west: 900,
        width: 100,
      }),
      new Platform({ // top right-most
        height: numbers.platformBreadth,
        north: numbers.hallHeightSmall,
        east: 100,
        width: 200,
      }),
      new Spikes({
        width: 1100,
        south: 0,
        west: 500,
      }),
    ],
  });

export default level2;
