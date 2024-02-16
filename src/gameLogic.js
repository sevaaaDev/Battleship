import domStuff from "./DOM/dom";
import createGameboard from "./factories/gameboard";
import { createComputer } from "./factories/player";
import { initPlaceShip } from "./factories/ship";
import select from "./DOM/selector";
// TODO add interactivity
// stop game after game over
export default function game() {
  const playerBoard = createGameboard();
  const computerBoard = createGameboard();
  const computer = createComputer();
  initPlaceShip(playerBoard);
  initPlaceShip(computerBoard);
  domStuff.render();
  domStuff.renderBoard(playerBoard.board, "player");
  domStuff.renderBoard(computerBoard.board, "computer");
  document.addEventListener("click", playRoundHandler);
  function playRoundHandler(e) {
    if (e.target.matches("div[data-board='computer'] div")) {
      let x = e.target.dataset.x;
      let y = e.target.dataset.y;
      playRound(x, y);
    }
  }
  function playRound(x, y) {
    const result = computerBoard.receiveAttack([x, y]);
    if (!result) {
      return;
    }
    paintTile(result, "computer", x, y);
    if (computerBoard.areAllSunk()) {
      stopGame("Player");
      return;
    }
    const coord = computer.chooseCoord();
    const compResult = playerBoard.receiveAttack(coord);
    paintTile(compResult, "player", ...coord);
    if (playerBoard.areAllSunk()) {
      stopGame("Computer");
      return;
    }
  }
  function stopGame(user) {
    document.removeEventListener("click", playRoundHandler);
    domStuff.showWinner(user);
  }
}

function paintTile(result, user, x, y) {
  if (result === "missed") {
    domStuff.miss(user, x, y);
  }
  else if (result === "hit") {
    domStuff.hit(user, x, y);
  }
}

export function logger(result) {
  console.log(result);
}
