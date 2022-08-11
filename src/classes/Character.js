import * as keys from "../constants/keys";
import * as numbers from "../constants/numbers";
import * as utils from "../utils";
import Noun from "./Noun";

class Character extends Noun {
  constructor(options, width, height, x, y, game) {
    super(options, width, height, x, y);
    this.game = game;
    this.speedX = 0;
    this.speedY = 0;
    this.lastLog = new Date();
    this.keysDown = [];
    this.scaleDirectionX = 1;
    this.sprite = null;
    const playerImage = new Image();
    playerImage.src = "/player.png";
    playerImage.onload = () => {
      this.sprite = playerImage;
    };
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  }

  handleKeyDown = (e) => {
    if (!this.keysDown.includes(e.code)) {
      this.keysDown.push(e.code);
    }
  };

  handleKeyUp = (e) => {
    if (this.keysDown.includes(e.code)) {
      this.keysDown = this.keysDown.filter((it) => it !== e.code);
    }
  };

  checkCollisions = () => {
    if (this.south() >= numbers.canvas.height) {
      this.south(numbers.canvas.height);
      this.speedY = 0;
    }
    if (this.east() >= numbers.canvas.width) {
      this.east(numbers.canvas.width);
      this.speedX = 0;
    }
    if (this.x <= 0) {
      this.west(0);
      this.speedX = 0;
    }
    if (this.y <= 0) {
      this.y = 0;
      this.speedY = 0;
    }
  };

  checkYMovement = () => {
    if (this.keysDown.includes(keys.up) || this.keysDown.includes(keys.w)) {
      this.speedY = -1;
    }
    let newSpeedY = this.speedY + numbers.gravity.accelleration;
    if (newSpeedY >= numbers.gravity.max) newSpeedY = numbers.gravity.max;

    const dist = utils.distance(
      this.speedY,
      newSpeedY,
      new Date() - this.game.lastRender
    );
    this.y += dist;
    this.speedY = newSpeedY;
  };

  checkXMovement = () => {
    const length = new Date() - this.game.lastRender;
    const startingSpeed = this.speedX;
    if (this.keysDown.includes(keys.left) || this.keysDown.includes(keys.a)) {
      this.scaleDirectionX = -1;
      this.speedX -= numbers.run.accelleration / length;
    } else if ( // TODO: this prevents both left and right from being clicked at same time
      this.keysDown.includes(keys.right) ||
      this.keysDown.includes(keys.d)
    ) {
      this.scaleDirectionX = 1;
      this.speedX += numbers.run.accelleration / length;
    } else { // TODO: change with the one above
      this.speedX = this.speedX / 1.1 / length; // this is determined by frames and not time
      if (this.speedX < 0.1) this.speedX = 0;
    }
    if (this.speedX >= numbers.run.max) {
      this.speedX = numbers.run.max;
    }
    if (this.speedX <= -numbers.run.max) {
      this.speedX = -numbers.run.max;
    }
    const dist = utils.distance(
      this.speedX,
      startingSpeed,
      new Date() - this.game.lastRender
    );
    this.x += dist;
  };

  update = (context) => {
    this.checkXMovement();
    this.checkYMovement();
    this.checkCollisions();
    context.fillRect(
      this.x,
      this.y,
      this.width,
      this.height,
    );
    this.draw(context);
  };

  draw = (context) => {
    context.save();
    context.scale(this.scaleDirectionX, 1);
    context.drawImage(
      this.sprite,
      numbers.sprite.initialX + numbers.sprite.offset * 0,
      numbers.sprite.initialY + numbers.sprite.offset * 0,
      numbers.sprite.width,
      numbers.sprite.height,
      this.x * this.scaleDirectionX,
      this.y,
      this.width * this.scaleDirectionX,
      this.height,
    );
    context.restore();
  }
}

export default Character;
