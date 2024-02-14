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
      if (typeof board[x][y] === "object") {
        tile.classList.add(`${css.ship}`);
      }
      if (board[x][y] === "disabled") {
        tile.classList.add(`${css.disabled}`);
      }
      document.querySelector(`.${css.board}`).append(tile);
    }
  }
}

function domHit(x, y) {
  let tile = document.querySelector(`div[data-x='${x}'][data-y='${y}']`);
  tile.classList.remove(`${css.ship}`);
  tile.classList.add(`${css.hit}`);
}

function domMiss(x, y) {
  let tile = document.querySelector(`div[data-x='${x}'][data-y='${y}']`);
  tile.classList.remove(`${css.disabled}`);
  tile.classList.add(`${css.miss}`);
}

export { render, renderBoard, domHit, domMiss };
