import Element from './Element';
import * as enums from '../constants/enums';

class Platform extends Element {
  constructor(info) {
    super(info);
  }

  action = (character) => {
    const north = Math.abs(character.north() - this.south());
    const east = Math.abs(character.east() - this.west());
    const south = Math.abs(character.south() - this.north());
    const west = Math.abs(character.west() - this.east());
    const min = Math.min(north, east, south, west);
    if (min === north) {
      character.north(this.south());
      if (character.speedY <= 0) character.speedY = 0;
      if (character.gravityDirection === enums.cardinalDirections.north) {
        character.isGrounded = true;
        character.isJumping = false;
      }
      if (character.gravityDirection === enums.cardinalDirections.south) {
        character.isJumping = false;
      }
    } else if (min === east) {
      character.east(this.west());
      if (character.speedX >= 0) character.speedX = 0;
      if (character.gravityDirection === enums.cardinalDirections.east) {
        character.isGrounded = true;
        character.isJumping = false;
      }
    } else if (min === south) {
      character.south(this.north());
      if (character.speedY >= 0) character.speedY = 0;
      if (character.gravityDirection === enums.cardinalDirections.south) {
        character.isGrounded = true;
        character.isJumping = false;
      }
    } else if (min === west) {
      character.west(this.east());
      if (character.speedX <= 0) character.speedX = 0;
      if (character.gravityDirection === enums.cardinalDirections.west) {
        character.isGrounded = true;
        character.isJumping = false;
      }
    }
  };

  update = (context) => {
    context.fillStyle = 'lightblue'; //'#aebecb';
    context.fillRect(this.x, this.y, this.width, this.height);
  };
}

export default Platform;
