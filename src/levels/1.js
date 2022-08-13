import Button from '../classes/Button';
import Door from '../classes/Door';
import Level from '../classes/Level';
import Platform from '../classes/Platform';
import level2 from './2';
import * as numbers from '../constants/numbers';

export default (game) =>
  new Level({
    buttons: [
      new Button({ action: game.stop, east: 0, north: 1, text: 'STOP' }),
    ],
    doors: [
      new Door({
        action: () => game.changeLevels(level2),
        east: 0,
        south: 0,
      }),
    ],
    platforms: [
      new Platform({
        centerX: numbers.canvasWidth / 2,
        height: 50,
        north: 700,
        width: 300,
      }),
    ],
    frameLength: numbers.frameLength,
    game,
  });
