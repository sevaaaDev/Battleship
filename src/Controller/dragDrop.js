export function startDrag(e, gameboard, renderBoard) {
  let currentElement = e.target;
  let isDragged = false;
  let dropPoint;
  document.body.style.overscrollBehaviorY = "none";
  // TODO: add animation while dragging

  function draggingMobile(e) {
    e.preventDefault();
    dropPoint = document.elementFromPoint(
      e.targetTouches[0].clientX,
      e.targetTouches[0].clientY,
    );
    if (currentElement !== dropPoint) {
      isDragged = true;
    }
  }

  function dragging(e) {
    dropPoint = document.elementFromPoint(e.clientX, e.clientY);
    if (currentElement !== dropPoint) {
      isDragged = true;
    }
  }
  function endDrag(e) {
    document.body.style.overscrollBehaviorY = null;
    document.removeEventListener("mousemove", dragging);
    document.removeEventListener("mouseup", endDrag);
    document.removeEventListener("touchmove", draggingMobile);
    document.removeEventListener("touchend", endDrag);
    if (!isDragged) return;
    if (dropPoint.dataset.drop) {
      drop(currentElement, dropPoint, gameboard);
      renderBoard(gameboard, "player");
    }
  }
  console.log(e);
  document.addEventListener("mousemove", dragging);
  document.addEventListener("touchmove", draggingMobile, { passive: false });
  document.addEventListener("mouseup", endDrag);
  document.addEventListener("touchend", endDrag);
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
