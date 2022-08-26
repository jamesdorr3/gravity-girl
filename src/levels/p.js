import Door from '../classes/Door';
import GravitySwitch from '../classes/GravitySwitch';
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
      new GravitySwitch({
        north: 100,
        west: i * 100 + 400,
        gravityDirection: i < 4 ? 'east' : 'south',
      }),
      new GravitySwitch({
        north: 200,
        west: i * 100 + 400,
        gravityDirection: i < 4 ? 'east' : 'south',
      }),
      new GravitySwitch({
        north: 300,
        west: i * 100 + 400,
        gravityDirection: i < 4 ? 'east' : 'south',
      }),
      new GravitySwitch({
        south: 300,
        west: i * 100 + 400,
        gravityDirection: i < 4 ? 'north' : 'west',
      }),
      new GravitySwitch({
        south: 200,
        west: i * 100 + 400,
        gravityDirection: i < 4 ? 'north' : 'west',
      }),
      new GravitySwitch({
        south: 400,
        west: i * 100 + 400,
        gravityDirection: i < 4 ? 'north' : 'west',
      })
    );
  }
  return switches;
};

const playAround1 = (game) =>
  new Level({
    elements: [
      // new Door({
      //   north: 0,
      //   nextLevel,
      //   east: 0,
      // }),
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
    game,
    name: 'Where Am I?',
  });

export default playAround1;
