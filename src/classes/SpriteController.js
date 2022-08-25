import Element from './Element';
import { spriteStates } from '../constants/enums';
import * as gameUtils from '../utils/gameUtils';
import spriteStateInfo from '../constants/spriteStateInfo';
import * as numbers from '../constants/numbers';

class SpriteController {
  constructor(character) {

    this.character = character;
    this.column = 133;
    this.frameStart = character.x;
    this.sprite = null;
    this.state = spriteStates.jump;
    this.x = this.column * numbers.spriteOffset

    const image = new Image();
    image.src = '/gravity-girl-sprite.png';
    image.onload = () => {
      this.sprite = image;
    };
  }

  update = () => {
    const key = gameUtils.isGravityY(this.character.gravityDirection) ? 'ns' : 'ew';
    const current = spriteStateInfo[key][this.state];
    const { start, finish, when, update } = current;
    if (when(this)) {
      if (this.column < start) this.column = start;
      else if (this.column >= finish) this.column = start;
      else this.column++;
      this.x = this.column * numbers.spriteOffset;
      update(this);
    }
  }

}

export default SpriteController;