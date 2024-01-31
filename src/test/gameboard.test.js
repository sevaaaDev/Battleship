import createGameboard from "../factories/gameboard";

test("there are no ship", () => {
  const board = createGameboard();
  expect(board.ships.length).toBe(0);
});

test("there are ship", () => {
  const board = createGameboard();
  board.placeShip(4, "x", 0, 0, "Destroyer");
  expect(board.ships.length).toBe(1);
  expect(board.ships[0].name).toBe("Destroyer");
});

test("there are 2 ship", () => {
  const board = createGameboard();
  board.placeShip(4, "x", 0, 0, "Destroyer");
  board.placeShip(5, "x", 0, 2, "Carrier");
  expect(board.ships.length).toBe(2);
});

test("cant place ship at the same place", () => {
  const board = createGameboard();
  board.placeShip(4, "x", 2, 4, "Destroyer");
  board.placeShip(5, "x", 0, 4, "Carrier");
  board.placeShip(4, "y", 3, 3, "Patrol");
  expect(board.ships.length).toBe(1);
});

test("cant place a ship outside of the board", () => {
  const board = createGameboard();
  board.placeShip(4, "x", 9, 0, "Destroyer");
  board.placeShip(4, "y", 0, 8, "Destroyer");
  expect(board.ships.length).toBe(0);
});

test("attack ship", () => {
  const board = createGameboard();
  board.placeShip(4, "x", 0, 0, "Destroyer");
  expect(board.receiveAttack(1, 0)).toBe("hit");
  expect(board.ships[0].health).toBe(3);
  expect(board.board[1][0]).toBe("hit");
});

test("cant attack the same place twice", () => {
  const board = createGameboard();
  board.placeShip(4, "x", 0, 0, "Destroyer");
  board.receiveAttack(1, 0);
  expect(board.receiveAttack(1, 0)).toBe(false);
});

test("cant attack outside the board", () => {
  const board = createGameboard();
  board.placeShip(4, "x", 0, 0, "Destroyer");
  expect(board.receiveAttack(10, 0)).toBe(false);
});

test("attack water", () => {
  const board = createGameboard();
  board.placeShip(4, "x", 0, 0, "Destroyer");
  expect(board.receiveAttack(7, 0)).toBe("missed");
});
test("are all sunk?", () => {
  const board = createGameboard();
  board.placeShip(4, "x", 0, 0, "Destroyer");
  board.receiveAttack(0, 0);
  board.receiveAttack(1, 0);
  board.receiveAttack(2, 0);
  expect(board.areAllSunk()).toBe(false);
  board.receiveAttack(3, 0);
  expect(board.areAllSunk()).toBe(true);
});
