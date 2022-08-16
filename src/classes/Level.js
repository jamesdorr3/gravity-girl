import * as numbers from '../constants/numbers';

class Level {

  static count = 0;

  constructor({
    buttons = [],
    characterStartX = 0,
    characterStartY = numbers.canvasHeight - numbers.characterHeight,
    elements = [],
    frameLength = numbers.frameLength,
    game,
    hasCharacter = true,
    name,
    texts = [],
  }) {
    this.buttons = buttons;
    this.characterStartX = characterStartX;
    this.characterStartY = characterStartY;
    this.elements = elements;
    this.frameLength = frameLength;
    this.game = game;
    this.hasCharacter = hasCharacter;
    this.name = name;
    this.texts = texts;

    Level.count += 1;
  }

  intervalAction = () => {
    this.game.context.clearRect(0, 0, numbers.canvasWidth, numbers.canvasHeight);

    const toRender = [...this.texts, ...this.elements, ...this.buttons];
    if (this.hasCharacter) toRender.push(this.game.character);
    toRender.forEach((it) => it.update(this.game.context));

    this.game.lastRender = new Date();
  }

}

export default Level;
