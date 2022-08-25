import Level from '../classes/Level';
import Text from '../classes/Text';

import * as numbers from '../constants/numbers';

const loadingScreen = (game) =>
  new Level({
    buttons: [
      new Text({text: 'Loading...'})
    ],
    game,
  });

export default loadingScreen;
