import { createComputer } from "../Model/player";

test("smart attack", () => {
  const comp = createComputer();
  comp.smartAttack(true, [3, 2]);
  expect(comp.stack.length).toBe(0);
});
