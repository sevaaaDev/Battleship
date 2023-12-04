import Gameboard from "./gameboard";

test("there are no ship on the sea", () => {
  const gameboard = new Gameboard();
  expect(gameboard.numOfShip).toBe(0);
});

test("place a ship", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(3, "x", 1);
  expect(gameboard.numOfShip).toBe(1);
});

test("hit a ship", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(3, "x", 1);
  expect(gameboard.receiveAttack(2, 1)).toBe(true);
});

test("missed a hit", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(3, "x", 1);
  expect(gameboard.receiveAttack(4, 1)).toBe(false);
  expect(gameboard.missedAttack).toEqual([{ x: 4, y: 1 }]);
});

test("all ship has sunk", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(3, "x", 1);
  gameboard.receiveAttack(1, 1);
  gameboard.receiveAttack(2, 1);
  gameboard.receiveAttack(3, 1);
  expect(gameboard.isAllSunk).toBe(true);
});
