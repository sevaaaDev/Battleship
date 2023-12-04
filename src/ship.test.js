import Ship from "./ship.js";

test("See ship info", () => {
  const ship = new Ship(4);
  expect(ship).toEqual({
    length: 4,
    hit: 0,
    sunk: false,
  });
});
