import Button from '../classes/Button';
import Level from '../classes/Level';

import level0 from './0';
import allLevels from './allLevels';
import game from '../classes/Game';

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
  buttons: [
    new Button({
      x: 25,
      y: 25,
      action: () => game.changeLevels(level0),
      text: ' < ',
    }),
    ...allLevelButtons(),
  ],
  elements: [],
});

export default levelSelect;
