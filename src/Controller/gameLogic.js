import render from "../View/dom";
import updateDom from "../View/updateDom";
import createGameboard from "../Model/gameboard";
import { createComputer } from "../Model/player";
import { initPlaceShip } from "../Model/ship";
import { startDrag } from "./dragDrop";
import { rotateShip } from "./rotateShip";
// import select from "./DOM/selector";
// TODO: make computer smart
// TODO: Change Dir structure
export default function game() {
  let playerBoard = createGameboard();
  let computerBoard = createGameboard();
  let computer = createComputer();

  initPlaceShip(playerBoard);
  initPlaceShip(computerBoard);

  renderDom(playerBoard, computerBoard);

  let playerBoardDom = document.querySelector(
    'section section section div[data-board="player"]',
  );
  document.addEventListener("click", resetGame);
  document.addEventListener("click", startGame);
  document.addEventListener("mousedown", dragHandler);
  document.addEventListener("touchstart", dragHandler, { passive: false });
  document.addEventListener("click", rotateShipHandler);
  // HACK: disable scroll while dragging
  // TODO: find a better way to disable scroll
  playerBoardDom.addEventListener("touchmove", (e) => {
    e.preventDefault();
  });
  // playerBoardDom
  //   .querySelector("div")
  //   .addEventListener("touchstart", dragHandler);

  function rotateShipHandler(e) {
    if (e.target.matches('[data-ship="true"]')) {
      let x = +e.target.dataset.x;
      let y = +e.target.dataset.y;
      if (rotateShip(x, y, playerBoard)) {
        render.board(playerBoard, "player");
      }
    }
  }
  function dragHandler(e) {
    if (e.target.matches('[data-ship="true"]')) {
      // FIX: rotate ship won't work on mobile, because click event is not fired
      e.preventDefault();
      startDrag(e, playerBoard, render.board);
    }
  }

  function startGame(e) {
    if (e.target.matches('button[data-type="start"]')) {
      document.removeEventListener("mousedown", dragHandler);
      document.removeEventListener("click", rotateShipHandler);
      document.addEventListener("click", playRoundHandler);
      e.target.remove();
      render.button("restart");
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
    updateDom.tile(result, "computer", x, y);
    updateDom.listOfShips(computerBoard.ships, "computer");
    if (computerBoard.areAllSunk()) {
      stopGame("Player");
      return;
    }
    // computer turn
    const coord = computer.chooseCoord();
    const compResult = playerBoard.receiveAttack(coord);
    updateDom.tile(compResult, "player", ...coord);
    updateDom.listOfShips(playerBoard.ships, "player");
    if (playerBoard.areAllSunk()) {
      stopGame("Computer");
      return;
    }
  }

  function stopGame(user) {
    document.removeEventListener("click", playRoundHandler);
    render.winner(user);
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
      document.addEventListener("click", rotateShipHandler);
    }
  }
}

function renderDom(playerBoard, computerBoard) {
  render.html();
  render.board(playerBoard, "player");
  render.board(computerBoard, "computer");
  render.listOfShips(playerBoard.ships, "player");
  render.listOfShips(computerBoard.ships, "computer");
}
