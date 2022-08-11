import * as numbers from "./constants/numbers";

export const distance = (velocityFinal, velocityInitial, time) => (
  1 / 2 * (velocityFinal + velocityInitial) * time
);

export const getMouseCoordsInCanvas = (e, canvas) => {
  const { x, y, height, width } = canvas.current.getBoundingClientRect();
  const mouseX = (e.clientX - x) * (numbers.canvas.width / width);
  const mouseY = (e.clientY - y) * (numbers.canvas.height / height);
  return { mouseX, mouseY };
}