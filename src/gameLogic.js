import { render, renderBoard } from "./DOM/dom";
import createGameboard from "./factories/gameboard";
import { createComputer } from "./factories/player";
import { initPlaceShip } from "./factories/ship";

export default function game() {
  const playerBoard = createGameboard();
  const computerBoard = createGameboard();
  const computer = createComputer();
  initPlaceShip(playerBoard);
  initPlaceShip(computerBoard);
  render();
  renderBoard(computerBoard);
  document.addEventListener("click", (e) => {
    if (e.target.matches("button")) {
      playRound(...computer.chooseCoord());
    }
  });
  function playRound(x, y) {
    const result = computerBoard.receiveAttack([x, y]);
    if (!result) {
      return;
    }
    logger(result);
    logger(computerBoard.board);
    logger(computerBoard.ships[0]);
    // const compResult = playerBoard.receiveAttack(computer.chooseCoord());
    // logger(compResult);
    // logger(playerBoard.board);
  }
}

export function logger(result) {
  console.log(result);
}
