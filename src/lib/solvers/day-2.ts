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

function validateId(id: ProductId): boolean {
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

/************************************
 * SOLUTION
 ************************************/

export function solvePartOne(proloadedIds?: string): number {
  const ids: ProductId[] = getParsedInput(proloadedIds);

  // Solution is sum of invalid ids
  const idSum = ids.reduce((sum, id) => {
    if (!validateId(id)) {
      return sum + parseInt(id);
    }
    return sum;
  }, 0);

  return idSum;
}
