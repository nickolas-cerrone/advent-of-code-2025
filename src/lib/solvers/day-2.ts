import input from "../../../advent-of-code-2025-inputs/day-two-input.txt?raw";

/************************************
 * TYPES
 ************************************/

type ProductId = string;

/************************************
 * HELPERS
 ************************************/

function getParsedInput(preloadedIds?: string): ProductId[] {
  const inputString = preloadedIds ?? input;
  const ids: ProductId[] = [];
  inputString
    .trimEnd()
    .split(",")
    .forEach((s) => {
      const [startString, endString] = s.split("-");
      const start = parseInt(startString);
      const end = parseInt(endString);
      for (let i = start; i <= end; i++) {
        ids.push(i.toString());
      }
    });

  return ids;
}

function validateIdPartOne(id: ProductId): boolean {
  // Odd numbered ids cannot have to equal sequences of numbers
  if (id.length % 2 !== 0) {
    return true;
  }

  const firstHalf = id.substring(0, id.length / 2);
  const secondHalf = id.substring(id.length / 2);

  if (firstHalf !== secondHalf) {
    return true;
  }

  return false;
}

export function validateIdPartTwo(id: ProductId): boolean {
  if (id.length === 1) {
    return true;
  }

  // Odd case < 7, only invalid if all characters match
  if (id.length % 2 !== 0 && id.length <= 7) {
    const firstNumber = id.at(0);
    for (let i = 1; i < id.length; i++) {
      if (firstNumber !== id.at(i)) {
        return true;
      }
    }
    // All characters match, invalid
    return false;
  }

  // Remaining cases: invalid if any consecutive range of characters in the
  // first half repeats for the rest of the string
  const firstHalf = id.substring(0, id.length / 2);

  for (
    let substringLength = 1;
    substringLength <= id.length / 2;
    substringLength++
  ) {
    // We cannot repeat if the length isn't a multiple
    if (id.length % substringLength !== 0) {
      continue;
    }

    const substring = firstHalf.substring(0, substringLength);

    let substringRepeats = true;

    // Iterate over the full password in chunks to check each consecutive
    // substring
    for (
      let startIndex = substringLength;
      // Don't try to index out of the array
      startIndex <= id.length - substringLength;
      startIndex += substringLength
    ) {
      const nextSubstring = id.substr(startIndex, substringLength);
      if (substring !== nextSubstring) {
        substringRepeats = false;
        break;
      }
    }

    // Invalid if any substring in the first half repeats
    if (substringRepeats) {
      return false;
    }
  }

  // Valid if no substring repeats
  return true;
}

/************************************
 * SOLUTION
 ************************************/

export function solvePartOne(proloadedIds?: string): number {
  const ids: ProductId[] = getParsedInput(proloadedIds);

  // Solution is sum of invalid ids
  const idSum = ids.reduce((sum, id) => {
    if (!validateIdPartOne(id)) {
      return sum + parseInt(id);
    }
    return sum;
  }, 0);

  return idSum;
}

export function solvePartTwo(proloadedIds?: string): number {
  const ids: ProductId[] = getParsedInput(proloadedIds);

  // Solution is sum of invalid ids
  const idSum = ids.reduce((sum, id) => {
    if (!validateIdPartTwo(id)) {
      return sum + parseInt(id);
    }
    return sum;
  }, 0);

  return idSum;
}
