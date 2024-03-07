import { getAllCoord } from "./gameboard";

let proto = {
  chooseCoord() {
    let [coordinate, index] = this.attackRandom();
    if (this.isPreviousMoveHit) {
      [coordinate, index] = this.smartAttack();
    }
    if (index === -1) {
      [coordinate, index] = this.attackRandom();
    }
    this.moves.splice(index, 1);
    this.previousMove = coordinate;
    return coordinate;
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
  smartAttack() {
    let nextMove = [...this.previousMove];
    // TODO: create the algorithm
    if (nextMove[0] + 1 <= 9 && nextMove[0] + 1 >= 0) {
      nextMove[0]++;
      let index = this.getCoordinateIndex(...nextMove);
      return [nextMove, index];
    }
    return [undefined, -1];
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
    reset() {
      moves = getAllCoord();
    },
  };
  Object.setPrototypeOf(obj, proto);
  return obj;
}
