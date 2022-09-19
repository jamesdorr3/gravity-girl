import Door from '../classes/Door';
import GravitySwitch from '../classes/GravitySwitch';
import Level from '../classes/Level';
import Platform from '../classes/Platform';

import nextLevel from './theEnd';

import {
  canvasHeight,
  hallHeightMedium,
  hallHeightTiny,
  platformBreadth,
  widthGap,
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
      south: 500 + platformBreadth + hallHeightTiny,
      width: 100 + platformBreadth * 4 + hallHeightMedium * 2,
    }),
    new Platform({
      // e
      centerY: 450,
      width: platformBreadth,
      west: 850 + platformBreadth + hallHeightMedium,
      height: 100 + platformBreadth * 4 + hallHeightTiny * 2,
    }),
    new Platform({
      // s
      centerX: 800,
      height: platformBreadth,
      north: 500 + platformBreadth + hallHeightTiny,
      width: 100 + platformBreadth * 4 + hallHeightMedium * 2,
    }),
    new Platform({
      // w
      centerY: 450,
      east: 850 + platformBreadth + hallHeightMedium,
      width: platformBreadth,
      height: 100 + platformBreadth * 4 + hallHeightTiny * 2,
    }),

    // 2nd from outer
    new Platform({
      // n
      centerX: 800,
      height: platformBreadth,
      south: 500 + 2 * (platformBreadth + hallHeightTiny),
      width: 100 + platformBreadth * 6 + hallHeightMedium * 4,
    }),
    new Platform({
      // e
      centerY: 450,
      width: platformBreadth,
      west: 850 + 2 * (platformBreadth + hallHeightMedium),
      height: 100 + platformBreadth * 6 + hallHeightTiny * 4,
    }),
    new Platform({
      // s
      centerX: 800,
      height: platformBreadth,
      north: 500 + 2 * (platformBreadth + hallHeightTiny),
      width: 100 + platformBreadth * 6 + hallHeightMedium * 4,
    }),
    new Platform({
      // w
      centerY: 450,
      east: 850 + 2 * (platformBreadth + hallHeightMedium),
      width: platformBreadth,
      height: 100 + platformBreadth * 6 + hallHeightTiny * 4,
    }),
    new GravitySwitch({
      gravityDirection: 'south',
      x: 700,
      y: 50,
    }),

    // outer
    new Platform({
      // n
      centerX: 800,
      height: platformBreadth,
      south: 500 + 3 * (platformBreadth + hallHeightTiny),
      width: 100 + platformBreadth * 8 + hallHeightMedium * 6,
    }),
    new Platform({
      // e
      centerY: 450,
      width: platformBreadth,
      west: 850 + 3 * (platformBreadth + hallHeightMedium),
      height: 100 + platformBreadth * 8 + hallHeightTiny * 6,
    }),
    new Platform({
      // s
      centerX: 800,
      height: platformBreadth,
      north: 500 + 3 * (platformBreadth + hallHeightTiny),
      width: 100 + platformBreadth * 8 + hallHeightMedium * 6,
    }),
    new Platform({
      // w
      centerY: 450,
      width: platformBreadth,
      east: 850 + 3 * (platformBreadth + hallHeightMedium),
      height: 100 + platformBreadth * 8 + hallHeightTiny * 6,
    }),

    // edges
    new Platform({
      // en
      y: 0,
      width: platformBreadth,
      west: 850 + 4 * (platformBreadth + hallHeightMedium),
      height: ( canvasHeight - widthGap) / 2,
    }),
    new Platform({
      // es
      south: 0,
      width: platformBreadth,
      west: 850 + 4 * (platformBreadth + hallHeightMedium),
      height: ( canvasHeight - widthGap) / 2,
    }),
    new Platform({
      // wn
      y: 0,
      width: platformBreadth,
      east: 850 + 4 * (platformBreadth + hallHeightMedium),
      height: ( canvasHeight - widthGap) / 2,
    }),
    new Platform({
      // ws
      south: 0,
      width: platformBreadth,
      east: 850 + 4 * (platformBreadth + hallHeightMedium),
      height: ( canvasHeight - widthGap) / 2,
    }),
    new GravitySwitch({
      centerX: 50,
      gravityDirection: 'east',
      south: 125,
    }),
  ],
});

export default level;
