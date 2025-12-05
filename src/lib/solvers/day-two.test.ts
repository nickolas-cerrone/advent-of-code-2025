import { assert, describe, expect, expectTypeOf, test } from "vitest";

import { solvePartOne, solvePartTwo, validateIdPartTwo } from "./day-2";

const testInput =
  "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124";

describe("day 2 solver", () => {
  test("part 1: it correctly sums the invalid ids", () => {
    const actualResult = solvePartOne(testInput);

    assert(actualResult === 1227775554);
  });

  test("part 2: we correctly validate ids", () => {
    let id = "1";
    let isValid = validateIdPartTwo(id);
    assert(isValid === true);

    id = "11";
    isValid = validateIdPartTwo(id);
    assert(isValid === false);

    id = "112";
    isValid = validateIdPartTwo(id);
    assert(isValid === true);

    id = "111";
    isValid = validateIdPartTwo(id);
    assert(isValid === false);

    id = "1212";
    isValid = validateIdPartTwo(id);
    assert(isValid === false);

    id = "7777777";
    isValid = validateIdPartTwo(id);
    assert(isValid === false);

    id = "333444";
    isValid = validateIdPartTwo(id);
    assert(isValid === true);

    id = "12341234";
    isValid = validateIdPartTwo(id);
    assert(isValid === false);

    id = "824824824";
    isValid = validateIdPartTwo(id);
    assert(isValid === false);

    id = "2121212121";
    isValid = validateIdPartTwo(id);
    assert(isValid === false);

    id = "1231231234";
    isValid = validateIdPartTwo(id);
    assert(isValid === true);
  });

  test("part 2: it correctly sums invalid ids:", () => {
    const actualResult = solvePartTwo(testInput);
    assert(actualResult === 4174379265);
  });
});
