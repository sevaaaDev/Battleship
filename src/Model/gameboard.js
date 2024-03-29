import { holdShipPosition } from "./ship";
export function getAllCoord() {
  let arr = [];
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      arr.push([x, y]);
    }
  }
  return arr;
}

const proto = {
  placeShip(ship) {
    let length = ship.length;
    let orientation = ship.orientation;
    let name = ship.name;
    let [x, y] = ship.position.head;
    let lsCoord = ship.position.listCoordinate;
    // WARN: if u move this to init place ship, it broke [
    if (this.isOutside(x, y, length, orientation)) {
      return;
    }
    if (this.isThereAShip(x, y, length, orientation, name)) {
      return;
    }
    if (this.isTooCloseToOtherShip(x, y, length, orientation, name)) {
      return;
    }
    for (let i = 0; i < length; i++) {
      this.board[x][y] = ship;
      // push ship coordinate to arr
      lsCoord.push({ x, y });
      if (orientation === "x") {
        x++;
        continue;
      }
      y++;
    }
    this.ships.push(ship);
    return true;
  },
  moveShip(from, to, shipObject) {
    this.removeShip(...from);
    // TODO: change holdshipposition function
    let newPosition = holdShipPosition(
      ...to,
      shipObject.orientation,
      shipObject.length,
    );
    shipObject.position = newPosition;
    this.placeShip(shipObject);
  },
  isTooCloseToOtherShip(x, y, length, orientation, name) {
    // TODO: refactor this
    for (let i = 0; i < length; i++) {
      for (let node of this.graph[`${x},${y}`]) {
        let [a, b] = node.split(",");
        if (
          typeof this.board[a][b] === "object" &&
          this.board[a][b].name !== name
        ) {
          return true;
        }
      }
      if (orientation === "x") {
        x++;
        continue;
      }
      y++;
    }
    return false;
  },
  isThereAShip(x, y, length, orient, shipName) {
    for (let i = 0; i < length; i++) {
      if (
        typeof this.board[x][y] === "object" &&
        this.board[x][y].name !== shipName
      ) {
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
  removeShip(x, y) {
    let ship = this.board[x][y];
    for (let coord of ship.position.listCoordinate) {
      this.board[coord.x][coord.y] = undefined;
    }
    let index = this.ships.indexOf(ship);
    this.ships.splice(index, 1);
  },
  isOutside(x, y, length, orient) {
    // check if head is outside the board
    if (x < 0 || x > 9 || y < 0 || y > 9) {
      return true;
    }
    // check if tail is outside the board
    if (orient === "x") {
      if (x + length - 1 > 9) {
        return true;
      }
      return false;
    }
    if (y + length - 1 > 9) {
      return true;
    }
    return false;
  },
  receiveAttack([x, y]) {
    let info;
    let ship;
    if (this.isOutside(x, y)) return [false, ship];
    if (this.board[x][y] === "hit") return [false, ship];
    if (typeof this.board[x][y] === "object") {
      this.board[x][y].hit();
      info = "hit";
      ship = this.board[x][y];
      this.attack.push({ x, y });
      this.board[x][y] = "hit";
    }
    if (this.board[x][y] === undefined) {
      info = "missed";
      this.missedAttack.push({ x, y });
      this.board[x][y] = "missed";
    }
    return [info, ship];
  },
  areAllSunk() {
    let numOfSunkShip = this.checkShip();
    if (this.ships.length - numOfSunkShip) {
      return false;
    }
    return true;
  },
  thisShipSunk() {
    let numOfSunkShip = this.checkShip();
    if (this.numOfSunkShip !== numOfSunkShip) {
      this.numOfSunkShip = numOfSunkShip;
      return true;
    }
    return false;
  },
  checkShip() {
    let numOfSunkShip = 0;
    for (let ship of this.ships) {
      if (ship.isSunk()) {
        numOfSunkShip++;
      }
    }
    return numOfSunkShip;
  },
  reset() {
    this.missedAttack = [];
    this.attack = [];
    this.board = createBoard();
    this.ships = [];
    this.graph = createGraph();
  },
};

export function createGraph() {
  let graph = {};
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      let vertex = returnPossibleMoves(x, y);
      graph[`${x},${y}`] = vertex;
    }
  }
  return graph;
}

function returnPossibleMoves(x, y) {
  let arr = [];
  arr.push(`${x + 1},${y}`);
  arr.push(`${x - 1},${y}`);
  arr.push(`${x},${y + 1}`);
  arr.push(`${x},${y - 1}`);
  arr.push(`${x + 1},${y + 1}`);
  arr.push(`${x + 1},${y - 1}`);
  arr.push(`${x - 1},${y + 1}`);
  arr.push(`${x - 1},${y - 1}`);

  return arr.filter((n) => {
    let coor = n.split(",");
    if (coor[0] < 10 && coor[0] > -1) {
      if (coor[1] < 10 && coor[1] > -1) {
        return true;
      }
    }
  });
}
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
  obj.numOfSunkShip = 0;
  obj.graph = createGraph();
  return obj;
}
