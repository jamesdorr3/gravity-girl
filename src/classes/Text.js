import Noun from './Noun';

export default class Text extends Noun {
  constructor(info) {
    super(info);
    this.text = info.text;
  }

  update = (context) => {
    context.textAlign = 'center';
    context.font = '30px Arial';
    context.fillStyle = 'black';
    context.fillText(this.text, this.x, this.y);
  };
}
