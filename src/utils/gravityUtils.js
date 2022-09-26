const directionOrder = ['north', 'east', 'south', 'west'];

export const rotateGravityDirection = (current, direction = 1) => {
  const oldIndex = directionOrder.indexOf(current);
  let newIndex = oldIndex + direction;
  if (newIndex < 0) newIndex = directionOrder.length - 1;
  if (newIndex >= directionOrder.length) newIndex = 0;
  return directionOrder[newIndex];
};
