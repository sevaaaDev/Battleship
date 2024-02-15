import { domHit, domMiss, render, renderBoard, showWinner } from "./DOM/dom";
import createGameboard from "./factories/gameboard";
import { createComputer } from "./factories/player";
import { initPlaceShip } from "./factories/ship";
// TODO add interactivity
// stop game after game over
export default function game() {
  const playerBoard = createGameboard();
  const computerBoard = createGameboard();
  const computer = createComputer();
  initPlaceShip(playerBoard);
  initPlaceShip(computerBoard);
  render();
  renderBoard(computerBoard.board);
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
    paintTile(result, x, y);
    if (computerBoard.areAllSunk()) {
      // dom stuff
      showWinner("PLAYER");
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

function paintTile(result, x, y) {
  if (result === "missed") {
    domMiss(x, y);
  }
  if (result === "hit") {
    domHit(x, y);
  }
}

export function logger(result) {
  console.log(result);
}