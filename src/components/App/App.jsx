import React, { useEffect, useRef, useState } from 'react';
import Canvas from '../Canvas/Canvas';
import game from '../../classes/controllers/Game';
import './App.scss';

const App = () => {
  // const [isFullScreen, setIsFullScreen] = useState(false);

  // useEffect(() => {
  //   document.addEventListener('fullscreenchange', () => {
  //     setIsFullScreen(document.fullscreenElement);
  //   });
  // }, []);

  const handleClick = () => {
    // fullScreenContentRef.current.requestFullscreen();
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* <h1 className="main-title">Gravity Girl</h1> */}
        <div className="mobile-instructions">
          <div>Click "Full Screen" to play</div>
          <div className="text-small">Landscape Orientation recommended</div>
          
        </div>
        {/* <button onClick={handleClick}>Full Screen</button> */}
      </header>
      <Canvas />
    </div>
  );
};

export default App;
