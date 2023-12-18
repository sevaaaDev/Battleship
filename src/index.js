import Gameboard from "./gameboard";
import { Computer, Player } from "./player";
import { createBoard, displayWinner } from "./dom";
import { displayGame } from "./dom/game";
import { startMenu } from "./dom/startMenu";
import gameUistyle from "./dom/gameUi.css";

// TODO: refactor the async attack animation
// TODO: refactor randomAttack()

function game() {
  displayGame();
  // startMenu();
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
  const playerGameboard = new Gameboard();
  const player = new Player();
  const computer = new Computer();
  playerGameboard.placeShip(3, "y", 2, 9);
  playerGameboard.placeShip(2, "x", 2, 0);
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

game();
