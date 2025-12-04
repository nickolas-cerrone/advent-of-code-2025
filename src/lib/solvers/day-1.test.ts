import { assert, describe, expect, expectTypeOf, test } from "vitest";

import {
  getInstructionsFromFile,
  processInstructionPartOne,
  processInstructionPartTwo,
  solvePartOne,
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
  const INSTRUCTIONS_WITH_RESULTS_PART_ONE: ProviderOne[] = [
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

  test("part 1: it processes instrunctions correctly", () => {
    let currentNumber = STARTING_NUMBER;

    INSTRUCTIONS_WITH_RESULTS_PART_ONE.forEach(({ instruction, expected }) => {
      currentNumber = processInstructionPartOne(currentNumber, instruction);
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

  test("part 1: it correctly counts the number of times we reach 0", () => {
    const solution = solvePartOne(INSTRUCITONS);
    assert(solution === 3);
  });

  interface ProviderTwo {
    instruction: Instruction;
    expected: number;
    zeroCount: number;
  }

  const INSTRUCTIONS_WITH_RESULTS_PART_TWO: ProviderTwo[] = [
    {
      instruction: {
        direction: "L",
        magnitude: 68,
      },
      expected: 82,
      zeroCount: 1,
    },
    {
      instruction: {
        direction: "L",
        magnitude: 30,
      },
      expected: 52,
      zeroCount: 0,
    },
    {
      instruction: {
        direction: "R",
        magnitude: 48,
      },
      expected: 0,
      zeroCount: 1,
    },
    {
      instruction: {
        direction: "L",
        magnitude: 5,
      },
      expected: 95,
      zeroCount: 0,
    },
    {
      instruction: {
        direction: "R",
        magnitude: 60,
      },
      expected: 55,
      zeroCount: 1,
    },
    {
      instruction: {
        direction: "L",
        magnitude: 55,
      },
      expected: 0,
      zeroCount: 1,
    },
    {
      instruction: {
        direction: "L",
        magnitude: 1,
      },
      expected: 99,
      zeroCount: 0,
    },
    {
      instruction: {
        direction: "L",
        magnitude: 99,
      },
      expected: 0,
      zeroCount: 1,
    },
  ];

  test("part 2: it processes instrunctions correctly", () => {
    let currentNumber = STARTING_NUMBER;

    INSTRUCTIONS_WITH_RESULTS_PART_TWO.forEach(
      ({ instruction, expected, zeroCount }) => {
        const { result, zeroCount: actualZeroCount } =
          processInstructionPartTwo(currentNumber, instruction);
        currentNumber = result;
        assert(result === expected);
        assert(zeroCount === actualZeroCount);
      }
    );
  });
});
