import css from "../style.css";
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

function sunk(user, coordinates) {
  for (let coord of coordinates) {
    let { x, y } = coord;
    let tile = document.querySelector(
      `div[data-board='${user}'] div[data-x='${x}'][data-y='${y}']`,
    );
    tile.classList.add(`${css.sunk}`);
  }
}
function tile(result, user, x, y) {
  if (result === "missed") {
    miss(user, x, y);
    return;
  }
  if (result === "hit") {
    hit(user, x, y);
    return;
  }
}
function listOfShips(ships, user) {
  for (let ship of ships) {
    const divShip = document.querySelector(
      `div[data-board='${user}'] div[data-ship='${ship.name}']`,
    );
    if (ship.isSunk()) {
      divShip.classList.add(`${css.shipSunk}`);
    }
  }
}

function toggleDimBoard(name) {
  let board = document.querySelector(
    `section[data-board='${name}'].${css.mainBoardWrapper}`,
  );
  dimBoard(board);
  if (name === "player") {
    let enemyBoard = document.querySelector(
      `section[data-board='computer'].${css.mainBoardWrapper}`,
    );
    undimBoard(enemyBoard);
    return;
  }
  let enemyBoard = document.querySelector(
    `section[data-board='player'].${css.mainBoardWrapper}`,
  );
  undimBoard(enemyBoard);
}

function dimBoard(board) {
  board.classList.add(`${css.dim}`);
}
function undimBoard(board) {
  board.classList.remove(`${css.dim}`);
}

function info(result) {
  if (result === "missed") {
    messageInfo("You fired a shot and misses");
    return;
  }
  if (result === "hit") {
    messageInfo("You fired a shot and its a hit");
    return;
  }
}
function messageInfo(message) {
  let msgInfo = document.querySelector(`.${css.messageInfo} p`);
  msgInfo.innerText = message;
}

function removeDisplayNone() {
  let nones = document.querySelectorAll(`[style='display:none']`);
  nones.forEach((none) => {
    none.removeAttribute("style");
  });
}

function removeCursorDrag() {
  let ships = document.querySelectorAll(
    `div[data-board='player'] div.${css.ship}`,
  );
  ships.forEach((ship) => {
    ship.classList.remove(`${css.allowDrag}`);
  });
}
const updateDom = {
  tile,
  listOfShips,
  removeCursorDrag,
  removeDisplayNone,
  messageInfo,
  info,
  toggleDimBoard,
  sunk,
};

export default updateDom;
