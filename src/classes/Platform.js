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
      character.speedY = 0;
    } else if (min === east) {
      character.east(this.west());
      character.speedX = 0;
    } else if (min === south) {
      character.south(this.north());
      character.speedY = 0;
      if (character.gravityDirection === enums.gravityDirections.south) {
        character.isGrounded = true;
        character.isJumping = false;
      }
    } else if (min === west) {
      character.west(this.east());
      character.speedX = 0;
    }
  };

  update = (context) => {
    context.fillStyle = 'purple';
    context.fillRect(this.x, this.y, this.width, this.height);
  };
}

export default Platform;
