import Button from './Button';
import Character from './Character';
import Platform from './Platform';
import * as numbers from '../constants/numbers';
import _ from 'lodash';

class Level {
  constructor({
    buttons,
  }) {
    this.buttons = buttons;
  }

  intervalAction = (game) => {
    game.context.clearRect(0, 0, numbers.canvasWidth, numbers.canvasHeight);
    Button.update(game.context);
  }

}

export default Level;
