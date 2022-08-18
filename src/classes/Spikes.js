import Element from './Element';
import Text from './Text';
import deathCommentary from '../constants/deathComments';
import { spikeHeight, spikeWidth } from '../constants/numbers';
import { cardinalDirections } from '../constants/enums';

class Spikes extends Element {
  static image = null;
  // static pattern = null;

  constructor(info) {
    super({
      ...info,
      height: spikeHeight,
      width: Math.floor(info.width / spikeWidth) * spikeWidth,
    });

    this.direction = info.direction || cardinalDirections.north;
    this.scaleX = 1;
    this.scaleY = this.direction === cardinalDirections.north ? 1 : -1;
    const spikesImage = new Image();
    spikesImage.src = '/spikes.png';
    spikesImage.onload = () => {
      Spikes.image = spikesImage;
    };
  }

  // hit height = 40 // 13
  // hit width =  70 // 23 (5 on each side)
  // visual height = 55 // 18
  // visual width = 100 // 33

  action = (character) => {
    const text = deathCommentary(character.deathCount);
    character.deathCount++;
    // new Text({
    //   centerX: 800,
    //   centerY: 300,
    //   color: '#fffe',
    //   text: character.deaths,
    // }).update(character.game.context);
    new Text({
      centerX: 800,
      centerY: 450,
      color: '#fffe',
      text,
    }).update(character.game.context);
    character.game.stop();
    setTimeout(() => {
      character.game.lastRender = new Date();
      character.game.interval = character.game.createInterval();
      character.reset();
    }, text.length * 100);
  };

  update = (context) => {
    if (Spikes.image) {
      context.save();
      context.scale(this.scaleX, this.scaleY);
      for (let x = this.x; x < this.x + this.width; x += spikeWidth) {
        context.drawImage(
          Spikes.image,
          x,
          this.y * this.scaleY,
          spikeWidth,
          this.height * this.scaleY
        );
      }
      context.restore();
    } else {
      context.fillStyle = 'red';
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  };
}

export default Spikes;
