import { getAllCoord } from "./gameboard";

let proto = {
  chooseCoord() {
    let [coordinate, index] = this.attackRandom();
    console.log(this.isPreviousShipSunk);
    if (this.isPreviousMoveHit || this.stack.length !== 0) {
      [coordinate, index] = this.smartAttack(
        this.isPreviousMoveHit,
        this.previousMove,
      );
    }
    if (index === -1) {
      [coordinate, index] = this.attackRandom();
    }
    this.moves.splice(index, 1);
    this.previousMove = coordinate;
    return coordinate;
  },
  smartAttack(hit, previousMove) {
    // TODO: make the y axis version
    if (this.isPreviousShipSunk) {
      this.stack = [];
      return [undefined, -1];
    }
    if (hit === true) {
      let left = [...previousMove];
      left[0]--;
      if (this.checkCoordinate(...left)) {
        this.stack.push(left);
      }
      let right = [...previousMove];
      right[0]++;
      if (this.checkCoordinate(...right)) {
        this.stack.push(right);
      }
    }
    let nextMove = this.stack.pop();
    console.log(this.stack);
    if (nextMove === undefined) {
      return [nextMove, -1];
    }
    let index = this.getCoordinateIndex(...nextMove);
    return [nextMove, index];
  },
  attackRandom() {
    const index = Math.floor(Math.random() * (this.moves.length - 1));
    const coordinate = this.moves[index];
    if (!coordinate) return "finish";
    return [coordinate, index];
  },
  changePreviousMoveStatus(status) {
    if (status === "missed") {
      this.isPreviousMoveHit = false;
      return;
    }
    this.isPreviousMoveHit = true;
  },
  getCoordinateIndex(x, y) {
    let index = -1;
    this.moves.map((move, i) => {
      if (move[0] === x && move[1] === y) {
        index = i;
      }
    });
    return index;
  },
  checkCoordinate(x, y) {
    let status = false;
    this.moves.map((move) => {
      if (move[0] === x && move[1] === y) {
        status = true;
      }
    });
    return status;
  },

  changePreviousShipStatus(status) {
    this.isPreviousShipSunk = status;
  },
};

export function createComputer() {
  let moves = getAllCoord();
  const obj = {
    get moves() {
      return moves;
    },
    isPreviousMoveHit: null,
    previousMove: null,
    stack: [],
    isPreviousShipSunk: false,
    reset() {
      moves = getAllCoord();
    },
  };
  Object.setPrototypeOf(obj, proto);
  return obj;
}
