import Door from '../classes/Door';
import GravitySwitch from '../classes/GravitySwitch';
import Level from '../classes/Level';
import Platform from '../classes/Platform';
import Spikes from '../classes/Spikes';

import nextLevel from './5';

import { cardinalDirections } from '../constants/enums';

import {
  characterWidth,
  hallHeightMedium,
  hallHeightSmall,
  platformBreadth,
  spikeHeight,
} from '../constants/numbers';

const swPlatformSpikes = 155 + spikeHeight; // 156 is max jump? TODO: don't understand math

const level4 = 
  new Level({
    order: 4,
    name: 'NEWS',
    elements: [
      new Door({
        centerX: 1500,
        nextLevel,
        south: 0,
      }),
      new GravitySwitch({ // nw
        gravityDirection: cardinalDirections.south,
        north: 25,
        centerX: 50,
      }),
      new GravitySwitch({ // ne
        gravityDirection: cardinalDirections.west,
        east: 200,
        north: 25,
      }),
      new GravitySwitch({ // cw
        gravityDirection: cardinalDirections.south,
        centerY: 550,
        west: 250,
      }),
      new GravitySwitch({ // ce
        gravityDirection: cardinalDirections.east,
        centerX: 1100,
        centerY: 175,
      }),
      new GravitySwitch({ // sw
        gravityDirection: cardinalDirections.north,
        south: 25,
        west: 200,
      }),
      new Platform({ // nw
        height: 550 + characterWidth,
        north: characterWidth,
        west: 200,
        width: platformBreadth,
      }),
      new Platform({ // door room
        height: 300,
        south: 250,
        east: 200,
        width: platformBreadth,
      }),
      new Platform({ // south block
        height: swPlatformSpikes + spikeHeight + platformBreadth,
        south: 0,
        west: 900,
        width: 500,
      }),
      new Platform({ // center nw
        height: platformBreadth,
        south: swPlatformSpikes + spikeHeight + hallHeightMedium,
        west: 200,
        width: 300,
      }),
      new Platform({ // center ne
        height: platformBreadth,
        south: swPlatformSpikes + spikeHeight + hallHeightMedium,
        east: characterWidth,
        width: 925,
      }),
      new Platform({ // ne block large
        height: hallHeightMedium,
        south: swPlatformSpikes + spikeHeight + hallHeightMedium,
        east: 200,
        width: 600,
      }),
      new Platform({ // ne block med
        height: hallHeightSmall,
        south: swPlatformSpikes + spikeHeight + hallHeightMedium * 2,
        east: 300,
        width: 400,
      }),
      new Platform({ // south with spikes
        height: platformBreadth,
        south: swPlatformSpikes + spikeHeight,
        west: 200,
        width: 500,
      }),
      new Spikes({ // on platform
        direction: cardinalDirections.south,
        south: swPlatformSpikes,
        west: 400,
        width: 100,
      }),
      new Spikes({ // south on ground
        south: 0,
        west: 300,
        width: 600,
      }),
    ],
  });

export default level4;
