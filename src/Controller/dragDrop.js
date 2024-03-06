import css from "../style.css";
export function startDrag(e, gameboard, renderBoard) {
  let currentElement = e.target;
  let isDragged = false;
  let dropPoint;
  function dragging(e) {
    e.preventDefault();
    isDragged = true;
    animateDrag(e, currentElement, gameboard);
  }
  function endDrag(e) {
    document.removeEventListener("pointerover", dragging);
    document.removeEventListener("pointercancel", cancel);
    dropPoint = e.target;
    if (!isDragged) return;
    if (dropPoint.dataset.drop) {
      drop(currentElement, dropPoint, gameboard);
      renderBoard(gameboard, "player");
    }
  }

  function cancel() {
    document.removeEventListener("pointerover", dragging);
  }
  document.addEventListener("pointerover", dragging, { passive: false });
  document.addEventListener("pointerup", endDrag, { once: true });
  document.addEventListener("pointercancel", cancel, { once: true });
}

function animateDrag(e, currentElement, gameboard) {
  let [currentX, currentY] = [+e.target.dataset.x, +e.target.dataset.y];
  let [previousX, previousY] = [
    +e.relatedTarget.dataset.x,
    +e.relatedTarget.dataset.y,
  ];
  let { x, y } = currentElement.dataset;
  let ship = gameboard.board[+x][+y];
  let length = parseInt(ship.length);
  let name = ship.name;
  let orientation = ship.orientation;
  // TODO: refactor this mess
  if (!isNaN(previousX)) {
    if (!gameboard.isOutside(previousX, previousY, length, orientation)) {
      resetTileColor(previousX, previousY, length, orientation);
    }
  }
  if (!e.target.dataset.drop) return;
  // TODO: create checkWater() function
  if (gameboard.isOutside(currentX, currentY, length, orientation)) return;
  if (gameboard.isThereAShip(currentX, currentY, length, orientation, name))
    return;
  if (
    gameboard.isTooCloseToOtherShip(
      currentX,
      currentY,
      length,
      orientation,
      name,
    )
  )
    return;

  changeTileColor(currentX, currentY, length, orientation);
}

function changeTileColor(x, y, length, orientation) {
  for (let i = 0; i < length; i++) {
    let shipNode = document.querySelector(
      `div[data-board="player"] div[data-x="${x}"][data-y="${y}"]`,
    );
    shipNode.classList.add(`${css.drag}`);
    if (orientation === "x") {
      x++;
      continue;
    }
    y++;
  }
}

function resetTileColor(x, y, length, orientation) {
  for (let i = 0; i < length; i++) {
    let shipNode = document.querySelector(
      `div[data-board="player"] div[data-x="${x}"][data-y="${y}"]`,
    );
    shipNode.classList.remove(`${css.drag}`);
    if (orientation === "x") {
      x++;
      continue;
    }
    y++;
  }
}

function drop(currentElement, dropPoint, gameboard) {
  let { x, y } = currentElement.dataset;
  let [a, b] = [+dropPoint.dataset.x, +dropPoint.dataset.y];
  let ship = gameboard.board[x][y];
  if (!ship) {
    return;
  }
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
