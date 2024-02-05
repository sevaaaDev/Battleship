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
  function random(moves) {
    return 6 < moves.length - 1 ? 6 : 0;
  }
  player.board.placeShip(4, "x", 0, 0, "destroy");
  let res = opponent.attack(player.board, random);
  expect(res[0]).toBeTruthy();
});

test("player reset", () => {
  const player = createPlayer();
  player.board.placeShip(4, "x", 0, 0, "destroyer");
  player.reset();
  expect(player.board.ships.length).toBe(0);
});

test("computer reset", () => {
  let comp = createComputer();
  let player = createPlayer();
  comp.attack(player.board, () => {
    return 0;
  });
  expect(comp.moves.length).toBe(99);
  comp.reset();
  expect(comp.moves.length).toBe(100);
});
