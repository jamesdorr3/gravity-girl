import * as numbers from '../constants/numbers';

class Level {
  constructor({
    buttons = [],
    characterStartX = 0,
    characterStartY = numbers.canvasHeight - numbers.characterHeight,
    doors = [],
    frameLength = numbers.frameLength,
    game,
    hasCharacter = true,
    platforms = [],
  }) {
    this.buttons = buttons;
    this.characterStartX = characterStartX;
    this.characterStartY = characterStartY;
    this.doors = doors;
    this.frameLength = frameLength;
    this.game = game;
    this.hasCharacter = hasCharacter;
    this.platforms = platforms;
  }

  intervalAction = () => {
    this.game.context.clearRect(0, 0, numbers.canvasWidth, numbers.canvasHeight);

    this.doors.forEach((door) => door.update(this.game.context));
    this.platforms.forEach((platform) => platform.update(this.game.context));
    this.buttons.forEach((button) => button.update(this.game.context));
    if (this.hasCharacter) {
      this.game.character.update(this.game.context)
    }
  }

}

export default Level;
