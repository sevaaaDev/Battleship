import Gameboard from "./gameboard";
import { attackRandom } from "./player";
import { createBoard, attackBoard } from "./dom";
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
  playerGameboard.placeShip(3, "y", 2, 9);
  playerGameboard.placeShip(2, "x", 2, 0);
  computerGameboard.placeShip(5, "x", 4, 2);
  createBoard(playerGameboard, computerGameboard);
  function playRound(x, y) {
    attackBoard(computerGameboard, x, y);
    if (isAllSunk(computerGameboard, playerGameboard)) {
      document.removeEventListener("click", attackEnemy);
      return;
    }
    attackRandom(playerGameboard);
    if (isAllSunk(computerGameboard, playerGameboard)) {
      document.removeEventListener("click", attackEnemy);
      return;
    }
  }
}

function isAllSunk(comp, player) {
  if (comp.isAllSunk() || player.isAllSunk()) {
    return true;
  }
}

game();
