import { cardinalDirections } from '../constants/enums';
import { isNorthSouth } from '../utils/gameUtils';
import sfx from './controllers/SFX';
import GravitySwitch from './GravitySwitchRelative';
import { distractorOffset } from '../constants/numbers';
import { rotateGravityDirection } from '../utils/gravityUtils';

const p = 10;

class GravitySwitchAbsolute extends GravitySwitch {
  constructor(info) {
    super(info);
    this.direction = info.gravityDirection || 'south';
    this.lastUpdate = new Date();
    this.transitionSpeed = info.transitionSpeed;
  }

  action = (character) => {
    if (this.direction !== character.gravityDirection) {
      character.changeGravity(this.direction);
      sfx.play('gravitySwitch');
    }
    // animates a character tornado spin
    if (isNorthSouth(this.direction)) {
      character.scaleDirectionX *= -1;
    } else {
      character.scaleDirectionY *= -1;
    }
  };

  update = (context) => {
    if (new Date() - this.lastUpdate > this.transitionSpeed) {
      this.direction = rotateGravityDirection(this.direction);
      this.lastUpdate = new Date();
    }
    let { height, width, x, y } = this;
    if (this.isDistractor) {
      height += distractorOffset * 2;
      width += distractorOffset * 2;
      x -= distractorOffset;
      y -= distractorOffset;
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
    if (this.direction === cardinalDirections.north) {
      context.moveTo(west + p, south - p * 1.25);
      context.lineTo(east - p, south - p * 1.25);
      context.lineTo(west + width / 2, north + p * 1.25);
    }
    if (this.direction === cardinalDirections.east) {
      context.moveTo(west + p * 1.25, south - p);
      context.lineTo(west + p * 1.25, north + p);
      context.lineTo(east - p * 1.25, north + width / 2);
    }
    if (this.direction === cardinalDirections.south) {
      context.moveTo(east - p, north + p * 1.25);
      context.lineTo(west + p, north + p * 1.25);
      context.lineTo(west + width / 2, south - p * 1.25);
    }
    if (this.direction === cardinalDirections.west) {
      context.moveTo(east - p * 1.25, south - p);
      context.lineTo(east - p * 1.25, north + p);
      context.lineTo(west + p * 1.25, north + width / 2);
    }
    context.fill();
  };
}

export default GravitySwitchAbsolute;
