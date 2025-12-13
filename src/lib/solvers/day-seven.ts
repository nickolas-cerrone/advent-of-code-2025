import input from "../../../advent-of-code-2025-inputs/day-seven-input.txt?raw";

/************************************
 * TYPES
 ************************************/

type ManifoldCell = "S" | "." | "^" | "|";
type TachyonManifold = ManifoldCell[][];
type ManifoldPosition = [row: number, column: number];

/************************************
 * HELPERS
 ************************************/

function getParsedInput(input: string): TachyonManifold {
  const map: TachyonManifold = input
    .split("\n")
    .map((line) => line.split("") as ManifoldCell[]);

  return map;
}

function getStartPosition(manifold: TachyonManifold): ManifoldPosition {
  return [1, manifold[0].findIndex((cell) => cell === "S")];
}

function simulateBeamSplitting(manifold: TachyonManifold): number {
  const startPosition = getStartPosition(manifold);

  // Add the position of the "S" to the queue and start simulating!
  const beamQueue: ManifoldPosition[] = [startPosition];
  let splits = 0;

  // Simulate the first element in the beam queue while adding any new beams
  // paths we create to the queue as we go!
  while (beamQueue.length) {
    let currentBeamPosition = beamQueue.shift();

    if (!currentBeamPosition) continue;

    // Simulate the current beam path
    while (true) {
      // Go one row up and check what type of cell we're in
      const nextBeamPosition: ManifoldPosition = [
        currentBeamPosition[0] + 1,
        currentBeamPosition[1],
      ];

      // Check if we've reached the end of the manifold
      if (nextBeamPosition[0] > manifold.length - 1) {
        // We'e reached the end of the manfiold on this current beam path
        break;
      }

      // If the queue contains our the next position, just drop our current path
      if (
        beamQueue.find(
          (pos) =>
            pos[0] === nextBeamPosition[0] && pos[1] === nextBeamPosition[1]
        )
      ) {
        break;
      }

      const nextCell = manifold[nextBeamPosition[0]][nextBeamPosition[1]];

      // Handle split
      if (nextCell === "^") {
        splits++;

        // Check two potential locations for paths and add them to the queue
        // if they're open and not queued

        // Left side ([row + 1, cell - 1])
        const leftSplitRow: number = nextBeamPosition[0] + 1;
        const leftSplitCol: number = nextBeamPosition[1] - 1;
        const leftSplitCell = manifold[leftSplitRow][leftSplitCol];
        const isLeftSplitInQueue = beamQueue.find(
          (pos) => pos[0] === leftSplitRow && pos[1] === leftSplitCol
        );
        if (leftSplitCell !== "|" && !isLeftSplitInQueue) {
          // Add it to the queue
          beamQueue.push([leftSplitRow, leftSplitCol]);
          manifold[leftSplitRow][leftSplitCol] = "|";
        }

        // Right side ([row + 1, cell + 1])
        const rightSplitRow: number = nextBeamPosition[0] + 1;
        const rightSplitCol: number = nextBeamPosition[1] + 1;
        const rightSplitCell = manifold[rightSplitRow][rightSplitCol];
        const isRightSplitInQueue = beamQueue.find(
          (pos) => pos[0] === rightSplitRow && pos[1] === rightSplitCol
        );
        if (rightSplitCell !== "|" && !isRightSplitInQueue) {
          // Add it to the queue
          beamQueue.push([rightSplitRow, rightSplitCol]);
          manifold[rightSplitRow][rightSplitCol] = "|";
        }

        // End the current path
        break;
      }

      // Handle duplicate (terminate current path)
      if (nextCell === "|") {
        break;
      }

      // Just update the manifold with the new beam location
      if (nextCell === ".") {
        manifold[nextBeamPosition[0]][nextBeamPosition[1]] = "|";
      }

      // Move to the next position
      currentBeamPosition = nextBeamPosition;
    }
  }

  return splits;
}

function getPositionKey(position: ManifoldPosition): string {
  return `${position[0]}-${position[1]}`;
}

function simulateTachyoneParticle(
  manifoldPosition: ManifoldPosition,
  manifold: TachyonManifold,
  timelineCount: number,
  manifoldMemo: Map<string, number>
): number {
  // Base case: We're at the end of the manifold
  if (manifoldPosition[0] + 1 > manifold.length) {
    return 0;
  }

  // Base case: We've already encountered this position, reference the memo
  const key = getPositionKey(manifoldPosition);
  if (manifoldMemo.has(key)) {
    return manifoldMemo.get(key) || 0;
  }

  let result = 0;

  const cell = manifold[manifoldPosition[0]][manifoldPosition[1]];

  if (cell === "^") {
    const leftPosition: ManifoldPosition = [
      manifoldPosition[0] + 1,
      manifoldPosition[1] - 1,
    ];
    const rightPosition: ManifoldPosition = [
      manifoldPosition[0] + 1,
      manifoldPosition[1] + 1,
    ];

    result =
      // When checking new timelines, just return the number of new timelines
      // and add that to the number of existing + 1
      simulateTachyoneParticle(leftPosition, manifold, 0, manifoldMemo) +
      simulateTachyoneParticle(rightPosition, manifold, 0, manifoldMemo) +
      timelineCount +
      1;
  } else {
    const nextPosition: ManifoldPosition = [
      manifoldPosition[0] + 1,
      manifoldPosition[1],
    ];
    result = simulateTachyoneParticle(
      nextPosition,
      manifold,
      timelineCount,
      manifoldMemo
    );
  }

  manifoldMemo.set(key, result);

  return result;
}

/************************************
 * SOLUTION
 ************************************/

export function solvePartOne(preloadedManifold?: string): number {
  const manifoldString = preloadedManifold ? preloadedManifold : input;
  const manifold = getParsedInput(manifoldString);

  const splits = simulateBeamSplitting(manifold);

  for (let i = 0; i < manifold.length; i++) {
    let row = "";
    for (let j = 0; j < manifold[0].length; j++) {
      row += manifold[i][j];
    }
    console.log(row);
  }

  return splits;
}

export function solvePartTwo(preloadedManifold?: string): number {
  const manifoldString = preloadedManifold ? preloadedManifold : input;
  const manifold = getParsedInput(manifoldString);

  const startPosition = getStartPosition(manifold);
  const manifoldMemo = new Map<string, number>();

  // Simulate
  const timelines = simulateTachyoneParticle(
    startPosition,
    manifold,
    1,
    manifoldMemo
  );

  return timelines;
}
