import { getCoord } from "./gameboard";

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
export default function createShip(length, name, pos, orient, coord) {
  const obj = Object.create(proto);
  obj.length = length;
  obj.name = name;
  obj.health = length;
  obj.sunk = false;
  obj.head = pos;
  obj.orientation = orient;
  obj.tail = [pos[0], pos[1] + length - 1];
  if (orient === "x") {
    obj.tail = [pos[0] + length - 1, pos[1]];
  }
  obj.lsCoord = coord;
  return obj;
}

function getShipClosure() {
  let index = 0;
  return function () {
    let ships = [
      { name: "Carrier", length: 5 },
      { name: "Destroyer", length: 4 },
      { name: "Attacker", length: 4 },
      { name: "Patrol", length: 2 },
    ];
    if (index > 3) {
      index = 0;
    }
    return ships[index++];
  };
}

export function initPlaceShip(board) {
  const getShip = getShipClosure();
  let moves = getCoord();
  for (let i = 0; i < 4; i++) {
    const ship = getShip();
    let { coordinate, orient } = tryPlaceShip(board, ship, moves, "x");
    removeCoord(moves, ship.length, coordinate, orient);
  }
}

function tryPlaceShip(board, ship, moves, orient) {
  let coordinate = pickCoord(moves, ship.length);
  let result = board.placeShip(
    ship.length,
    orient,
    coordinate[0],
    coordinate[1],
    ship.name,
  );
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
  return { coordinate, orient };
}

function pickCoord(moves) {
  let index = Math.floor(Math.random() * (moves.length - 1));
  let coord = moves[index];
  return coord;
}

function removeCoord(moves, length, coord, orient) {
  let copyCoord = coord.slice();
  for (let i = 0; i < length; i++) {
    if (orient === "x") {
      moves.splice(moves.indexOf([copyCoord[0]++, copyCoord[1]]), 1);
    } else {
      moves.splice(moves.indexOf([copyCoord[0], copyCoord[1]++]), 1);
    }
  }
}
