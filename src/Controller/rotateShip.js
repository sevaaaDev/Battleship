export function rotateShip(x, y, gameboard) {
  let ship = gameboard.board[x][y];
  let coord = ship.position.head;
  let orientation = ship.orientation;
  if (orientation === "x") {
    orientation = "y";
  } else {
    orientation = "x";
  }
  let length = ship.length;
  if (gameboard.isOutside(...coord, length, orientation)) return false;

  if (gameboard.isThereAShip(...coord, length, orientation, ship.name))
    return false;

  if (gameboard.isTooCloseToOtherShip(...coord, length, orientation, ship.name))
    return false;

  ship.orientation = orientation;
  gameboard.moveShip(coord, coord, ship);
  return true;
}
