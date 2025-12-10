import input from "../../../advent-of-code-2025-inputs/day-five-input.txt?raw";

/************************************
 * TYPES
 ************************************/

export interface Range {
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

// Removes any ranges completely encapsulated within the new range. Doesn't add the new range yet
export function removeIntermediateRanges(
  range: Range,
  uniqueRanges: Range[]
): Range[] {
  const newRanges: Range[] = [];
  uniqueRanges.forEach((uniqueRange) => {
    if (uniqueRange.start >= range.start && uniqueRange.end <= range.end) {
      // this range is completely encapsulated within the new range, ignore it
      return;
    }
    // otherwise the range extends or is not fully encapsulated by our range
    newRanges.push(uniqueRange);
  });
  return newRanges;
}

// Takes a range and merges it with existing ones or creates a new range
export function mergeOrCreateRange(range: Range, uniqueRanges: Range[]) {
  const newRanges = removeIntermediateRanges(range, uniqueRanges);
  const startIndexRange = getIntersectingRangeIndex(range.start, newRanges);
  const endIndexRange = getIntersectingRangeIndex(range.end, newRanges);

  // Now combine potentially existing ranges
  // case 1: we didn't intersect at all, create new range
  if (startIndexRange === null && endIndexRange === null) {
    let insertionIndex = null;
    newRanges.forEach((newRange, index) => {
      if (newRange.end < range.start) {
        insertionIndex = index;
      }
    });

    newRanges.splice(
      insertionIndex === null ? 0 : insertionIndex + 1,
      0,
      range
    );
    // case 2: we intersected the start, extend that range
  } else if (startIndexRange !== null && endIndexRange === null) {
    // extend start range
    newRanges[startIndexRange] = {
      start: newRanges[startIndexRange].start,
      end: range.end,
    };
    // case 3: we intersected the end, extend that range
  } else if (startIndexRange === null && endIndexRange !== null) {
    // extend end range
    newRanges[endIndexRange] = {
      start: range.start,
      end: newRanges[endIndexRange].end,
    };
    // case 4: we intersected the start and end, extend first range, remove second
  } else if (startIndexRange !== null && endIndexRange !== null) {
    // If the indices are equal, then we get absorbed into this range
    if (startIndexRange !== endIndexRange) {
      newRanges[startIndexRange] = {
        start: newRanges[startIndexRange].start,
        end: newRanges[endIndexRange].end,
      };

      newRanges.splice(endIndexRange, 1);
    }
  }
  return newRanges;
}

// Returns the index of a range that includes the id. Returns null if none exist
export function getIntersectingRangeIndex(
  id: number,
  fullRanges: Range[]
): number | null {
  const index = fullRanges.findIndex((existingRange) => {
    // If start or end is within the existing range, we are
    if (id >= existingRange.start && id <= existingRange.end) {
      return true;
    }
  });

  return index >= 0 ? index : null;
}

// Merges intersecting ranges with existing ones
function mergeRanges(ranges: Range[]): Range[] {
  let uniqueRanges: Range[] = [ranges[0]];

  for (let i = 1; i < ranges.length; i++) {
    uniqueRanges = mergeOrCreateRange(ranges[i], uniqueRanges);
  }

  return uniqueRanges;
}

function getTotalUsableIngredientsFromDatabaseRanges(ranges: Range[]): number {
  let result = 0;

  const mergedRanges = mergeRanges(ranges);

  result = mergedRanges.reduce((sum: number, range: Range) => {
    return sum + (range.end - range.start) + 1;
  }, 0);

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
