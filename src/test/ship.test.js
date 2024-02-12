import createGameboard from "../factories/gameboard";
import { initPlaceShip } from "../factories/ship";
import createShip from "../factories/ship";

// test("See ship info", () => {
//   const ship = createShip(4, "Destroyer");
//   expect(ship).toEqual({
//     length: 4,
//     health: 4,
//     sunk: false,
//     name: "Destroyer",
//   });
// });
//
// test("hitting the ship", () => {
//   const ship = createShip(4, "Destroyer");
//   ship.hit();
//   expect(ship.health).toBe(3);
// });

test("init", () => {
  const board = createGameboard();
  initPlaceShip(board);
  expect(board.ships.length).toBe(4);
});

// test("the ship sunk", () => {
//   const ship = new Ship(4);
//   ship.hit();
//   ship.hit();
//   ship.hit();
//   ship.hit();
//   expect(ship.isSunk()).toBe(true);
// });
// test("cant hit after sunk", () => {
//   const ship = new Ship(4);
//   ship.hit();
//   ship.hit();
//   ship.hit();
//   ship.hit();
//   expect(ship.isSunk()).toBe(true);
//   expect(ship.health).toBe(0);
//   ship.hit();
//   expect(ship.health).toBe(0);
// });
