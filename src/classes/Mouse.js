import Noun from './Noun';

class Mouse extends Noun {
  constructor(x, y) {
    super({}, 1, 1, x, y);
  }
}

export default Mouse;
