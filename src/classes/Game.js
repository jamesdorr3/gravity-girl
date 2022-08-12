import Button from './Button';
import Character from './Character';
import homeMenu from '../levels/0-home';
import Platform from './Platform';
import * as enums from '../constants/enums';
import * as numbers from '../constants/numbers';
import _ from 'lodash';
import Noun from './Noun';
import Mouse from './Mouse';

class Game {
  constructor(canvas) {
    canvas.width = numbers.canvasWidth;
    canvas.height = numbers.canvasHeight;

    this.context = canvas.getContext('2d');
    this.context.textAlign = 'center';
    this.context.font = '30px Arial';

    this.character = new Character(
      { south: numbers.canvasHeight },
      numbers.characterWidth,
      numbers.characterHeight,
      0,
      0,
      this
    );

    this.lastRender = new Date();
    this.level = null;
    this.interval = null;

    this.changeLevels(homeMenu);
  }

  changeLevels = (level) => {
    clearInterval(this.interval);
    this.level = level(this);
    this.interval = setInterval(() => {
      this.level.intervalAction();
      this.lastRender = new Date();
    }, this.level.frameLength);
  };

  delete = () => delete this;

  frameLength = () =>
    ((new Date() - this.lastRender) / numbers.second) * numbers.gameSpeed;

  handleClick = (x, y) => {
    const button = this.level.buttons.find((button) =>
      button.collidesWith(new Mouse(x, y))
    );
    if (button) {
      button.state = enums.buttonStates.clicked;
      button.action();
    }
  };

  handleHover = (x, y) => {
    const button = this.level.buttons.find((button) => {
      const hasCollision = button.collidesWith(new Mouse(x, y));
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
