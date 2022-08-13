import Button from '../classes/Button';
import Door from '../classes/Door';
import Level from '../classes/Level';
import Platform from '../classes/Platform';
import level5 from './5';
import * as numbers from '../constants/numbers';

export default (game) =>
  new Level({
    buttons: [
      new Button({ action: game.stop, east: 0, north: 1, text: 'STOP' }),
    ],
    doors: [
      new Door({
        action: () => game.changeLevels(level5),
        east: 0,
        north: 100,
      }),
    ],
    platforms: [
      new Platform({ // top rightest;
        height: 50,
        north: 250,
        west: 1200,
        width: 100,
      }),
      new Platform({ // top right;
        height: 50,
        north: 250,
        west: 900,
        width: 100,
      }),
      new Platform({ // top middle;
        height: 50,
        north: 300,
        west: 600,
        width: 100,
      }),
      // new Platform({ // top left;
      //   height: 50,
      //   north: 250,
      //   west: 300,
      //   width: 100,
      // }),
      new Platform({ // second from bottom;
        height: 50,
        north: 500,
        west: 200,
        width: 150,
      }),
      new Platform({ // bottom;
        height: 50,
        north: 700,
        west: 500,
        width: 200,
      }),
    ],
    frameLength: numbers.frameLength,
    game,
  });
