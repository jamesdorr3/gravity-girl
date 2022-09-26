import Level from '../classes/controllers/Level';
import Text from '../classes/Text';

const loadingScreen = 
  new Level({
    buttons: [
      new Text({text: 'Loading...'})
    ],
  });

export default loadingScreen;
