import Door from '../classes/Door';
import GravitySwitchAbsolute from '../classes/GravitySwitchAbsolute';
import Level from '../classes/controllers/Level';
import Platform from '../classes/Platform';
import Spikes from '../classes/Spikes';

import nextLevel from './theEnd';

import { cardinalDirections } from '../constants/enums';

import * as numbers from '../constants/numbers';

const level = 
  new Level({
    order: 6,
    name: 'Blob',
    elements: [
      new Door({
        east: 0,
        nextLevel,
        north: 0,
      }),
      new GravitySwitchAbsolute({
        // ne to door w
        gravityDirection: cardinalDirections.west,
        east: 100,
        centerY: numbers.doorHeight / 2,
      }),
      new GravitySwitchAbsolute({
        // ne to door s
        gravityDirection: cardinalDirections.south,
        east: 0,
        north: numbers.doorHeight + numbers.platformBreadth,
      }),
      new GravitySwitchAbsolute({
        // nw
        gravityDirection: cardinalDirections.south,
        centerX: 150,
        north: 25,
      }),
      new GravitySwitchAbsolute({
        // cnw
        gravityDirection: cardinalDirections.east,
        centerX: 500,
        centerY: 300,
      }),
      new GravitySwitchAbsolute({
        // sw
        gravityDirection: cardinalDirections.north,
        centerX: 100,
        south: 200,
      }),
      new GravitySwitchAbsolute({
        // cw
        gravityDirection: cardinalDirections.south,
        centerX: 450,
        centerY: 450,
      }),
      new GravitySwitchAbsolute({
        // c
        gravityDirection: cardinalDirections.south,
        centerX: 650,
        south: 450,
        isDistractor: true,
      }),
      new GravitySwitchAbsolute({
        // cse
        gravityDirection: cardinalDirections.south,
        centerX: 850,
        south: 450,
        isDistractor: true,
      }),
      new GravitySwitchAbsolute({
        // cse
        gravityDirection: cardinalDirections.south,
        centerX: 1060,
        south: 450,
        isDistractor: true,
      }),
      new GravitySwitchAbsolute({
        // se
        gravityDirection: cardinalDirections.east,
        centerX: 1250,
        centerY: 750,
      }),
      new Platform({
        // nw
        height: 200,
        north: 0,
        west: 400,
        width: numbers.platformBreadth,
      }),
      new Platform({
        // sw
        height: numbers.platformBreadth,
        south: 250,
        west: 200,
        width: 200,
      }),
      new Platform({
        // csw
        height: numbers.platformBreadth,
        south: 450,
        west: 500,
        width: 100,
      }),
      new Platform({
        // cs
        height: numbers.platformBreadth,
        south: 350,
        west: 700,
        width: 100,
      }),
      new Platform({
        // cse
        height: numbers.platformBreadth,
        south: 450,
        west: 900,
        width: 100,
      }),
      new Platform({
        // se
        height: numbers.platformBreadth,
        south: 350,
        west: 1100,
        width: 100,
      }),
      new Platform({
        // cse 2
        height: numbers.platformBreadth,
        south: 400 - numbers.platformBreadth,
        west: 1300,
        width: 100,
      }),
      new Platform({ // protect door
        east: 0,
        height: numbers.platformBreadth,
        north: numbers.doorHeight,
        width: numbers.hallHeightLarge,
      }),
      new Platform({
        // se w spikes
        height: numbers.platformBreadth,
        north: 600,
        east: 100,
        width: 300,
      }),
      new Spikes({
        // se, on platform n
        north: 600 - numbers.spikeHeight,
        east: 100,
        width: 300,
      }),
      new Spikes({
        // se, on platform s
        direction: 'south',
        east: 100,
        north: 600 + numbers.platformBreadth,
        width: 300,
      }),
      new Platform({
        // s, has spikes
        height: 100,
        south: 0,
        west: 500,
        width: 600,
      }),
      new Spikes({
        // s, on platform
        south: 100,
        west: 500,
        width: 600,
      }),
      new Spikes({
        // se
        east: 0,
        south: 0,
        width: 500,
      }),
    ],
  });

export default level;
