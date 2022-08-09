class Noun {
  constructor({ east, south }, width, height, x, y, color) {
    this.color = color || "red";
    this.height = height;
    this.width = width;
    this.x = east ? east - width : x;
    this.y = south ? south - height : y;
  }

  north = (y) => {
    if (y) this.y = y;
    return this.y;
  }

  east = (x) => {
    if (x) this.x = x - this.width;
    return this.x + this.width;
  }

  south = (y) => {
    if (y) this.y = y - this.height;
    return y + this.height;
  }

  west = (x) => {
    if (x) this.x = x;
    return this.x
  }
  
}

export default Noun;
