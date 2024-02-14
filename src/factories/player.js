import { getAllCoord } from "./gameboard";

export function createComputer() {
  let moves = getAllCoord();
  const obj = {
    chooseCoord: chooseCoord,
    get moves() {
      return moves;
    },
    reset() {
      moves = getAllCoord();
    },
  };
  return obj;
}

function chooseCoord() {
  const index = Math.floor(Math.random() * (this.moves.length - 1));
  const coordinate = this.moves[index];
  if (!coordinate) return "finish";
  this.moves.splice(index, 1);
  return coordinate;
}
