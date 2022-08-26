import character from './Character';
import { spriteStates } from '../constants/enums';
import * as gameUtils from '../utils/gameUtils';
import spriteStateInfo from '../constants/spriteStateInfo';
import * as numbers from '../constants/numbers';

class SpriteController {
  constructor() {
    this.column = 100;
    this.frameStart = new Date();
    this.sprite = null;
    this.state = spriteStates.rest;

    const image = new Image();
    image.src = '/gravity-girl-sprite.png';
    image.onload = () => {
      this.sprite = image;
    };
  }

  update = () => {
    const key = gameUtils.isNorthSouth(character.gravityDirection) ? 'ns' : 'ew';
    const current = spriteStateInfo[key][this.state];
    const { start, finish, onFinish, when, then } = current;
    if (when(this)) {
      if (this.column < start) this.column = start;
      else if (this.column >= finish) {
        if (this.column === finish && onFinish) onFinish();
        this.column = start;
      }
      else this.column++;
      then(this);
    }
  }

}

export default new SpriteController();