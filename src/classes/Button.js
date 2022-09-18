import Element from './Element';
import { buttonPadding } from '../constants/numbers';
import { buttonStates } from '../constants/enums';

class Button extends Element {
  constructor(info) {
    info.text = info.text.toString();
    const width = info.text.length * 20 + buttonPadding * 2;
    const height = 30 * 1.5 + buttonPadding * 2;
    super({ ...info, height, width });

    this.action = info.action || (() => {});
    this.state = buttonStates.default;
    this.text = info.text;
    console.log(this);
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

export default Button;
