import Ship from "./ship";

export default class Gameboard {
  constructor() {
    this.missedAttack = [];
    this.attack = [];
    this.board = this.#createBoard();
    this.ships = [];
    this.graph = this.#createGraph();
  }

  placeShip(length, orientation, x, y, name) {
    x = +x;
    y = +y;
    if (this.checkWater(length, orientation, x, y)) {
      // throw new Error("another ship already on there");
      return;
    }
    let ship = new Ship(length);
    this.ships[name] = {
      ship,
      range: [],
    };
    if (orientation === "x") {
      for (let i = 0; i < length; i++) {
        this.board[x][y] = ship;
        for (let node of this.graph[`${x},${y}`]) {
          let coord = node.split(",");
          if (this.board[coord[0]][coord[1]] !== ship) {
            this.board[coord[0]][coord[1]] = "disabled";
          }
        }
        this.ships[name].range.push({ x, y });
        x++;
      }
      return true;
    }
    for (let i = 0; i < length; i++) {
      this.board[x][y] = ship;
      this.ships[name].range.push({ x, y });
      y--;
    }
  }

  receiveAttack(x, y) {
    if (
      typeof this.board[x][y] === "object" &&
      !Array.isArray(this.board[x][y])
    ) {
      this.board[x][y].hit();
      this.board[x][y] = "hit";
      this.attack.push({ x, y });
      return true;
    }
    this.board[x][y] = "hit";
    this.missedAttack.push({ x, y });
    return false;
  }

  clear() {
    this.board = this.#createBoard();
    this.ships = [];
    this.attack = [];
    this.missedAttack = [];
  }

  isAllSunk() {
    for (let ship in this.ships) {
      if (!this.ships[ship].ship.isSunk()) {
        return false;
      }
    }
    return true;
  }

  #createGraph() {
    let graph = {};
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        let vertex = this.#returnPossibleMoves(x, y);
        graph[`${x},${y}`] = vertex;
      }
    }
    return graph;
  }

  #returnPossibleMoves(x, y) {
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
  #createBoard() {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push([]);
      for (let j = 0; j < 10; j++) {
        arr[i].push([]);
      }
    }
    return arr;
  }

  checkWater(length, orientation, x, y) {
    let a = x;
    let b = y;
    for (let i = 0; i < length; i++) {
      if (
        !this.board[a] ||
        !this.board[a][b] ||
        this.board[a][b].length !== 0
      ) {
        console.log(a);
        return true;
      }
      if (orientation === "x") {
        a++;
        continue;
      }
      b--;
    }
    return false;
  }
}
