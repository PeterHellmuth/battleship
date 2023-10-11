import { Ship } from ".";

const aShip = new Ship(5);

test("Receives a hit one time in each location. Doesn't accept outside range.", () => {
  expect(aShip.hit(1)).toBe(true);
  expect(aShip.hit(1)).toBe(false);
  expect(aShip.hit(-1)).toBe(null);
  expect(aShip.hit(5)).toBe(null);
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
