import Ship from "../ship.js";

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

test("know which ship sunk", () => {
  const ship1 = new Ship(4);
  const ship2 = new Ship(5);
  function hitting(ship) {
    ship.hit();
    return ship.isSunk() ? true : false;
  }
  hitting(ship1);
  hitting(ship1);
  hitting(ship1);
  expect(hitting(ship1)).toBe(true);
  expect(ship2.isSunk()).toBe(false);
  expect(ship1.isSunk()).toBe(true);
});
