import input from "../../../advent-of-code-2025-inputs/day-four-input.txt?raw";

/************************************
 * TYPES
 ************************************/

type WallCell = "@" | ".";
export type Wall = WallCell[][];
interface WallPosition {
  row: number;
  col: number;
}

/************************************
 * CONSTANTS
 ************************************/

const MAX_ADJACENT_ROLLS = 4;

/************************************
 * HELPERS
 ************************************/

function getParsedInput(wallString: string): Wall {
  let rows = wallString.split("\n");

  return rows.map((row) =>
    row.split("").map<WallCell>((cell) => {
      if (cell === "@") return cell;
      else return ".";
    })
  );
}

export function getAdjacentRollCount(
  wall: Wall,
  rollPosition: WallPosition
): number {
  let result = 0;

  // We add 2 to the roll position so we check the full 3x3 around the roll,
  // otherwise we will stop at the center position
  const startColumn = Math.max(rollPosition.col - 1, 0);
  const endColumn = Math.min(rollPosition.col + 2, wall[0].length);

  const startRow = Math.max(rollPosition.row - 1, 0);
  const endRow = Math.min(rollPosition.row + 2, wall.length);

  for (let column = startColumn; column < endColumn; column++) {
    for (let row = startRow; row < endRow; row++) {
      if (row === rollPosition.row && column === rollPosition.col) continue;
      if (wall[row][column] === "@") {
        result++;
      }
    }
  }

  return result;
}

function getNumGrabbableRolls(wall: Wall): number {
  let result = 0;

  for (let column = 0; column < wall[0].length; column++) {
    let debugRow = "";
    for (let row = 0; row < wall.length; row++) {
      if (wall[row][column] !== "@") {
        debugRow += ".";
        continue;
      }
      if (
        getAdjacentRollCount(wall, { row, col: column }) < MAX_ADJACENT_ROLLS
      ) {
        result++;
        debugRow += "X";
      } else {
        debugRow += "@";
      }
    }
    console.log(debugRow);
  }

  return result;
}

/************************************
 * SOLUTION
 ************************************/

export function solvePartOne(preloadedWallString?: string): number {
  const wallString = preloadedWallString ? preloadedWallString : input;
  const wall = getParsedInput(wallString);
  const grabbableRolls = getNumGrabbableRolls(wall);

  return grabbableRolls;
}
