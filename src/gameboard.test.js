import Gameboard from "./gameboard";

test("there are no ship on the sea", () => {
  const gameboard = new Gameboard();
  expect(gameboard.ships.length).toBe(0);
});

test("place a ship x", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(3, "x", 0, 1);
  expect(gameboard.ships.length).toBe(1);
  expect(gameboard.board[0][1]).toEqual({
    length: 3,
    numOfHit: 0,
    sunk: false,
  });
});

test("place a ship y", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(3, "y", 0, 2);
  expect(gameboard.ships.length).toBe(1);
  expect(gameboard.board[0][1]).toEqual({
    length: 3,
    numOfHit: 0,
    sunk: false,
  });
});

test("cant place a ship at the same place", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(3, "y", 0, 2);
  expect(() => gameboard.placeShip(3, "y", 0, 2)).toThrow(Error);
});

test("hit a ship", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(3, "x", 0, 1);
  let ship = gameboard.board[0][1];
  expect(gameboard.receiveAttack(2, 1)).toBe(true);
  expect(gameboard.attack).toEqual([{ x: 2, y: 1 }]);
  expect(ship.numOfHit).toBe(1);
});

test("missed a hit", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(3, "x", 0, 1);
  expect(gameboard.receiveAttack(4, 1)).toBe(false);
  expect(gameboard.missedAttack).toEqual([{ x: 4, y: 1 }]);
});

test("ship still there", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(3, "x", 0, 1);
  gameboard.receiveAttack(0, 1);
  gameboard.receiveAttack(1, 1);
  expect(gameboard.isAllSunk()).toBe(false);
});
