// independent variables
export const buttonPadding = 20;
export const canvasHeight = 900; // 270 visually?
export const canvasWidth = 1600; // 480 visually?
export const characterScale = 3;
export const gameSpeed = 1; // 1 is real time;
export const hallHeightLarge = 250;
export const hallHeightSmall = 100;
export const jumpSpeed = 0.35;
export const platformBreadth = 25;
export const second = 1000;
export const spikeWidth = 100;
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
export const doorHeight = 30 * characterScale;
export const doorWidth = 20 * characterScale;
export const frameLength = second / 30;
export const frameLengthMenu = second / 10;
export const gravityAcceleration = 8 / pixelsPerMeter;
export const gravitySlowAcceleration = gravityAcceleration / 3;
export const gravitySlowLimit = gravitySlowAcceleration / 4;
export const gravityTerminalVelocity = gravityAcceleration / 3;
export const jumpTime = second / 3;
export const readyScreenTime = second * 3;
export const runAcceleration = characterWidth / 8 / pixelsPerMeter;
export const runStopFriction = runAcceleration * 4;
export const runTerminalVelocity = runAcceleration / 3;

