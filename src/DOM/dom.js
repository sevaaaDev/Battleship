import css from "../style.css";
function render() {
  const body = document.querySelector("body");
  body.innerHTML = `
<main class='${css.container}'>
  <button type='button'>Attack</button>
  <h1 class='${css.bigTitle}'>Battleship</h1>
  <p class='sign'></p>
  <section class='${css.boardsContainer}'>
    <section class='${css.boardWrapper}'>
      <div class='${css.listOfShips}'>
        <ul>
          <li>Carrier</li>
        </ul>
      </div>
      <div class='${css.board}' data-board='player'></div>
    </section>
    <section class='${css.buttonContainer}'>
      <button type='button'>Restart</button>
      <button type='button'>Start</button>
    </section>
    <section class='${css.boardWrapper}'>
      <div class='${css.board}' data-board='computer'></div>
      <div class='${css.listOfShips}'>
        <ul>
          <li>Carrier</li>
        </ul>
      </div>
    </section>
  </section>

</main>
`;
}

function renderBoard(board, user) {
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
      document.querySelector(`div[data-board="${user}"]`).append(tile);
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

function showWinner(winner) {
  let sign = document.querySelector(`p.sign`);
  sign.innerText = `${winner} WON`;
}

export { render, renderBoard, domHit, domMiss, showWinner };
