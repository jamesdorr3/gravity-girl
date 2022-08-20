import Element from './Element';
import Text from './Text';
import deathCommentary from '../constants/deathComments';
import { cardinalDirections } from '../constants/enums';
import { isNum } from '../utils/gameUtils';
import { second, spikeHeight, spikeWidth } from '../constants/numbers';

const offset = 15;
// friendly to players

class Spikes extends Element {
  static image = null;

  constructor(info) {
    const superInfo = {
      ...info,
      height: spikeHeight - offset * 2,
      width: Math.floor(info.width / spikeWidth) * spikeWidth - offset * 2,
    };
    if (isNum(info.north)) superInfo.north = info.north + offset;
    else if (isNum(info.south)) superInfo.south = info.south + offset;
    else if (isNum(info.y)) superInfo.y = info.y + offset;
    if (isNum(info.east)) superInfo.east = info.east + offset;
    else if (isNum(info.west)) superInfo.west = info.west + offset;
    else if (isNum(info.x)) superInfo.x = info.x + offset;
    super(superInfo);

    this.direction = info.direction || cardinalDirections.north;
    this.scaleX = 1;
    this.scaleY = this.direction === cardinalDirections.north ? 1 : -1;
    const spikesImage = new Image();
    spikesImage.src = '/spikes.png';
    spikesImage.onload = () => {
      Spikes.image = spikesImage;
    };
  }

  action = (character) => {
    const text = deathCommentary(character.deathCount);
    character.deathCount++;
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
    }, 2 * second);
  };

  update = (context) => {
    if (Spikes.image) {
      context.save();
      context.scale(this.scaleX, this.scaleY);
      for (let x = this.x; x < this.x + this.width; x += spikeWidth) {
        context.drawImage(
          Spikes.image,
          x - offset,
          this.y * this.scaleY - offset * this.scaleY,
          spikeWidth,
          this.height * this.scaleY + offset * 2 * this.scaleY
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
