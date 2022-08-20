import Element from './Element';
import * as numbers from '../constants/numbers';

class Door extends Element {
  constructor(options) {
    super({
      ...options,
      height: options.height || numbers.doorHeight,
      width: options.width || numbers.doorWidth,
    });
    
    this.action = options.action || (() => {});
    this.color = options.color || 'lime';
  }

  update = (context) => {
    context.shadowColor = 'lime';
    context.shadowBlur = 20;
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  };
}

export default Door;
