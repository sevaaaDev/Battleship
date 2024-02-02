import createPlayer from "../factories/player";

test("attack", () => {
  const player = createPlayer();
  const opponent = createPlayer();
  opponent.board.placeShip(4, "x", 0, 0, "destroy");
  expect(player.attack(opponent.board, 0, 0)).toBe("hit");
});

test("computer", () => {
  const player = createPlayer();
  const opponent = createPlayer();
  player.board.placeShip(4, "x", 0, 0, "destroy");
  let res = opponent.attack(player.board);
  expect(player.board.board[res[1][0]][res[1][1]]).toBe("hit");
});

test("finish", () => {
  const player = createPlayer();
  const opponent = createPlayer();
  player.board.placeShip(4, "x", 0, 0, "destroy");
  opponent.attack(player.board);
  opponent.attack(player.board);
  opponent.attack(player.board);
  opponent.attack(player.board);
  expect(opponent.attack(player.board)).toBe("finish");
});

test("reset", () => {
  const player = createPlayer();
  const opponent = createPlayer();
  player.board.placeShip(4, "x", 0, 0, "destroy");
  player.attack(opponent.board);
  player.attack(opponent.board);
  player.attack(opponent.board);
  player.attack(opponent.board);
  expect(player.moves.length).toBe(96);
  player.reset();
  expect(player.moves.length).toBe(100);
  expect(player.board.ships.length).toBe(0);
});
