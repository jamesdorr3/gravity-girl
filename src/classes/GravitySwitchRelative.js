import { isNorthSouth } from '../utils/gameUtils';
import sfx from './SFX';
import GravitySwitch from './GravitySwitch';

const offset = 10;

const directionOrder = ['north', 'east', 'south', 'west'];

class GravitySwitchStatic extends GravitySwitch {
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
    setTimeout(() => (this.isRegenerating = false), 3000);

    const direction = this.isClockwise ? 1 : -1;
    const oldIndex = directionOrder.indexOf(character.gravityDirection);
    let newIndex = oldIndex + direction;
    if (newIndex < 0) newIndex = directionOrder.length - 1;
    if (newIndex >= directionOrder.length) newIndex = 0;
    const newGravityDirection = directionOrder[newIndex];

    character.changeGravity(newGravityDirection);
    sfx.play('gravitySwitch');
  };

  update = (context) => {
    let { height, width, x, y } = this;
    if (this.isDistractor) {
      height += offset * 2;
      width += offset * 2;
      x -= offset;
      y -= offset;
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
    context.strokeStyle = 'blue';
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
    if (this.isClockwise) {
      context.beginPath();
      context.strokeStyle = 'lightblue';
      context.moveTo(east - 5, north + height * 0.5);
      context.lineTo(east - 15, north + height * 0.7);
      context.lineTo(east - 28, north + height * 0.4);
      context.stroke();
      context.beginPath();
      context.fillStyle = 'blue';
      context.moveTo(east - 2, north + height * 0.4);
      context.lineTo(east - 15, north + height * 0.7);
      context.lineTo(east - 28, north + height * 0.4);
      context.fill();
    } else {
      context.beginPath();
      context.strokeStyle = 'lightblue';
      context.moveTo(west + 5, north + height * 0.5);
      context.lineTo(west + 15, north + height * 0.7);
      context.lineTo(west + 28, north + height * 0.4);
      context.stroke();
      context.beginPath();
      context.fillStyle = 'blue';
      context.moveTo(west + 2, north + height * 0.4);
      context.lineTo(west + 15, north + height * 0.7);
      context.lineTo(west + 28, north + height * 0.4);
      context.fill();
    }
  };
}

export default GravitySwitchStatic;
