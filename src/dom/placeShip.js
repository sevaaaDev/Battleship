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
      for (let ship in data.ships) {
        for (let coord of data.ships[ship].range) {
          for (let node of data.graph[`${coord.x},${coord.y}`]) {
            let coord = node.split(",");
            console.log(coord);
            if (x == coord[0] && y == coord[1]) {
              if (grid.style.backgroundColor != "black") {
                grid.style.backgroundColor = "red";
                grid.setAttribute("aria-disabled", true);
              }
            }
          }
          if (x == coord.x && y == coord.y) {
            grid.style.backgroundColor = "black";
          }
        }
      }
    }
  }
}
