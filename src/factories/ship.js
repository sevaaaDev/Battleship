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
export default function createShip(length, name, pos, orient) {
  const obj = Object.create(proto);
  obj.length = length;
  obj.name = name;
  obj.health = length;
  obj.sunk = false;
  obj.head = pos;
  obj.orientation = orient;
  obj.tail = [pos[0], pos[1] + length];
  if (orient === "x") {
    obj.tail = [pos[0] + length, pos[1]];
  }
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
    if (index > 4) {
      index = 0;
    }
    return ships[index++];
  };
}

const getShip = getShipClosure();

export function initPlaceShip(board) {
  let moves = getCoord();
  for (let i = 0; i < 4; i++) {
    const ship = getShip();
    function placeShipRecur() {
      const index = Math.floor(Math.random() * moves.length - 1);
      const coordinate = moves[index];
      let result = board.placeShip(
        ship.length,
        "x",
        coordinate[0],
        coordinate[1],
        ship.name,
      );
      if (!result) {
        placeShipRecur();
      }
      return coordinate;
    }
    const coordinate = placeShipRecur();
    for (let i = 0; i < ship.length; i++) {
      moves.splice(moves.indexOf([coordinate[0]++, coordinate[1]]), 1);
    }
  }
  return moves;
}
