import Text from '../classes/Text';
import Level from '../classes/Level';
import * as numbers from '../constants/numbers';

const readyScreen = (game) =>
  new Level({
    frameLength: numbers.frameLengthMenu,
    game,
    hasCharacter: false,
    texts: [
      new Text(
        {
          centerX: numbers.canvasWidth / 2,
          centerY: numbers.canvasHeight / 2,
          text: game.level.name || `Level ${Level.count / 2}`,
        },
      )
    ]
  });

export default readyScreen;
