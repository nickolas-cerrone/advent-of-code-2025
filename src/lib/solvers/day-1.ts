const MIN_NUM = 0;
const MAX_NUM = 99;
const STARTING_NUMBER = 50;

import input from "../../../advent-of-code-2025-inputs/day-one-input.txt?raw";

type Direction = "L" | "R";

export interface Instruction {
  direction: Direction;
  magnitude: number;
}

function parseInstruction(stringInstruction: string): Instruction {
  let direction: Direction = "L";
  let magnitude: number = 0;

  try {
    direction = stringInstruction.substring(0, 1) as Direction;
    magnitude = parseInt(stringInstruction.substring(1));
  } catch (e) {
    console.error("Failed to parse instruction");
  }

  return {
    direction,
    magnitude,
  };
}

export function processInstruction(
  currentNumber: number,
  instruction: Instruction
): number {
  let result = currentNumber;
  // "Subtract"
  if (instruction.direction === "L") {
    console.log(`moving ${result} left ${instruction.magnitude}`);
    result = result - instruction.magnitude;
  }
  // "Add"
  else {
    console.log(`moving ${result} right ${instruction.magnitude}`);
    result = result + instruction.magnitude;
  }

  while (result < MIN_NUM) {
    // Loop negative numbers back around (-1 -> 99, -5 -> 95, etc)
    result = result + MAX_NUM + 1;
  }

  while (result > MAX_NUM) {
    // Bring big number back within range (100 -> 0, 105 -> 5)
    result = result - MAX_NUM - 1;
  }

  console.log(`results in ${result}`);

  return result;
}

export function getInstructionsFromFile(): Instruction[] {
  return input
    .split("\n")
    .filter((s) => s.length)
    .map(parseInstruction);
}

export function solve(preloadedInstructions: Instruction[] | null) {
  const instructions = preloadedInstructions
    ? preloadedInstructions
    : getInstructionsFromFile();
  let currentNumber = STARTING_NUMBER;
  // the number of times we hit 0
  let result = 0;

  instructions.forEach((instruction) => {
    currentNumber = processInstruction(currentNumber, instruction);
    if (currentNumber === 0) result++;
  });

  return result;
}
