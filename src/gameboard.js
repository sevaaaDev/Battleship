import Ship from "./ship";

export default class Gameboard {
  constructor() {
    this.missedAttack = [];
    this.attack = [];
    this.board = this.#createBoard();
    this.ships = [];
  }

  placeShip(length, orientation, x, y) {
    if (this.#checkShip(length, orientation, x, y)) {
      throw new Error("another ship already on there");
    }
    let ship = new Ship(length);
    this.ships.push({
      ship,
      range: [],
    });
    if (orientation === "x") {
      for (let i = 0; i < length; i++) {
        this.board[x][y] = ship;
        this.ships[this.ships.length - 1].range.push({ x, y });
        x++;
      }
      return true;
    }
    for (let i = 0; i < length; i++) {
      this.board[x][y] = ship;
      this.ships[this.ships.length - 1].range.push({ x, y });
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
    for (let ship of this.ships) {
      if (!ship.ship.isSunk()) {
        return false;
      }
    }
    return true;
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

  #checkShip(length, orientation, x, y) {
    let a = x;
    let b = y;
    for (let i = 0; i < length; i++) {
      if (!this.board[a][b] || this.board[a][b].length !== 0) {
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
