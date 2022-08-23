import Element from './Element';
import { cardinalDirections } from '../constants/enums';
import * as gameUtils from '../utils/gameUtils';
import * as numbers from '../constants/numbers';

const spriteWhitespaceSide = 25;
const spriteWhitespaceTop = 16;
const spriteWhitespace = [spriteWhitespaceSide, spriteWhitespaceTop];

class Character extends Element {
  constructor(info) {
    super(info);

    this.color = 'red';
    this.deathCount = 0;
    this.game = info.game;
    this.gravityDirection = info.gravityDirection || cardinalDirections.south;
    this.isGrounded = false;
    this.isJumping = false;
    this.isPaused = false;
    this.keysDown = [];
    this.lastLog = new Date();
    this.scaleDirectionX = 1;
    this.scaleDirectionY = 1;
    this.speedX = 0;
    this.speedY = 0;
    this.sprite = null;
    this.spriteColumn = 13;

    const playerImage = new Image();
    playerImage.src = '/gravity-girl-sprite.png';
    playerImage.onload = () => {
      this.sprite = playerImage;
    };
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  acc = (key) => (value) => {
    if (gameUtils.isNum(value)) this[key] = value;
    return this[key];
  };

  draw = (context) => {
    context.save();
    context.scale(this.scaleDirectionX, this.scaleDirectionY);
    context.fillStyle = this.isHighJump ? 'lime' : 'red';
    context.fillRect(
      this.x * this.scaleDirectionX,
      this.y * this.scaleDirectionY,
      this.width * this.scaleDirectionX,
      this.height * this.scaleDirectionY
    );
    const isGravityY = gameUtils.isGravityY(this.gravityDirection);
    const [spriteOffsetX, spriteOffsetY] = isGravityY ? [...spriteWhitespace].reverse() : spriteWhitespace;
    if (this.sprite) {
      context.drawImage(
        this.sprite,
        // in sprite file
        numbers.spriteInitialX + numbers.spriteOffset * this.spriteColumn,
        numbers.spriteInitialY,
        numbers.spriteWidth,
        numbers.spriteHeight,
        // in canvas
        this.x * this.scaleDirectionX - spriteOffsetX * this.scaleDirectionX,
        this.y * this.scaleDirectionY - spriteOffsetY * this.scaleDirectionY,
        this.width * this.scaleDirectionX + spriteOffsetX * 2 * this.scaleDirectionX,
        this.height * this.scaleDirectionY + spriteOffsetY * 2 * this.scaleDirectionY
      );
    }
    // context.fillStyle = '';
    // context.fillRect(
    //   this.x * this.scaleDirectionX + 25,
    //   this.y * this.scaleDirectionY + 15,
    //   this.width * this.scaleDirectionX - 50,
    //   this.height * this.scaleDirectionY - 25,
    // // );
    // context.fillRect(
    //   this.x * this.scaleDirectionX,
    //   this.y * this.scaleDirectionY,
    //   this.width * this.scaleDirectionX,
    //   this.height * this.scaleDirectionY
    // );
    context.restore();
  };

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
    this.game.level.elements.forEach((element) => {
      if (element.collidesWith(this)) element.action(this);
    });
  };

  doGravity = (position, speed) => {
    const frameLength = this.game.frameLength();
    const sign = this.sign();
    let newSpeedY;
    // more time at peak of jump
    if (Math.abs(speed()) < numbers.gravitySlowLimit) {
      this.color = 'lime';
      newSpeedY =
        speed() + numbers.gravitySlowAcceleration * frameLength * sign;
    } else {
      // normal gravity
      this.color = 'red';
      newSpeedY = speed() + numbers.gravityAcceleration * frameLength * sign;
    }

    if (Math.abs(newSpeedY) >= numbers.gravityTerminalVelocity) {
      newSpeedY = numbers.gravityTerminalVelocity * sign;
    }

    const dist = gameUtils.distance(
      speed(),
      newSpeedY,
      frameLength * numbers.second
    );
    position(position() + dist);
    speed(newSpeedY);
    if (Math.abs(newSpeedY) > 0) {
      this.isGrounded = false;
    }
  };

  checkGravity = () => {
    if (
      this.gravityDirection === cardinalDirections.north ||
      this.gravityDirection === cardinalDirections.south
      ) {
        this.doGravity(this.north, this.acc('speedY'))
    } else if (
      this.gravityDirection === cardinalDirections.east ||
      this.gravityDirection === cardinalDirections.west
      ) {
        this.doGravity(this.west, this.acc('speedX'))
    }
  };

