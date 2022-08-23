// independent variables
export const buttonPadding = 20;
export const canvasHeight = 900; // 270 visually?
export const canvasWidth = 1600; // 480 visually?
export const characterScale = 3;
export const gameSpeed = 1; // 1 is real time;
export const gravitySwitchPadding = 10;
export const hallHeightLarge = 250;
export const hallHeightMedium = 150;
export const hallHeightSmall = 100;
export const jumpSpeed = 0.35;
export const jumpSpeedSlow = 0.25;
export const platformBreadth = 25;
export const second = 1000;
export const spikeHeight = 55;
export const spikeWidth = 100;
export const spriteInitialX = 0; // 17;
export const spriteInitialY = 0; // 20;
export const spriteHeight = 144; // 23;
export const spriteOffset = 144; // 48;
export const spriteWidth = 144; // 15;

// hoisted dependent variables
export const characterHeight = 22 * characterScale; // was 63, now 38 
export const pixelsPerMeter = 6;

// dependent variables
export const characterWidth = 11 * characterScale; // was 45, now 13
export const doorHeight = 30 * characterScale;
export const doorWidth = 20 * characterScale;
export const frameLength = second / 60; //////////////////////////////////
export const frameLengthMenu = second / 10;
export const gravityAcceleration = 8 / pixelsPerMeter;
export const gravitySlowAcceleration = gravityAcceleration / 3;
export const gravitySlowLimit = gravitySlowAcceleration / 4;
export const gravityTerminalVelocity = gravityAcceleration / 3;
export const jumpTime = second / 3;
export const readyScreenTime = second * 3;
export const runAcceleration = characterWidth / 7 / pixelsPerMeter;
export const runStopFriction = runAcceleration * 3 / 4;
export const runTerminalVelocity = runAcceleration / 3;

