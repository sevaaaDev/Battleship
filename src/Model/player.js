import { getAllCoord } from "./gameboard";

let proto = {
  chooseCoord() {
    let [coordinate, index] = this.attackRandom();
    if (this.isPreviousMoveHit || this.stack.length !== 0) {
      [coordinate, index] = this.smartAttack(this.isPreviousMoveHit);
    }
    if (index === -1) {
      [coordinate, index] = this.attackRandom();
    }
    this.moves.splice(index, 1);
    this.previousMove = coordinate;
    return coordinate;
  },
  smartAttack(hit) {
    // TODO: make the y axis version
    if (hit === true) {
      let left = [...this.previousMove];
      left[0]--;
      if (left[0] <= 9 && left[0] >= 0) {
        this.stack.push(left);
      }
      let right = [...this.previousMove];
      right[0]++;
      if (right[0] <= 9 && right[0] >= 0) {
        this.stack.push(right);
      }
    }
    let nextMove = this.stack.pop();
    while (nextMove && !this.checkCoordinate(...nextMove)) {
      nextMove = this.stack.pop();
    }
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
    reset() {
      moves = getAllCoord();
    },
  };
  Object.setPrototypeOf(obj, proto);
  return obj;
}
