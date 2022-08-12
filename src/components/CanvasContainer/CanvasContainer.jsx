import React, { useEffect, useRef, useState } from 'react';
import Button from '../../classes/Button';
import Game from '../../classes/Game';
import Platform from '../../classes/Platform';
import * as devUtils from '../../utils/devUtils';
import * as gameUtils from '../../utils/gameUtils';
import * as numbers from '../../constants/numbers';
import './CanvasContainer.css';

const CanvasContainer = () => {
  const [game, setGame] = useState(null);
  const canvas = useRef(null);

  useEffect(() => {
    const game = new Game(canvas.current);
    setGame(game);
    // options, x, y, text, background = 'lightblue', color = 'black', fontSize = 50, padding = 20 // TODO
    return game?.delete;
  }, []);

  const handleHover = (e) => {
    const { mouseX, mouseY } = gameUtils.getMouseCoordsInCanvas(e, canvas);
    game?.handleHover(mouseX, mouseY);
  };

  const handleClick = (e) => {
    const { mouseX, mouseY } = gameUtils.getMouseCoordsInCanvas(e, canvas);
    game?.handleClick(mouseX, mouseY);
  };

  const handleMouseUp = (e) => {};

  return (
    <div className="canvas-container">
      <canvas
        onClick={handleClick}
        onMouseMove={handleHover}
        onMouseUp={handleMouseUp}
        ref={canvas}
      />
    </div>
  );
};

export default CanvasContainer;
