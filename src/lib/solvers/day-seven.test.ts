import input from "../../../advent-of-code-2025-inputs/day-seven-input.test.txt?raw";

import { assert, describe, test } from "vitest";
import { solvePartOne, solvePartTwo } from "./day-seven";

describe("day seven solution", () => {
  test("part 1: it correctly counts the number of times a beam splits", () => {
    const splits = solvePartOne(input);
    console.log("part 1 splits:", splits);
    assert(splits === 21);
  });

  test("part 2: it correctly counts the number of timelines a particle can enter", () => {
    const timelines = solvePartTwo(input);
    console.log("part 2 timelines:", timelines);
    assert(timelines === 40);
  });
});
