import Door from '../classes/Door';
import GravitySwitchAbsolute from '../classes/GravitySwitchAbsolute';
import Level from '../classes/controllers/Level';
import Platform from '../classes/Platform';
import Spikes from '../classes/Spikes';

import nextLevel from './6';

import { cardinalDirections } from '../constants/enums';

import * as numbers from '../constants/numbers';

const middleGravitySwitches = () => {
  const gravitySwitches = [];
  for (let y = 0; y < numbers.canvasHeight; y += numbers.characterHeight + 4) {
    gravitySwitches.push(
      new GravitySwitchAbsolute({ gravityDirection: 'west', east: 805, y }),
      new GravitySwitchAbsolute({ gravityDirection: 'east', west: 805, y }),
    )
  }
  return gravitySwitches;
};

const level5 = 
  new Level({
    order: 5,
    name: 'The Rift',
    elements: [

      new Platform({ // sw
        height: 125,
        south: 0,
        width: 100,
        x: 200,
      }),
      new Platform({ // sw2 medium
        height: 125 * 2,
        south: 0,
        width: 100,
        x: 300,
      }),
      new Platform({ // sw3 tall
        height: 125 * 3,
        south: 0,
        width: 100,
        x: 400,
      }),
      new Platform({ // sw4 tallest
        height: 125 * 4,
        south: 0,
        width: 100,
        x: 500,
      }),

      new Platform({
        height: 700,
        south: 0,
        width: 195,
        x: 600,
      }),

      ...middleGravitySwitches(),

      new GravitySwitchAbsolute({
        gravityDirection: 'east',
        centerX: 50,
        south: 500,
      }),

      new Platform({ // nw thin
        height: numbers.platformBreadth,
        south: 600,
        width: 400,
        x: 100,
      }),

      new Platform({ // nw fat
        height: numbers.hallHeightSmall,
        south: 600,
        width: 200,
        x: 100,
      }),

      new Platform({ // nw-most
        height: 200,
        south: 600,
        width: 100,
        x: 100,
      }),

      new Platform({ // cne
        height: 200,
        north: 0,
        width: numbers.platformBreadth,
        x: 1000,
      }),

      new GravitySwitchAbsolute({
        gravityDirection: 'west',
        centerX: 1100,
        centerY: 200,
      }),

      new Platform({ // cne 2
        height: 100,
        north: 300,
        width: numbers.platformBreadth,
        x: 1000,
      }),

      new Platform({ // ce
        height: 100,
        north: 500,
        width: numbers.platformBreadth,
        x: 1000,
      }),

      new Platform({ // cse
        height: 200,
        north: 700,
        width: numbers.platformBreadth,
        x: 1000,
      }),

      new GravitySwitchAbsolute({
        gravityDirection: 'west',
        centerX: 1100,
        centerY: 200,
      }),

      new Platform({
        north: 0,
        width: numbers.platformBreadth,
        height: 800,
        west: 1300,
      }),

      new Spikes({
        direction: 'west',
        east: 300,
        north: 0,
        height: 800,
      }),

      new Spikes({
        direction: 'east',
        west: 1300 + numbers.platformBreadth,
        north: 0,
        height: 800,
      }),

      new GravitySwitchAbsolute({
        gravityDirection: 'east',
        centerX: 1200,
        centerY: 850,
      }),

      new GravitySwitchAbsolute({
        gravityDirection: 'west',
        south: 100,
        east: 25,
      }),

      new GravitySwitchAbsolute({
        gravityDirection: 'east',
        south: 200,
        east: 75,
      }),

      new GravitySwitchAbsolute({
        gravityDirection: 'west',
        south: 300,
        east: 25,
      }),

      new GravitySwitchAbsolute({
        gravityDirection: 'east',
        south: 400,
        east: 75,
      }),

      new GravitySwitchAbsolute({
        gravityDirection: 'west',
        south: 500,
        east: 25,
      }),

      new GravitySwitchAbsolute({
        gravityDirection: 'east',
        south: 600,
        east: 75,
      }),

      new Door({
        north: 0,
        east: 0,
        nextLevel,
        isLandscape: true,
      })

      // new Spikes({
      //   direction: 'south',
      //   east: 0, 
      //   south: 0,
      //   width: 200
      // }),
    ],
  });

export default level5;
