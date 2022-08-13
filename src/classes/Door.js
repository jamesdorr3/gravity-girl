import Noun from './Noun';
import Platform from './Platform';
import * as enums from '../constants/enums';
import * as keys from '../constants/keys';
import * as numbers from '../constants/numbers';
import * as gameUtils from '../utils/gameUtils';

class Door extends Noun {
  constructor(options) {
    super({
      ...options,
      height: options.height || numbers.doorHeight,
      width: options.width || numbers.doorWidth,
    });
    
    this.action = options.action;
    this.color = options.color || 'pink';
  }

  update = (context) => {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  };
}

export default Door;
