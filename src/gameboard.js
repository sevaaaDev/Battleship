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
      orientation,
      x,
      y,
    });
    if (orientation === "x") {
      for (let i = 0; i < length; i++) {
        this.board[x][y] = ship;
        x++;
      }
      return true;
    }
    for (let i = 0; i < length; i++) {
      this.board[x][y] = ship;
      y--;
    }
  }

  receiveAttack(x, y) {
    if (this.board[x][y].length !== 0) {
      this.board[x][y].hit();
      this.board[x][y] = "hit";
      this.attack.push({ x, y });
      return true;
    }
    this.missedAttack.push({ x, y });
    return false;
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
