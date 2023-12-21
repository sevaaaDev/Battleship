import styles from "./gameUi.css";
export function placeShipUi(orient, data, shipLen) {
  const board = document.querySelector(`dialog .${styles.board}`);
  board.innerHTML = "";
  for (let y = 9; y >= 0; y--) {
    for (let x = 0; x < 10; x++) {
      const grid = document.createElement("div");
      grid.setAttribute("data-x", x);
      grid.setAttribute("data-y", y);
      board.append(grid);
      for (let ship of data.ships) {
        for (let coord of ship.range) {
          if (x === coord.x && y === coord.y) {
            grid.style.backgroundColor = "black";
            grid.setAttribute("aria-disabled", true);
          }
        }
      }
      if (orient === "x") {
        if (x > 10 - shipLen) {
          grid.setAttribute("aria-disabled", true);
        }
        continue;
      }
      if (y < -1 + shipLen) {
        grid.setAttribute("aria-disabled", true);
      }
    }
  }
}
