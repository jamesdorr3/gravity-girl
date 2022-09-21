import Door from '../classes/Door';
import GravitySwitchRelative from '../classes/GravitySwitchRelative';
import Level from '../classes/Level';
import Platform from '../classes/Platform';
import * as numbers from '../constants/numbers';

const testingScreen = 
  new Level({
    characterStartX: 0,
    characterStartY: 800,
    elements: [
      new GravitySwitchRelative({
        south: 25,
        west: 200,
      }),
      new GravitySwitchRelative({
        west: 25,
        south: 200,
        isClockwise: true,
      }),
      new Platform({
        west: 0,
        south: 300,
        height: 100,
        width: 300,
      }),
      new Platform({
        west: 300,
        south: 0,
        height: 300,
        width: 100,
      }),
      // new Slope(0, 450, 800, 0, 0, 0, 'red'),
      // new Slope(0, 450, 800, 900, 0, 900, 'orange'),
      // new Slope(800, 0, 1600, 450, 1600, 0, 'yellow'),
      // new Slope(800, 900, 1600, 450, 1600, 900, 'green'),
    ],
  });

export default testingScreen;