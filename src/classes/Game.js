import Button from './Button';
import Character from './Character';
import Platform from './Platform';
import * as numbers from '../constants/numbers';
import _ from 'lodash';

class Game {

  constructor(canvas) {
    canvas.width = numbers.canvas.width;
    canvas.height = numbers.canvas.height;

    this.context = canvas.getContext('2d');
    this.context.textAlign = 'center';
    this.context.font = '30px Arial';

    this.character = new Character(
      { south: 0 },
      numbers.character.width,
      numbers.character.height,
      0,
      0,
      this
    );

    this.lastRender = new Date();

    this.interval = setInterval(this.loadingInterval, 10);
  }

  delete = () => delete this;

  loadingInterval = () => {
    this.context.fillText(
      'Loading',
      numbers.canvas.width / 2,
      numbers.canvas.height / 2
    );
    if (this.character.sprite) {
      this.stop();
      this.interval = setInterval(this.playInterval, numbers.refreshLength);
    }
  };

  playInterval = () => {
    this.context.clearRect(0, 0, numbers.canvas.width, numbers.canvas.height);
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
