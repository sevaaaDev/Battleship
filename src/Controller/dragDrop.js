export function startDrag(e, gameboard, renderBoard) {
  let currentElement = e.target;
  let isDragged = false;
  let dropPoint;
  // TODO: add animation while dragging

  function draggingMobile(e) {
    e.preventDefault();
    isDragged = true;
  }
  function endDrag(e) {
    document.removeEventListener("pointerover", draggingMobile);
    dropPoint = e.target;
    if (!isDragged) return;
    if (dropPoint.dataset.drop) {
      drop(currentElement, dropPoint, gameboard);
      renderBoard(gameboard, "player");
    }
  }
  document.addEventListener("pointerover", draggingMobile, { passive: false });
  document.addEventListener("pointerup", endDrag, { once: true });
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
