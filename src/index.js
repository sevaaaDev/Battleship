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

function game(playerGameboard) {
  displayGame();
  document.addEventListener("click", attackEnemy);
  document.addEventListener("click", restart);
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
      createBoard(playerGameboard, computerGameboard);
      document.removeEventListener("click", attackEnemy);
      document.addEventListener("click", attackEnemy);
    }
  }
  const computerGameboard = new Gameboard();
  const player = new Player();
  const computer = new Computer();
  computerGameboard.placeShip(5, "x", 4, 2);
  createBoard(playerGameboard, computerGameboard);
  function playRound(x, y) {
    console.log("a");
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
  button.addEventListener("click", showPlaceShipMenu);
}

function showPlaceShipMenu(e, playerBoard = new Gameboard()) {
  let total = 0;
  placeShipUi(playerBoard);
  document.addEventListener("click", placeShip);
  function placeShip(e) {
    if (e.target.matches(`.${placeShipStyle.board} div`)) {
      total++;
      playerBoard.placeShip(3, "x", e.target.dataset.x, e.target.dataset.y);
      placeShipUi(playerBoard);
      if (total == 3) {
        document.removeEventListener("click", placeShip);
        game(playerBoard);
      }
    }
  }
}

showStartMenu();
