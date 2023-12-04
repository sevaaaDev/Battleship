export default class Ship {
  constructor(length) {
    this.length = length;
    this.numOfHit = 0;
    this.sunk = false;
  }

  hit() {
    this.numOfHit++;
  }

  isSunk() {
    if (this.numOfHit === this.length) {
      this.sunk = true;
      return true;
    }
    return false;
  }
}
