import input from "../../../advent-of-code-2025-inputs/day-six-input.txt?raw";

/************************************
 * TYPES
 ************************************/

type Operation = "*" | "+";

interface Equation {
  operation: Operation;
  // keep as strings for easier checks later in part 2
  numbers: string[];
}

/************************************
 * HELPERS
 ************************************/

function getParsedInput(input: string): Equation[] {
  const result: Equation[] = [];

  const lines = input.split("\n");
  const separatedLines = lines.map((line) =>
    line.split(" ").filter((el) => el.trim() !== "")
  );
  const numbers = separatedLines.slice(0, separatedLines.length - 1);
  const operations = separatedLines[separatedLines.length - 1];

  for (let i = 0; i < operations.length; i++) {
    const operation: Operation = operations[i] === "*" ? "*" : "+";
    const equationNumbers = numbers.map((numberLine) => numberLine[i]);

    result.push({
      operation,
      numbers: equationNumbers,
    });
  }

  return result;
}

// The same as above, but maintains whitespace within an equation because it's
// important
export function getParsedCephalopodInput(input: string): Equation[] {
  const result: Equation[] = [];

  const lines = input.split("\n");
  const rawNumberLines = lines.splice(0, lines.length - 1);
  const rawOperations = lines[lines.length - 1];

  // the equation always starts on the same column as the current operation and
  // ends two columns before the next operation. We can start i at 0 because the
  // first index will always have an operation due to the left alignment of
  // equations
  for (let i = 0; i < rawOperations.length; ) {
    // Find the index of the next operation
    let nextOperationIndex = null;
    for (let j = i + 1; j < rawOperations.length; j++) {
      if (rawOperations[j] !== " ") {
        nextOperationIndex = j;
        break;
      }
    }

    // If we're at the end, the eq ends at the last character
    let endIndex = 0;
    if (nextOperationIndex === null) {
      endIndex = rawOperations.length - 1;
    } else {
      // The end position is 2 before the next operation
      // 123 328
      //  45 64
      //   6 98
      // *   +
      // 0123456
      // first eq ends on 4 - 2 = 2
      endIndex = nextOperationIndex - 2;
    }

    // Get numbers with whitespace in-tact
    const numbersWithWhitespace: string[] = rawNumberLines.map((numberLine) =>
      numberLine.slice(i, endIndex + 1)
    );

    const length = endIndex + 1 - i;
    const realNumbers: string[] = [];
    for (let j = length - 1; j >= 0; j--) {
      const numberElements = numbersWithWhitespace
        .map((number) => {
          return number[j];
        })
        .filter((el) => el !== " ");

      const realNumber = numberElements.join("");
      realNumbers.push(realNumber);
    }

    result.push({
      operation: rawOperations[i] as Operation,
      numbers: realNumbers,
    });

    // Jump to the next equation (starts at the next op) or end the loop if we
    // are at the end by going beyond the length - 1
    i = nextOperationIndex || rawOperations.length;
  }

  console.log(result);

  return result;
}

function evaluate(equation: Equation): number {
  switch (equation.operation) {
    case "*":
      return equation.numbers.reduce((product, number) => {
        return product * parseFloat(number);
      }, 1);
    default:
    case "+":
      return equation.numbers.reduce((sum, number) => {
        return sum + parseFloat(number);
      }, 0);
  }
}

function sumAnswers(equations: Equation[]): number {
  return equations.reduce((sum, equation) => {
    return sum + evaluate(equation);
  }, 0);
}

/************************************
 * SOLUTION
 ************************************/

export function solvePartOne(preloadedEquations?: string): number {
  const equationsString = preloadedEquations ? preloadedEquations : input;
  const equations = getParsedInput(equationsString);

  const sum = sumAnswers(equations);

  return sum;
}

export function solvePartTwo(preloadedEquations?: string): number {
  const equationsString = preloadedEquations ? preloadedEquations : input;
  const equations = getParsedCephalopodInput(equationsString);

  // These are translated into standard equations now, so we can just evaluate
  // them the same as before!
  const sum = sumAnswers(equations);

  return sum;
}
