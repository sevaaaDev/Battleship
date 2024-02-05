import createGameboard from "./gameboard";

export function createPlayer() {
  const obj = {
    board: createGameboard(),
    attack: attackPlayer,
    reset() {
      this.board = createGameboard();
    },
  };
  return obj;
}

export function createComputer() {
  let moves = getCoord();
  const obj = {
    board: createGameboard(),
    attack: attackComputer,
    get moves() {
      return moves;
    },
    reset() {
      this.board = createGameboard();
      moves = getCoord();
    },
  };
  return obj;
}

function attackPlayer(board, x, y) {
  if (x !== undefined && y !== undefined) {
    return board.receiveAttack(x, y);
  }
  return false;
}

function attackComputer(board) {
  // take 1 random coordinate from moves
  const index = Math.floor(Math.random() * (this.moves.length - 1));
  const coordinate = this.moves[index];
  if (!coordinate) return "finish";
  const result = board.receiveAttack(coordinate[0], coordinate[1]);
  // delete that coordinate from moves, so it wont be selected again
  this.moves.splice(index, 1);
  return [result, coordinate];
}
function getCoord() {
  let arr = [];
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      arr.push([x, y]);
    }
  }
  return arr;
}
