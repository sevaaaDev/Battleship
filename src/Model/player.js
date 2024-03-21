import { getAllCoord, createGraph } from "./gameboard";

let proto = {
  chooseCoord() {
    let [coordinate, index] = this.attackRandom();
    if (
      this.isPreviousMoveHit ||
      this.stack["x"].length + this.stack["y"].length !== 0
    ) {
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
    if (this.isPreviousShipSunk) {
      this.attackDirection = "x";
      this.removeMove(this.previousShipCoordinates);
      this.stack["x"] = [];
      this.stack["y"] = [];
      return [undefined, -1];
    }
    if (!hit && this.stack["x"].length === 0) {
      this.attackDirection = "y";
    }
    if (!this.stack["y"].length && this.attackDirection !== "y") {
      this.fillStackQueue("y", previousMove);
    }
    if (hit === true) {
      this.fillStackQueue(this.attackDirection, previousMove);
    }
    return this.getSmartMove(this.attackDirection);
  },
  fillStackQueue(direction, previousMove) {
    let i = 0;
    if (direction === "y") {
      i = 1;
    }
    let one = [...previousMove];
    one[i]--;
    if (this.checkCoordinate(...one)) {
      this.stack[direction].push(one);
    }
    let two = [...previousMove];
    two[i]++;
    if (this.checkCoordinate(...two)) {
      this.stack[direction].push(two);
    }
  },
  getSmartMove(direction) {
    let nextMove = this.stack[direction].pop();
    if (nextMove === undefined) {
      return [nextMove, -1];
    }
    let index = this.getCoordinateIndex(...nextMove);
    return [nextMove, index];
  },
  removeMove(coordinates) {
    coordinates.forEach(({ x, y }) => {
      this.graph[`${x},${y}`].forEach((move) => {
        let [moveX, moveY] = move.split(",");
        let index = this.getCoordinateIndex(+moveX, +moveY);
        if (index === -1) return;
        this.moves.splice(index, 1);
      });
    });
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

  changePreviousShipStatus(status, ship) {
    this.isPreviousShipSunk = status;
    this.previousShipCoordinates = ship;
  },
};

export function createComputer() {
  let moves = getAllCoord();
  let graph = createGraph();
  const obj = {
    get moves() {
      return moves;
    },
    get graph() {
      return graph;
    },
    isPreviousMoveHit: null,
    previousMove: null,
    previousShipCoordinates: null,
    stack: { x: [], y: [] },
    attackDirection: "x",
    isPreviousShipSunk: false,
    reset() {
      moves = getAllCoord();
    },
  };
  Object.setPrototypeOf(obj, proto);
  return obj;
}
