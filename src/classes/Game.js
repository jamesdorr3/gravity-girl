import Button from './Button';
import Character from './Character';
import homeMenu from '../levels/0-home';
import Platform from './Platform';
import * as numbers from '../constants/numbers';
import _ from 'lodash';

class Game {
  constructor(canvas) {
    canvas.width = numbers.canvasWidth;
    canvas.height = numbers.canvasHeight;

    this.context = canvas.getContext('2d');
    this.context.textAlign = 'center';
    this.context.font = '30px Arial';

    this.character = new Character(
      { south: 0 },
      numbers.characterWidth,
      numbers.characterHeight,
      0,
      0,
      this
    );

    this.lastRender = new Date();

    this.interval = setInterval(
      () => homeMenu.intervalAction(this),
      homeMenu.frameLengthMenu);
  }

  delete = () => delete this;

  frameLength = () => (new Date() - this.lastRender) / numbers.second * numbers.gameSpeed;

  loadingInterval = () => {
    this.context.fillText(
      'Loading',
      numbers.canvasWidth / 2,
      numbers.canvasHeight / 2
    );
    if (this.character.sprite) {
      this.stop();
      this.interval = setInterval(
        () => homeMenu.intervalAction(this.context),
        homeMenu.frameLength,
      );
    }
  };

  playInterval = () => {
    this.context.clearRect(0, 0, numbers.canvasWidth, numbers.canvasHeight);
    Platform.update(this.context);
    Button.update(this.context);
    this.character.update(this.context);
    this.lastRender = new Date();
  };

  stop = () => {
    clearInterval(this.interval);
  };
}

export default Game;
