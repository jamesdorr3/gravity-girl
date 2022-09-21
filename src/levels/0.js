import Button from '../classes/Button';
import Level from '../classes/Level';
import game from '../classes/Game';
import spriteController from '../classes/SpriteController';

import level1 from './1';
import allLevels from './allLevels';
import levelSelect from './levelSelect';
import loadingScreen from './loading';

import * as numbers from '../constants/numbers';
import GravitySwitchStatic from '../classes/GravitySwitchStatic';
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
    new GravitySwitchStatic({
      // nnw
      x: 50,
      y: 50,
      gravityDirection: 'south',
    }),
    new GravitySwitchStatic({
      // nne
      west: 800,
      y: 50,
      gravityDirection: 'east',
    }),
    new GravitySwitchStatic({
      // nnw
      east: 800,
      y: 50,
      gravityDirection: 'west',
    }),
    new GravitySwitchStatic({
      // ne
      east: 50,
      y: 50,
      gravityDirection: 'south',
    }),
    new GravitySwitchStatic({
      // sw
      x: 50,
      south: 50,
      gravityDirection: 'east',
    }),
    new GravitySwitchStatic({
      // s
      centerX: 800,
      south: 50,
      gravityDirection: 'north',
    }),
    new GravitySwitchStatic({
      // s
      east: 50,
      south: 50,
      gravityDirection: 'west',
    }),
  ],
});

export default mainMenu;
