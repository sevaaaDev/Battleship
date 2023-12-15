import Gameboard from "./gameboard";
import { Computer, Player } from "./player";
import { createBoard, displayWinner } from "./dom";
import "./style/style.css";

// TODO: refactor the async attack animation
// TODO: refactor randomAttack()

function game() {
  document.addEventListener("click", attackEnemy);
  function attackEnemy(e) {
    if (e.target.matches(".compBoard .board div")) {
      const body = document.querySelector("body");
      body.style.pointerEvents = "none";
      playRound(e.target.dataset.x, e.target.dataset.y);
      body.removeAttribute("style");
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
