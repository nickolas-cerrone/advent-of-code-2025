import { assert, describe, expect, expectTypeOf, test } from "vitest";

import { solvePartOne } from "./day-2";

const testInput =
  "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124";

describe("day 2 solver", () => {
  test("it correctly sums the invalid ids", () => {
    const actualResult = solvePartOne(testInput);

    assert(actualResult === 1227775554);
  });
});
