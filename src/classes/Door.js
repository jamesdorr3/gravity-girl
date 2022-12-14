import Element from './Element';
import character from './Character';
import game from './controllers/Game';
import keyboard from './controllers/Keyboard';
import spriteController from './controllers/SpriteController';
import { isNorthSouth, parseLocalStorage } from '../utils/gameUtils';
import { doorHeight, doorWidth } from '../constants/numbers';
import { gravityGirlMaxLevel } from '../constants/strings';
import sfx from './controllers/SFX';

const save = (order) => {
  if (order && order > parseLocalStorage()) {
    localStorage.setItem('gravityGirlMaxLevel', order);
  }
}

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
    keyboard.setIsControllable(false);
    if (this.gravityDirection) character.changeGravity(this.gravityDirection);
    if (this.customAction) this.customAction();
    sfx.play('win');
    setTimeout(() => {
      game.changeLevels(this.nextLevel);
    }, 1200);
    save(this.nextLevel.order);
  }

  update = (context) => {
    context.shadowColor = 'lime';
    context.shadowBlur = 20;
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  };
}

export default Door;
