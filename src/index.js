import "./style.css";
import { updateDOM } from "./dom.js";

const BOARD_SIZE = 10;

class Ship {
  constructor(length, isVertical) {
    this.length = length;
    this.hitArr = Array.apply(null, Array(length));
    this.isVertical = isVertical;
  }

  hit(location) {
    if (location >= 0 && location < this.hitArr.length) {
      if (!this.hitArr[location]) {
        this.hitArr[location] = true;
        return true;
      } else {
        return false;
      }
    }
    return false;
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

class GameBoard {
  constructor(size) {
    this.grid = new Array(size)
      .fill(null)
      .map(() => new Array(size).fill(null));
    this.size = size;
  }

  placeShip(x, y, length, isVertical = true) {
    if (isVertical) {
      if (length > 0 && length + y <= this.size) {
        let existingShip = false;
        for (let i = y; i < y + length; i++) {
          if (this.grid[x][i]) {
            existingShip = true;
          }
        }

        if (!existingShip) {
          let newShip = new Ship(length, isVertical);
          for (let i = y; i < y + length; i++) {
            this.grid[x][i] = newShip;
          }
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      //horizontal
      if (length > 0 && length + x <= this.size) {
        let existingShip = false;
        for (let i = x; i < x + length; i++) {
          if (this.grid[i][y]) {
            existingShip = true;
          }
        }

        if (!existingShip) {
          let newShip = new Ship(length, isVertical);
          for (let i = x; i < x + length; i++) {
            this.grid[i][y] = newShip;
          }
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  }

  receiveAttack(x, y) {
    if (this.grid[x][y]) {
      //there is a ship at this location, send hit signal and check if it's already hit.
      let shipAttacked = this.grid[x][y];
      let shipOrigin = this.findShipCoordinate(shipAttacked);
      if (shipAttacked.isVertical) {
        return shipAttacked.hit(y - shipOrigin[1]);
      } else {
        //Horizontal
        return shipAttacked.hit(x - shipOrigin[0]);
      }
    } else {
      //no ship, check if we've already missed here.
      if (this.grid[x][y] == null) {
        this.grid[x][y] = false;
        return true; //miss recorded
      } else {
        return false; //already missed here, can't attack here.
      }
    }
  }

  findShipCoordinate(ship) {
    let isVertical = ship.isVertical;

    if (ship) {
      if (isVertical) {
        for (let i = 0; i < this.size; i++) {
          for (let j = 0; j < this.size; j++) {
            if (this.grid[i][j] === ship) {
              return [i, j];
            }
          }
        }
      } else {
        //Horizontal
        for (let j = 0; j < this.size; j++) {
          for (let i = 0; i < this.size; i++) {
            if (this.grid[i][j] === ship) {
              return [i, j];
            }
          }
        }
      }
    }

    return null;
  }

  allShipsSunk() {
    let allShipsSunk = true;
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.grid[i][j]) {
          if (!this.grid[i][j].isSunk()) {
            allShipsSunk = false;
          }
        }
      }
    }
    return allShipsSunk;
  }
}

class Player {
  constructor(opponent = null, name = "Player") {
    this.opponent = opponent;
    this.name = name;
    this.gameBoard = new GameBoard(BOARD_SIZE);
  }
}

let playerOne = new Player(null, "Player One");
let playerTwo = new Player(playerOne, "Player Two");
playerTwo.opponent = playerOne;

let winner = false;
let currentPlayer = playerOne;
//while (!winner) {
//console.log("It is player one's turn");
//}

updateDOM(playerOne, playerTwo);

export { Ship, GameBoard };
