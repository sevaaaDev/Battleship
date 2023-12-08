import { computer } from "./player";
import Gameboard from "./gameboard";

test("computer should attack", () => {
  const board = new Gameboard();
  board.placeShip(10, "x", 0, 0);
  computer(board, 0, 0);
  expect(board.board[0][0]).toBe("hit");
});

test("computer cant attack attacked place", () => {
  const board = new Gameboard();
  board.placeShip(10, "x", 0, 0);
  computer(board, 0, 0);
  expect(computer(board, 0, 0)).toBe(false);
});
