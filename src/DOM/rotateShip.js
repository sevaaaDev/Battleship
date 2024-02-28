export function rotateShip(x, y, gameboard) {
  // TODO: mouseup event, is there a better way?
  let ship = gameboard.board[x][y];
  let coord = ship.position.head;
  let orientation = ship.orientation;
  if (orientation === "x") {
    orientation = "y";
  } else {
    orientation = "x";
  }
  if (gameboard.isOutside(...coord, ship.length, orientation)) {
    return false;
  }
  if (gameboard.isThereAShip(...coord, ship.length, orientation, ship.name)) {
    return false;
  }
  ship.orientation = orientation;
  gameboard.moveShip(coord, coord, ship);
  return true;
}
