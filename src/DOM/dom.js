import css from "../style.css";
function render() {
  const body = document.querySelector("body");
  body.innerHTML = `
<button>Attack</button type='button'>
<div class='${css.board}'></div>
`;
}

function renderBoard(board) {
  for (let x = 0; x < 10; x++) {
    for (let y = 9; y >= 0; y--) {
      let tile = document.createElement("div");
      tile.setAttribute("data-x", x);
      tile.setAttribute("data-y", y);
      for (let ship of board.ships) {
        for (let coord of ship.lsCoord) {
          if (x === coord.x && y === coord.y) {
            tile.classList.add(`${css.ship}`);
          }
        }
      }
      if (board.board[x][y] === "disabled") {
        tile.classList.add(`${css.disabled}`);
      }
      document.querySelector(`.${css.board}`).append(tile);
    }
  }
}

export { render, renderBoard };
