import Ship from "./ship";
export default class Gameboard {
  constructor() {
    this.missedAttack = [];
    this.attack = [];
    this.board = this.#createBoard();
    this.ships = [];
  }

  placeShip(length, orientation, x, y) {
    let ship = new Ship(length);
    this.ships.push(ship);
    if (orientation === "x") {
      for (let i = x; i < length; i++) {
        this.board[i][y] = ship;
      }
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
      if (!ship.isSunk()) {
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
}
