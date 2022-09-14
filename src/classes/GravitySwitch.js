import Element from './Element';
import { cardinalDirections } from '../constants/enums';
import { isNorthSouth } from '../utils/gameUtils';
import * as numbers from '../constants/numbers';
import sfx from './SFX';

const p = numbers.gravitySwitchPadding;
const offset = 10;

const distractorFieldsNegative = ['centerX', 'centerY', 'north', 'west'];
const distractorFieldsPositive = ['east', 'south', 'x', 'y'];

const distractorUpdate = (info) => {
  distractorFieldsNegative.forEach((key) => {
    if (info[key]) info[key] -= offset;
  });
  distractorFieldsPositive.forEach((key) => {
    if (info[key]) info[key] += offset;
  });
};

class GravitySwitch extends Element {
  constructor(info) {
    let size = numbers.characterHeight;
    if (info.isDistractor) {
      size = size - 2 * offset;
      distractorUpdate(info);
    }
    super({
      ...info,
      height: size,
      width: size,
    });

    this.gravityDirection = info.gravityDirection || 'south';
    this.isDistractor = info.isDistractor;
  }

  action = (character) => {
    if (this.gravityDirection !== character.gravityDirection) {
      character.changeGravity(this.gravityDirection);
      sfx.playGravitySwitch();
    }
    // animates a character tornado spin
    if (isNorthSouth(this.gravityDirection)) {
      character.scaleDirectionX *= -1;
    } else {
      character.scaleDirectionY *= -1;
    }
  };

  update = (context) => {
    let { height, width, x, y } = this;
    if (this.isDistractor) {
      height += offset * 2;
      width += offset * 2;
      x -= offset;
      y -= offset;
    }
    const north = y;
    const east = x + width;
    const south = y + height;
    const west = x;
    context.shadowColor = 'lightblue';
    context.shadowBlur = 50;
    context.fillStyle = 'lightblue';
    context.fillRect(x, y, height, width);
    context.shadowBlur = 0;
    context.fillStyle = 'blue';
    context.beginPath();
    if (this.gravityDirection === cardinalDirections.north) {
      context.moveTo(west + p, south - p * 1.25);
      context.lineTo(east - p, south - p * 1.25);
      context.lineTo(west + width / 2, north + p * 1.25);
    }
    if (this.gravityDirection === cardinalDirections.east) {
      context.moveTo(west + p * 1.25, south - p);
      context.lineTo(west + p * 1.25, north + p);
      context.lineTo(east - p * 1.25, north + width / 2);
    }
    if (this.gravityDirection === cardinalDirections.south) {
      context.moveTo(east - p, north + p * 1.25);
      context.lineTo(west + p, north + p * 1.25);
      context.lineTo(west + width / 2, south - p * 1.25);
    }
    if (this.gravityDirection === cardinalDirections.west) {
      context.moveTo(east - p * 1.25, south - p);
      context.lineTo(east - p * 1.25, north + p);
      context.lineTo(west + p * 1.25, north + width / 2);
    }
    context.fill();
  };
}

export default GravitySwitch;
