import Door from '../classes/Door';
import GravitySwitch from '../classes/GravitySwitch';
import Level from '../classes/Level';
import Platform from '../classes/Platform';
import * as numbers from '../constants/numbers';

const testingScreen = () =>
  new Level({
    characterStartY: 150,
    elements: [
      new GravitySwitch({
        gravityDirection: 'north',
        south: 100,
        west: 200,
      }),
      new GravitySwitch({
        gravityDirection: 'north',
        south: 100,
        east: 200,
      }),
      new GravitySwitch({
        gravityDirection: 'south',
        north: 100,
        west: 200,
      }),
      new GravitySwitch({
        gravityDirection: 'south',
        north: 100,
        east: 200,
      }),
      new GravitySwitch({
        gravityDirection: 'west',
        north: 200,
        east: 100,
      }),
      new GravitySwitch({
        gravityDirection: 'west',
        south: 200,
        east: 100,
      }),
      new GravitySwitch({
        gravityDirection: 'east',
        north: 200,
        west: 100,
      }),
      new GravitySwitch({
        gravityDirection: 'east',
        south: 200,
        west: 100,
      }),
    ],
  });

export default testingScreen;
