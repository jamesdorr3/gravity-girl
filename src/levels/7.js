import Door from '../classes/Door';
import GravitySwitchStatic from '../classes/GravitySwitchStatic';
import Level from '../classes/Level';
import Platform from '../classes/Platform';

import nextLevel from './theEnd';

import {
  canvasHeight,
  characterHeight,
  hallHeightSmall,
  platformBreadth,
  widthGap,
} from '../constants/numbers';

const level = new Level({
  name: 'The Cube',
  characterStartX: 0,
  characterStartY: 800,
  elements: [
    // inner loop
    new GravitySwitchStatic({
      gravityDirection: 'east',
      centerX: 800,
      centerY: 450,
    }),
    new Platform({
      // door nw
      height: platformBreadth,
      south: 500,
      west: 750 - platformBreadth,
      width: 50 + platformBreadth - (1 / 2) * ( characterHeight + 10 ),
    }),
    new Platform({
      // door ne
      east: 750 - platformBreadth,
      height: platformBreadth,
      south: 500,
      width: 50 + platformBreadth - (1 / 2) * ( characterHeight + 10 ),
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
      width: 50 + platformBreadth - (1 / 2) * ( characterHeight + 10 ),
    }),
    new Platform({
      // door se
      east: 750 - platformBreadth,
      height: platformBreadth,
      north: 500,
      width: 50 + platformBreadth - (1 / 2) * ( characterHeight + 10 ),
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
      width: 100 + platformBreadth * 4 + characterHeight * 2 * 2,
    }),
    new Platform({
      // e
      centerY: 450,
      width: platformBreadth,
      west: 850 + platformBreadth + characterHeight * 2,
      height: 100 + platformBreadth * 2,
    }),
    new Platform({
      // s
      centerX: 800,
      height: platformBreadth,
      north: 500 + platformBreadth + hallHeightSmall,
      width: 100 + platformBreadth * 4 + characterHeight * 2 * 2,
    }),
    new Platform({
      // w
      centerY: 450,
      east: 850 + platformBreadth + characterHeight * 2,
      width: platformBreadth,
      height: 100 + platformBreadth * 2,
    }),

    // 2nd from outer
    new Platform({
      // n
      centerX: 800,
      height: platformBreadth,
      south: 500 + 2 * (platformBreadth + hallHeightSmall),
      width: 100 + platformBreadth * 8 + characterHeight * 2 * 2,
    }),
    new Platform({
      // e
      centerY: 450,
      width: platformBreadth,
      west: 850 + 2 * (platformBreadth + characterHeight * 2),
      height: 100 + platformBreadth * 8 + hallHeightSmall * 2,
    }),
    new Platform({
      // s
      centerX: 800,
      height: platformBreadth,
      north: 500 + 2 * (platformBreadth + hallHeightSmall),
      width: 100 + platformBreadth * 8 + characterHeight * 2 * 2,
    }),
    new Platform({
      // w
      centerY: 450,
      east: 850 + 2 * (platformBreadth + characterHeight * 2),
      width: platformBreadth,
      height: 100 + platformBreadth * 8 + hallHeightSmall * 2,
    }),

    // outer
    new GravitySwitchStatic({
      gravityDirection: 'north',
      centerX: 800,
      centerY: hallHeightSmall / 2 + platformBreadth,
    }),
    new Platform({
      // n
      centerX: 800,
      height: platformBreadth,
      south: 500 + 3 * (platformBreadth + hallHeightSmall),
      width: 100 + platformBreadth * 8 + characterHeight * 2 * 6,
    }),
    new Platform({
      // e
      centerY: 450,
      width: platformBreadth,
      west: 850 + 3 * (platformBreadth + characterHeight * 2),
      height: 100 + platformBreadth * 6 + hallHeightSmall * 4,
    }),
    new Platform({
      // s
      centerX: 800,
      height: platformBreadth,
      north: 500 + 3 * (platformBreadth + hallHeightSmall),
      width: 100 + platformBreadth * 8 + characterHeight * 2 * 6,
    }),
    new GravitySwitchStatic({
      gravityDirection: 'north',
      centerX: 800,
      centerY: canvasHeight - hallHeightSmall / 2 - platformBreadth,
    }),
    new Platform({
      // w
      centerY: 450,
      width: platformBreadth,
      east: 850 + 3 * (platformBreadth + characterHeight * 2),
      height: 100 + platformBreadth * 6 + hallHeightSmall * 4,
    }),

    // edges
    new Platform({
      // en
      y: 0,
      width: platformBreadth,
      west: 850 + 4 * (platformBreadth + characterHeight * 2),
      height: ( canvasHeight - widthGap) / 2,
    }),
    new Platform({
      // es
      south: 0,
      width: platformBreadth,
      west: 850 + 4 * (platformBreadth + characterHeight * 2),
      height: ( canvasHeight - widthGap) / 2,
    }),
    new Platform({
      // wn
      y: 0,
      width: platformBreadth,
      east: 850 + 4 * (platformBreadth + characterHeight * 2),
      height: ( canvasHeight - widthGap) / 2,
    }),
    new Platform({
      // ws
      south: 0,
      width: platformBreadth,
      east: 850 + 4 * (platformBreadth + characterHeight * 2),
      height: ( canvasHeight - widthGap) / 2,
    }),
    new GravitySwitchStatic({
      centerX: 50,
      gravityDirection: 'east',
      south: 125,
    }),
  ],
});

export default level;
