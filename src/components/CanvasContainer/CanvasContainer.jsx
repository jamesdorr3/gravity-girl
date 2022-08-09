import React, { useEffect, useRef, useState } from "react";
import Button from "../../classes/Button";
import Game from "../../classes/Game";
import "./CanvasContainer.css";
import * as constants from "../../constants/numbers";

const CanvasContainer = () => {
  const [game, setGame] = useState(null);
  const canvas = useRef(null);

  useEffect(() => {
    setGame(new Game(canvas.current));
    // options, x, y, text, background = 'lightblue', color = 'black', fontSize = 50, padding = 20
    Button.create({ east: 1600 }, 0, 0, 'STOP');
    return game?.delete;
  }, []);

  const handleClick = (e) => {
    const { x, y, height, width } = canvas.current.getBoundingClientRect();
    const mouseX = (e.clientX - x) * (constants.canvasWidth / width);
    const mouseY = (e.clientY - y) * (constants.canvasHeight / height);
    game.handleClick(mouseX, mouseY);
  };

  return (
    <div className="canvas-container">
      <canvas
        onClick={handleClick}
        ref={canvas}
      />
    </div>
  );
};

export default CanvasContainer;
