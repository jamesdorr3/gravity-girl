import Noun from "./Noun";

class Button extends Noun{

  constructor(options, x, y, text, action) {
    const width = text.length * 30 + 20 * 2;
    const height = 30 * 1.5 + 20 * 2;
    super(options, width, height, x, y);

    this.action = action;
    this.isHovered = false;
    this.text = text;
  }

  static update = (context) => {
    context.shadowColor = 'black';
    context.textAlign = "center";
    Button.all.forEach((button) => {

      context.shadowBlur = 15;
      context.fillStyle = 'lightblue';
      context.fillRect(button.x, button.y, button.width, button.height);

      context.shadowBlur = 0;
      context.font = '30px Arial';
      context.fillStyle = 'black';
      context.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2 + 15);
    })
  }

}

Button.all = [];

Button.create = (...args) => {
  const inst = new Button(...args);
  Button.all.push(inst);
  return inst;
}

export default Button;
