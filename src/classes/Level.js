import Button from './Button';
import Character from './Character';
import Platform from './Platform';
import * as numbers from '../constants/numbers';
import _ from 'lodash';

class Level {
  constructor({
    buttons = [],
    frameLength = numbers.frameLength,
    game,
    hasCharacter = true,
    platforms = [],
  }) {
    this.buttons = buttons;
    this.frameLength = frameLength;
    this.game = game;
    this.hasCharacter = hasCharacter;
    this.platforms = platforms;
  }

  intervalAction = () => {
    this.game.context.clearRect(0, 0, numbers.canvasWidth, numbers.canvasHeight);
    this.buttons.forEach((button) => button.update(this.game.context));
    this.platforms.forEach((platform) => platform.update(this.game.context));
    if (this.hasCharacter) {
      this.game.character.update(this.game.context)
    }
  }

}

export default Level;
