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
    name: 'Start Screen',
    characterStartX: 50,
    characterStartY: 200,
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
        x: 50,
        y: 50,
        gravityDirection: 'south',
      }),
      new GravitySwitch({ // nne
        west: 800,
        y: 50,
        gravityDirection: 'east',
      }),
      new GravitySwitch({ // nnw
        east: 800,
        y: 50,
        gravityDirection: 'west',
      }),
      new GravitySwitch({ // ne
        east: 50,
        y: 50,
        gravityDirection: 'south',
      }),
      new GravitySwitch({ // sw
        x: 50,
        south: 50,
        gravityDirection: 'east',
      }),
      new GravitySwitch({ // s
        centerX: 800,
        south: 50,
        gravityDirection: 'north',
      }),
      new GravitySwitch({ // s
        east: 50,
        south: 50,
        gravityDirection: 'west',
      }),
    ],
    isCharacterControllable: false,
  });

export default mainMenu;
