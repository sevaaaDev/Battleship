import { game } from ".";
import Gameboard from "./gameboard";

// test("ship sunk", () => {
//   expect(game(0, 0)).toBe(true);
// });
test("ship not sunk", () => {
  expect(game(0, 1)).toBe(undefined);
});
