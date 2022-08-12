import React, { useEffect, useRef, useState } from 'react';
import Button from '../../classes/Button';
import Game from '../../classes/Game';
import Platform from '../../classes/Platform';
import * as utils from '../../utils';
import './CanvasContainer.css';

const CanvasContainer = () => {
  const [game, setGame] = useState(null);
  const canvas = useRef(null);

  useEffect(() => {
    const game = new Game(canvas.current);
    setGame(game);
    // options, x, y, text, background = 'lightblue', color = 'black', fontSize = 50, padding = 20
    Button.create({ east: 1600 }, 0, 0, 'STOP', game.stop);
    Platform.create({}, 300, 50, 500, 700);
    return game?.delete;
  }, []);

  const handleHover = (e) => {
    const { mouseX, mouseY } = utils.getMouseCoordsInCanvas(e, canvas);
    Button.handleHover(mouseX, mouseY);
  };

  const handleClick = () => {
    Button.handleClick();
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