  checkJump = (jumpSpeedKey, jumpKeyName, runSpeedKey) => {
    const jumpSpeed = this.acc(jumpSpeedKey);
    const runSpeed = this.acc(runSpeedKey);
    const isJumpPressed =
      gameUtils[jumpKeyName](this.keysDown) ||
      gameUtils.isJumpKeyDown(this.keysDown);
    if (isJumpPressed) {
      if (this.isGrounded) {
        this.isGrounded = false;
        this.isHighJump = Math.abs(runSpeed()) === numbers.runTerminalVelocity;
        this.isJumping = new Date();
      }
      if (this.isJumping) {
        if (new Date() - this.isJumping < numbers.jumpTime) {
          const jumpAcceleration = this.isHighJump ? numbers.jumpSpeed : numbers.jumpSpeedSlow;
          jumpSpeed(-jumpAcceleration * this.sign());
        } else {
          this.isJumping = false;
        }
      }
    } else if (this.isJumping) {
      this.isJumping = false;
    }
  };

  checkWallCollisions = () => {
    if (this.south() >= numbers.canvasHeight) {
      this.south(numbers.canvasHeight);
      this.speedY = 0;
      if (this.gravityDirection === cardinalDirections.south) {
        this.isGrounded = true;
      }
    }
    if (this.east() >= numbers.canvasWidth) {
      this.east(numbers.canvasWidth);
      this.speedX = 0;
      if (this.gravityDirection === cardinalDirections.east) {
        this.isGrounded = true;
      }
    }
    if (this.x <= 0) {
      this.west(0);
      this.speedX = 0;
      if (this.gravityDirection === cardinalDirections.west) {
        this.isGrounded = true;
      }
    }
    if (this.y <= 0) {
      this.y = 0;
      this.speedY = 0;
      if (this.gravityDirection === cardinalDirections.north) {
        this.isGrounded = true;
      }
    }
  };

  run = (scaleDirection, sign, speed, length) => {
    this[scaleDirection] = sign * (gameUtils.isGravityY(this.gravityDirection) ? -1 : 1); // TODO: reverse sideways sprites;
    const direction = speed() === Math.abs(speed()) ? 1 : -1;
    const friction = direction === sign ? 0 : numbers.runStopFriction * length * direction;
    speed(speed() + numbers.runAcceleration * length * sign - friction);

    // if (speed() * sign < 0) speed(speed() - numbers.runStopFriction * length); // causing slippery bug?
  };

  checkRun = (speed, runKeyPlus, runKeyMinus, scaleDirection, position) => {
    const length = this.game.frameLength();
    const startingSpeed = speed();
    const isRunPlus = gameUtils[runKeyPlus](this.keysDown);
    const isRunMinus = gameUtils[runKeyMinus](this.keysDown);
    const isBothDown = isRunPlus && isRunMinus;
    const isNeitherDown = !isRunPlus && !isRunMinus;
    if (isNeitherDown || isBothDown) {
      const direction = speed() === Math.abs(speed()) ? 1 : -1;
      if (startingSpeed) speed(speed() - numbers.runStopFriction * length * direction);
      if (Math.abs(speed()) < 0.2) speed(0);
    } else {
      this.run(scaleDirection, isRunPlus ? 1 : -1, speed, length);
    }

    if (Math.abs(speed()) >= numbers.runTerminalVelocity) {
      const direction = speed() === Math.abs(speed()) ? 1 : -1;
      speed(numbers.runTerminalVelocity * direction);
    }
    const dist = gameUtils.distance(
      speed(),
      startingSpeed,
      new Date() - this.game.lastRender
    );
    position(position() + dist);
  };

  checkXMovement = () => {
    if (this.gravityDirection === cardinalDirections.east) {
      this.checkJump('speedX', 'isWestKeyDown', 'speedY');
    } else if (this.gravityDirection === cardinalDirections.west) {
      this.checkJump('speedX', 'isEastKeyDown', 'speedY');
    } else {
      this.checkRun(
        this.acc('speedX'),
        'isEastKeyDown',
        'isWestKeyDown',
        'scaleDirectionX',
        this.west
      );
    }
  };

  checkYMovement = () => {
    if (this.gravityDirection === cardinalDirections.north) {
      this.checkJump('speedY', 'isSouthKeyDown', 'speedX');
    }
    else if (this.gravityDirection === cardinalDirections.south) {
      this.checkJump('speedY', 'isNorthKeyDown', 'speedX');
    }
    else {
      this.checkRun(
        this.acc('speedY'),
        'isSouthKeyDown',
        'isNorthKeyDown',
        'scaleDirectionY',
        this.north
      );
    }
  };

  reset = (x = 0, y = numbers.canvasHeight - numbers.characterHeight) => {
    this.gravityDirection = cardinalDirections.south;
    this.scaleDirectionX = 1;
    this.scaleDirectionY = 1;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
  };

  sign = (direction = this.gravityDirection) => {
    switch (direction) {
      case cardinalDirections.north:
        return -1;
      case cardinalDirections.west:
        return -1;
      default: // east and south
        return 1;
    }
  };

  update = (context) => {
    if (!this.isPaused) {
      this.checkXMovement();
      this.checkYMovement();
      this.checkGravity();
      this.checkCollisions();
      this.checkWallCollisions();
    }
    this.draw(context);
  };
}

export default Character;