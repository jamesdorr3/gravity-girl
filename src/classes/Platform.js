import Element from './Element';
import { cardinalDirections } from '../constants/enums';

class Platform extends Element {
  constructor(info) {
    super(info);
  }

  action = (character) => {
    const characterNorth = Math.abs(character.north() - this.south());
    const characterEast = Math.abs(character.east() - this.west());
    const characterSouth = Math.abs(character.south() - this.north());
    const characterWest = Math.abs(character.west() - this.east());
    const min = Math.min(
      characterNorth,
      characterEast,
      characterSouth,
      characterWest
    );
    if (min === characterNorth) {
      character.north(this.south());
      if (character.speedY <= 0) character.speedY = 0;
      if (character.gravityDirection === cardinalDirections.north) {
        character.isGrounded = true;
        character.isJumping = false;
      }
      if (character.gravityDirection === cardinalDirections.south) {
        character.isJumping = false;
      }
    } else if (min === characterEast) {
      character.west(this.west() - character.width);
      if (character.speedX >= 0) character.speedX = 0;
      if (character.gravityDirection === cardinalDirections.east) {
        character.isGrounded = true;
        character.isJumping = false;
      }
    } else if (min === characterSouth) {
      character.north(this.north() - character.height);
      if (character.speedY >= 0) character.speedY = 0;
      if (character.gravityDirection === cardinalDirections.south) {
        character.isGrounded = true;
        character.isJumping = false;
      }
    } else if (min === characterWest) {
      character.west(this.east());
      if (character.speedX <= 0) character.speedX = 0;
      if (character.gravityDirection === cardinalDirections.west) {
        character.isGrounded = true;
        character.isJumping = false;
      }
    }
  };

  update = (context) => {
    context.shadowBlur = 0;
    context.fillStyle = 'lightblue'; //'#aebecb';
    context.fillRect(this.x, this.y, this.width, this.height);
  };
}

export default Platform;
