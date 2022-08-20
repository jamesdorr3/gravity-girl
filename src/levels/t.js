import Door from '../classes/Door';
import Level from '../classes/Level';
import Platform from '../classes/Platform';
import * as numbers from '../constants/numbers';

const testingScreen = (game) =>
  new Level({
    characterStartY: 150,
    elements: [
      new Door({
        // action: () => {},
        west: 0,
        north: 0,
      }),
      new Platform({ // bottom;
        height: 25,
        south: 75,
        west: 0,
        width: numbers.canvasWidth - 100,
      }),
      new Platform({ // high jump 1;
        height: 50,
        south: 100,
        west: 1200,
        width: 25,
      }),
      new Platform({ // high jump 2;
        height: 100,
        south: 100,
        west: 1000,
        width: 25,
      }),
      new Platform({ // high jump 3;
        height: 150,
        south: 100,
        west: 800,
        width: 25,
      }),
      // new Platform({ // high jump 4;
      //   height: 200,
      //   south: 100,
      //   west: 600,
      //   width: 25,
      // }),
      new Platform({ // long jump prep 1;
        height: 25,
        south: 200,
        west: 100,
        width: 100,
      }),
      new Platform({ // long jump prep 2;
        height: 25,
        south: 300,
        west: 0,
        width: 100,
      }),
      new Platform({ // long jump 1 left;
        height: 25,
        south: 400,
        west: 100,
        width: 200,
      }),
      new Platform({ // long jump 1 middle, 300;
        height: 25,
        south: 400,
        west: 600,
        width: 200,
      }),
      new Platform({ // long jump 1 right, 400;
        height: 25,
        south: 400,
        west: 1200,
        width: 400,
      }),
      new Platform({ // long jump 2 right;
        height: 25,
        south: 550,
        east: 0,
        width: 200,
      }),
      new Platform({ // long jump 2 middle, 500;
        height: 25,
        south: 550,
        east: 700,
        width: 100,
      }),
      new Platform({ // long jump 2 left, 600;
        height: 25,
        south: 550,
        west: 0,
        width: 200,
      }),
    ],

    game,
  });

export default testingScreen;
