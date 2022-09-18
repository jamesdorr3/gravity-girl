import Button from '../classes/Button';
import Level from '../classes/Level';
import game from '../classes/Game';
import spriteController from '../classes/SpriteController';

import level1 from './1';
import allLevels from './allLevels';
import levelSelect from './levelSelect';
import loadingScreen from './loading';

import * as numbers from '../constants/numbers';
import GravitySwitch from '../classes/GravitySwitch';

const mainMenu = new Level({
  name: 'Start Screen',
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
        const levelName = localStorage.getItem('gravityGirlLevel');
        const level = allLevels.find((it) => it.name === levelName);
        if (level) game.changeLevels(level);
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
    new GravitySwitch({
      // nnw
      x: 50,
      y: 50,
      gravityDirection: 'south',
    }),
    new GravitySwitch({
      // nne
      west: 800,
      y: 50,
      gravityDirection: 'east',
    }),
    new GravitySwitch({
      // nnw
      east: 800,
      y: 50,
      gravityDirection: 'west',
    }),
    new GravitySwitch({
      // ne
      east: 50,
      y: 50,
      gravityDirection: 'south',
    }),
    new GravitySwitch({
      // sw
      x: 50,
      south: 50,
      gravityDirection: 'east',
    }),
    new GravitySwitch({
      // s
      centerX: 800,
      south: 50,
      gravityDirection: 'north',
    }),
    new GravitySwitch({
      // s
      east: 50,
      south: 50,
      gravityDirection: 'west',
    }),
  ],
});

export default mainMenu;
