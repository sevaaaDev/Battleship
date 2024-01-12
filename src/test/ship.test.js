// create ship
// hitting the ship
// ship sunk
// cant hit after ship has been sunk
import Ship from "../game/factories/ship.js";

test("See ship info", () => {
  const ship = new Ship(4, "Destroyer");
  expect(ship).toEqual({
    length: 4,
    health: 4,
    sunk: false,
    name: "Destroyer",
  });
});

test("hitting the ship", () => {
  const ship = new Ship(4);
  ship.hit();
  expect(ship.health).toBe(3);
});

test("the ship sunk", () => {
  const ship = new Ship(4);
  ship.hit();
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
test("cant hit after sunk", () => {
  const ship = new Ship(4);
  ship.hit();
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
  expect(ship.health).toBe(0);
  ship.hit();
  expect(ship.health).toBe(0);
});
