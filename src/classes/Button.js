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

  static update = (context) => {
    context.shadowColor = 'black';
    context.textAlign = "center";
    Button.all.forEach((button) => {

      context.shadowBlur = button.state;
      context.fillStyle = 'lightblue';
      context.fillRect(button.x, button.y, button.width, button.height);

      context.shadowBlur = 0;
      context.font = '30px Arial';
      context.fillStyle = 'black';
      context.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2 + 15);
    })
  }

  static handleHover = (x, y) => {
    Button.all.forEach((button) => {
      const hasPoint = button.hasPoint(x, y);
      if (button.state !== states.hovered && hasPoint) {
        button.state = states.hovered;
      }
      else if (button.state == states.hovered && !hasPoint) {
        button.state = states.default;
      }
    })
  }

  static handleClick = () => {
    const button = Button.all.find(({state}) => state === states.hovered);
    if (button) {
      button.state = states.clicked;
      setTimeout(button.action, numbers.refreshLength * 2);
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
