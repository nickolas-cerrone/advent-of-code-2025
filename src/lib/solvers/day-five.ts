import input from "../../../advent-of-code-2025-inputs/day-five-input.txt?raw";

/************************************
 * TYPES
 ************************************/

interface Range {
  start: number;
  end: number;
}

interface Database {
  freshIds: Range[];
  availableIds: number[];
}

/************************************
 * HELPERS
 ************************************/

function getParsedInput(databaseString: string): Database {
  const lines = databaseString.split("\n");
  const separatorIndex = lines.findIndex((s) => s === "");
  const rangesString = lines.slice(0, separatorIndex);
  const idsString = lines.slice(separatorIndex + 1);

  const freshIds: Range[] = [];

  rangesString.forEach((range: string) => {
    const [startString, endString] = range.split("-");
    const start = parseInt(startString);
    const end = parseInt(endString);

    freshIds.push({ start, end });
  });

  const availableIds = idsString.map((id) => parseInt(id));

  return {
    freshIds,
    availableIds,
  };
}

function getIsIdIncludedInSomeRange(id: number, ranges: Range[]): boolean {
  return ranges.some((range) => id >= range.start && id <= range.end);
}

function getNumUsableIngredientsFromDatabase(database: Database): number {
  let result = 0;
  database.availableIds.forEach((id) => {
    if (getIsIdIncludedInSomeRange(id, database.freshIds)) {
      result++;
    }
  });
  console.log("result", result);
  return result;
}

// Returns the index of the first intersecting
function getIntersectingRangeIndex(
  range: Range,
  fullRanges: Range[]
): number | null {
  const index = fullRanges.findIndex((existingRange, i) => {
    // If start or end is within the existing range, we are
    if (
      range.start >= existingRange.start &&
      range.start <= existingRange.end
    ) {
      return true;
    }

    if (range.end >= existingRange.start && range.end <= existingRange.end) {
      return i;
    }
  });

  return index > 0 ? index : null;
}

// Merges intersecting ranges with existing ones
function mergeRanges(ranges: Range[]): Range[] {
  const uniqueRanges: Range[] = [ranges[0]];

  for (let i = 1; i < ranges.length; i++) {
    const index = getIntersectingRangeIndex(ranges[i], uniqueRanges);

    // No intersection, add to unique list
    if (!index) {
      uniqueRanges.push(ranges[i]);
    }

    // Otherwise, we'll need to merge it with an existing range
    // TODO: figure this out...
  }

  return uniqueRanges;
}

function getTotalUsableIngredientsFromDatabaseRanges(ranges: Range[]): number {
  let result = 0;

  ranges.reduce((sum: number, range: Range) => {
    return 0;
  }, 0);

  console.log("result", result);
  return result;
}

/************************************
 * SOLUTION
 ************************************/

export function solvePartOne(preloadedDatabase?: string): number {
  const databaseString = preloadedDatabase ? preloadedDatabase : input;
  const database = getParsedInput(databaseString);

  const numUsableIngredients = getNumUsableIngredientsFromDatabase(database);

  return numUsableIngredients;
}

export function solvePartTwo(preloadedDatabase?: string): number {
  const databaseString = preloadedDatabase ? preloadedDatabase : input;
  const database = getParsedInput(databaseString);

  const numTotalIngredients = getTotalUsableIngredientsFromDatabaseRanges(
    database.freshIds
  );

  return numTotalIngredients;
}
