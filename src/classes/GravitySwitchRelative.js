import { isNorthSouth } from '../utils/gameUtils';
import sfx from './controllers/SFX';
import GravitySwitch from './GravitySwitch';
import { rotateGravityDirection } from '../utils/gravityUtils';
import { distractorOffset } from '../constants/numbers';

class GravitySwitchAbsolute extends GravitySwitch {
  constructor(info) {
    super(info);
    this.isClockwise = info.isClockwise;
    this.isRegenerating = false;
  }

  action = (character) => {
    // animates tornado spin
    if (isNorthSouth(character.gravityDirection)) {
      character.scaleDirectionX *= -1;
    } else {
      character.scaleDirectionY *= -1;
    }

    if (this.isRegenerating) return;
    this.isRegenerating = true;
    setTimeout(() => (this.isRegenerating = false), 2000);

    const spinDirection = this.isClockwise ? 1 : -1;
    character.changeGravity(rotateGravityDirection(character.gravityDirection, spinDirection));
    sfx.play('gravitySwitch');
  };

  update = (context) => {
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
    context.fillStyle = this.isRegenerating ? 'gray' : 'blue';
    context.strokeStyle = this.isRegenerating ? 'gray' : 'blue';
    context.beginPath();
    context.arc(
      this.centerX(),
      this.centerY(),
      height / 2 - 13,
      0,
      2 * Math.PI
    );
    context.lineWidth = 10;
    context.stroke();

    context.lineWidth = 10;
    context.strokeStyle = 'lightblue';
    if (this.isClockwise) {
      context.beginPath();
      context.moveTo(east - 5, north + height * 0.5);
      context.lineTo(east - 15, north + height * 0.7);
      context.lineTo(east - 28, north + height * 0.4);
      context.stroke();
      context.beginPath();
      context.moveTo(east - 2, north + height * 0.4);
      context.lineTo(east - 15, north + height * 0.7);
      context.lineTo(east - 28, north + height * 0.4);
      context.fill();
    } else {
      context.beginPath();
      context.moveTo(west + 5, north + height * 0.5);
      context.lineTo(west + 15, north + height * 0.7);
      context.lineTo(west + 28, north + height * 0.4);
      context.stroke();
      context.beginPath();
      context.moveTo(west + 2, north + height * 0.4);
      context.lineTo(west + 15, north + height * 0.7);
      context.lineTo(west + 28, north + height * 0.4);
      context.fill();
    }
  };
}

export default GravitySwitchAbsolute;
