import "./style.css";

class Ship {
  constructor(length) {
    this.length = length;
    this.hitArr = Array.apply(null, Array(length));
  }

  hit(location) {
    if (location >= 0 && location < this.hitArr.length) {
      if (this.hitArr[location] == null) {
        this.hitArr[location] = true;
        return true;
      } else {
        return false;
      }
    }
    return null;
  }
  isSunk() {
    let sunk = true;
    this.hitArr.forEach((hit) => {
      if (hit == null) {
        sunk = false;
      }
    });
    return sunk;
  }
}

export { Ship };
