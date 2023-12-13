import Gameboard from "./gameboard";
import { attackRandom } from "./player";
import { createDom } from "./dom";
import "./style/style.css";

function game() {
  const computerGameboard = new Gameboard();
  document.addEventListener("click", (e) => {
    if (e.target.matches(".compBoard .board div")) {
      const body = document.querySelector("body");
      body.style.pointerEvents = "none";
      playRound(e.target.dataset.x, e.target.dataset.y);
      body.removeAttribute("style");
    }
  });
  const playerGameboard = new Gameboard();
  playerGameboard.placeShip(3, "y", 2, 9);
  computerGameboard.placeShip(5, "x", 4, 2);
  createDom(playerGameboard, computerGameboard);
    computerGameboard.receiveAttack(+x, +y);
    attackRandom(playerGameboard);
    createDom(playerGameboard, computerGameboard);
    if (isAllSunk(computerGameboard, playerGameboard)) {
      alert("end");
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
