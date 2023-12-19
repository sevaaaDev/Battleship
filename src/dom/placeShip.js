import styles from "./placeShipUi.css";
export function placeShipUi(data) {
  const body = document.querySelector("body");
  body.innerHTML = `
 <h2 class="${styles.title}">Place your Ship</h2>
 <div class="${styles.container}">
   <div class='${styles.board}'></div>
   <button type='button' class="${styles.button}" aria-disabled='true'>Start</button>
 </div> 
`;
  const board = document.querySelector(`.${styles.board}`);
  for (let y = 9; y >= 0; y--) {
    for (let x = 0; x < 10; x++) {
      const grid = document.createElement("div");
      grid.setAttribute("data-x", x);
      grid.setAttribute("data-y", y);
      board.append(grid);
      console.log(data);
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
