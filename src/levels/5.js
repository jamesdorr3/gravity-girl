import Door from '../classes/Door';
import GravitySwitch from '../classes/GravitySwitch';
import Level from '../classes/Level';
import Platform from '../classes/Platform';
import Spikes from '../classes/Spikes';

import nextLevel from './6';

import { cardinalDirections } from '../constants/enums';

import * as numbers from '../constants/numbers';

const middleGravitySwitches = () => {
  const gravitySwitches = [];
  for (let y = 0; y < numbers.canvasHeight; y += numbers.characterHeight + 4) {
    gravitySwitches.push(
      new GravitySwitch({ gravityDirection: 'west', east: 804, y }),
      new GravitySwitch({ gravityDirection: 'east', west: 804, y }),
    )
  }
  return gravitySwitches;
};

const level5 = (game) =>
  new Level({
    elements: [
      ...middleGravitySwitches(),
      new GravitySwitch({
        gravityDirection: 'east',
        centerX: 50,
        centerY: 350,
      }),
      new Platform({ // nw top
        height: 100,
        south: 700,
        west: 100,
        width: 100,
      }),
      new Platform({
        height: 100,
        south: 600,
        west: 100,
        width: 200,
      }),
      new Platform({
        height: numbers.platformBreadth,
        south: 600,
        west: 100,
        width: 300,
      }),
      new Platform({
        height: 100,
        south: 400,
        west: 500,
        width: 100,
      }),
      new Platform({
        height: 100,
        south: 300,
        west: 400,
        width: 200,
      }),
      new Platform({
        height: 100,
        south: 200,
        west: 300,
        width: 300,
      }),
      new Platform({ // sw bottom
        height: 100,
        south: 100,
        west: 200,
        width: 400,
      }),
      new Platform({
        height: numbers.platformBreadth,
        south: 100,
        west: 100,
        width: 500,
      })
    ],
    game,
    name: 'NEWS',
  });

export default level5;
