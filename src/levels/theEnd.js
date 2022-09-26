import Level from '../classes/controllers/Level';
import Text from '../classes/Text';

const loadingScreen = 
  new Level({
    buttons: [
      new Text({
        centerY: 400,
        text: 'The End'
      }),
      new Text({
        centerY: 600,
        text: 'Thanks for playing!'
      }),
    ],
  });

export default loadingScreen;
