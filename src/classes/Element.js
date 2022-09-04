import { canvasHeight, canvasWidth } from '../constants/numbers';
import { firstDefined, isNum } from '../utils/gameUtils';

class Element {
  constructor(info) {
    this.height = info.height || 0;
    this.width = info.width || 0;
    if (info.centerX) {
      this.x = info.centerX - this.width / 2;
    } else {
      this.x = firstDefined(
        info.x,
        info.west,
        canvasWidth - info.east - info.width
      );
    }
    if (info.centerY) {
      this.y = info.centerY - this.height / 2;
    } else {
      this.y = firstDefined(
        info.y,
        info.north,
        canvasHeight - info.south - info.height
      );
    }
  }

  north = (y) => {
    if (isNum(y)) this.y = y;
    return this.y;
  };

  east = (x) => {
    if (isNum(x)) this.x = x - this.width;
    return this.x + this.width;
  };

  south = (y) => {
    if (isNum(y)) this.y = y - this.height;
    return this.y + this.height;
  };

  west = (x) => {
    if (isNum(x)) this.x = x;
    return this.x;
  };

  collidesWith = (that) =>
    this.north() < that.south() &&
    this.east() > that.west() &&
    this.south() > that.north() &&
    this.west() < that.east();
}

export default Element;
