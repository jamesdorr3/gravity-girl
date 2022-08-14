import Element from './Element';
import * as enums from '../constants/enums';
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
    character.gravityDirection = this.gravityDirection
  }

  update = (context) => {
    context.fillStyle = 'blue';
    context.beginPath();
    if (this.gravityDirection === enums.gravityDirections.north) {
      context.moveTo(this.west(), this.south());
      context.lineTo(this.east(), this.south());
      context.lineTo(this.west() + this.width / 2, this.north());
    }
    if (this.gravityDirection === enums.gravityDirections.east) {
      context.moveTo(this.west(), this.south());
      context.lineTo(this.west(), this.north());
      context.lineTo(this.east(), this.north() + this.width / 2);
    }
    if (this.gravityDirection === enums.gravityDirections.south) {
      context.moveTo(this.east(), this.north());
      context.lineTo(this.west(), this.north());
      context.lineTo(this.west() + this.width / 2, this.south());
    }
    if (this.gravityDirection === enums.gravityDirections.west) {
      context.moveTo(this.east(), this.south());
      context.lineTo(this.east(), this.north());
      context.lineTo(this.west(), this.north() + this.width / 2);
    }
    context.fill();
  };
}

export default GravitySwitch;
