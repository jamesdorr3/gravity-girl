// independent variables
export const canvasHeight = 900;
export const canvasWidth = 1600;
export const characterScale = 5;
export const gameSpeed = 1; // 1 is real time;
export const jumpSpeed = 0.6;
export const second = 1000;
export const spriteInitialX = 17;
export const spriteInitialY = 20;
export const spriteHeight = 23;
export const spriteOffset = 48;
export const spriteWidth = 15;

// hoisted dependent variables
export const characterHeight = 21 * characterScale;
export const pixelsPerMeter = characterHeight / 10; // why 10?

// dependent variables
export const characterWidth = 15 * characterScale;
export const frameLength = second / 60;
export const gravityAcceleration = 9.8 * 2 / pixelsPerMeter; // like
export const gravityTerminalVelocity = gravityAcceleration * 2 / 3; // like
export const runAcceleration = 10 / pixelsPerMeter;
export const runStopFriction = runAcceleration * 3;
export const runTerminalVelocity = runAcceleration * .75;

