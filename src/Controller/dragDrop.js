export function startDrag(e, gameboard, renderBoard) {
  // e.preventDefault();
  console.log("down");
  let currentElement = e.target;
  // TODO: add animation when dragging

  // function moveHandler(e) {}
  // document.addEventListener("mousemove", moveHandler);
  function endDrag(e) {
    console.log("up");
    let dropPoint = document.elementFromPoint(e.pageX, e.pageY);
    if (dropPoint.dataset.drop) {
      drop(currentElement, dropPoint, gameboard);
      renderBoard(gameboard, "player");
    }
    document.removeEventListener("mouseup", endDrag);
  }
  document.addEventListener("mouseup", endDrag);
  // TODO: support mobile
  // document.addEventListener('touchend', endDrag)
}

function drop(currentElement, dropPoint, gameboard) {
  let { x, y } = currentElement.dataset;
  let [a, b] = [+dropPoint.dataset.x, +dropPoint.dataset.y];
  let ship = gameboard.board[x][y];
  let length = parseInt(ship.length);
  let orientation = ship.orientation;
  let name = ship.name;
  let from = [parseInt(x), parseInt(y)];
  let to = [a, b];
  // check the dropPoint coordinate
  if (gameboard.isOutside(a, b, length, orientation)) return;
  if (gameboard.isThereAShip(a, b, length, orientation, name)) return;
  if (gameboard.isTooCloseToOtherShip(a, b, length, orientation, name)) return;

  gameboard.moveShip(from, to, ship);
}
