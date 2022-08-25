import Door from '../classes/Door';
import GravitySwitch from '../classes/GravitySwitch';
import Level from '../classes/Level';
import Platform from '../classes/Platform';
import Spikes from '../classes/Spikes';

import level4 from './4';

import * as enums from '../constants/enums';
import * as numbers from '../constants/numbers';

const height = 14

const level3 = (game) =>
  new Level({
    name: 'The Y',
    elements: [
      new Door({
        east: 0,
        nextLevel: level4,
        north: 0,
      }),
      new GravitySwitch({
        centerX: 50,
        gravityDirection: enums.cardinalDirections.north,
        north: 300,
      }),
      new GravitySwitch({
        centerX: 50,
        gravityDirection: enums.cardinalDirections.south,
        north: 500,
      }),
      new Platform({ // top right
        height: numbers.platformBreadth,
        south: numbers.hallHeightSmall * 5 + height * 4,
        west: 1400,
        width: 100,
      }),
      new Platform({ // top 2, right 2
        height: numbers.platformBreadth,
        south: numbers.hallHeightSmall * 4 + height * 3,
        west: 1100,
        width: 100,
      }),
      new Platform({ // middle
        height: numbers.platformBreadth,
        south: numbers.hallHeightSmall * 3 + height * 2,
        west: 800,
        width: 100,
      }),
      new Platform({ // bottom 2, left 2
        height: numbers.platformBreadth,
        south: numbers.hallHeightSmall * 2 + height,
        west: 500,
        width: 100,
      }),
      new Platform({ // bottom left
        height: numbers.platformBreadth,
        south: numbers.hallHeightSmall,
        west: 200,
        width: 100,
      }),
      new Platform({ // top left
        height: numbers.platformBreadth,
        south: numbers.hallHeightSmall * 6 + height * 5,
        west: 0,
        width: 100,
      }),
      new Platform({ // top 2, left 2
        height: numbers.platformBreadth,
        south: numbers.hallHeightSmall * 5 + height * 4,
        west: 250,
        width: 100,
      }),
      new Platform({ // top 3, left 3
        height: numbers.platformBreadth,
        south: numbers.hallHeightSmall * 4 + height * 3,
        west: 500,
        width: 100,
      }),
      new Spikes({ // bottom
        width: 1400,
        south: 0,
        west: 200,
      }),
      new Spikes({ // top
        direction: enums.cardinalDirections.south,
        north: 0,
        west: 0,
        width: 1400,
      }),
    ],
    game,
  });

export default level3;
