export const second = 1000;

export const canvas = {
  height: 900,
  width: 1600,
}

const characterScale = 5;
export const character = {
  height: 21 * characterScale,
  width: 15 * characterScale,
}

export const fps = 30;

export const gravity = {
  acceleration: 0.05,
  max: 1,
}

export const refreshLength = second / fps;

export const run = {
  acceleration: 1,
  stopFriction: 1,
  max: .75,
}

export const sprite = {
  initialX: 17,
  initialY: 20,
  height: 23,
  offset: 48,
  width: 15,
}

export const spriteColumn = 0;
export const spriteRow = 2;
