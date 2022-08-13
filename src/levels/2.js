import Button from '../classes/Button';
import Door from '../classes/Door';
import Level from '../classes/Level';
import Platform from '../classes/Platform';
import level3 from './3';
import * as numbers from '../constants/numbers';

export default (game) =>
  new Level({
    buttons: [
      new Button({ action: game.stop, east: 0, north: 1, text: 'STOP' }),
    ],
    doors: [
      new Door({
        action: () => game.changeLevels(level3),
        east: 0,
        south: 200,
      }),
    ],
    platforms: [
      new Platform({ // lower left
        height: 50,
        north: 700,
        west: 1,
        width: 300,
      }),
      new Platform({ // high middle
        height: 50,
        south: 350,
        west: 600,
        width: 300,
      }),
      new Platform({ // door
        height: 150,
        north: 550,
        east: 100,
        width: 50,
      }),
      new Platform({ // door
        height: 50,
        south: 150,
        east: 0,
        width: 150,
      }),
    ],
    frameLength: numbers.frameLength,
    game,
  });
