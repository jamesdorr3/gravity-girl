import Element from './Element';
import { cardinalDirections } from '../constants/enums';
import { isNorthSouth } from '../utils/gameUtils';
import * as numbers from '../constants/numbers';
import sfx from './controllers/SFX';
import { distractorOffset } from '../constants/numbers';

const distractorFieldsNegative = ['centerX', 'centerY', 'north', 'west'];
const distractorFieldsPositive = ['east', 'south', 'x', 'y'];

const distractorUpdate = (info) => {
  distractorFieldsNegative.forEach((key) => {
    if (info[key]) info[key] -= distractorOffset;
  });
  distractorFieldsPositive.forEach((key) => {
    if (info[key]) info[key] += distractorOffset;
  });
};

class GravitySwitch extends Element {
  constructor(info) {
    let size = numbers.characterHeight;
    if (info.isDistractor) {
      size = size - 2 * distractorOffset;
      distractorUpdate(info);
    }
    super({
      ...info,
      height: size,
      width: size,
    });

    this.isDistractor = info.isDistractor;
  }
}

export default GravitySwitch;
