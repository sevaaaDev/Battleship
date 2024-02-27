import domStuff from "./DOM/dom";
import createGameboard from "./factories/gameboard";
import { createComputer } from "./factories/player";
import { initPlaceShip } from "./factories/ship";
import select from "./DOM/selector";
import { startDrag } from "./DOM/dragDrop";
// TODO: send message to dom (attack, gameover, etc)
// TODO: hide start button after clicked
// TODO: make computer smart
export default function game() {
  let playerBoard = createGameboard();
  let computerBoard = createGameboard();
  let computer = createComputer();

  initPlaceShip(playerBoard);
  initPlaceShip(computerBoard);

  renderDom(playerBoard, computerBoard);

  document.addEventListener("click", resetGame);
  document.addEventListener("click", startGame);
  document.addEventListener("mousedown", dragHandler);

  function dragHandler(e) {
    if (e.target.matches('[data-ship="true"]')) {
      startDrag(e, playerBoard, domStuff.renderBoard);
    }
  }

  function startGame(e) {
    if (e.target.matches('button[data-type="start"]')) {
      document.removeEventListener("mousedown", dragHandler);
      document.addEventListener("click", playRoundHandler);
    }
  }

  function playRoundHandler(e) {
    if (e.target.matches("div[data-board='computer'] div")) {
      let x = e.target.dataset.x;
      let y = e.target.dataset.y;
      playRound(x, y);
    }
  }

  function playRound(x, y) {
    // player turn
    const result = computerBoard.receiveAttack([x, y]);
    if (!result) return;
    paintTile(result, "computer", x, y);
    domStuff.updateListShip(computerBoard.ships, "computer");
    if (computerBoard.areAllSunk()) {
      stopGame("Player");
      return;
    }
    // computer turn
    const coord = computer.chooseCoord();
    const compResult = playerBoard.receiveAttack(coord);
    paintTile(compResult, "player", ...coord);
    domStuff.updateListShip(playerBoard.ships, "player");
    if (playerBoard.areAllSunk()) {
      stopGame("Computer");
      return;
    }
  }

  function stopGame(user) {
    document.removeEventListener("click", playRoundHandler);
    domStuff.showWinner(user);
  }

  function resetGame(e) {
    if (e.target.matches("button[data-type='restart']")) {
      playerBoard = createGameboard();
      computerBoard = createGameboard();
      computer = createComputer();
      initPlaceShip(playerBoard);
      initPlaceShip(computerBoard);
      renderDom(playerBoard, computerBoard);
      document.removeEventListener("click", playRoundHandler);
      document.addEventListener("mousedown", dragHandler);
    }
  }
}

function renderDom(playerBoard, computerBoard) {
  domStuff.render();
  domStuff.renderBoard(playerBoard, "player");
  domStuff.renderBoard(computerBoard, "computer");
  domStuff.renderListShip(playerBoard.ships, "player");
  domStuff.renderListShip(computerBoard.ships, "computer");
}

function paintTile(result, user, x, y) {
  if (result === "missed") {
    domStuff.miss(user, x, y);
  } else if (result === "hit") {
    domStuff.hit(user, x, y);
  }
}
