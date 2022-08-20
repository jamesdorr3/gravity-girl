import Level from '../classes/Level';
import Text from '../classes/Text';

import * as numbers from '../constants/numbers';

const loadingScreen = (game) =>
  new Level({
    buttons: [
      new Text(
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

export default loadingScreen;
