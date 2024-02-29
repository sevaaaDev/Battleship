import { getAllCoord } from "./gameboard";

const proto = {
  isSunk: function () {
    if (!this.health) {
      this.sunk = true;
      return true;
    }
    return false;
  },
  hit: function () {
    if (this.health) this.health--;
  },
};
export default function createShip({ length, name, orient, shipPosition }) {
  const obj = Object.create(proto);
  obj.length = length;
  obj.name = name;
  obj.health = length;
  obj.sunk = false;
  obj.orientation = orient;
  obj.position = shipPosition;
  return obj;
}

export function holdShipPosition(x, y, orientation, length) {
  const position = {};
  position.listCoordinate = [];
  position.head = [x, y];
  position.tail = [x + length - 1, y];
  if (orientation === "y") {
    position.tail = [x, y + length - 1];
  }
  return position;
}

function getShipClosure() {
  let index = 0;
  return function () {
    let ships = [
      { name: "Carrier", length: 5 },
      { name: "Battleship", length: 4 },
      { name: "Destroyer", length: 3 },
      { name: "Submarine", length: 3 },
      { name: "Patrol", length: 2 },
    ];
    if (index > ships.length - 1) {
      index = 0;
    }
    return ships[index++];
  };
}

export function initPlaceShip(board) {
  const getShip = getShipClosure();
  let moves = getAllCoord();
  for (let i = 0; i < 5; i++) {
    const ship = getShip();
    let { coordinate, orient } = tryPlaceShip(board, ship, moves, "x");
    removeCoordinate(moves, ship.length, coordinate, orient);
  }
}

function tryPlaceShip(board, ship, moves, orient) {
  let [x, y] = pickCoordinate(moves, ship.length);
  let shipPosition = holdShipPosition(x, y, orient, ship.length);
  let result = board.placeShip(createShip({ ...ship, shipPosition, orient }));
  // randomise the orientation
  if (orient === "x") {
    orient = "y";
  } else {
    orient = "x";
  }
  // try again if fail
  if (!result) {
    return tryPlaceShip(board, ship, moves, orient);
  }
  return { coordinate: [x, y], orient };
}

function pickCoordinate(moves) {
  let index = Math.floor(Math.random() * (moves.length - 1));
  let coord = moves[index];
  return coord;
}

function removeCoordinate(moves, length, coord, orient) {
  let copiedCoordinate = coord.slice();
  for (let i = 0; i < length; i++) {
    if (orient === "x") {
      moves.splice(
        moves.indexOf([copiedCoordinate[0]++, copiedCoordinate[1]]),
        1,
      );
    } else {
      moves.splice(
        moves.indexOf([copiedCoordinate[0], copiedCoordinate[1]++]),
        1,
      );
    }
  }
}
