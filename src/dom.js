export function createBoard(playerData, compData) {
  const playerBoard = document.querySelector(".playerBoard .board");
  const compBoard = document.querySelector(".compBoard .board");
  populateGrid(playerBoard, playerData);
  populateGrid(compBoard, compData);
}

function populateGrid(board, data) {
  resetGrid(board);
  for (let y = 9; y >= 0; y--) {
    for (let x = 0; x < 10; x++) {
      const grid = document.createElement("div");
      grid.setAttribute("data-x", x);
      grid.setAttribute("data-y", y);
      for (let ship of data.ships) {
        if (ship.orientation === "x") {
          let max = ship.x + ship.ship.length - 1;
          if (x <= max && x >= ship.x && ship.y === y) {
            grid.style.backgroundColor = "black";
          }
        } else {
          let max = ship.y - (ship.ship.length - 1);
          if (y >= max && y <= ship.y && ship.x === x) {
            grid.style.backgroundColor = "black";
          }
        }
      }
      for (let attack of data.missedAttack) {
        if (attack.x === x && attack.y === y) {
          grid.style.backgroundColor = "blue";
        }
      }
      for (let attack of data.attack) {
        if (attack.x === x && attack.y === y) {
          grid.style.backgroundColor = "red";
        }
      }
      board.append(grid);
    }
  }
}

function resetGrid(board) {
  board.innerHTML = "";
}
