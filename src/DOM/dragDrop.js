export function startDrag(e, gameboard, renderBoard) {
  e.preventDefault();
  console.log("down");
  let currentElement = e.target;
  // function moveHandler(e) {}
  // document.addEventListener("mousemove", moveHandler);
  function endDrag(e) {
    console.log("up");
    let dropPoint = document.elementFromPoint(e.pageX, e.pageY);
    if (dropPoint.dataset.drop) {
      drop(currentElement, dropPoint, gameboard);
      renderBoard(gameboard.board, "player", gameboard);
    }
    document.removeEventListener("mouseup", endDrag);
  }
  document.addEventListener("mouseup", endDrag);
}

function drop(currentElement, dropPoint, gameboard) {
  console.log(currentElement);
  console.log(dropPoint);
  let { x, y } = currentElement.dataset;
  let [a, b] = [+dropPoint.dataset.x, +dropPoint.dataset.y];
  let ship = gameboard.board[x][y];
  let length = ship.length;
  let orient = ship.orientation;
  let name = ship.name;
  console.log(orient);
  // check the coordinate
  if (gameboard.isOutside(+a, +b, +length, orient)) return;
  console.log("outside");
  if (gameboard.isThereAShip(+a, +b, +length, orient, name)) return;
  // remove and place (replace)
  gameboard.removeShip(+x, +y);
  // ERROR : ship.lsCoord doesnt get updated, so the ship cant be remove
  gameboard.placeShip(+length, orient, +a, +b, name, ship);
  console.log(gameboard.ships);
}
