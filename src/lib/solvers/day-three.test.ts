import input from "../../../advent-of-code-2025-inputs/day-three-input.test.txt";

import { assert, describe, test } from "vitest";
import { solvePartTwo } from "./day-three";

describe("day three solution", () => {
  test("part 2: it correctly sums the highest joltages from each bank", () => {
    const solution = solvePartTwo();
    assert(solution === 3121910778619);
  });
});
