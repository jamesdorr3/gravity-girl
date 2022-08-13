import Noun from './Noun';

class Platform extends Noun {
  constructor(info) {
    super(info);
  }

  update = (context) => {
    context.fillStyle = 'purple';
    context.fillRect(this.x, this.y, this.width, this.height);
  };
}

export default Platform;
