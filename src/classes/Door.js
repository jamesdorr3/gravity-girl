import Element from './Element';
import character from './Character';
import game from './Game';
import keyboard from './Keyboard';
import spriteController from './SpriteController';
import { isNorthSouth } from '../utils/gameUtils';
import { doorHeight, doorWidth } from '../constants/numbers';
import { gravityGirlMaxLevel } from '../constants/strings';
import sfx from './SFX';

const save = (order) => {
  const prevMaxKey = localStorage.getItem('gravityGirlMaxLevel');
  const prevMax = prevMaxKey ? parseInt(prevMaxKey) : 0;
  console.log({ order, prevMax });
  if (order && order > prevMax) {
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
