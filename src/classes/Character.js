import Noun from './Noun';
import Platform from './Platform';
import * as enums from '../constants/enums';
import * as keys from '../constants/keys';
import * as numbers from '../constants/numbers';
import * as gameUtils from '../utils/gameUtils';

class Character extends Noun {
  constructor(options, width, height, x, y, game) {
    super(options, width, height, x, y);

    this.game = game;
    this.gravityDirection = enums.gravityDirections.south;
    this.isGrounded = false;
    this.isJumping = false;
    this.keysDown = [];
    this.lastLog = new Date();
    this.scaleDirectionX = 1;
    this.speedX = 0;
    this.speedY = 0;
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
    if (this.south() > numbers.canvasHeight) {
      this.south(numbers.canvasHeight);
      this.speedY = 0;
      if (this.gravityDirection === enums.gravityDirections.south) {
        this.isGrounded = true;
      }
    }
    if (this.east() > numbers.canvasWidth) {
      this.east(numbers.canvasWidth);
      this.speedX = 0;
    }
    if (this.x < 0) {
      this.west(0);
      this.speedX = 0;
    }
    if (this.y < 0) {
      this.y = 0;
      this.speedY = 0;
    }
    Platform.all.forEach((platform) => {
      if (platform.isCollision(this)) {
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
          actionY = () => {
            this.south(platform.north());
            this.isGrounded = true;
          };
        } else {
          mostY = this.north() - platform.south();
          actionY = () => {
            this.north(platform.south());
            this.isJumping = false;
          };
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
      if (this.isGrounded) {
        this.isGrounded = false;
        this.isJumping = new Date();
      }
      if (this.isJumping) {
        // if (this.speedY === 0) {
        //   this.speedY = -0.7;
        // }
        if (new Date() - this.isJumping < numbers.second / 3) {
          this.speedY = -numbers.jumpSpeed;
        } else {
          console.log('stop');
          this.isJumping = false;
        }
      }
    } else if (this.isJumping) {
      this.isJumping = false;
      // this.speedY = 0;
    }
    let newSpeedY =
      this.speedY + numbers.gravityAcceleration * this.game.frameLength(); // TODO: this is per frame, not per secon
    if (newSpeedY >= numbers.gravityTerminalVelocity)
      newSpeedY = numbers.gravityTerminalVelocity;

    const dist = gameUtils.distance(
      this.speedY,
      newSpeedY,
      (new Date() - this.game.lastRender) * numbers.gameSpeed
    );
    this.y += dist;
    this.speedY = newSpeedY;
    if (newSpeedY > 0) {
      this.isGrounded = false;
    }
  };

  checkXMovement = () => {
    const length = this.game.frameLength();
    const startingSpeed = this.speedX;
    const keyWest = gameUtils.keyWest(this.keysDown, this.gravityDirection);
    const keyEast = gameUtils.keyEast(this.keysDown, this.gravityDirection);
    if (keyWest) {
      this.scaleDirectionX = -1;
      this.speedX -= numbers.runAcceleration * length;
      if (this.speedX > 0) this.speedX -= numbers.runStopFriction * length
    }
    if (keyEast) {
      this.scaleDirectionX = 1;
      this.speedX += numbers.runAcceleration * length;
      if (this.speedX < 0) this.speedX += numbers.runStopFriction * length
    }

    const direction = this.speedX === Math.abs(this.speedX) ? 1 : -1;
    if (!keyWest && !keyEast) {
      this.speedX = this.speedX - numbers.runStopFriction * length * direction;
      if (Math.abs(this.speedX) < 0.1) this.speedX = 0;
    }
    if (this.speedX >= numbers.runTerminalVelocity) {
      this.speedX = numbers.runTerminalVelocity;
    }
    if (this.speedX <= -numbers.runTerminalVelocity) {
      this.speedX = -numbers.runTerminalVelocity;
    }
    const dist = gameUtils.distance(
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
    this.draw(context);
  };

  draw = (context) => {
    context.save();
    context.scale(this.scaleDirectionX, 1);
    context.fillStyle = this.isGrounded ? 'lime' : 'red';
    context.fillRect(
      this.x * this.scaleDirectionX,
      this.y,
      this.width * this.scaleDirectionX,
      this.height
    );
    context.drawImage(
      this.sprite,
      numbers.spriteInitialX + numbers.spriteOffset * 0,
      numbers.spriteInitialY + numbers.spriteOffset * 0,
      numbers.spriteWidth,
      numbers.spriteHeight,
      this.x * this.scaleDirectionX,
      this.y,
      this.width * this.scaleDirectionX,
      this.height
    );
    context.restore();
  };
}

export default Character;
