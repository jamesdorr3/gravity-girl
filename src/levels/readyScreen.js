import Text from '../classes/Text';
import Level from '../classes/Level';
import * as numbers from '../constants/numbers';

const readyScreen = (game) =>
  new Level({
    buttons: [
      new Text(
        {
          centerX: numbers.canvasWidth / 2,
          centerY: numbers.canvasHeight / 2,
          text: `Level ${Level.count / 2}`,
        },
      )
    ],
    frameLength: numbers.frameLengthMenu,
    game,
    hasCharacter: false
  });

export default readyScreen;
