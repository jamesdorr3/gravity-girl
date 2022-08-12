class Noun {
  constructor({ centerX, centerY, east, south }, width, height, x, y) {
    this.height = height;
    this.width = width;
    if (centerX) {
      this.x = centerX - width / 2;
    } else {
      this.x = east ? east - width : x;
    }
    if (centerY) {
      this.y = centerY - height / 2;
    } else {
      this.y = south ? south - height : y;
    }
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

  collidesWith = (that) => (
    this.north() < that.south() &&
    this.east() > that.west() &&
    this.south() > that.north() &&
    this.west() < that.east()
  )
  
}

export default Noun;
