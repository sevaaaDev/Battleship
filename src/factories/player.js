import createGameboard from "./gameboard";

export default function createPlayer() {
  return {
    board: createGameboard(),
    attack(board, x, y) {
      if (toString(x) && toString(y)) {
        return board.receiveAttack(x, y);
      }
      const result = board.receiveAttack(
        Math.floor(Math.random() * 9),
        Math.floor(Math.random() * 9),
      );
      if (!result) {
        return this.attack(board);
      }
      return result;
    },
  };
}
