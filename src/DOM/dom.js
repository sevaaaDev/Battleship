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
      document.querySelector(`.${css.board}`).append(tile);
    }
  }
}

export { render, renderBoard };
