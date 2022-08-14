import * as numbers from '../constants/numbers';

class Level {

  static count = 0;

  constructor({
    buttons = [],
    characterStartX = 0,
    characterStartY = numbers.canvasHeight - numbers.characterHeight,
    doors = [],
    elements = [],
    frameLength = numbers.frameLength,
    game,
    gravitySwitches = [],
    hasCharacter = true,
    platforms = [],
  }) {
    this.buttons = buttons;
    this.characterStartX = characterStartX;
    this.characterStartY = characterStartY;
    this.doors = doors;
    this.elements = elements;
    this.frameLength = frameLength;
    this.game = game;
    this.gravitySwitches = gravitySwitches;
    this.hasCharacter = hasCharacter;
    this.platforms = platforms;

    Level.count += 1;
  }

  intervalAction = () => {
    this.game.context.clearRect(0, 0, numbers.canvasWidth, numbers.canvasHeight);

    this.elements.forEach((element) => element.update(this.game.context));
    // this.doors.forEach((door) => door.update(this.game.context));
    // this.gravitySwitches.forEach((gravitySwitch) => gravitySwitch.update(this.game.context));
    // this.platforms.forEach((platform) => platform.update(this.game.context));
    this.buttons.forEach((button) => button.update(this.game.context));
    if (this.hasCharacter) {
      this.game.character.update(this.game.context)
    }
    this.game.lastRender = new Date();
  }

}

export default Level;
