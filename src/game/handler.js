import styles from "./dom/gameUi.css";

export function attackBoard(gameboard, x, y, opt) {
  let target = document.querySelector(
    `.${styles.compBoard} .${styles.board} div[data-x="${x}"][data-y="${y}"]`,
  );
  if (opt === "comp") {
    target = document.querySelector(
      `.${styles.playerBoard} .${styles.board} div[data-x="${x}"][data-y="${y}"]`,
    );
  }
  target.setAttribute("aria-disabled", true);
  let ship = gameboard.receiveAttack(x, y);
  if (ship) {
    if (typeof ship !== "object") {
      return;
    }
    if (ship.isSunk()) {
      hitSurrounding(gameboard, ship.name, opt);
    }
    target.style.backgroundColor = "red";
    return;
  }
  target.style.backgroundColor = "blue";
}

export function displayWinner(winner) {
  let displayText = document.querySelector(`.${styles.info}`);
  displayText.innerText = `${winner} Won`;
}

function hitSurrounding(gameboard, name, opt) {
  for (let coord of gameboard.ships[name].range) {
    for (let node of gameboard.graph[`${coord.x},${coord.y}`]) {
      let coordNode = node.split(",");
      attackBoard(gameboard, +coordNode[0], +coordNode[1], opt);
    }
  }
}
