import Button from '../classes/Button';
import Level from '../classes/Level';
import Platform from '../classes/Platform';
import * as numbers from '../constants/numbers';

export default (game) => new Level({
  buttons: [
    new Button({ east: 1600 }, 0, 0, 'STOP', game.stop)
  ],
  platforms: [
    new Platform(
      {
        centerX: numbers.canvasWidth / 2,
      },
      300,
      50,
      null,
      700,
    )
  ],
  frameLength: numbers.frameLength,
  game
});

  // playInterval = () => {
  //   this.context.clearRect(0, 0, numbers.canvasWidth, numbers.canvasHeight);
  //   Platform.update(this.context);
  //   this.character.update(this.context);
  //   this.lastRender = new Date();
  // };