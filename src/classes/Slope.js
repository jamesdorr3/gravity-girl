import Element from './Element';
import { cardinalDirections } from '../constants/enums';
import { isNorthSouth } from '../utils/gameUtils';

// TODO Too complex? preventing jump or run down

class Slope extends Element {
  constructor(x1, y1, x2, y2, x90, y90, color = 'lightblue') {
    const x = Math.min(x1, x2, x90);
    const y = Math.min(y1, y2, y90);
    const width = Math.max(x1, x2, x90) - x;
    const height = Math.max(y1, y2, y90) -y;
    super({
      height,
      width,
      x,
      y,
    });
    this.color = color;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x90 = x90;
    this.y90 = y90;
    this.slope = (y2 - y1) / (x2 - x1);
    this.isPlatformNorth = y === y90;
    this.isPlatformWest = x === x90;
  }

  action = (character) => {
    if (isNorthSouth(character.gravityDirection)) this.collisionActionNS(character);
    else this.collisionActionEW(character);
  };

  collisionActionEW = (character) => {
    const centerY = character.centerY();
    const x = this.x2 + 1 / this.slope * (centerY - this.y2)
    if (centerY < this.north() || centerY > this.south()) return;
    if (this.isPlatformWest && character.west() <= x) {
      character.west(x);
      if (character.gravityDirection === cardinalDirections.west) {
        character.isGrounded = true;
        character.isJumping = false;
      }
    } 
    else if (!this.isPlatformWest && character.east() >= x) {
      character.west(x - character.width);
      if (character.gravityDirection === cardinalDirections.east) {
        character.isGrounded = true;
        character.isJumping = false;
      }
    }
  }

  collisionActionNS = (character) => {
    const centerX = character.centerX();
    const y = this.y1 + this.slope * (centerX - this.x1)
    if (centerX < this.west() || centerX > this.east()) return;
    if (this.isPlatformNorth && character.north() <= y) {
      character.north(y);
      if (character.gravityDirection === cardinalDirections.north) {
        character.isGrounded = true;
        character.isJumping = false;
      }
    } 
    else if (!this.isPlatformNorth && character.south() >= y) {
      character.north(y - character.height);
      if (character.gravityDirection === cardinalDirections.south) {
        character.isGrounded = true;
        character.isJumping = false;
      }
    }
  }

  update = (context) => {
    context.shadowBlur = 0;
    context.fillStyle = this.color;
    context.beginPath();
    context.moveTo(this.x1, this.y1);
    context.lineTo(this.x2, this.y2);
    context.lineTo(this.x90, this.y90);
    context.fill();
  };
}
