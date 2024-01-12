export default class Ship {
  constructor(length, name) {
    this.length = length;
    this.health = length;
    this.sunk = false;
    this.name = name;
  }

  hit() {
    if (this.health) this.health--;
  }

  isSunk() {
    if (!this.health) {
      this.sunk = true;
      return true;
    }
    return false;
  }
}
