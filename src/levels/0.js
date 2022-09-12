import Button from '../classes/Button';
import Level from '../classes/Level';
import game from '../classes/Game';
import spriteController from '../classes/SpriteController';

import nextLevel from './1';
import loadingScreen from './loading';

import * as numbers from '../constants/numbers';
import GravitySwitch from '../classes/GravitySwitch';

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
    elements: [
      new GravitySwitch({ // nnw
        x: 25,
        y: 125,
        gravityDirection: 'south',
      }),
      new GravitySwitch({ // nnw
        centerX: 775,
        y: 25,
        gravityDirection: 'east',
      }),
      new GravitySwitch({ // nne
        centerX: 825,
        y: 125,
        gravityDirection: 'west',
      }),
      new GravitySwitch({ // ne
        east: 25,
        y: 25,
        gravityDirection: 'south',
      }),
      new GravitySwitch({ // sw
        x: 25,
        south: 25,
        gravityDirection: 'east',
      }),
      new GravitySwitch({ // s
        centerX: 800,
        south: 75,
        gravityDirection: 'north',
      }),
      new GravitySwitch({ // s
        east: 50,
        south: 25,
        gravityDirection: 'west',
      }),
    ],
    isCharacterControllable: false,
  });

export default mainMenu;
