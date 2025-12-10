import input from "../../../advent-of-code-2025-inputs/day-six-input.test.txt?raw";

import { assert, describe, test } from "vitest";
import { getParsedCephalopodInput } from "./day-six";

describe("day six solution", () => {
  test("part 2: it correctly parses cephalapod input", () => {
    const testInput = `123 333 444\n25  444 41 \n2   123 82 \n+   +   *  `;

    const equations = getParsedCephalopodInput(testInput);
    assert(equations.length === 3);

    // Operations
    assert(equations[0].operation === "+");
    assert(equations[1].operation === "+");
    assert(equations[2].operation === "*");

    // Equation 1
    assert(equations[0].numbers.length === 3);
    assert(equations[0].numbers[0] === "3");
    assert(equations[0].numbers[1] === "25");
    assert(equations[0].numbers[2] === "122");

    // Equation 3
    assert(equations[2].numbers.length === 3);
    assert(equations[2].numbers[0] === "4");
    assert(equations[2].numbers[1] === "412");
    assert(equations[2].numbers[2] === "448");
  });
});
