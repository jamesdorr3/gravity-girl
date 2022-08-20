import { canvasHeight, canvasWidth, frameLength } from '../constants/numbers';

const add = frameLength / 30 * 1

class Element {
  constructor(game) {
    this.game = game;
    this.inc = 30;
    this.width = 0;
    this.x = 0;
  }

  update = (context) => {
    if (this.width < canvasWidth * 2) {
      this.width += Math.pow(1.15, this.inc);
      if (this.width < canvasWidth) this.inc += add;
    } else if (this.x < canvasWidth) {
      this.game.character.reset();
      this.game.character.isPaused = false;
      this.x += Math.pow(1.15, this.inc);
      this.inc -= add;
    } else {
      this.game.overlaidElements.pop();
    }
    context.fillStyle = 'black';
    context.fillRect(this.x, 0, this.width, canvasHeight);
  };
}

export default Element;
