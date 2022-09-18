import Button from '../classes/Button';
import Level from '../classes/Level';
import game from '../classes/Game';

import allLevels from './allLevels';

const allLevelButtons = () => (
  allLevels.map((level, i) => {
    const itemsPerRow = 6;
    const gap = 200;
    const padding = 250;

    const xIndex = i % itemsPerRow;
    const yIndex = Math.floor( i / itemsPerRow );

    const index = `${i + 1}`;
    const text = index.length <= 1 ? `0${index}` : index;

    return new Button({
      centerX: xIndex * gap + padding,
      centerY: yIndex * gap + padding,
      action: () => game.changeLevels(level),
      text
    });
  })
)

const levelSelect = new Level({
  hasCharacter: false,
  hasTitle: false,
  buttons: allLevelButtons(),
  elements: [],
});

export default levelSelect;
