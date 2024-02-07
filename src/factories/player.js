import { getCoord } from "./gameboard";

export function createComputer() {
  let moves = getCoord();
  const obj = {
    chooseCoord: chooseCoord,
    get moves() {
      return moves;
    },
    reset() {
      moves = getCoord();
    },
  };
  return obj;
}

function chooseCoord() {
  const index = Math.floor(Math.random() * this.moves.length - 1);
  const coordinate = this.moves[index];
  if (!coordinate) return "finish";
  this.moves.splice(index, 1);
  return coordinate;
}
