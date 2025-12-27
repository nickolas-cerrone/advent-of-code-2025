import input from "../../../advent-of-code-2025-inputs/day-nine-input.test.txt?raw";

import { assert, describe, test } from "vitest";
import { solvePartOne, solvePartTwo, findArea } from "./day-nine";

describe("day nine solution", () => {
  test("finds area", () => {
    const area1 = findArea([2, 5], [11, 1]);
    assert(area1 === 50);
  });
  test("part 1", () => {
    const result = solvePartOne(input);
    assert(result === 50);
  });
});
