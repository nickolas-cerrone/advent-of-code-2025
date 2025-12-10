import input from "../../../advent-of-code-2025-inputs/day-five-input.test.txt?raw";

import { assert, describe, test } from "vitest";
import {
  getIntersectingRangeIndex,
  mergeOrCreateRange,
  removeIntermediateRanges,
  solvePartTwo,
  type Range,
} from "./day-five";

describe("day five solution", () => {
  test("part 2: it correctly finds the range an id belongs to", () => {
    const ranges: Range[] = [
      { start: 1, end: 5 },
      { start: 10, end: 11 },
      { start: 12, end: 20 },
    ];

    let index = getIntersectingRangeIndex(6, ranges);
    assert(index === null);

    index = getIntersectingRangeIndex(1, ranges);
    assert(index === 0);

    index = getIntersectingRangeIndex(5, ranges);
    assert(index === 0);

    index = getIntersectingRangeIndex(11, ranges);
    assert(index === 1);

    index = getIntersectingRangeIndex(19, ranges);
    assert(index === 2);

    index = getIntersectingRangeIndex(20, ranges);
    assert(index === 2);

    index = getIntersectingRangeIndex(12, ranges);
    assert(index === 2);
  });

  test("part 2: it correctly removes intermediate ranges", () => {
    let ranges: Range[] = [
      { start: 1, end: 5 },
      { start: 10, end: 11 },
      { start: 12, end: 20 },
    ];

    let range: Range = { start: 22, end: 40 };
    ranges = removeIntermediateRanges(range, ranges);
    assert(ranges.length === 3);

    range = { start: 1, end: 10 };
    ranges = removeIntermediateRanges(range, ranges);
    assert(ranges.length === 2);

    range = { start: 1, end: 20 };
    ranges = removeIntermediateRanges(range, ranges);
    assert(ranges.length === 0);
  });

  test("part 2: it correctly merges or creates a range", () => {
    // [[1, 5], [10, 11], , [12, 20]]
    let ranges: Range[] = [
      { start: 1, end: 5 },
      { start: 10, end: 11 },
      { start: 12, end: 20 },
    ];

    let range: Range = { start: 22, end: 40 };
    ranges = mergeOrCreateRange(range, ranges);
    // [[1, 5], [10, 11], [12, 20], [22, 40]]
    assert(ranges.length === 4);

    range = { start: 13, end: 25 };
    ranges = mergeOrCreateRange(range, ranges);
    // [[1, 5], [10, 11], [12, 40]]
    assert(ranges.length === 3);

    range = { start: 12, end: 40 };
    ranges = mergeOrCreateRange(range, ranges);
    // [[1, 5], [10, 11], [12, 40]]
    assert(ranges.length === 3);

    range = { start: 0, end: 41 };
    ranges = mergeOrCreateRange(range, ranges);
    // [[0, 41]]
    assert(ranges.length === 1);

    range = { start: 50, end: 61 };
    ranges = mergeOrCreateRange(range, ranges);
    // [[0, 41], [50,61]]
    assert(ranges.length === 2);

    range = { start: 48, end: 56 };
    ranges = mergeOrCreateRange(range, ranges);
    // [[0, 41], [48,61]]
    assert(ranges.length === 2);
    assert(ranges[1].start === 48);
    assert(ranges[1].end === 61);
  });

  test("part 2: it correctly counts the number of unique valid ids in all ranges", () => {
    const numIds = solvePartTwo(input);
    assert(numIds === 14);
  });
});
