import character from './Character';
import game from './Game';
import { canvasHeight, canvasWidth, frameLength } from '../constants/numbers';
import { isNorthSouth, sign as getSign } from '../utils/gameUtils';

const add = frameLength / 30 * 1

const isStarting = {
  north: (it) => it.y > 0,
  east: (it) => it.x < -canvasWidth,
  south: (it) => it.y < -canvasHeight,
  west: (it) => it.x > 0,
}

const isEnding = {
  north: (it) => it.y > -canvasHeight * 2,
  east: (it) => it.x < canvasWidth,
  south: (it) => it.y < canvasWidth,
  west: (it) => it.x > -canvasWidth * 2,
}

class Blackout {
  constructor(direction = 'west') {
    this.direction = direction;
    if (isNorthSouth(direction)) {
      this.inc = 22;
      this.x = 0;
      if (direction === 'north') this.y = canvasHeight;
      else if (direction === 'south') this.y = -canvasHeight * 2;
    } else {
      this.inc = 30;
      this.y = 0;
      if (direction === 'east') this.x = -canvasWidth * 2;
      else if (direction === 'west') this.x = canvasWidth;
    }
  }

  update = (context) => {
    const sign = getSign(this.direction);
    if (isNorthSouth(this.direction)) {
      console.log(this.y);
      this.y += Math.pow(1.15, this.inc) * sign;
    } else {
      this.x += Math.pow(1.15, this.inc) * sign;
    }

    if (isStarting[this.direction](this)) {
      this.inc += add;
    } else if (isEnding[this.direction](this)) {
      character.reset();
      this.inc -= add / 2;
    } else {
      game.overlaidElements.pop();
    }
    context.fillStyle = 'black';
    context.fillRect(this.x, this.y, canvasWidth * 2, canvasHeight * 2);
  };
}

export default Blackout;
