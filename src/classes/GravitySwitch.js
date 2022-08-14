import Element from './Element';
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
    context.moveTo(this.x, this.y + this.height);
    context.lineTo(this.x + this.width, this.y + this.height);
    context.lineTo(this.x + this.width / 2, this.y);
    context.fill();
  };
}

export default GravitySwitch;
