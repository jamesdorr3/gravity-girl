import React, { useEffect, useRef } from 'react';
import game from '../../classes/controllers/Game';

import * as gameUtils from '../../utils/gameUtils';
import { canvasHeight, canvasWidth } from '../../constants/numbers';
import './Canvas.scss';

const CanvasContainer = () => {
  const canvas = useRef(null);

  useEffect(() => {
    game.context = canvas.current.getContext('2d');
    canvas.current.width = canvasWidth;
    canvas.current.height = canvasHeight;
    game.start();
  }, []);

  const handleHover = (e) => {
    const { mouseX, mouseY } = gameUtils.getMouseCoordsInCanvas(e, canvas);
    game?.handleHover(mouseX, mouseY);
  };

  const handleClick = (e) => {
    const { mouseX, mouseY } = gameUtils.getMouseCoordsInCanvas(e, canvas);
    game?.handleClick(mouseX, mouseY);
  };

  const handleMouseUp = () => {};

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
