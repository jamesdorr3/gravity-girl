export const loadImage = (fileName, that, variable) => {
  const image = new Image();
  image.src = fileName;
  image.onload = () => that[variable] = image;
}