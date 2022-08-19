import Element from './Element';
import { cardinalDirections } from '../constants/enums';
import * as numbers from '../constants/numbers';

class GravitySwitch extends Element {
  constructor(options) {
    super({
      ...options,
      height: numbers.characterHeight,
      width: numbers.characterHeight,
    });
    
    this.gravityDirection = options.gravityDirection;
  }

  action = (character) => {
    if (this.gravityDirection !== character.gravityDirection) {
      if (this.gravityDirection === cardinalDirections.north) {
        character.scaleDirectionY = -1;
        character.height = numbers.characterHeight;
        character.width = numbers.characterWidth;
      }
      if (this.gravityDirection === cardinalDirections.east) {
        character.scaleDirectionX = 1;
        character.height = numbers.characterWidth;
        character.width = numbers.characterHeight;
      }
      if (this.gravityDirection === cardinalDirections.south) {
        character.scaleDirectionY = 1;
        character.height = numbers.characterHeight;
        character.width = numbers.characterWidth;
      }
      if (this.gravityDirection === cardinalDirections.west) {
        character.scaleDirectionX = -1;
        character.height = numbers.characterWidth;
        character.width = numbers.characterHeight;
      }
    }
    character.gravityDirection = this.gravityDirection;
  };

  update = (context) => {
    context.fillStyle = 'blue';
    context.beginPath();
    if (this.gravityDirection === cardinalDirections.north) {
      context.moveTo(this.west(), this.south());
      context.lineTo(this.east(), this.south());
      context.lineTo(this.west() + this.width / 2, this.north());
    }
    if (this.gravityDirection === cardinalDirections.east) {
      context.moveTo(this.west(), this.south());
      context.lineTo(this.west(), this.north());
      context.lineTo(this.east(), this.north() + this.width / 2);
    }
    if (this.gravityDirection === cardinalDirections.south) {
      context.moveTo(this.east(), this.north());
      context.lineTo(this.west(), this.north());
      context.lineTo(this.west() + this.width / 2, this.south());
    }
    if (this.gravityDirection === cardinalDirections.west) {
      context.moveTo(this.east(), this.south());
      context.lineTo(this.east(), this.north());
      context.lineTo(this.west(), this.north() + this.width / 2);
    }
    context.fill();
  };
}

export default GravitySwitch;
