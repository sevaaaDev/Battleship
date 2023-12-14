import { attackBoard } from "./dom";

function computer(gameboard, x, y) {
  console.log(gameboard.board[x][y]);
  if (gameboard.board[x][y] === "hit") {
    attackRandom(gameboard);
    return;
  }
  attackBoard(gameboard, x, y, "comp");
}

export function attackRandom(gameboard) {
  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);
  computer(gameboard, x, y);
}
