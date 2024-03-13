import css from "../style.css";

function html() {
  const body = document.querySelector("body");
  body.innerHTML = `
<header>
  <h1 class='${css.bigTitle}'>Battleship</h1>
</header>
<main class='${css.container}'>
  <section class='${css.messageInfo}'>
    <p>Drag ship to move <br> Click ship to rotate</p>
  </section>
  <section class='${css.boardsContainer}'>
    <section class='${css.mainBoardWrapper}'>
        <div class='${css.listOfShipsLeft}' data-board='player' style='display:none'></div>
      <section class='${css.boardWrapper}'>
        <div class='${css.board}' data-board='player' ondragstart="() => false"></div>
        <h3 class='${css.boardName}'>PLAYER</h3>
      </section>
    </section>
    <section class='${css.mainBoardWrapper}' style='display:none'>
      <section class='${css.boardWrapper}'>
        <div class='${css.board}' data-board='computer' ondragstart="() => false"></div>
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

function board(gameboard, user, showShip) {
  let domboard = document.querySelector(
    `div[data-board="${user}"].${css.board}`,
  );
  domboard.innerHTML = "";
  for (let y = 9; y >= 0; y--) {
    for (let x = 0; x < 10; x++) {
      let tile = document.createElement("div");
      tile.setAttribute("data-x", x);
      tile.setAttribute("data-y", y);
      tile.ondragstart = () => false;
      if (user === "player") {
        tile.setAttribute("data-drop", true);
      }
      if (typeof gameboard.board[x][y] === "object") {
        if (showShip) {
          tile.classList.add(`${css.ship}`);
        }
        if (user === "player") {
          tile.classList.add(`${css.allowDrag}`);
          // NOTE: dunno why i wrote this
          if (user === "player") {
            tile.setAttribute("data-ship", true);
          }
        }
      }
      if (gameboard.board[x][y] === "missed") {
        tile.classList.add(`${css.miss}`);
      }
      if (gameboard.board[x][y] === "hit") {
        tile.classList.add(`${css.hit}`);
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

let render = {
  html,
  board,
  listOfShips,
  button,
};
export default render;
