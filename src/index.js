import Gameboard from "./gameboard";
import { Computer, Player } from "./player";
import { createBoard, displayWinner } from "./dom";
import { displayGame } from "./dom/game";
import { startMenu } from "./dom/startMenu";
import gameUistyle from "./dom/gameUi.css";
import startMenuStyle from "./dom/startMenuUi.css";
import { placeShipUi } from "./dom/placeShip";
import placeShipStyle from "./dom/placeShipUi.css";

// TODO: refactor the async attack animation
// TODO: refactor randomAttack()

function game() {
  let index = 0;
  const playerGameboard = new Gameboard();
  const computerGameboard = new Gameboard();
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
  displayGame();
  const modal = document.querySelector("dialog");
  let orient = "x";
  modal.showModal();
  const orientBtn = modal.querySelector("button");
  orientBtn.addEventListener("click", () => {
    if (orient === "x") {
      orient = "y";
      orientBtn.innerText = "Orientation : Y";
      placeShipUi(orient, playerGameboard, listOfShips[0]);
      return;
    }
    orient = "x";
    orientBtn.innerText = "Orientation : X";
    placeShipUi(orient, playerGameboard, listOfShips[0]);
  });
  modal.querySelector("#start").addEventListener("click", () => {
    modal.close();
    createBoard(playerGameboard, computerGameboard);
  });
  placeShipUi(orient, playerGameboard, listOfShips[0]);
  document.addEventListener("click", placeShip);
  document.addEventListener("click", attackEnemy);
  document.addEventListener("click", restart);
  function placeShip(e) {
    if (e.target.matches(`dialog .${gameUistyle.board} div`)) {
      if (e.target.ariaDisabled) {
        return;
      }
      playerGameboard.placeShip(
        listOfShips[0],
        orient,
        e.target.dataset.x,
        e.target.dataset.y,
      );
      listOfShips.shift();
      placeShipUi(orient, playerGameboard, listOfShips[0]);
      if (listOfShips.length === 0) {
      index++;
      if (index === 5) {
        modal.close();
        createBoard(playerGameboard, computerGameboard);
        return;
      }
    }
  }
  function attackEnemy(e) {
    if (
      e.target.matches(`.${gameUistyle.compBoard} .${gameUistyle.board} div`)
    ) {
      playRound(e.target.dataset.x, e.target.dataset.y);
      e.target.setAttribute("aria-disabled", true);
    }
  }
  function restart(e) {
    if (e.target.matches(`.${gameUistyle.restartBtn}`)) {
      computerGameboard.clear();
      playerGameboard.clear();
      document.addEventListener("click", attackEnemy);
      orient = "x";
      orientBtn.innerText = "Orientation : X";
      modal.showModal();
      listOfShips = [5, 4, 4, 3, 2];
      placeShipUi(orient, playerGameboard, listOfShips[0]);
      index = 0;
      computerGameboard.placeShip(5, "x", 4, 2);
    }
  }
  const player = new Player();
  const computer = new Computer();
  computerGameboard.placeShip(5, "x", 4, 2);
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

function showStartMenu() {
  startMenu();
  const button = document.querySelector(`.${startMenuStyle.start}`);
  button.addEventListener("click", game);
}

showStartMenu();
