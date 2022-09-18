import Level from '../classes/Level';
import Text from '../classes/Text';

const loadingScreen = 
  new Level({
    buttons: [
      new Text({
        centerY: 500,
        text: 'The End'
      }),
      new Text({
        centerY: 700,
        text: 'Thanks for playing!'
      }),
    ],
  });

export default loadingScreen;
