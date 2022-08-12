import Button from '../classes/Button';
import Level from '../classes/Level';
import Platform from '../classes/Platform';
import * as numbers from '../constants/numbers';

export default new Level({
  platforms: [
    Platform.create(
      {
        centerX: numbers.canvasWidth / 2,
      },
      300,
      50,
      null,
      700,
    )
  ],
  frameLength: numbers.frameLength,
});
