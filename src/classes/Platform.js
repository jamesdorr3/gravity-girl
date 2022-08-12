import Noun from './Noun';

class Platform extends Noun {
  constructor(...args) {
    super(...args);
  }

  update = (context) => {
    context.fillStyle = 'purple';
    context.fillRect(this.x, this.y, this.width, this.height);
  };
}

export default Platform;
