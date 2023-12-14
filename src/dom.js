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
        for (let coord of ship.range) {
          if (x === coord.x && y === coord.y) {
            grid.style.backgroundColor = "black";
          }
        }
      }
    }
  }
}

function resetGrid(board) {
  board.innerHTML = "";
}
