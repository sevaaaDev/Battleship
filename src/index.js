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
      placeShipUi(
        orient,
        playerGameboard,
        listOfShips[index].length,
        listOfShips[index].name,
      );
      return;
    }
    orient = "x";
    orientBtn.innerText = "Orientation : X";
    placeShipUi(
      orient,
      playerGameboard,
      listOfShips[index].length,
      listOfShips[index].name,
    );
  });
  placeShipUi(
    orient,
    playerGameboard,
    listOfShips[index].length,
    listOfShips[index].name,
  );
  document.addEventListener("click", placeShip);
  document.addEventListener("mouseover", hover);
  document.addEventListener("mouseout", cleanUp);
  document.addEventListener("click", attackEnemy);
  document.addEventListener("click", restart);
  function cleanUp(e) {
    if (e.target.matches(`dialog div.${gameUistyle.hover}`)) {
      if (e.target.ariaDisabled) {
        return;
      }
      let x = e.target.dataset.x;
      let y = e.target.dataset.y;
      for (let i = 0; i < listOfShips[index].length; i++) {
        document
          .querySelector(`dialog div[data-x="${x}"][data-y="${y}"]`)
          .classList.remove(gameUistyle.hover);
        if (orient === "x") {
          x++;
          continue;
        }
        y--;
      }
    }
  }
  function hover(e) {
    if (e.target.matches(`dialog .${gameUistyle.board} div`)) {
      if (e.target.ariaDisabled) {
        return;
      }
      document.removeEventListener("mouseover", hover);
      let x = e.target.dataset.x;
      let y = e.target.dataset.y;
      setTimeout(() => {
        document.addEventListener("mouseover", hover);
      }, 10);
      if (playerGameboard.checkWater(listOfShips[index].length, orient, x, y)) {
        e.target.setAttribute("aria-disabled", true);
        return;
      }
      for (let i = 0; i < listOfShips[index].length; i++) {
        document
          .querySelector(`dialog div[data-x="${x}"][data-y="${y}"]`)
          .classList.add(gameUistyle.hover);
        if (orient === "x") {
          x++;
          continue;
        }
        y--;
      }
    }
  }
  function placeShip(e) {
    if (e.target.matches(`dialog .${gameUistyle.board} div`)) {
      let x = e.target.dataset.x;
      let y = e.target.dataset.y;
      if (e.target.ariaDisabled) {
        return;
      }
      playerGameboard.placeShip(listOfShips[index].length, orient, x, y);
      placeShipUi(orient, playerGameboard);
      index++;
      if (index === 5) {
        modal.close();
        createBoard(playerGameboard, computerGameboard);
        return;
      }
      const text = document.querySelector("dialog h2");
      text.innerText = `Place Your ${listOfShips[index].name}`;
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
      index = 0;
      placeShipUi(
        orient,
        playerGameboard,
        listOfShips[index].length,
        listOfShips[index].name,
      );
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
