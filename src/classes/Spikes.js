import Element from './Element';
import character from './Character';
import game from './Game';
import { cardinalDirections } from '../constants/enums';
import { isNorthSouth, isNum } from '../utils/gameUtils';
import { loadImage } from '../utils/imageUtils';
import { spikeHeight, spikeWidth } from '../constants/numbers';

const offset = 15;
// friendly to players

class Spikes extends Element {
  static imageN = null;
  static imageW = null;

  constructor(info) {
    const long = Math.floor((info.width || info.height) / spikeWidth) * spikeWidth - offset * 2;
    const short = spikeHeight - offset * 2;
    const isNS = isNorthSouth(info.direction || 'north');
    const superInfo = {
      ...info,
      height: isNS ? short : long,
      width: isNS ? long : short,
    };
    if (isNum(info.north)) superInfo.north = info.north + offset;
    else if (isNum(info.south)) superInfo.south = info.south + offset;
    else if (isNum(info.y)) superInfo.y = info.y + offset;
    if (isNum(info.east)) superInfo.east = info.east + offset;
    else if (isNum(info.west)) superInfo.west = info.west + offset;
    else if (isNum(info.x)) superInfo.x = info.x + offset;
    super(superInfo);

    this.direction = info.direction || cardinalDirections.north;
    this.isNorthSouth = isNS;
    this.scaleX = this.direction != cardinalDirections.east ? 1 : -1;
    this.scaleY = this.direction != cardinalDirections.south ? 1 : -1;
    this.showHitBox = true;
    loadImage('/spikesN.png', Spikes, 'imageN');
    loadImage('/spikesW.png', Spikes, 'imageW');
  }

  action = () => {
    if (character.isControllable) game.death();
  };

  drawEW = (context) => {
    for (let y = this.y; y < this.y + this.height; y += spikeWidth) {
      context.drawImage(
        Spikes.imageW,
        this.x * this.scaleX - offset * this.scaleX,
        y - offset,
        this.width * this.scaleX + offset * 2 * this.scaleX,
        spikeWidth,
      );
    }
  }

  drawNS = (context) => {
    for (let x = this.x; x < this.x + this.width; x += spikeWidth) {
      context.drawImage(
        Spikes.imageN,
        x - offset,
        this.y * this.scaleY - offset * this.scaleY,
        spikeWidth,
        this.height * this.scaleY + offset * 2 * this.scaleY
      );
    }
  }

  update = (context) => {
    const image = this.isNorthSouth ? Spikes.imageN : Spikes.imageW;
    if (image) {
      context.save();
      context.scale(this.scaleX, this.scaleY);
      this.isNorthSouth ? this.drawNS(context) : this.drawEW(context);
      context.restore();
    }
    if (this.showHitBox || !image) {
      context.fillStyle = 'red';
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  };
}

export default Spikes;
