/* eslint-disable max-classes-per-file */
import "./style.css";
import { updateDOM, generateDOM } from "./dom.js";

const BOARD_SIZE = 10;

class Ship {
  constructor(length, isVertical) {
    this.length = length;
    this.hitArr = Array.apply(null, Array(length));
    this.isVertical = isVertical;
  }

  hit(location) {
    if (location >= 0 && location < this.hitArr.length) {
      if (!this.isHit(location)) {
        this.hitArr[location] = true;
        return true;
      }
      return false;
    }
    return false;
  }

  isHit(location) {
    return this.hitArr[location];
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
          const newShip = new Ship(length, isVertical);
          for (let i = y; i < y + length; i++) {
            this.grid[x][i] = newShip;
          }
          return true;
        }
        return false;
      }
      return false;
    }
    // horizontal
    if (length > 0 && length + x <= this.size) {
      let existingShip = false;
      for (let i = x; i < x + length; i++) {
        if (this.grid[i][y]) {
          existingShip = true;
        }
      }

      if (!existingShip) {
        const newShip = new Ship(length, isVertical);
        for (let i = x; i < x + length; i++) {
          this.grid[i][y] = newShip;
        }
        return true;
      }
      return false;
    }
    return false;
  }

  receiveAttack(x, y) {
    if (this.grid[x][y]) {
      // there is a ship at this location, send hit signal and check if it's already hit.
      const shipAttacked = this.grid[x][y];
      const shipOrigin = this.findShipCoordinate(shipAttacked);
      if (shipAttacked.isVertical) {
        return shipAttacked.hit(y - shipOrigin[1]);
      }
      // Horizontal
      return shipAttacked.hit(x - shipOrigin[0]);
    }
    // no ship, check if we've already missed here.
    if (this.grid[x][y] == null) {
      this.grid[x][y] = false;
      return true; // miss recorded
    }
    return false; // already missed here, can't attack here.
  }

  cellIsHitShip(x, y) {
    if (this.grid[x][y]) {
      const ship = this.grid[x][y];
      const shipOrigin = this.findShipCoordinate(ship);
      if (ship.isVertical) {
        return ship.isHit(y - shipOrigin[1]);
      }
      return ship.isHit(x - shipOrigin[0]);
    }
    return false;
  }

  findShipCoordinate(ship) {
    const { isVertical } = ship;

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
        // Horizontal
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

const playerOne = new Player(null, "Player One");
const playerTwo = new Player(playerOne, "Player Two");
playerTwo.opponent = playerOne;
const gameText = document.getElementById("game-text");
let winner = false;
let currentPlayer = playerOne;
const { body } = document;
window.addEventListener("contextmenu", (e) => e.preventDefault());
body.addEventListener("contextmenu", rightClick);

let boats = [5, 4, 3, 3, 2];

// AI place.
while (boats.length >= 1) {
  const randX = Math.floor(Math.random() * BOARD_SIZE);
  const randY = Math.floor(Math.random() * BOARD_SIZE);
  const isVertical = Math.random() < 0.5;
  if (
    playerTwo.gameBoard.placeShip(
      randX,
      randY,
      boats[boats.length - 1],
      isVertical,
    )
  ) {
    boats.pop();
  }
}

boats = [5, 4, 3, 3, 2];
let placingBoats = true;
let currentIsVertical = true;

gameText.innerText = "Place your boats, right click to rotate.";

generateDOM(playerOne, playerTwo);

function randomCoord() {
  return Math.floor(Math.random() * BOARD_SIZE);
}

function aiPlayerTurn() {
  let x = randomCoord();
  let y = randomCoord();
  while (!playerOne.gameBoard.receiveAttack(x, y)) {
    x = randomCoord();
    y = randomCoord();
  }

  if (playerOne.gameBoard.allShipsSunk()) {
    winner = playerTwo;
    gameText.innerText = "Player two wins!";
  }
  currentPlayer = playerOne;
}

function cellHovered(event) {
  const cell = event.target;
  const { id } = cell;
  const x = Number(id.slice(9, 10));
  const y = Number(id.slice(11, 12));
  if (placingBoats) {
    updateDOM(
      playerOne,
      playerTwo,
      [x, y],
      boats[boats.length - 1],
      currentIsVertical,
    );
  }
}

function cellClicked(event) {
  if (!winner) {
    const cell = event.target;
    const { id } = cell;
    const x = Number(id.slice(9, 10));
    const y = Number(id.slice(11, 12));
    if (placingBoats) {
      if (id.slice(0, 9) === "playerOne") {
        if (
          playerOne.gameBoard.placeShip(
            x,
            y,
            boats[boats.length - 1],
            currentIsVertical,
          )
        ) {
          boats.pop();
          if (boats.length === 0) {
            placingBoats = false;
            gameText.innerText = "Player one, fire!";
          }
          updateDOM(playerOne, playerTwo);
        }
      }
    } else if (currentPlayer === playerOne) {
      if (id.slice(0, 9) === "playerTwo") {
        if (playerTwo.gameBoard.receiveAttack(x, y)) {
          if (playerTwo.gameBoard.allShipsSunk()) {
            winner = playerOne;
            gameText.innerText = "Player one wins!";
          } else {
            currentPlayer = playerTwo;
            aiPlayerTurn();
          }
          updateDOM(
            playerOne,
            playerTwo,
            [x, y],
            boats[boats.length - 1],
            currentIsVertical,
          );
        }
      }
    }
  }
}

function rightClick(event) {
  const cell = event.target;
  const { id } = cell;
  const x = Number(id.slice(9, 10));
  const y = Number(id.slice(11, 12));
  if (placingBoats) {
    currentIsVertical = !currentIsVertical;
    updateDOM(
      playerOne,
      playerTwo,
      [x, y],
      boats[boats.length - 1],
      currentIsVertical,
    );
  }
}
export { Ship, GameBoard, cellHovered, cellClicked };
