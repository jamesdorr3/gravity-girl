import Door from '../classes/Door';
import GravitySwitch from '../classes/GravitySwitch';
import Level from '../classes/Level';
import Platform from '../classes/Platform';
import Slope from '../classes/Slope';
import * as numbers from '../constants/numbers';

const testingScreen = () =>
  new Level({
    characterStartY: 150,
    elements: [
      new Slope(0, 450, 800, 0, 0, 0, 'red'),
      new Slope(0, 450, 800, 900, 0, 900, 'orange'),
      new Slope(800, 0, 1600, 450, 1600, 0, 'yellow'),
      new Slope(800, 900, 1600, 450, 1600, 900, 'green'),
    ],
  });

export default testingScreen;