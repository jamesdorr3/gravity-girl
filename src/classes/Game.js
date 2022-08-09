import Button from "./Button";
import Character from "./Character";
import * as numbers from '../constants/numbers';
import _ from 'lodash';

class Game {
  constructor (canvas) {
    this.canvas = canvas;
    this.canvas.width = numbers.canvasWidth;
    this.canvas.height = numbers.canvasHeight;

    this.context = this.canvas.getContext('2d');
    this.context.textAlign = "center";
    this.character = new Character(numbers.characterWidth, numbers.characterHeight, 'lime', 0, 0, this);

    this.immobiles = [];
    
    this.lastRender = new Date();

    this.column = 0;
    this.row = 0;

    this.interval = setInterval(() => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.character.update();
      this.context.fillStyle = this.character.color;
      this.context.fillRect(this.character.x, this.character.y, this.character.width, this.character.height);
      this.context.drawImage(
        this.character.sprite,
        numbers.spriteFirstX + numbers.spriteOffset * this.column,
        numbers.spriteFirstY + numbers.spriteOffset * this.row,
        numbers.spriteWidth,
        numbers.spriteHeight,
        this.character.x,
        this.character.y,
        this.character.width,
        this.character.height
      );

      // if (this.column === 5) {
      //   this.column = 0;
      //   // this.row = this.row ? 0 : 1;
      // } else {
      //   this.column++;
      // }

      const text = this.column.toString(); //"STOP";
      const textHeight = 30;
      const textWidth = 30 * text.length;
      const textX = numbers.canvasWidth - textWidth;
      const padding = 20;
      this.context.fillRect(textX - padding, 0, textWidth + padding * 2, textHeight + padding * 2);
      this.context.font = `${textHeight}px Arial`;
      this.context.strokeText(text, textX, textHeight + padding);

      this.immobiles.forEach((item) => {
        this.context.fillStyle = 'red';
        this.context.fillRect(item.x, item.y, item.width, item.height);
      })

      this.lastRender = new Date();
      Button.update(this.context);
    }, 1000 / numbers.fps);
  }

  stop = () => {
    clearInterval(this.interval);
  }

  handleClick = (x, y) => {
    this.immobiles.push({ x, y, height: 5, width: 5 });
    if ( x >= 1460 && y <= 70 ) {
      this.stop();
    }
  }

  delete = () => delete this;

};

export default Game;
