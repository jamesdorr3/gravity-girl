import Element from './Element';
import sfx from './SFX';
import spriteController from './SpriteController';
import game from './Game';
import keyboard from './Keyboard';
import { cardinalDirections } from '../constants/enums';
import { spriteStates } from '../constants/enums';
import {
  distance,
  firstDefined,
  isEastKeyDown,
  isNorthKeyDown,
  isNorthSouth,
  isNum,
  isSouthKeyDown,
  isWestKeyDown,
  sign,
} from '../utils/gameUtils';
import {
  canvasHeight,
  canvasWidth,
  characterHeight,
  characterScale,
  characterWidth,
  gravityAcceleration,
  gravitySlowAcceleration,
  gravitySlowLimit,
  gravityTerminalVelocity,
  jumpAcceleration,
  jumpTime,
  runAcceleration,
  runStopFriction,
  runTerminalVelocity,
  second,
  spriteHeight,
  spriteOffset,
  spriteWidth
} from '../constants/numbers';

const spriteWhitespaceSide = 25 * characterScale;
const spriteWhitespaceTop = 17 * characterScale;
const spriteWhitespace = [spriteWhitespaceSide, spriteWhitespaceTop];

class Character extends Element {
  constructor(info) {
    const gravityDirection = info.gravityDirection || cardinalDirections.south;
    if (!isNorthSouth(gravityDirection)) {
      const { height, width } = info;
      info.height = width;
      info.width = height;
    }
    super(info);

    this.color = 'red';
    this.deathCount = 0;
    this.gravityDirection = gravityDirection;
    this.isAnimated = true;
    this.isGrounded = true;
    this.isJumping = false;
    this.lastLog = new Date();
    this.scaleDirectionX =
      info.scaleDirectionX ||
      (this.gravityDirection === cardinalDirections.west ? -1 : 1);
    this.scaleDirectionY =
      info.scaleDirectionY ||
      (this.gravityDirection === cardinalDirections.north ? -1 : 1);
    this.speedX = 0;
    this.speedY = 0;

    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  acc = (key) => (value) => {
    if (isNum(value)) this[key] = value;
    return this[key];
  };

  changeGravity = (direction = 'south') => {
    this.gravityDirection = direction;
    this.isJumping = false;
    this.isGrounded = false;
    const centerX = this.centerX();
    const centerY = this.centerY();
    if (isNorthSouth(direction)) {
      this.scaleDirectionY = sign();
      this.height = characterHeight;
      this.width = characterWidth;
    } else {
      this.scaleDirectionX = sign();
      this.height = characterWidth;
      this.width = characterHeight;
    }
    this.centerX(centerX);
    this.centerY(centerY);
  };

  draw = (context) => {
    context.shadowBlur = 0;
    context.save();
    context.scale(this.scaleDirectionX, this.scaleDirectionY);
    context.fillStyle = this.isHighJump ? 'lime' : 'red';
    const [spriteOffsetX, spriteOffsetY] = isNorthSouth()
      ? spriteWhitespace
      : [...spriteWhitespace].reverse();
    if (spriteController.sprite) {
      context.drawImage(
        spriteController.sprite,
        // position in sprite
        spriteController.column * spriteOffset,
        0,
        spriteWidth,
        spriteHeight,
        // position in canvas
        this.x * this.scaleDirectionX - spriteOffsetX * this.scaleDirectionX,
        this.y * this.scaleDirectionY - spriteOffsetY * this.scaleDirectionY,
        this.width * this.scaleDirectionX +
          spriteOffsetX * 2 * this.scaleDirectionX,
        this.height * this.scaleDirectionY +
          spriteOffsetY * 2 * this.scaleDirectionY
      );
    }
    //     context.fillRect(
    //   this.x * this.scaleDirectionX,
    //   this.y * this.scaleDirectionY,
    //   this.width * this.scaleDirectionX,
    //   this.height * this.scaleDirectionY
    // );
    context.restore();
  };

  checkCollisions = () => {
    game.level.elements.forEach((element) => {
      if (element.collidesWith(this)) element.action(this);
    });
  };

  doGravity = (position, speed) => {
    const frameLength = game.frameLength();
    let newSpeedY;
    // more time at peak of jump
    if (Math.abs(speed()) < gravitySlowLimit) {
      this.color = 'lime';
      newSpeedY =
        speed() + gravitySlowAcceleration * frameLength * sign();
    } else {
      // normal gravity
      this.color = 'red';
      newSpeedY = speed() + gravityAcceleration * frameLength * sign();
    }

    if (Math.abs(newSpeedY) >= gravityTerminalVelocity) {
      newSpeedY = gravityTerminalVelocity * sign();
    }

    const dist = distance(speed(), newSpeedY, frameLength * second);
    position(position() + dist);
    speed(newSpeedY);
  };

  gravityController = () => {
    if (
      this.gravityDirection === cardinalDirections.north ||
      this.gravityDirection === cardinalDirections.south
    ) {
      this.doGravity(this.north, this.acc('speedY'));
    } else if (
      this.gravityDirection === cardinalDirections.east ||
      this.gravityDirection === cardinalDirections.west
    ) {
      this.doGravity(this.west, this.acc('speedX'));
    }
  };

  checkJump = (jumpSpeedKey, runSpeedKey) => {
    const jumpSpeed = this.acc(jumpSpeedKey);
    // const runSpeed = this.acc(runSpeedKey);
    if (keyboard.isJumpKeyDown()) {
      if (this.isGrounded) {
        spriteController.state = 'jump';
        this.isGrounded = false;
        sfx.play('jump');
        // this.isHighJump = Math.abs(runSpeed()) === runTerminalVelocity;
        this.isJumping = new Date();
      }
      if (this.isJumping) {
        if (new Date() - this.isJumping < jumpTime) {
          jumpSpeed(-jumpAcceleration * sign());
        } else {
          this.isJumping = false;
        }
      }
    } else if (this.isJumping) {
      this.isJumping = false;
    }
  };

  checkWallCollisions = () => {
    if (this.south() >= canvasHeight) {
      this.south(0);
      this.speedY = 0;
      if (
        !this.isGrounded &&
        this.gravityDirection === cardinalDirections.south
      ) {
        this.isGrounded = true;
        sfx.play('land');
      }
    }
    if (this.east() >= canvasWidth) {
      this.east(0);
      this.speedX = 0;
      if (
        !this.isGrounded &&
        this.gravityDirection === cardinalDirections.east
      ) {
        this.isGrounded = true;
        sfx.play('land');
      }
    }
    if (this.x <= 0) {
      this.west(0);
      this.speedX = 0;
      if (
        !this.isGrounded &&
        this.gravityDirection === cardinalDirections.west
      ) {
        this.isGrounded = true;
        sfx.play('land');
      }
    }
    if (this.y <= 0) {
      this.y = 0;
      this.speedY = 0;
      if (
        !this.isGrounded &&
        this.gravityDirection === cardinalDirections.north
      ) {
        this.isGrounded = true;
        sfx.play('land');
      }
    }
  };

  friction = (speed) => {
    const airFrictionReduction = this.isGrounded ? 1 : 2;
    const direction = speed() === Math.abs(speed()) ? 1 : -1;
    return (
      runStopFriction * game.frameLength() * direction / airFrictionReduction
    )
  };

  run = (scaleDirection, sign, speed, length) => {
    if (this.isGrounded) {
      spriteController.state = spriteStates.run;
    }
    this[scaleDirection] =
      sign * (isNorthSouth(this.gravityDirection) ? 1 : -1); // TODO: reverse sideways sprites;
    const direction = speed() === Math.abs(speed()) ? 1 : -1;
    const friction = direction === sign ? 0 : this.friction(speed);
    speed(speed() + runAcceleration * length * sign - friction);
  };

  runController = (
    speed,
    runKeyPlus,
    runKeyMinus,
    scaleDirection,
    position
  ) => {
    const length = game.frameLength();
    const startingSpeed = speed();
    const isRunPlus = runKeyPlus(keyboard.keysDown);
    const isRunMinus = runKeyMinus(keyboard.keysDown);
    const isBothDown = isRunPlus && isRunMinus;
    const isNeitherDown = !isRunPlus && !isRunMinus;
    if (isNeitherDown || isBothDown) {
      if (startingSpeed) speed(speed() - this.friction(speed));
      if (Math.abs(speed()) < 0.1) {
        if (this.isGrounded && keyboard.isControllable)
          spriteController.state = spriteStates.rest;
        speed(0);
      }
    } else {
      this.run(scaleDirection, isRunPlus ? 1 : -1, speed, length);
    }

    if (Math.abs(speed()) >= runTerminalVelocity) {
      const direction = speed() === Math.abs(speed()) ? 1 : -1;
      speed(runTerminalVelocity * direction);
    }
    const dist = distance(speed(), startingSpeed, new Date() - game.lastRender);
    position(position() + dist);
  };

  xMovementController = () => {
    if (this.gravityDirection === cardinalDirections.east) {
      this.checkJump('speedX', 'speedY');
    } else if (this.gravityDirection === cardinalDirections.west) {
      this.checkJump('speedX', 'speedY');
    } else {
      this.runController(
        this.acc('speedX'),
        isEastKeyDown,
        isWestKeyDown,
        'scaleDirectionX',
        this.west
      );
    }
  };

  yMovementController = () => {
    if (this.gravityDirection === cardinalDirections.north) {
      this.checkJump('speedY', 'speedX');
    } else if (this.gravityDirection === cardinalDirections.south) {
      this.checkJump('speedY', 'speedX');
    } else {
      this.runController(
        this.acc('speedY'),
        isSouthKeyDown,
        isNorthKeyDown,
        'scaleDirectionY',
        this.north
      );
    }
  };

  leftRight = (value) => {
    if (isNorthSouth(this.gravityDirection)) {
      return this.acc('scaleDirectionX')(value);
    } else {
      return this.acc('scaleDirectionY')(value);
    }
  };

  reset = (info) => {
    this.height = info.height || characterHeight;
    this.changeGravity(info.gravityDirection || cardinalDirections.south);
    this.isAnimated = firstDefined(info.isAnimated, true);
    keyboard.setIsControllable(firstDefined(info.isControllable, true));
    this.speedX = info.speedX || 0;
    this.speedY = info.speedY || 0;
    this.width = info.width || characterWidth;
    this.x = info.x || 0;
    this.y = info.y || canvasHeight - characterHeight;
    spriteController.column = 100;
  };

  topBottom = (value) => {
    if (isNorthSouth(this.gravityDirection)) {
      return this.acc('scaleDirectionY')(value);
    } else {
      return this.acc('scaleDirectionX')(value);
    }
  };

  update = (context) => {
    this.xMovementController();
    this.yMovementController();
    this.gravityController();
    this.checkCollisions();
    this.checkWallCollisions();
    if (
      Math.abs(
        isNorthSouth(this.gravityDirection) ? this.speedY : this.speedX
      ) > 0
    ) {
      this.isGrounded = false;
    }
    if (this.isAnimated) {
      spriteController.update();
    }
    this.draw(context);
  };
}

export default new Character({
  height: characterHeight,
  west: 0,
  south: 0,
  width: characterWidth,
});
