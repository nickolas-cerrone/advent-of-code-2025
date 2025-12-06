import input from "../../../advent-of-code-2025-inputs/day-four-input.test.txt?raw";

import { assert, describe, test } from "vitest";
import { getAdjacentRollCount, solvePartOne, type Wall } from "./day-four";

const wall: Wall = [
  ["@", ".", "@"],
  [".", "@", "."],
  ["@", ".", "@"],
];

describe("day four solution", () => {
  test("part 1: it correctly counts the number of adjacent rolls", () => {
    let rollCount = getAdjacentRollCount(wall, { row: 1, col: 1 });
    assert(rollCount === 4);

    rollCount = getAdjacentRollCount(wall, { row: 0, col: 0 });
    assert(rollCount === 1);

    rollCount = getAdjacentRollCount(wall, { row: 2, col: 2 });
    assert(rollCount === 1);
  });

  test("part 1: it correctly sums the grabbable rolls", () => {
    const solution = solvePartOne(input);
    assert(solution === 13);
  });
});
