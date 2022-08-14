import Element from './Element';
import * as enums from "../constants/enums";

export default class Button extends Element {
  constructor(info) {
    const width = info.text.length * 20 + 20 * 2;
    const height = 30 * 1.5 + 20 * 2;
    super({ ...info, height, width });

    this.action = info.action || (() => {});
    this.state = enums.buttonStates.default;
    this.text = info.text;
  }

  update = (context) => {
    context.shadowColor = 'black';
    context.textAlign = 'center';
    context.shadowBlur = this.state;
    context.fillStyle = 'lightblue';
    context.fillRect(this.x, this.y, this.width, this.height);

    context.shadowBlur = 0;
    context.font = '30px Arial';
    context.fillStyle = 'black';
    context.fillText(
      this.text,
      this.x + this.width / 2,
      this.y + this.height / 2 + 15
    );
  };
}
