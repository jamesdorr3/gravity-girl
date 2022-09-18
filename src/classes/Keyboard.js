import character from './Character';
import * as keys from '../constants/keys';

const jumpKeysByGravity = {
  north: keys.southKeys,
  east: keys.westKeys,
  south: keys.northKeys,
  west: keys.eastKeys,
};

const jumpKeys = () => [
  keys.shift,
  keys.space,
  ...jumpKeysByGravity[character.gravityDirection],
];

class Keyboard {
  constructor() {
    this.isControllable = true;
    this.keysDown = [];

    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  handleKeyDown = (e) => {
    if (this.isControllable) this.keysDown.push(e.code);
    if (keys.scrollKeys.includes(e.code)) e.preventDefault();
  };

  handleKeyUp = (e) => {
    this.keysDown = this.keysDown.filter((it) => it !== e.code);
  };

  isJumpKeyDown = () => jumpKeys().some((key) => this.keysDown.includes(key));

  setIsControllable = (isControllable) => {
    this.isControllable = isControllable;
    if (!isControllable) this.keysDown = [];
  };
}

export default new Keyboard();
