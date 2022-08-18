import Button from '../classes/Button';
import Door from '../classes/Door';
import GravitySwitch from '../classes/GravitySwitch';
import Level from '../classes/Level';
import Platform from '../classes/Platform';
import Spikes from '../classes/Spikes';
import { cardinalDirections } from '../constants/enums';
import * as numbers from '../constants/numbers';

const swPlatformSpikes = 164 + numbers.spikeHeight; // 164 is max jump? TODO: don't understand math

const level5 = (game) =>
  new Level({
    buttons: [
      new Button({ action: game.stop, east: 0, north: 0, text: 'STOP' }),
    ],
    elements: [
      new Door({
        // action: () => console.log('LEVEL 4'),
        centerX: 1500,
        south: 0,
      }),
      new GravitySwitch({ // nw
        gravityDirection: cardinalDirections.south,
        north: 25,
        centerX: 50,
      }),
      new GravitySwitch({ // ne
        gravityDirection: cardinalDirections.west,
        east: 150,
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
        centerY: 250,
      }),
      new GravitySwitch({ // sw
        gravityDirection: cardinalDirections.north,
        south: 25,
        west: 200,
      }),
      new Platform({ // nw
        height: 520 + numbers.characterWidth,
        north: numbers.characterWidth,
        west: 200,
        width: numbers.platformBreadth,
      }),
      new Platform({ // door room
        height: 200,
        south: 0,
        east: 200,
        width: numbers.platformBreadth,
      }),
      new Platform({ // door roof
        height: numbers.platformBreadth,
        south: 200,
        east: numbers.characterWidth,
        width: 200 - numbers.characterWidth + numbers.platformBreadth,
      }),
      new Platform({ // door roof
        height: 100,
        south: 200,
        east: numbers.characterWidth,
        width: numbers.platformBreadth,
      }),
      new Platform({ // south pole
        height: swPlatformSpikes + numbers.spikeHeight,
        south: 0,
        west: 900,
        width: numbers.platformBreadth,
      }),
      new Platform({ // center nw
        height: numbers.platformBreadth,
        south: swPlatformSpikes + numbers.spikeHeight + numbers.hallHeightMedium,
        west: 200,
        width: 400,
      }),
      new Platform({ // center ne
        height: numbers.platformBreadth,
        south: swPlatformSpikes + numbers.spikeHeight + numbers.hallHeightLarge + numbers.platformBreadth,
        west: 900,
        width: 400,
      }),
      new Platform({ // center se
        height: numbers.platformBreadth,
        south: swPlatformSpikes + numbers.spikeHeight,
        west: 900,
        width: 200,
      }),
      new Platform({ // south with spikes
        height: numbers.platformBreadth,
        south: swPlatformSpikes + numbers.spikeHeight,
        west: 200,
        width: 500,
      }),
      new Spikes({ // south on spikes
        south: 0,
        west: 300,
        width: 400,
      }),
      new Spikes({ // south center
        direction: cardinalDirections.south,
        south: swPlatformSpikes,
        west: 400,
        width: 100,
      }),
    ],
    game,
  });

export default level5;
