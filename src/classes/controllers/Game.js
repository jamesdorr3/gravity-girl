import Blackout from '../Blackout';
import Button from '../Button';
import Level from './Level';
import character from '../Character';
import spriteController from './SpriteController';
import Text from '../Text';

import devLevel from '../../levels/t'; // change number for start level
import keyboard from './Keyboard';
import loadingScreen from '../../levels/loading';
import sfx from './SFX';

import { buttonStates } from '../../constants/enums';
import { frameLength, gameSpeed, readyScreenTime, second } from '../../constants/numbers';
import { mouse } from '../../utils/gameUtils';

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
          }, readyScreenTime);
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
    }, frameLength);

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
    ((new Date() - this.lastRender) / second) * gameSpeed;

  handleClick = (x, y) => {
    const buttons = [...this.level.buttons, ...this.overlaidButtons];
    const button = buttons.find((button) =>
      button.collidesWith(mouse({ x, y }))
    );
    if (button && !button.isDisabled) {
      button.state = buttonStates.clicked;
      button.action();
    }
  };

  handleHover = (x, y) => {
    if (!this.level) return;
    const buttons = [...this.level.buttons, ...this.overlaidButtons];
    const button = buttons.find((button) => {
      const hasCollision = button.collidesWith(mouse({ x, y }));
      if (!hasCollision && button.state === buttonStates.hovered) {
        button.state = buttonStates.default;
      }
      return hasCollision;
    });
    if (button && !button.isDisabled) button.state = buttonStates.hovered;
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
