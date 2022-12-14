import Button from '../classes/Button';
import Level from '../classes/controllers/Level';
import game from '../classes/controllers/Game';
import spriteController from '../classes/controllers/SpriteController';

import level1 from './1';
import allLevels from './allLevels';
import levelSelect from './levelSelect';
import loadingScreen from './loading';

import * as numbers from '../constants/numbers';
import GravitySwitchAbsolute from '../classes/GravitySwitchAbsolute';
import { gravityGirlMaxLevel } from '../constants/strings';
import { parseLocalStorage } from '../utils/gameUtils';

const mainMenu = new Level({
  characterStartX: 50,
  characterStartY: 200,
  isCharacterControllable: false,
  
  buttons: [
    new Button({
      // Start
      east: 1000,
      centerY: numbers.canvasHeight / 2,
      action: () => {
        if (spriteController.sprite) {
          game.changeLevels(level1);
        } else {
          game.changeLevels(loadingScreen);
        }
      },
      text: 'Start New Game',
    }),
    new Button({
      // continue
      centerX: 800,
      centerY: numbers.canvasHeight / 2,
      action: () => {
        const level = allLevels.find((it) => it.order === parseLocalStorage());
        game.changeLevels(level);
      },
      text: 'Continue',
    }),
    new Button({
      // level select
      west: 1000,
      centerY: numbers.canvasHeight / 2,
      action: () => {
        game.changeLevels(levelSelect);
      },
      text: 'Level Select',
    }),
  ],
  elements: [
    new GravitySwitchAbsolute({
      // nnw
      x: 50,
      y: 50,
      gravityDirection: 'south',
    }),
    new GravitySwitchAbsolute({
      // nne
      west: 800,
      y: 50,
      gravityDirection: 'east',
    }),
    new GravitySwitchAbsolute({
      // nnw
      east: 800,
      y: 50,
      gravityDirection: 'west',
    }),
    new GravitySwitchAbsolute({
      // ne
      east: 50,
      y: 50,
      gravityDirection: 'south',
    }),
    new GravitySwitchAbsolute({
      // sw
      x: 50,
      south: 50,
      gravityDirection: 'east',
    }),
    new GravitySwitchAbsolute({
      // s
      centerX: 800,
      south: 50,
      gravityDirection: 'north',
    }),
    new GravitySwitchAbsolute({
      // s
      east: 50,
      south: 50,
      gravityDirection: 'west',
    }),
  ],
});

export default mainMenu;
