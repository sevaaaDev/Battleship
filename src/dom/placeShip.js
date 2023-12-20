import styles from "./gameUi.css";
export function placeShipUi(data) {
  const board = document.querySelector(`dialog .${styles.board}`);
  board.innerHTML = "";
  for (let y = 9; y >= 0; y--) {
    for (let x = 0; x < 10; x++) {
      const grid = document.createElement("div");
      grid.setAttribute("data-x", x);
      grid.setAttribute("data-y", y);
      board.append(grid);
      if (x > 7) {
        grid.setAttribute("aria-disabled", true);
      }
      for (let ship of data.ships) {
        for (let coord of ship.range) {
          if (x === coord.x && y === coord.y) {
            grid.style.backgroundColor = "black";
          }
        }
      }
    }
  }
}
