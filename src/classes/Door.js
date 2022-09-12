import Element from './Element';
import character from './Character';
import game from './Game';
import spriteController from './SpriteController';
import { isNorthSouth } from '../utils/gameUtils';
import { doorHeight, doorWidth } from '../constants/numbers';

class Door extends Element {
  constructor(info) {
    const height = info.isLandscape ? doorWidth : doorHeight;
    const width = info.isLandscape ? doorHeight : doorWidth;
    super({
      ...info,
      height: info.height || height,
      width: info.width || width,
    });
    
    this.color = info.color || 'lime';
    this.customAction = info.customAction;
    this.gravityDirection = info.gravityDirection;
    this.hasEntered = false;
    this.nextLevel = info.nextLevel;
  }

  action = () => {
    if (this.hasEntered) return;
    else this.hasEntered = true;
    spriteController.state = 'bow';
    character.isControllable = false;
    if (this.gravityDirection) character.changeGravity(this.gravityDirection);
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
