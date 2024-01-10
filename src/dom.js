import styles from "./dom/gameUi.css";

export function createBoard(playerData, compData) {
  const playerBoard = document.querySelector(
    `.${styles.playerBoard} .${styles.board}`,
  );
  console.log(playerBoard);
  const compBoard = document.querySelector(
    `.${styles.compBoard} .${styles.board}`,
  );
  populateGrid(playerBoard, playerData);
  populateGrid(compBoard, compData, "comp");
}

function populateGrid(board, data, player) {
  resetGrid(board);
  for (let y = 9; y >= 0; y--) {
    for (let x = 0; x < 10; x++) {
      const grid = document.createElement("div");
      grid.setAttribute("data-x", x);
      grid.setAttribute("data-y", y);
      board.append(grid);
      if (player === "comp") {
        continue;
      }
      for (let ship of data.ships) {
        for (let coord of ship.range) {
      for (let ship in data.ships) {
        for (let coord of data.ships[ship].range) {
          if (x === coord.x && y === coord.y) {
            grid.style.backgroundColor = "black";
          }
        }
      }
    }
  }
}

function resetGrid(board) {
  board.innerHTML = "";
}

export function attackBoard(gameboard, x, y, opt) {
  let target = document.querySelector(
    `.${styles.compBoard} .${styles.board} div[data-x="${x}"][data-y="${y}"]`,
  );
  if (opt === "comp") {
    target = document.querySelector(
      `.${styles.playerBoard} .${styles.board} div[data-x="${x}"][data-y="${y}"]`,
    );
  }
  if (gameboard.receiveAttack(x, y)) {
    target.style.backgroundColor = "red";
    return;
  }
  target.style.backgroundColor = "blue";
}

export function displayWinner(winner) {
  let displayText = document.querySelector(`.${styles.info}`);
  displayText.innerText = `${winner} Won`;
}
