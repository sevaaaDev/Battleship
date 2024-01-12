import select from "../../selector";
export function renderBoard(playerData, compData) {
  const playerBoard = select.playerBoard;
  console.log(playerBoard);
  const compBoard = select.computerBoard;
  populateGrid(playerBoard, playerData);
  populateGrid(compBoard, compData, "comp");
}

function populateGrid(board, data, player) {
  resetGrid(board);
  for (let y = 9; y >= 0; y--) {
    for (let x = 0; x < 10; x++) {
      const grid = document.createElement("div");
      grid.setAttribute("data-x", x);
      grid.setAttribute("data-y", y);
      board.append(grid);
      // if (player === "comp") {
      //   continue;
      // }
      for (let ship in data.ships) {
        for (let coord of data.ships[ship].range) {
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
