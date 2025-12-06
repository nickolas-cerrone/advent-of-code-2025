import input from "../../../advent-of-code-2025-inputs/day-three-input.txt?raw";

/************************************
 * TYPES
 ************************************/

// Input is from 1-9, but totals can be higher
type JoltageRating = number;
type Bank = JoltageRating[];

/************************************
 * CONSTANTS
 ************************************/

const PART_TWO_JOLTAGE_LENGTH = 12;

/************************************
 * HELPERS
 ************************************/

export function getParsedInput(): Bank[] {
  let banks: Bank[] = [];
  banks = input
    .split("\n")
    // for some reason, parseInt returns NaN for some inputs...
    .map((bankString) => bankString.split("").map(parseFloat));

  return banks;
}

function getHighestJoltageFromBank(bank: Bank): JoltageRating {
  // find highest index within the first length - 1 joltages
  let highestIndex = 0;
  for (let i = 1; i < bank.length - 1; i++) {
    if (bank[i] > bank[highestIndex]) {
      highestIndex = i;
    }
  }

  let highestFollowing = highestIndex + 1;
  for (let i = highestIndex + 2; i < bank.length; i++) {
    if (bank[i] > bank[highestFollowing]) {
      highestFollowing = i;
    }
  }

  const joltageString =
    bank[highestIndex].toString() + bank[highestFollowing].toString();

  return parseInt(joltageString);
}

function getHighestJoltageFromBankPartTwo(bank: Bank): JoltageRating {
  let joltageString = "";
  // The index of the last selected joltage cell. Acts as a new base for our
  // algorithm to find following joltages.
  let currentBaseIndex = 0;

  while (joltageString.length < PART_TWO_JOLTAGE_LENGTH) {
    const remainingSlots = PART_TWO_JOLTAGE_LENGTH - joltageString.length;

    // find highest index before the last remainingSlots and after the
    // currentBaseIndex
    for (
      let i = currentBaseIndex + 1;
      i < bank.length - remainingSlots + 1;
      i++
    ) {
      if (bank[i] > bank[currentBaseIndex]) {
        currentBaseIndex = i;
      }
    }

    joltageString += bank[currentBaseIndex].toString();
    currentBaseIndex += 1; // Move the base to the next index to remove the previous one from the contention
  }

  return parseInt(joltageString);
}

/************************************
 * SOLUTIONS
 ************************************/

export function solvePartOne(): JoltageRating {
  const banks = getParsedInput();

  let totalJoltage: JoltageRating = 0;

  banks.forEach((bank) => {
    const maxBankJoltage = getHighestJoltageFromBank(bank);
    console.log("max bank joltage", maxBankJoltage);
    totalJoltage += maxBankJoltage;
  });

  return totalJoltage;
}

export function solvePartTwo(): number {
  const banks = getParsedInput();

  let totalJoltage: JoltageRating = 0;

  banks.forEach((bank) => {
    const maxBankJoltage = getHighestJoltageFromBankPartTwo(bank);
    console.log("max bank joltage", maxBankJoltage);
    totalJoltage += maxBankJoltage;
  });

  return totalJoltage;
}
