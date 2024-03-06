import css from "../style.css";
// TODO: responsive design

function html() {
  const body = document.querySelector("body");
  body.innerHTML = `
<header>
  <h1 class='${css.bigTitle}'>Battleship</h1>
</header>
<main class='${css.container}'>
  <section class='${css.messageInfo}'>
    <p>Drag ship to move</p>
    <p>Click ship to rotate</p>
  </section>
  <section class='${css.boardsContainer}'>
    <section class='${css.mainBoardWrapper}'>
        <div class='${css.listOfShipsLeft}' data-board='player' style='display:none'></div>
      <section class='${css.boardWrapper}'>
        <div class='${css.board}' data-board='player'></div>
        <h3 class='${css.boardName}'>PLAYER</h3>
      </section>
    </section>
    <section class='${css.mainBoardWrapper}' style='display:none'>
      <section class='${css.boardWrapper}'>
        <div class='${css.board}' data-board='computer'></div>
        <h3 class='${css.boardName}'>COMPUTER</h3>
      </section>
        <div class='${css.listOfShipsRight}' data-board='computer' style='display:none'></div>
    </section>
  </section>
  <section class='${css.buttonContainer}'>
    <button type='button'data-type='start'>Start</button>
  </section>
</main>
`;
}

function button(type) {
  const container = document.querySelector(`.${css.buttonContainer}`);
  const btn = document.createElement("button");
  btn.setAttribute("type", "button");
  btn.setAttribute("data-type", type);
  btn.innerText = type[0].toUpperCase().concat(type.slice(1));
  container.append(btn);
}

function board(gameboard, user) {
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
      // NOTE: uncomment this

      //if (user === "player") {
      if (typeof gameboard.board[x][y] === "object") {
        tile.classList.add(`${css.ship}`);
        tile.classList.add(`${css.allowDrag}`);
        if (user === "player") {
          tile.setAttribute("data-ship", true);
        }
      }
      domboard.append(tile);
    }
  }
}

function listOfShips(ships, user) {
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

function winner(winner) {
  let sign = document.querySelector(`section.${css.messageInfo} p`);
  sign.innerText = `${winner} WON`;
}

let render = {
  html,
  board,
  listOfShips,
  button,
  winner,
};
export default render;
