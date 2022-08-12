import Noun from "./Noun";

class Platform extends Noun{
  constructor(...args) {
    super(...args);
  }

  static update = (context) => {
    Platform.all.forEach((platform) => {
      context.fillStyle = 'purple';
      context.fillRect(platform.x, platform.y, platform.width, platform.height);
    })
  }
}

Platform.all = [];

Platform.create = (...args) => {
  const inst = new Platform(...args);
  Platform.all.push(inst);
  return inst;
}

export default Platform;
