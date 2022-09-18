import character from './Character';
import game from './Game';
import keyboard from './Keyboard';
import * as numbers from '../constants/numbers';

class Level {

  static count = 0;

  constructor({
    buttons = [],
    characterStartX = 0,
    characterStartY = numbers.canvasHeight - numbers.characterHeight,
    elements = [],
    hasCharacter = true,
    hasTitle = true,
    isCharacterControllable = true,
    name,
    texts = [],
  }) {
    this.buttons = buttons;
    this.characterStartX = characterStartX;
    this.characterStartY = characterStartY;
    this.elements = elements;
    this.hasCharacter = hasCharacter;
    this.hastitle = hasTitle;
    this.name = name;
    this.texts = texts;

    Level.count += 1;
    if (!isCharacterControllable) keyboard.setIsControllable(false);
  }

  intervalAction = () => {
    game.context.clearRect(0, 0, numbers.canvasWidth, numbers.canvasHeight);

    const toRender = [...this.texts, ...this.elements, ...this.buttons];
    if (this.hasCharacter) toRender.push(character);
    toRender.forEach((it) => it.update(game.context));

    game.lastRender = new Date();
  }

}

export default Level;
