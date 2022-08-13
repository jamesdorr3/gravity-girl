import Character from './Character';
import devLevel from '../levels/0'; // change number for start level
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
      east: 0,
      height: numbers.characterHeight,
      south: 0,
      width: numbers.characterWidth,
    });

    this.lastRender = new Date();
    this.level = devLevel(this); //            DEV LEVEL
    this.interval = this.createInterval();
  }

  changeLevels = (level) => {
    clearInterval(this.interval);
    this.level = level(this);
    this.interval = setInterval(readyScreen(this).intervalAction, numbers.second / 10);
    setTimeout(() => {
      clearInterval(this.interval);
      this.interval = this.createInterval();
      this.character.reset(
        this.level.characterStartX,
        this.level.characterStartY
      );
    }, numbers.second * 5);
  };

  createInterval = () =>
    setInterval(() => {
      this.level.intervalAction();
      this.lastRender = new Date();
    }, this.level.frameLength);

  delete = () => delete this;

  frameLength = () =>
    ((new Date() - this.lastRender) / numbers.second) * numbers.gameSpeed;

  handleClick = (x, y) => {
    const button = this.level.buttons.find((button) =>
      button.collidesWith(gameUtils.mouse({ x, y }))
    );
    if (button) {
      button.state = enums.buttonStates.clicked;
      button.action();
    }
  };

  handleHover = (x, y) => {
    const button = this.level.buttons.find((button) => {
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
