import Element from './Element';
import { buttonPadding } from '../constants/numbers';

export default class Text extends Element {
  constructor(info) {
    super(info);
    this.color = info.color;
    this.text = info.text;
  }

  update = (context) => {
    if (this.color) {
      context.fillStyle = this.color;
      const height = 100 + buttonPadding * 2;
      const width = this.text.length * 20 + buttonPadding * 2;
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
