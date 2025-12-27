import input from "../../../advent-of-code-2025-inputs/day-nine-input.txt?raw";

/************************************
 * TYPES
 ************************************/

type Tile = [number, number];

/************************************
 * HELPERS
 ************************************/

function getParsedInput(input: string): Tile[] {
  return input.split("\n").map((tileString) => {
    const [x, y] = tileString.split(",");
    return [parseInt(x), parseInt(y)];
  });
}

export function findArea(t1: Tile, t2: Tile): number {
  return (Math.abs(t2[0] - t1[0]) + 1) * (Math.abs(t2[1] - t1[1]) + 1);
}

function findBiggestArea(tiles: Tile[]): number {
  const tilePairs: [Tile, Tile][] = [];

  for (let i = 0; i < tiles.length; i++) {
    for (let j = i; j < tiles.length; j++) {
      tilePairs.push([tiles[i], tiles[j]]);
    }
  }

  let biggestArea: number = 0;

  tilePairs.forEach((pair) => {
    const newArea = findArea(pair[0], pair[1]);
    if (biggestArea < newArea) {
      biggestArea = newArea;
    }
  });

  return biggestArea;
}

/************************************
 * SOLUTION
 ************************************/

export function solvePartOne(preloadedTiles?: string): number {
  const tileString = preloadedTiles ? preloadedTiles : input;

  const tiles = getParsedInput(tileString);
  const biggestArea = findBiggestArea(tiles);

  console.log(biggestArea);

  return biggestArea;
}
