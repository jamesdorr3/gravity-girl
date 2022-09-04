import Button from '../classes/Button';
import Level from '../classes/Level';
import game from '../classes/Game';
import spriteController from '../classes/SpriteController';

import nextLevel from './1';
import loadingScreen from './loading';

import * as numbers from '../constants/numbers';

const mainMenu = () =>
  new Level({
    buttons: [
      new Button({
        centerX: numbers.canvasWidth / 2,
        centerY: numbers.canvasHeight / 2,
        action: () => {
          if (spriteController.sprite) {
            game.changeLevels(nextLevel);
          } else {
            game.changeLevels(loadingScreen);
          }
        },
        text: 'Start Game',
      }),
    ],
    hasCharacter: false,
  });

export default mainMenu;
