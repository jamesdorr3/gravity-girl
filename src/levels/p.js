import Door from '../classes/Door';
import GravitySwitchStatic from '../classes/GravitySwitchStatic';
import Level from '../classes/Level';
import Platform from '../classes/Platform';
import Spikes from '../classes/Spikes';

import nextLevel from './2';

import * as enums from '../constants/enums';
import * as numbers from '../constants/numbers';

const makeGravitySwitches = () => {
  const switches = [];
  for (let i = 0; i < 7; i++) {
    switches.push(
      new GravitySwitchStatic({
        north: 100,
        west: i * 100 + 400,
        gravityDirection: i < 4 ? 'east' : 'south',
      }),
      new GravitySwitchStatic({
        north: 200,
        west: i * 100 + 400,
        gravityDirection: i < 4 ? 'east' : 'south',
      }),
      new GravitySwitchStatic({
        north: 300,
        west: i * 100 + 400,
        gravityDirection: i < 4 ? 'east' : 'south',
      }),
      new GravitySwitchStatic({
        south: 300,
        west: i * 100 + 400,
        gravityDirection: i < 4 ? 'north' : 'west',
      }),
      new GravitySwitchStatic({
        south: 200,
        west: i * 100 + 400,
        gravityDirection: i < 4 ? 'north' : 'west',
      }),
      new GravitySwitchStatic({
        south: 400,
        west: i * 100 + 400,
        gravityDirection: i < 4 ? 'north' : 'west',
      })
    );
  }
  return switches;
};

const playAround1 =
  new Level({
    elements: [
      ...makeGravitySwitches(),
      // new Spikes({
      //   north: 0,
      //   west: 0,
      //   width: 1200,
      //   direction: 'south',
      // }),
      // new Spikes({
      //   south: 0,
      //   east: 0,
      //   width: 1200,
      //   direction: 'north',
      // }),
    ],
  });

export default playAround1;
