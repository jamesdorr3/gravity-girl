import Button from '../classes/Button';
import Level from '../classes/Level';
import level1 from './1';
import * as numbers from '../constants/numbers';

export default new Level({
  buttons: [
    Button.create(
      {
        centerX: numbers.canvasWidth / 2,
        centerY: numbers.canvasHeight / 2,
      },
      0,
      0,
      'Start Game',
      () => console.log('here!')
    ),
  ],
  frameLength: numbers.frameLengthMenu,
});
