import { attackBoard } from "./dom";

function computer(gameboard, x, y) {
  console.log(gameboard.board[x][y]);
  if (gameboard.board[x][y] === "hit") {
    attackRandom(gameboard);
    return;
  }
  attackBoard(gameboard, x, y, "comp");
}

function attackRandom(gameboard) {
  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);
  computer(gameboard, x, y);
}

export class Computer {
  constructor() {}

  attack(gameboard) {
    attackRandom(gameboard);
    if (gameboard.isAllSunk()) {
      return true;
    }
  }
}

export class Player {
  constructor() {}

  attack(gameboard, x, y) {
    attackBoard(gameboard, x, y);
    if (gameboard.isAllSunk()) {
      return true;
    }
  }
}
