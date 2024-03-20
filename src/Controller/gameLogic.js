import render from "../View/dom";
import updateDom from "../View/updateDom";
import createGameboard from "../Model/gameboard";
import { createComputer } from "../Model/player";
import { initPlaceShip } from "../Model/ship";
import { startDrag } from "./dragDrop";
import { rotateShip } from "./rotateShip";
// import select from "./DOM/selector";
// TODO: make computer smart
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export default function game() {
  let playerBoard = createGameboard();
  let computerBoard = createGameboard();
  let computer = createComputer();

  initPlaceShip(playerBoard);
  initPlaceShip(computerBoard);

  renderDom(playerBoard, computerBoard);

  document.addEventListener("click", resetGame);
  document.addEventListener("click", startGame);
  document.addEventListener("pointerdown", dragHandler, { passive: false });
  document.addEventListener("click", rotateShipHandler);

  function rotateShipHandler(e) {
    if (e.target.matches('[data-ship="true"]')) {
      let x = +e.target.dataset.x;
      let y = +e.target.dataset.y;
      if (rotateShip(x, y, playerBoard)) {
        render.board(playerBoard, "player", true);
      }
    }
  }
  function dragHandler(e) {
    if (e.target.matches('[data-ship="true"]')) {
      e.target.releasePointerCapture(e.pointerId);
      startDrag(e, playerBoard, render.board);
    }
  }

  function startGame(e) {
    if (e.target.matches('button[data-type="start"]')) {
      document.removeEventListener("pointerdown", dragHandler);
      document.removeEventListener("click", rotateShipHandler);
      document.addEventListener("click", playRoundHandler);
      updateDom.removeCursorDrag();
      updateDom.removeDisplayNone();
      updateDom.messageInfo("Your Turn");
      e.target.remove();
      render.button("restart");
    }
  }

  async function playRoundHandler(e) {
    if (e.target.matches("div[data-board='computer'] div")) {
      let x = e.target.dataset.x;
      let y = e.target.dataset.y;
      await playRound(x, y);
    }
  }

  async function playRound(x, y) {
    // TODO: low: refactor playRound()

    // player turn
    const [result, compShip] = computerBoard.receiveAttack([x, y]);
    if (!result) return;
    document.removeEventListener("click", playRoundHandler);
    updateDom.tile(result, "computer", x, y);
    if (computerBoard.thisShipSunk()) {
      updateDom.listOfShips(computerBoard.ships, "computer");
      updateDom.messageInfo("Enemy's ship has been sunk");
      updateDom.sunk("computer", compShip.position.listCoordinate);
      await sleep(800);
    }
    if (computerBoard.areAllSunk()) {
      stopGame("Player");
      return;
    }

    updateDom.messageInfo("Computer Turn");
    updateDom.toggleDimBoard("computer");
    await sleep(1000);
    // computer turn
    const coord = computer.chooseCoord();
    const [compResult, playerShip] = playerBoard.receiveAttack(coord);
    if (compResult === false)
      console.error("computer attack the same coordinate twice");
    computer.changePreviousMoveStatus(compResult);
    computer.changePreviousShipStatus(false);
    updateDom.tile(compResult, "player", ...coord);
    updateDom.listOfShips(playerBoard.ships, "player");
    if (playerBoard.thisShipSunk()) {
      computer.changePreviousShipStatus(
        true,
        playerShip.position.listCoordinate,
      );
      updateDom.messageInfo("Your ship has been sunk");
      updateDom.sunk("player", playerShip.position.listCoordinate);
      await sleep(800);
    }
    if (playerBoard.areAllSunk()) {
      stopGame("Computer");
      return;
    }
    updateDom.messageInfo("Your Turn");
    updateDom.toggleDimBoard("player");
    document.addEventListener("click", playRoundHandler);
  }

  function stopGame(user) {
    document.removeEventListener("click", playRoundHandler);
    updateDom.messageInfo(`${user} Won`);
    if (user === "Player") return;
    render.board(computerBoard, "computer", true);
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
      document.addEventListener("pointerdown", dragHandler);
      document.addEventListener("click", rotateShipHandler);
    }
  }
}

function renderDom(playerBoard, computerBoard) {
  render.html();
  render.board(playerBoard, "player", true);
  render.board(computerBoard, "computer", false);
  render.listOfShips(playerBoard.ships, "player");
  render.listOfShips(computerBoard.ships, "computer");
}
