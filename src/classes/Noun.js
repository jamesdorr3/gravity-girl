class Noun {
  constructor({ east, south }, width, height, x, y) {
    this.height = height;
    this.width = width;
    this.x = east ? east - width : x;
    this.y = south ? south - height : y;
  }

  north = (y) => {
    if (typeof(y) === 'number') this.y = y;
    return this.y;
  }

  east = (x) => {
    if (typeof(x) === 'number') this.x = x - this.width;
    return this.x + this.width;
  }

  south = (y) => {
    if (typeof(y) === 'number') this.y = y - this.height;
    return this.y + this.height;
  }

  west = (x) => {
    if (typeof(x) === 'number') this.x = x;
    return this.x
  }

  hasPoint = (x, y) => (
    this.north() < y &&
    this.east() > x &&
    this.south() > y &&
    this.west() < x
  )
  
}

export default Noun;
