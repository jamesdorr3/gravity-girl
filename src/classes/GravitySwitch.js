import Element from './Element';
import { cardinalDirections } from '../constants/enums';
import { isNorthSouth } from '../utils/gameUtils';
import * as numbers from '../constants/numbers';

const p = numbers.gravitySwitchPadding;

class GravitySwitch extends Element {
  constructor(options) {
    super({
      ...options,
      height: numbers.characterHeight,
      width: numbers.characterHeight,
    });

    this.gravityDirection = options.gravityDirection || 'south';
  }

  action = (character) => {
    if (this.gravityDirection !== character.gravityDirection) {
      character.gravityDirection = this.gravityDirection;
      character.isJumping = false;
      if (isNorthSouth(this.gravityDirection)) {
        character.scaleDirectionY = character.sign();
        character.height = numbers.characterHeight;
        character.width = numbers.characterWidth;
      } else {
        character.scaleDirectionX = character.sign();
        character.height = numbers.characterWidth;
        character.width = numbers.characterHeight;
      }
    }
    // animates a character tornado spin
    if (isNorthSouth(this.gravityDirection)) {
      character.scaleDirectionX *= -1;
    } else {
      character.scaleDirectionY *= -1;
    }
  };

  update = (context) => {
    context.shadowColor = 'lightblue';
    context.shadowBlur = 50;
    context.fillStyle = 'lightblue';
    context.fillRect(this.x, this.y, this.height, this.width);
    context.shadowBlur = 0;
    context.fillStyle = 'blue';
    context.beginPath();
    if (this.gravityDirection === cardinalDirections.north) {
      context.moveTo(this.west() + p, this.south() - p * 1.25);
      context.lineTo(this.east() - p, this.south() - p * 1.25);
      context.lineTo(this.west() + this.width / 2, this.north() + p * 1.25);
    }
    if (this.gravityDirection === cardinalDirections.east) {
      context.moveTo(this.west() + p * 1.25, this.south() - p);
      context.lineTo(this.west() + p * 1.25, this.north() + p);
      context.lineTo(this.east() - p * 1.25, this.north() + this.width / 2);
    }
    if (this.gravityDirection === cardinalDirections.south) {
      context.moveTo(this.east() - p, this.north() + p * 1.25);
      context.lineTo(this.west() + p, this.north() + p * 1.25);
      context.lineTo(this.west() + this.width / 2, this.south() - p * 1.25);
    }
    if (this.gravityDirection === cardinalDirections.west) {
      context.moveTo(this.east() - p * 1.25, this.south() - p);
      context.lineTo(this.east() - p * 1.25, this.north() + p);
      context.lineTo(this.west() + p * 1.25, this.north() + this.width / 2);
    }
    context.fill();
  };
}

export default GravitySwitch;
