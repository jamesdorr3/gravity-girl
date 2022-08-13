import Button from '../classes/Button';
import Level from '../classes/Level';
import * as numbers from '../constants/numbers';

export default (game) =>
  new Level({
    buttons: [
      new Button(
        {
          centerX: numbers.canvasWidth / 2,
          centerY: numbers.canvasHeight / 2,
          text: 'Loading...',
        },
      )
    ],
    frameLength: numbers.frameLengthMenu,
    game,
  });
