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
export default function createShip(length, name, pos, orient) {
  const obj = Object.create(proto);
  obj.length = length;
  obj.name = name;
  obj.health = length;
  obj.sunk = false;
  obj.head = pos;
  obj.orientation = orient;
  obj.tail = [pos[0], pos[1] + length];
  if (orient === "x") {
    obj.tail = [pos[0] + length, pos[1]];
  }
  return obj;
}
