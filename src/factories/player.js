import createGameboard from "./gameboard";

export default function createPlayer() {
  return {
    board: createGameboard(),
    moves: getCoord(),
    attack(board, x, y) {
      if (x !== undefined && y !== undefined) {
        return board.receiveAttack(x, y);
      }
      // take 1 random coordinate from moves
      const index = Math.floor(Math.random() * (this.moves.length - 1));
      const coordinate = this.moves[index];
      if (!coordinate) return "finish";
      const result = board.receiveAttack(coordinate[0], coordinate[1]);
      // delete that coordinate from moves, so it wont be selected again
      this.moves.splice(index, 1);
      return [result, coordinate];
    },
    reset() {
      this.board = createGameboard();
      this.moves = getCoord();
    },
  };
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
