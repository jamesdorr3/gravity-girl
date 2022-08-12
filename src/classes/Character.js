import Noun from './Noun';
import Platform from './Platform';
import * as keys from '../constants/keys';
import * as numbers from '../constants/numbers';
import * as utils from '../utils';

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
    playerImage.src = '/player.png';
    playerImage.onload = () => {
      this.sprite = playerImage;
    };
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
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
    Platform.all.forEach((platform) => {
      const isCollision =
        platform.hasPoint(this.west(), this.north()) ||
        platform.hasPoint(this.east(), this.north()) ||
        platform.hasPoint(this.east(), this.south()) ||
        platform.hasPoint(this.west(), this.south());
      if (isCollision) {
        const isMovingEast = this.speedX === Math.abs(this.speedX);
        const isMovingSouth = this.speedY === Math.abs(this.speedY);
        let mostX, mostY, actionX, actionY;
        if (isMovingEast) {
          mostX = this.east() - platform.west();
          actionX = () => this.east(platform.west());
        } else {
          mostX = this.west() - platform.east();
          actionX = () => this.west(platform.east());
        }
        if (isMovingSouth) {
          mostY = this.south() - platform.north();
          actionY = () => this.south(platform.north());
        } else {
          mostY = this.north() - platform.south();
          actionY = () => this.north(platform.south());
        }
        if (Math.abs(mostX) > Math.abs(mostY)) {
          actionY();
          this.speedY = 0;
        } else {
          actionX();
          this.speedX = 0;
        }
        // console.log({
        //   platform: {
        //     north: platform.north(),
        //     east: platform.east(),
        //     south: platform.south(),
        //     west: platform.west(),
        //   },
        //   character: {
        //     north: this.north(),
        //     east: this.east(),
        //     south: this.south(),
        //     west: this.west(),
        //   },
        // });
      }
    });
  };

  checkYMovement = () => {
    if (this.keysDown.includes(keys.up) || this.keysDown.includes(keys.w)) {
      this.speedY = -1;
    }
    let newSpeedY = this.speedY + numbers.gravity.acceleration;
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
    const length = (new Date() - this.game.lastRender) / numbers.second;
    const direction = this.speedX === Math.abs(this.speedX) ? 1 : -1;
    const startingSpeed = this.speedX;
    if (this.keysDown.includes(keys.left) || this.keysDown.includes(keys.a)) {
      this.scaleDirectionX = -1;
      this.speedX -= numbers.run.acceleration * length;
    } else if (
      // TODO: this prevents both left and right from being clicked at same time
      this.keysDown.includes(keys.right) ||
      this.keysDown.includes(keys.d)
    ) {
      this.scaleDirectionX = 1;
      this.speedX += numbers.run.acceleration * length;
    } else {
      // TODO: change with the one above
      this.speedX = this.speedX - numbers.run.stopFriction * length * direction;
      if (Math.abs(this.speedX) < 0.1) this.speedX = 0;
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
    // console.log({ south: this.south(), north: this.north() })
    this.draw(context);
  };

  draw = (context) => {
    context.save();
    context.scale(this.scaleDirectionX, 1);
    // context.fillRect(
    //   this.x * this.scaleDirectionX,
    //   this.y,
    //   this.width * this.scaleDirectionX,
    //   this.height
    // );
    context.drawImage(
      this.sprite,
      numbers.sprite.initialX + numbers.sprite.offset * 0,
      numbers.sprite.initialY + numbers.sprite.offset * 0,
      numbers.sprite.width,
      numbers.sprite.height,
      this.x * this.scaleDirectionX,
      this.y,
      this.width * this.scaleDirectionX,
      this.height
    );
    context.restore();
  };
}

export default Character;
