import Noun from "./Noun";
import * as numbers from "../constants/numbers";

const states = {
  default: 15,
  hovered: 10,
  clicked: 5,
}

class Button extends Noun{

  constructor(options, x, y, text, action) {
    const width = text.length * 20 + 20 * 2;
    const height = 30 * 1.5 + 20 * 2;
    super(options, width, height, x, y);

    this.action = action;
    this.state = states.default;
    this.text = text;
  }

  update = (context) => {
    context.shadowBlur = this.state;
    context.fillStyle = 'lightblue';
    context.fillRect(this.x, this.y, this.width, this.height);

    context.shadowBlur = 0;
    context.font = '30px Arial';
    context.fillStyle = 'black';
    context.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2 + 15);
  }

  static update = (context) => {
    context.shadowColor = 'black';
    context.textAlign = "center";
    Button.all.forEach((button) => button.update(context));
  }

  static handleHover = (x, y) => {
    Button.all.forEach((button) => {
      const hasPoint = button.isCollision(new Noun({}, 1, 1, x, y));
      if (button.state !== states.hovered && hasPoint) {
        button.state = states.hovered;
      }
      else if (button.state == states.hovered && !hasPoint) {
        button.state = states.default;
      }
    })
  }

  static handleClick = (x, y) => {
    const button = Button.all.find((button) => (
      button.isCollision(new Noun({}, 1, 1, x, y))
    ));
    if (button) {
      button.state = states.clicked;
      setTimeout(button.action, numbers.frameLength * 2);
    }
  }

}

Button.all = [];

Button.create = (...args) => {
  const inst = new Button(...args);
  Button.all.push(inst);
  return inst;
}

export default Button;
