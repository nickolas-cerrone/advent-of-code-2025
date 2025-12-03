import { assert, describe, expect, expectTypeOf, test } from "vitest";

import {
  getInstructionsFromFile,
  processInstruction,
  solve,
  type Instruction,
} from "./day-1";

describe("day 1 solver", () => {
  test("it reads and parses the input correctly", () => {
    const instructions = getInstructionsFromFile();
    expectTypeOf(instructions).toBeArray();
    expect(instructions.length).toBeGreaterThan(0);
    expectTypeOf(instructions[0].direction).toBeString();
    expect(instructions[0].magnitude).toBeGreaterThan(0);
  });

  const STARTING_NUMBER = 50;
  interface ProviderOne {
    instruction: Instruction;
    expected: number;
  }
  const INSTRUCTIONS_WITH_RESULTS: ProviderOne[] = [
    {
      instruction: {
        direction: "L",
        magnitude: 68,
      },
      expected: 82,
    },
    {
      instruction: {
        direction: "L",
        magnitude: 30,
      },
      expected: 52,
    },
    {
      instruction: {
        direction: "R",
        magnitude: 48,
      },
      expected: 0,
    },
    {
      instruction: {
        direction: "L",
        magnitude: 5,
      },
      expected: 95,
    },
    {
      instruction: {
        direction: "R",
        magnitude: 60,
      },
      expected: 55,
    },
    {
      instruction: {
        direction: "L",
        magnitude: 55,
      },
      expected: 0,
    },
    {
      instruction: {
        direction: "L",
        magnitude: 1,
      },
      expected: 99,
    },
    {
      instruction: {
        direction: "L",
        magnitude: 99,
      },
      expected: 0,
    },
  ];

  test("it processes instrunctions correctly", () => {
    let currentNumber = STARTING_NUMBER;

    INSTRUCTIONS_WITH_RESULTS.forEach(({ instruction, expected }) => {
      currentNumber = processInstruction(currentNumber, instruction);
      assert(currentNumber === expected);
    });
  });

  const INSTRUCITONS: Instruction[] = [
    {
      direction: "L",
      magnitude: 68,
    },
    {
      direction: "L",
      magnitude: 30,
    },
    {
      direction: "R",
      magnitude: 48,
    },
    {
      direction: "L",
      magnitude: 5,
    },
    {
      direction: "R",
      magnitude: 60,
    },
    {
      direction: "L",
      magnitude: 55,
    },
    {
      direction: "L",
      magnitude: 1,
    },
    {
      direction: "L",
      magnitude: 99,
    },
  ];

  test("it correctly counts the number of times we reach 0", () => {
    const solution = solve(INSTRUCITONS);
    assert(solution === 3);
  });
});
