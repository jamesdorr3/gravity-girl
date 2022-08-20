import Blackout from './Blackout';
import Button from './Button';
import Character from './Character';
import Text from './Text';

import deathCommentary from '../constants/deathComments';
import devLevel from '../levels/5'; // change number for start level
import loadingScreen from '../levels/loading';
import readyScreen from '../levels/readyScreen';

import * as enums from '../constants/enums';
import * as gameUtils from '../utils/gameUtils';
import * as numbers from '../constants/numbers';

class Game {
  constructor(canvas) {
    canvas.width = numbers.canvasWidth;
    canvas.height = numbers.canvasHeight;

    this.context = canvas.getContext('2d');
    this.context.textAlign = 'center';
    this.context.font = '30px Arial';

    this.character = new Character({
      game: this,
      height: numbers.characterHeight,
      south: 0,
      west: 0,
      width: numbers.characterWidth,
    });

    this.lastRender = new Date();
    this.level = devLevel(this); // DEV LEVEL
    this.interval = this.createInterval();

    this.overlaidButtons = [
      new Button({ action: this.stop, east: 0, north: 0, text: 'STOP' }),
    ];
    this.overlaidElements = [];
  }

  changeLevels = (level) => {
    clearInterval(this.interval);
    this.level = level(this);
    this.interval = setInterval(
      readyScreen(this).intervalAction,
      numbers.second / 10
    );
    setTimeout(() => {
      clearInterval(this.interval);
      this.interval = this.createInterval();
      this.character.reset(
        this.level.characterStartX,
        this.level.characterStartY
      );
    }, numbers.readyScreenTime);
  };

  createInterval = () =>
    setInterval(() => {
      if (this.character.sprite) {
        this.level.intervalAction();
        const overlays = [...this.overlaidElements, ...this.overlaidButtons];
        overlays.forEach((it) => it.update(this.context));
      } else {
        loadingScreen(this).intervalAction();
      }
    }, this.level.frameLength);

  death = () => {
    this.character.isPaused = true;
    this.character.deathCount++;
    const text = new Text({
      centerX: 800,
      centerY: 450,
      color: '#fffe',
      text: deathCommentary(this.character.deathCount),
    });
    this.overlaidElements.push(text);
    setTimeout(() => {
      this.overlaidElements.pop();
      this.overlaidElements.push(new Blackout(this))
    }, 2 * numbers.second);
  };

  delete = () => delete this;

  frameLength = () =>
    ((new Date() - this.lastRender) / numbers.second) * numbers.gameSpeed;

  handleClick = (x, y) => {
    const buttons = [...this.level.buttons];
    const button = buttons.find((button) =>
      button.collidesWith(gameUtils.mouse({ x, y }))
    );
    if (button) {
      button.state = enums.buttonStates.clicked;
      button.action();
    }
  };

  handleHover = (x, y) => {
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

  stop = () => {
    clearInterval(this.interval);
  };
}

export default Game;
