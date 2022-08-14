import { canvasHeight, canvasWidth } from '../constants/numbers';
import { firstNumber } from '../utils/gameUtils';

class Element {
  constructor({
    centerX,
    centerY,
    east,
    height = 0,
    north,
    south,
    west,
    width = 0,
    x,
    y,
  }) {
    this.height = height;
    this.width = width;
    if (centerX) {
      this.x = centerX - width / 2;
    } else {
      this.x = firstNumber(x, west, canvasWidth - east - width);
    }
    if (centerY) {
      this.y = centerY - height / 2;
    } else {
      this.y = firstNumber(y, north, canvasHeight - south - height);
    }
  }

  north = (y) => {
    if (typeof y === 'number') this.y = y;
    return this.y;
  };

  east = (x) => {
    if (typeof x === 'number') this.x = x - this.width;
    return this.x + this.width;
  };

  south = (y) => {
    if (typeof y === 'number') this.y = y - this.height;
    return this.y + this.height;
  };

  west = (x) => {
    if (typeof x === 'number') this.x = x;
    return this.x;
  };

  collidesWith = (that) =>
    this.north() < that.south() &&
    this.east() > that.west() &&
    this.south() > that.north() &&
    this.west() < that.east();
}

export default Element;
