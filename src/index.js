import Gameboard from "./gameboard";
import { Computer, Player } from "./player";
import { createBoard, displayWinner } from "./dom";
import { displayGame } from "./dom/game";
import { startMenu } from "./dom/startMenu";
import gameUistyle from "./dom/gameUi.css";
import startMenuStyle from "./dom/startMenuUi.css";
import { placeShipUi } from "./dom/placeShip";

// TODO: refactor the async attack animation
// TODO: refactor randomAttack()
// TODO: create placeShip() for computer
// TODO: board is a graph, u need 1 pixel gap for every ship placed

function game() {
  const playerGameboard = new Gameboard();
  const computerGameboard = new Gameboard();
  const getNextShip = getNextShipFactory();
  const changeOrient = orientFactory();
  displayGame();
  const modal = document.querySelector("dialog");
  let orient = changeOrient();
  let nextShip = getNextShip();
  modal.showModal();
  const orientBtn = modal.querySelector("button");
  orientBtn.addEventListener("click", () => {
    orient = changeOrient();
    placeShipUi(playerGameboard);
  });
  placeShipUi(playerGameboard);
  document.addEventListener("click", placeShip);
  document.addEventListener("mouseover", hover);
  document.addEventListener("click", attackEnemy);
  document.addEventListener("click", restart);
  globalEventListener("click", placeShip, `dialog .${gameUistyle.board} div`);
  globalEventListener("mouseout", cleanUp, `dialog div.${gameUistyle.hover}`);
  function globalEventListener(type, cb, element, disabled) {
    document.addEventListener(type, (e) => {
      if (e.target.matches(element)) {
        if (e.target.ariaDisabled) {
          return;
        }
        cb(e);
      }
    });
  }
  function cleanUp(e) {
    let x = e.target.dataset.x;
    let y = e.target.dataset.y;
    hoverEffect("remove", nextShip, x, y, orient);
  }
  function hover(e) {
    document.removeEventListener("mouseover", hover);
    let x = e.target.dataset.x;
    let y = e.target.dataset.y;
    setTimeout(() => {
      document.addEventListener("mouseover", hover);
    }, 10);
    if (playerGameboard.checkWater(nextShip.length, orient, x, y)) {
      e.target.setAttribute("aria-disabled", true);
      return;
    }
    hoverEffect("add", nextShip, x, y, orient);
  }
  function placeShip(e) {
    let x = e.target.dataset.x;
    let y = e.target.dataset.y;
    playerGameboard.placeShip(nextShip.length, orient, x, y, nextShip.name);
    nextShip = getNextShip();
    placeShipUi(playerGameboard);
    if (!nextShip) {
      modal.close();
      createBoard(playerGameboard, computerGameboard);
      return;
    }
  }
  function attackEnemy(e) {
    if (
      e.target.matches(`.${gameUistyle.compBoard} .${gameUistyle.board} div`)
    ) {
      playRound(e.target.dataset.x, e.target.dataset.y);
    }
  }
  function restart(e) {
    if (e.target.matches(`.${gameUistyle.restartBtn}`)) {
      computerGameboard.clear();
      playerGameboard.clear();
      document.addEventListener("click", attackEnemy);
      orient = "x";
      nextShip = getNextShip();
      modal.showModal();
      placeShipUi(playerGameboard);
      computerGameboard.placeShip(5, "x", 4, 2);
    }
  }
  const player = new Player();
  const computer = new Computer();
  computerGameboard.placeShip(5, "x", 4, 2, "Carrier");
  computerGameboard.placeShip(5, "x", 4, 5, "Patrol");
  function playRound(x, y) {
    if (player.attack(computerGameboard, x, y)) {
      document.removeEventListener("click", attackEnemy);
      displayWinner("You");
      return;
    }
    if (computer.attack(playerGameboard)) {
      document.removeEventListener("click", attackEnemy);
      displayWinner("Computer");
      return;
    }
  }
}

function getNextShipFactory() {
  const listOfShips = [
    {
      name: "Carrier",
      length: 5,
    },
    {
      name: "Battleship",
      length: 4,
    },
    {
      name: "Destroyer",
      length: 3,
    },
    {
      name: "Submarine",
      length: 3,
    },
    {
      name: "Patrol Boat",
      length: 2,
    },
  ];
  let i = 0;
  return function () {
    if (i === 5) {
      i = 0;
      return null;
    }
    changeShipText(listOfShips[i].name);
    return listOfShips[i++];
  };
}

function changeShipText(name) {
  const text = document.querySelector("dialog h2");
  text.innerText = `Place Your ${name}`;
}

function hoverEffect(type, ship, x, y, orient) {
  for (let i = 0; i < ship.length; i++) {
    document
      .querySelector(`dialog div[data-x="${x}"][data-y="${y}"]`)
      .classList[type](gameUistyle.hover);
    if (orient === "x") {
      x++;
      continue;
    }
    y--;
  }
}

function orientFactory() {
  let state = ["x", "y"];
  let i = 0;
  return function () {
    if (i == 2) {
      i = 0;
    }
    return state[i++];
  };
}
function showStartMenu() {
  startMenu();
  const button = document.querySelector(`.${startMenuStyle.start}`);
  button.addEventListener("click", game);
}

showStartMenu();
