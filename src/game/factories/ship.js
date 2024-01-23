const proto = {
  isSunk: function () {
    if (!this.health) {
      this.sunk = true;
      return true;
    }
    return false;
  },
  hit: function () {
    if (this.health) this.health--;
  },
};
export default function createShip(length, name) {
  const obj = Object.create(proto);
  obj.length = length;
  obj.name = name;
  obj.health = length;
  obj.sunk = false;
  return obj;
}
