export default class Gameboard {
  constructor() {
    this.missedAttack = [];
    this.attack = [];
    this.numOfShip = 0;
    this.board = this.#createBoard();
  }

  placeShip(length, orientation, x, y) {
    if (orientation === "x") {
      for (let i = x; i < length; i++) {
        this.board[i][y] = "ship";
      }
    }
    this.numOfShip++;
  }

  receiveAttack(x, y) {
    if (this.board[x][y] === "ship") {
      this.board[x][y] = "hit";
      return true;
    }
    this.missedAttack.push({ x, y });
    return false;
  }

  isAllSunk() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.board[j][i] === "ship") {
          return false;
        }
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
