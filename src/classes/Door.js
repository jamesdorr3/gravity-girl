import Element from './Element';
import character from './Character';
import game from './Game';
import spriteController from './SpriteController';
import * as numbers from '../constants/numbers';

class Door extends Element {
  constructor(info) {
    super({
      ...info,
      height: info.height || numbers.doorHeight,
      width: info.width || numbers.doorWidth,
    });
    
    this.color = info.color || 'lime';
    this.customAction = info.customAction;
    this.hasEntered = false;
    this.nextLevel = info.nextLevel;
  }

  action = () => {
    if (this.hasEntered) return;
    else this.hasEntered = true;
    spriteController.state = 'bow';
    character.isControllable = false;
    if (this.customAction) this.customAction();
    setTimeout(() => {
      game.changeLevels(this.nextLevel);
    }, 2400)
  }

  update = (context) => {
    context.shadowColor = 'lime';
    context.shadowBlur = 20;
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  };
}

export default Door;
