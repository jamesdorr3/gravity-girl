import Door from '../classes/Door';
import GravitySwitch from '../classes/GravitySwitch';
import Level from '../classes/Level';
import Platform from '../classes/Platform';
import Spikes from '../classes/Spikes';

import nextLevel from './theEnd';

import { cardinalDirections } from '../constants/enums';

import {
  widthGap,
  hallHeightMedium,
  hallHeightSmall,
  platformBreadth,
} from '../constants/numbers';

const level = new Level({
  name: 'The Cube',
  characterStartX: 0,
  characterStartY: 800,
  elements: [
    // inner loop
    new Platform({
      // door nw
      height: platformBreadth,
      south: 500,
      west: 750 - platformBreadth,
      width: 50 + platformBreadth - (1 / 2) * widthGap,
    }),
    new Platform({
      // door ne
      east: 750 - platformBreadth,
      height: platformBreadth,
      south: 500,
      width: 50 + platformBreadth - (1 / 2) * widthGap,
    }),
    new Platform({
      // door e
      centerY: 450,
      width: platformBreadth,
      west: 850,
      height: 100 + 2 * platformBreadth,
    }),
    new Platform({
      // door sw
      height: platformBreadth,
      north: 500,
      west: 750 - platformBreadth,
      width: 50 + platformBreadth - (1 / 2) * widthGap,
    }),
    new Platform({
      // door se
      east: 750 - platformBreadth,
      height: platformBreadth,
      north: 500,
      width: 50 + platformBreadth - (1 / 2) * widthGap,
    }),
    new Platform({
      // door w
      centerY: 450,
      east: 850,
      width: platformBreadth,
      height: 100 + 2 * platformBreadth,
    }),

    // 2nd from inner
    new Platform({
      // n
      centerX: 800,
      height: platformBreadth,
      south: 500 + platformBreadth + hallHeightSmall,
      width: 100 + platformBreadth * 4 + hallHeightMedium * 2,
    }),
    new Platform({
      // e
      centerY: 450,
      width: platformBreadth,
      west: 850 + platformBreadth + hallHeightMedium,
      height: 100 + platformBreadth * 4 + hallHeightSmall * 2,
    }),
    new Platform({
      // s
      centerX: 800,
      height: platformBreadth,
      north: 500 + platformBreadth + hallHeightSmall,
      width: 100 + platformBreadth * 4 + hallHeightMedium * 2,
    }),
    new Platform({
      // w
      centerY: 450,
      east: 850 + platformBreadth + hallHeightMedium,
      width: platformBreadth,
      height: 100 + platformBreadth * 4 + hallHeightSmall * 2,
    }),

    // 2nd from outer
    new Platform({
      // n
      centerX: 800,
      height: platformBreadth,
      south: 500 + 2 * (platformBreadth + hallHeightSmall),
      width: 100 + platformBreadth * 6 + hallHeightMedium * 4,
    }),
    new Platform({
      // e
      centerY: 450,
      width: platformBreadth,
      west: 850 + 2 * (platformBreadth + hallHeightMedium),
      height: 100 + platformBreadth * 6 + hallHeightSmall * 4,
    }),
    new Platform({
      // s
      centerX: 800,
      height: platformBreadth,
      north: 500 + 2 * (platformBreadth + hallHeightSmall),
      width: 100 + platformBreadth * 6 + hallHeightMedium * 4,
    }),
    new Platform({
      // w
      centerY: 450,
      east: 850 + 2 * (platformBreadth + hallHeightMedium),
      width: platformBreadth,
      height: 100 + platformBreadth * 6 + hallHeightSmall * 4,
    }),

    // outer
    new Platform({
      // n
      centerX: 800,
      height: platformBreadth,
      north: 0,
      width: 100 + platformBreadth * 8 + hallHeightMedium * 6,
    }),
    new Platform({
      // e
      centerY: 450,
      width: platformBreadth,
      west: 850 + 3 * (platformBreadth + hallHeightMedium),
      height: 100 + platformBreadth * 8 + hallHeightSmall * 6,
    }),
    new Platform({
      // s
      centerX: 800,
      height: platformBreadth,
      south: 0,
      width: 100 + platformBreadth * 8 + hallHeightMedium * 6,
    }),
    new Platform({
      // wn
      north: 0,
      east: 850 + 3 * (platformBreadth + hallHeightMedium),
      width: platformBreadth,
      height: 150,
    }),
    new Platform({
      // ws
      north: 200,
      east: 850 + 3 * (platformBreadth + hallHeightMedium),
      width: platformBreadth,
      height: 700,
    }),
    new GravitySwitch({
      centerX: 150,
      gravityDirection: 'east',
      south: 25,
    })
  ],
});

export default level;
