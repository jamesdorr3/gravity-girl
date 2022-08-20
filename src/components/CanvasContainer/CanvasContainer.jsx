import React, { useEffect, useRef, useState } from 'react';
import Game from '../../classes/Game';

import * as gameUtils from '../../utils/gameUtils';
import './CanvasContainer.scss';

const CanvasContainer = () => {
  const [game, setGame] = useState(null);
  const canvas = useRef(null);

  useEffect(() => {
    const game = new Game(canvas.current);
    setGame(game);
    return game?.delete;
  }, []);

  const handleHover = e => {
    const { mouseX, mouseY } = gameUtils.getMouseCoordsInCanvas(e, canvas);
    game?.handleHover(mouseX, mouseY);
  };

  const handleClick = e => {
    const { mouseX, mouseY } = gameUtils.getMouseCoordsInCanvas(e, canvas);
    game?.handleClick(mouseX, mouseY);
  };

  const handleMouseUp = e => {};

  return (
    <div className="canvas-container">
      <div className="canvas-container--width">
        <div className="canvas-container--height">
          <canvas
            onClick={handleClick}
            onMouseMove={handleHover}
            onMouseUp={handleMouseUp}
            ref={canvas}
          />
        </div>
      </div>
    </div>
  );
};

export default CanvasContainer;
