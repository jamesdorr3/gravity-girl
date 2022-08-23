import Door from '../classes/Door';
import GravitySwitch from '../classes/GravitySwitch';
import Level from '../classes/Level';
import Platform from '../classes/Platform';
import Spikes from '../classes/Spikes';

import level0 from './0';

import { cardinalDirections } from '../constants/enums';

import * as numbers from '../constants/numbers';

const swPlatformSpikes = 155 + numbers.spikeHeight; // 156 is max jump? TODO: don't understand math

const level5 = (game) =>
  new Level({
    elements: [
      new GravitySwitch({ // nw
        gravityDirection: cardinalDirections.south,
        centerX: 150,
        north: 25,
      }),
      new GravitySwitch({ // sw
        gravityDirection: cardinalDirections.north,
        centerX: 100,
        south: 200,
      }),
      new Platform({ // sw
        height: numbers.platformBreadth,
        south: 250,
        west: 200,
        width: 200,
      }),
      new Platform({ // csw
        height: numbers.platformBreadth,
        south: 450,
        west: 500,
        width: 100,
      }),
      new Platform({ // cs
        height: numbers.platformBreadth,
        south: 350,
        west: 700,
        width: 100,
      }),
      new Platform({ // cse
        height: numbers.platformBreadth,
        south: 450,
        west: 900,
        width: 100,
      }),
      new Platform({ // se
        height: numbers.platformBreadth,
        south: 350,
        west: 1100,
        width: 100,
      }),
      // new Spikes({ // south on ground
      //   south: 0,
      //   west: 300,
      //   width: 600,
      // }),
    ],
    game,
    name: 'NEWS',
  });

export default level5;
