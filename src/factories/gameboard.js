import createShip from "./ship";

const proto = {
  placeShip(length, orientation, x, y, name) {
    if (this.isOutside(x, y, length, orientation)) {
      return;
    }
    if (this.isThereAShip(x, y, length, orientation)) {
      return;
    }
    const ship = createShip(length, name, [x, y], orientation);

    this.ships.push(ship);
    if (orientation === "x") {
      for (let i = x; i < x + length; i++) {
        this.board[i][y] = ship;
      }
      return;
    }
    for (let i = y; i < y + length; i++) {
      this.board[x][i] = ship;
    }
  },
  isThereAShip(x, y, length, orient) {
    for (let i = 0; i < length; i++) {
      if (typeof this.board[x][y] === "object") {
        return true;
      }
      if (orient === "x") {
        x++;
        continue;
      }
      y++;
    }
    return false;
  },
  isOutside(x, y, length, orient) {
    // check if head is outside the board
    if (x < 0 || x > 9 || y < 0 || y > 9) {
      return true;
    }
    // check if tail is outside the board
    if (orient === "x") {
      if (x + length > 9) {
        return true;
      }
    }
    if (y + length > 9) {
      return true;
    }
    return false;
  },
  receiveAttack([x, y]) {
    let info;
    if (this.isOutside(x, y)) return false;
    if (this.board[x][y] === "hit") return false;
    if (typeof this.board[x][y] === "object") {
      this.board[x][y].hit();
      info = "hit";
      this.attack.push({ x, y });
    }
    if (this.board[x][y] === undefined) {
      info = "missed";
      this.missedAttack.push({ x, y });
    }
    this.board[x][y] = "hit";
    return info;
  },
  areAllSunk() {
    for (let ship of this.ships) {
      if (!ship.isSunk()) {
        return false;
      }
    }
    return true;
  },
};

function createBoard() {
  let arr = [];
  for (let i = 0; i < 10; i++) {
    arr.push([]);
    for (let j = 0; j < 10; j++) {
      arr[i].push(undefined);
    }
  }
  return arr;
}

export default function createGameboard() {
  const obj = Object.create(proto);
  obj.missedAttack = [];
  obj.attack = [];
  obj.board = createBoard();
  obj.ships = [];
  // obj.graph = this.#createGraph();
  return obj;
}
