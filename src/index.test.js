import { Ship, GameBoard } from ".";

const aShip = new Ship(5);
const gameBoard = new GameBoard(10);

test("Receives a hit one time in each location. Doesn't accept outside range.", () => {
  expect(aShip.hit(1)).toBe(true);
  expect(aShip.hit(1)).toBe(false);
  expect(aShip.hit(-1)).toBe(false);
  expect(aShip.hit(5)).toBe(false);
});

test("Reports sunk status.", () => {
  expect(aShip.isSunk()).toBe(false);
  aShip.hit(0);
  aShip.hit(1);
  aShip.hit(2);
  aShip.hit(3);
  aShip.hit(4);
  expect(aShip.isSunk()).toBe(true);
});

test("Places ship on gameboard if it's within bounds.", () => {
  expect(gameBoard.placeShip(9, 0, 10, true)).toBe(true);
  expect(gameBoard.placeShip(8, 1, 10, true)).toBe(false);
});

test("Won't place a ship on top of another ship.", () => {
  expect(gameBoard.placeShip(0, 5, 10, false)).toBe(false);
  expect(gameBoard.placeShip(0, 5, 9, false)).toBe(true);
});

test("Records hit on ships or miss in sea, only one time.", () => {
  expect(gameBoard.receiveAttack(1, 5)).toBe(true); //ship
  expect(gameBoard.receiveAttack(1, 5)).toBe(false);
  expect(gameBoard.receiveAttack(0, 4)).toBe(true); //sea
  expect(gameBoard.receiveAttack(0, 4)).toBe(false);
});

test("Can report if all ships are sunk or not.", () => {
  expect(gameBoard.allShipsSunk()).toBe(false);
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      gameBoard.receiveAttack(i, j);
    }
  }
  expect(gameBoard.allShipsSunk()).toBe(true);
});
