import Element from './Element';
import { buttonPadding, canvasHeight, canvasWidth } from '../constants/numbers';
import { firstDefined } from '../utils/gameUtils';

export default class Text extends Element {
  constructor(info) {
    if (!firstDefined(info.centerX, info.east, info.west, info.x)) {
      info.centerX = canvasWidth / 2;
    }
    if (!firstDefined(info.centerY, info.north, info.south, info.y)) {
      info.centerY = canvasHeight / 2;
    }
    super(info);
    this.color = info.color || '#fffe';
    this.text = info.text;
  }

  update = (context) => {
    if (this.color && this.text.length) {
      context.fillStyle = this.color;
      const height = 100 + buttonPadding * 2;
      const width = this.text.length * 25 + buttonPadding * 2;
      const x = this.x - width / 2;
      const y = this.y - 80;
      context.fillRect(x, y, width, height);
    }
    context.textAlign = 'center';
    context.font = '30px Arial';
    context.fillStyle = 'black';
    context.fillText(this.text, this.x, this.y);
  };
}
