import { createPlayer, createComputer } from "../factories/player";

test("attack", () => {
  const player = createPlayer();
  const opponent = createComputer();
  opponent.board.placeShip(4, "x", 0, 0, "destroy");
  expect(player.attack(opponent.board, 0, 0)).toBe("hit");
});

test("computer", () => {
  const player = createPlayer();
  const opponent = createComputer();
  player.board.placeShip(4, "x", 0, 0, "destroy");
  let res = opponent.attack(player.board);
  expect(player.board.board[res[1][0]][res[1][1]]).toBe("hit");
});

test("reset", () => {
  const player = createPlayer();
  const opponent = createComputer();
  player.board.placeShip(4, "x", 0, 0, "destroy");
  player.reset();
  expect(player.board.ships.length).toBe(0);
});
