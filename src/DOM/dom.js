import css from "../style.css";

function render() {
  const body = document.querySelector("body");
  body.innerHTML = `
<header>
  <h1 class='${css.bigTitle}'>Battleship</h1>
</header>
<main class='${css.container}'>
  <p class='sign'></p>
  <section class='${css.boardsContainer}'>
    <section class='${css.boardWrapper}'>
      <div class='${css.listOfShips}' data-board='player'>
      </div>
      <div class='${css.board}' data-board='player'></div>
    </section>
    <section class='${css.buttonContainer}'>
      <button type='button' data-type='restart'>Restart</button>
      <button type='button'data-type='start'>Start</button>
    </section>
    <section class='${css.boardWrapper}'>
      <div class='${css.board}' data-board='computer'></div>
      <div class='${css.listOfShips}' data-board='computer'>
      </div>
    </section>
  </section>

</main>
`;
}

function renderBoard(gameboard, user) {
  let domboard = document.querySelector(
    `div[data-board="${user}"].${css.board}`,
  );
  domboard.innerHTML = "";
  for (let y = 9; y >= 0; y--) {
    for (let x = 0; x < 10; x++) {
      let tile = document.createElement("div");
      tile.setAttribute("data-x", x);
      tile.setAttribute("data-y", y);
      if (user === "player") {
        tile.setAttribute("data-drop", true);
      }
      //if (user === "player") {
      if (typeof gameboard.board[x][y] === "object") {
        tile.classList.add(`${css.ship}`);
        if (user === "player") {
          tile.setAttribute("data-ship", true);
        }
      }
      // if (board[x][y] === "disabled") {
      //   tile.classList.add(`${css.disabled}`);
      // }
      //}
      domboard.append(tile);
    }
  }
}

function hit(user, x, y) {
  let tile = document.querySelector(
    `div[data-board='${user}'] div[data-x='${x}'][data-y='${y}']`,
  );
  tile.classList.remove(`${css.ship}`);
  tile.classList.add(`${css.hit}`);
}

function miss(user, x, y) {
  let tile = document.querySelector(
    `div[data-board='${user}'] div[data-x='${x}'][data-y='${y}']`,
  );
  tile.classList.remove(`${css.disabled}`);
  tile.classList.add(`${css.miss}`);
}

function showWinner(winner) {
  let sign = document.querySelector(`p.sign`);
  sign.innerText = `${winner} WON`;
}

function renderListShip(ships, user) {
  const list = document.querySelector(
    `div[data-board='${user}'].${css.listOfShips}`,
  );
  list.innerText = "";
  for (let ship of ships) {
    const divShip = document.createElement("div");
    divShip.setAttribute("data-ship", ship.name);
    for (let i = 0; i < ship.length; i++) {
      const smallTile = document.createElement("div");
      smallTile.classList.add(`${css.smallTile}`);
      divShip.append(smallTile);
    }
    list.append(divShip);
  }
}

function updateListShip(ships, user) {
  for (let ship of ships) {
    const divShip = document.querySelector(
      `div[data-board='${user}'] div[data-ship='${ship.name}']`,
    );
    if (ship.isSunk()) {
      divShip.classList.add(`${css.shipSunk}`);
    }
  }
}
let domStuff = {
  render,
  renderBoard,
  hit,
  miss,
  showWinner,
  renderListShip,
  updateListShip,
};
export default domStuff;
