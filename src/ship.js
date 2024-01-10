export default class Ship {
  constructor(length, name) {
    this.length = length;
    this.numOfHit = 0;
    this.sunk = false;
    this.name = name;
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
