import Element from './Element';
import { cardinalDirections } from '../constants/enums';
import * as gameUtils from '../utils/gameUtils';
import * as numbers from '../constants/numbers';

class Character extends Element {
  constructor(info) {
    super(info);

    this.color = 'red';
    this.deaths = 0;
    this.game = info.game;
    this.gravityDirection = info.gravityDirection || cardinalDirections.south;
    this.isGrounded = false;
    this.isJumping = false;
    this.keysDown = [];
    this.lastLog = new Date();
    this.scaleDirectionX = 1;
    this.scaleDirectionY = 1;
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

  acc = (key) => (value) => {
    if (value) this[key] = value;
    return this[key];
  };

  draw = (context) => {
    context.save();
    context.scale(this.scaleDirectionX, this.scaleDirectionY);
    context.fillStyle = this.color; //this.speedY === numbers.gravityTerminalVelocity ? 'green' : 'red';
    context.fillRect(
      this.x * this.scaleDirectionX,
      this.y * this.scaleDirectionY,
      this.width * this.scaleDirectionX,
      this.height * this.scaleDirectionY
    );
    if (this.sprite) {
      context.drawImage(
        this.sprite,
        numbers.spriteInitialX + numbers.spriteOffset * 0,
        numbers.spriteInitialY + numbers.spriteOffset * 0,
        numbers.spriteWidth,
        numbers.spriteHeight,
        this.x * this.scaleDirectionX,
        this.y * this.scaleDirectionY,
        this.width * this.scaleDirectionX,
        this.height * this.scaleDirectionY
      );
    }
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

  checkGravity = (position, speed) => {
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

  checkJump = (speedKey, jumpKeyName) => {
    const speed = this.acc(speedKey);
    const isJumpPressed =
      gameUtils[jumpKeyName](this.keysDown) ||
      gameUtils.isJumpKeyDown(this.keysDown);
    if (isJumpPressed) {
      if (this.isGrounded) {
        this.isGrounded = false;
        this.isJumping = new Date();
      }
      if (this.isJumping) {
        if (new Date() - this.isJumping < numbers.jumpTime) {
          speed(-numbers.jumpSpeed * this.sign());
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

  checkXMovement = () => {
    const length = this.game.frameLength();
    const startingSpeed = this.speedX;
    const isWestKeyDown = gameUtils.isWestKeyDown(this.keysDown, this.gravityDirection);
    const isEastKeyDown = gameUtils.isEastKeyDown(this.keysDown, this.gravityDirection);
    if (isWestKeyDown) {
      this.scaleDirectionX = -1;
      this.speedX -= numbers.runAcceleration * length;
      if (this.speedX > 0) this.speedX -= numbers.runStopFriction * length;
    }
    if (isEastKeyDown) {
      this.scaleDirectionX = 1;
      this.speedX += numbers.runAcceleration * length;
      if (this.speedX < 0) this.speedX += numbers.runStopFriction * length;
    }

    const direction = this.speedX === Math.abs(this.speedX) ? 1 : -1;
    if (!isWestKeyDown && !isEastKeyDown) {
      this.speedX = this.speedX - numbers.runStopFriction * length * direction;
      if (Math.abs(this.speedX) < 0.2) this.speedX = 0;
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

  checkYMovement = () => {
    // if jumpKey
    // jumpDirection, jumpSpeed
    if (this.gravityDirection === cardinalDirections.north) {
      this.checkJump('speedY', 'isSouthKeyDown');
    }
    if (this.gravityDirection === cardinalDirections.south) {
      this.checkJump('speedY', 'isNorthKeyDown');
    }
    // if (gameUtils.keyJump(this.keysDown, this.gravityDirection)) {
    //   if (this.isGrounded) {
    //     this.isGrounded = false;
    //     this.isJumping = new Date();
    //   }
    //   if (this.isJumping) {
    //     if (new Date() - this.isJumping < numbers.jumpTime) {
    //       this.speedY = -numbers.jumpSpeed * this.sign();
    //     } else {
    //       this.isJumping = false;
    //     }
    //   }
    // } else if (this.isJumping) {
    //   this.isJumping = false;
    // }

    this.checkGravity(this.north, this.acc('speedY'));
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
    this.checkXMovement();
    this.checkYMovement();
    this.checkCollisions();
    this.checkWallCollisions();
    this.draw(context);
  };
}

export default Character;

/* 

1--------------------------------------
movementX
  if gravity === east or west
    jump(speedX, +-1)
  else
    run(speedX, +-1)

movementY
  if gravity === north or south
    jump(speedY, +-1)
  else
    run(speedY, +-1)

2--------------------------------------
determine action for north
  if gravity === south, jump
  if gravity === east, run
  if graivty === west, run

if pressed North key
  determine action for north

3--------------------------------------
{
  // gravity
  south: {
    // key
    north: {

    }
  }
}

*/
