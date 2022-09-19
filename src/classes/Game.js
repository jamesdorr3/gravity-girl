import Blackout from './Blackout';
import Button from './Button';
import Level from './Level';
import character from './Character';
import spriteController from './SpriteController';
import Text from './Text';

import devLevel from '../levels/0'; // change number for start level
import keyboard from './Keyboard';
import loadingScreen from '../levels/loading';

import * as enums from '../constants/enums';
import * as gameUtils from '../utils/gameUtils';
import * as numbers from '../constants/numbers';
import sfx from './SFX';

class Game {
  constructor() {
    this.context = null;
    this.lastRender = new Date();
    this.level = null;
    this.interval = null;

    this.overlaidButtons = [
      // new Button({ action: this.stop, east: 0, north: 0, text: 'STOP' }),
    ];
    this.overlaidElements = [];
  }

  changeLevels = (newLevel) => {
    const text = new Text({ text: '' });
    this.overlaidElements.push(text);
    this.overlaidElements.push(
      new Blackout({
        direction: 'north',
        doOnce: () => {
          this.level = newLevel;
          character.reset({
            isControllable: false,
            x: this.level.characterStartX,
            y: this.level.characterStartY,
          })
          if (newLevel.name) text.text = this.level.name || `Level ${Level.count / 2}`;
          character.isAnimated = false;
        },
        doLast: () => {
          setTimeout(() => {
            character.isAnimated = true;
            keyboard.setIsControllable(newLevel.isCharacterControllable);
            this.overlaidElements.pop();
          }, numbers.readyScreenTime);
        },
      })
    );
  };

  createInterval = () =>
    setInterval(() => {
      if (spriteController.sprite) {
        this.level.intervalAction();
        const overlays = [...this.overlaidElements, ...this.overlaidButtons];
        overlays.forEach((it) => it.update(this.context));
      } else {
        loadingScreen.intervalAction();
      }
    }, numbers.frameLength);

  death = () => {
    sfx.play('death');
    character.isAnimated = false;
    keyboard.setIsControllable(false);
    character.deathCount++;
    this.overlaidElements.push(new Blackout({
      doOnce: () => {
        character.reset({
          isControllable: false,
          x: this.level.characterStartX,
          y: this.level.characterStartY,
        })
      },
      doLast: () => keyboard.setIsControllable(true),
    }));
  };

  delete = () => delete this;

  frameLength = () =>
    ((new Date() - this.lastRender) / numbers.second) * numbers.gameSpeed;

  handleClick = (x, y) => {
    const buttons = [...this.level.buttons, ...this.overlaidButtons];
    const button = buttons.find((button) =>
      button.collidesWith(gameUtils.mouse({ x, y }))
    );
    if (button) {
      button.state = enums.buttonStates.clicked;
      button.action();
    }
  };

  handleHover = (x, y) => {
    if (!this.level) return;
    const buttons = [...this.level.buttons, ...this.overlaidButtons];
    const button = buttons.find((button) => {
      const hasCollision = button.collidesWith(gameUtils.mouse({ x, y }));
      if (!hasCollision && button.state === enums.buttonStates.hovered) {
        button.state = enums.buttonStates.default;
      }
      return hasCollision;
    });
    if (button) button.state = enums.buttonStates.hovered;
  };

  start = () => {
    this.level = devLevel; // DEV LEVEL
    character.reset({
      x: this.level.characterStartX,
      y :this.level.characterStartY
    });
    keyboard.setIsControllable(this.level.isCharacterControllable);
    this.interval = this.createInterval();
  };

  stop = () => {
    clearInterval(this.interval);
  };
}

export default new Game();
