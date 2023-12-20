import Gameboard from "./gameboard";
import { Computer, Player } from "./player";
import { createBoard, displayWinner } from "./dom";
import { displayGame } from "./dom/game";
import { startMenu } from "./dom/startMenu";
import gameUistyle from "./dom/gameUi.css";
import startMenuStyle from "./dom/startMenuUi.css";
import { placeShipUi } from "./dom/placeShip";
import placeShipStyle from "./dom/placeShipUi.css";

// TODO: refactor the async attack animation
// TODO: refactor randomAttack()
// TODO: refactor restart btn and place ship menu

function game() {
  const playerGameboard = new Gameboard();
  const computerGameboard = new Gameboard();
  displayGame();
  const modal = document.querySelector("dialog");
  modal.showModal();
  modal.querySelector("button").addEventListener("click", () => {
    modal.close();
    createBoard(playerGameboard, computerGameboard);
  });
  placeShipUi(playerGameboard);
  document.addEventListener("click", placeShip);
  document.addEventListener("click", attackEnemy);
  document.addEventListener("click", restart);
  function placeShip(e) {
    if (e.target.matches(`dialog .${gameUistyle.board} div`)) {
      playerGameboard.placeShip(3, "x", e.target.dataset.x, e.target.dataset.y);
      placeShipUi(playerGameboard);
    }
  }
  function attackEnemy(e) {
    if (
      e.target.matches(`.${gameUistyle.compBoard} .${gameUistyle.board} div`)
    ) {
      playRound(e.target.dataset.x, e.target.dataset.y);
      e.target.setAttribute("aria-disabled", true);
    }
  }
  function restart(e) {
    if (e.target.matches(`.${gameUistyle.restartBtn}`)) {
      computerGameboard.clear();
      playerGameboard.clear();
      document.addEventListener("click", attackEnemy);
      modal.showModal();
      placeShipUi(playerGameboard);
      computerGameboard.placeShip(5, "x", 4, 2);
    }
  }
  const player = new Player();
  const computer = new Computer();
  computerGameboard.placeShip(5, "x", 4, 2);
  function playRound(x, y) {
    if (player.attack(computerGameboard, x, y)) {
      document.removeEventListener("click", attackEnemy);
      displayWinner("You");
      return;
    }
    if (computer.attack(playerGameboard)) {
      document.removeEventListener("click", attackEnemy);
      displayWinner("Computer");
      return;
    }
  }
}

function showStartMenu() {
  startMenu();
  const button = document.querySelector(`.${startMenuStyle.start}`);
  button.addEventListener("click", game);
}

showStartMenu();
