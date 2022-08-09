import * as keys from "../constants/keys";
import * as numbers from "../constants/numbers";
import * as utils from '../utils';

class Character {

  constructor(width, height, color, x, y, game) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = game.canvas.height - this.height;
    this.speedX = 0;
    this.speedY = 0;
    this.lastLog = new Date();
    this.keysDown = [];
    this.sprite = null;
    const playerImage = new Image();
    playerImage.src = '/player.png';
    playerImage.onload = () => {
      this.sprite = playerImage;
    };
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  north = (y) => {
    if (y) this.y = y;
    return this.y;
  }

  east = (x) => {
    if (x) this.x = x - this.width;
    return this.x + this.width;
  }

  south = (y) => {
    if (y) this.y = y - this.height;
    return this.y + this.height;
  }

  west = (x) => {
    if (typeof x === 'number') this.x = x;
    return this.x
  }

  handleKeyDown = (e) => {
    if (!this.keysDown.includes(e.code)) {
      this.keysDown.push(e.code)
    }
  }

  handleKeyUp = (e) => {
    if (this.keysDown.includes(e.code)) {
      this.keysDown = this.keysDown.filter((it) => (
        it !== e.code
      ))
    }
  }

  checkCollisions = () => {
    if (this.south() >= numbers.canvasHeight) {
      this.south(numbers.canvasHeight);
      this.speedY = 0;
    }
    if (this.east() >= numbers.canvasWidth) {
      this.east(numbers.canvasWidth);
      this.speedX = 0;
    }
    if (this.x <= 0) {
      this.west(0);
      this.speedX = 0;
    }
  };

  checkYMovement = () => {
    if (this.keysDown.includes(keys.up) || this.keysDown.includes(keys.w)) {
      this.speedY = -1;
    }
    const dist = utils.distance(this.speedY, this.speedY + numbers.gravity, new Date() - this.game.lastRender);
    this.y +=  dist;
    this.speedY += numbers.gravity;
  }

  checkXMovement = () => {
    const startingSpeed = this.speedX;
    if (this.keysDown.includes(keys.left) || this.keysDown.includes(keys.a)) {
      this.speedX -= numbers.runAccelleration;
    }
    if (this.keysDown.includes(keys.right) || this.keysDown.includes(keys.d)) {
      this.speedX += numbers.runAccelleration;
    }
    const dist = utils.distance(this.speedX, startingSpeed, new Date() - this.game.lastRender);
    this.x += dist;
  }

  update = () => {
    this.checkXMovement();
    this.checkYMovement();
    this.checkCollisions();
  };

}

export default Character;
