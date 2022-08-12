import Button from './Button';
import Character from './Character';
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

    this.interval = setInterval(this.loadingInterval, 10);
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
        this.playInterval,
        numbers.frameLength
      );
    }
  };

  playInterval = () => {
    this.context.clearRect(0, 0, numbers.canvasWidth, numbers.canvasHeight);
    Platform.update(this.context);
    Button.update(this.context);
    this.character.update(this.context);
    // console.log(new Date() - this.lastRender)
    this.lastRender = new Date();
  };

  stop = () => {
    clearInterval(this.interval);
  };
}

export default Game;
