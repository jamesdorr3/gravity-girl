import Door from '../classes/Door';
import GravitySwitch from '../classes/GravitySwitch';
import Level from '../classes/Level';
import Platform from '../classes/Platform';
import Slope from '../classes/Slope';
import Spikes from '../classes/Spikes';

import nextLevel from './6';

import { cardinalDirections } from '../constants/enums';

import * as numbers from '../constants/numbers';

const middleGravitySwitches = () => {
  const gravitySwitches = [];
  for (let y = 0; y < numbers.canvasHeight; y += numbers.characterHeight + 4) {
    gravitySwitches.push(
      new GravitySwitch({ gravityDirection: 'west', east: 805, y }),
      new GravitySwitch({ gravityDirection: 'east', west: 805, y }),
    )
  }
  return gravitySwitches;
};

const level5 = () =>
  new Level({
    name: 'NEWS',
    elements: [

      new Slope(100, 900, 600, 400, 600, 900),

      new Platform({
        height: 700,
        south: 0,
        width: 195,
        x: 600,
      }),

      ...middleGravitySwitches(),

      new GravitySwitch({
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

      new GravitySwitch({
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

      new GravitySwitch({
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

      new GravitySwitch({
        gravityDirection: 'east',
        centerX: 1200,
        centerY: 850,
      }),

      new GravitySwitch({
        gravityDirection: 'west',
        south: 100,
        east: 25,
      }),

      new GravitySwitch({
        gravityDirection: 'east',
        south: 200,
        east: 75,
      }),

      new GravitySwitch({
        gravityDirection: 'west',
        south: 300,
        east: 25,
      }),

      new GravitySwitch({
        gravityDirection: 'east',
        south: 400,
        east: 75,
      }),

      new GravitySwitch({
        gravityDirection: 'west',
        south: 500,
        east: 25,
      }),

      new GravitySwitch({
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
