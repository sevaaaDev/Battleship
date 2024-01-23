import createGameboard from "../game/factories/gameboard";

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
  board.placeShip(4, "x", 0, 0, "Destroyer");
  board.placeShip(5, "x", 0, 0, "Carrier");
  board.placeShip(5, "x", 1, 0, "lmao");
  expect(board.ships.length).toBe(1);
  expect(board.ships[0].name).toBe("Destroyer");
});
