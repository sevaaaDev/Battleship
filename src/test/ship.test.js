import Ship from "./ship.js";

test("See ship info", () => {
  const ship = new Ship(4);
  expect(ship).toEqual({
    length: 4,
    numOfHit: 0,
    sunk: false,
  });
});

test("hitting the ship", () => {
  const ship = new Ship(4);
  ship.hit();
  expect(ship.numOfHit).toBe(1);
});

test("the ship sunk", () => {
  const ship = new Ship(4);
  ship.hit();
  ship.hit();
  ship.hit();
  ship.hit();
  ship.isSunk();
  expect(ship.sunk).toBe(true);
  expect(ship.isSunk()).toBe(true);
});
