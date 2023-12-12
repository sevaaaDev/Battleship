import Gameboard from "./gameboard";
import { attackRandom } from "./player";
import { createDom } from "./dom";
import "./style/style.css";

function game() {
  const playerGameboard = new Gameboard();
  const computerGameboard = new Gameboard();
  playerGameboard.placeShip(1, "x", 0, 0);
  computerGameboard.placeShip(1, "x", 0, 0);
  createDom(playerGameboard, computerGameboard);
  playRound();
  function playRound() {
    let x = prompt("x");
    let y = prompt("y");
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
