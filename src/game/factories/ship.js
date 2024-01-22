// export default class Ship {
//   constructor(length, name) {
//     this.length = length;
//     this.health = length;
//     this.sunk = false;
//     this.name = name;
//   }
//
//   hit() {
//     if (this.health) this.health--;
//   }
//
//   isSunk() {
//     if (!this.health) {
//       this.sunk = true;
//       return true;
//     }
//     return false;
//   }
// }

export default function createShip(length, name) {
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
  const obj = Object.create(proto);
  obj.length = length;
  obj.name = name;
  obj.health = length;
  obj.sunk = false;
  return obj;
}
