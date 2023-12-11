import Gameboard from "./gameboard";
import { attackRandom } from "./player";
import "./style/style.css";

export function game() {
  const playerGameboard = new Gameboard();
  const computerGameboard = new Gameboard();
  playerGameboard.placeShip(1, "x", 0, 0);
  computerGameboard.placeShip(1, "x", 0, 0);
  playRound();
  function playRound() {
    let x = prompt("x");
    let y = prompt("y");
    computerGameboard.receiveAttack(x, y);
    attackRandom(playerGameboard);
    if (isAllSunk(computerGameboard, playerGameboard)) {
      alert("end");
      return;
    }
    playRound();
  }
}

function isAllSunk(comp, player) {
  if (comp.isAllSunk() || player.isAllSunk()) {
    return true;
  }
}
