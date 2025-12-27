import input from "../../../advent-of-code-2025-inputs/day-eight-input.txt?raw";

/************************************
 * TYPES
 ************************************/

export type Junction = { x: number; y: number; z: number };
// Store the keys (see function below) of junctions in an array
type Network = Set<string>;

/************************************
 * HELPERS
 ************************************/

function getParsedInput(input: string): Junction[] {
  const junctions: Junction[] = input.split("\n").map((junction) => {
    const stringCoordinates = junction.split(",");

    return {
      x: parseFloat(stringCoordinates[0]),
      y: parseFloat(stringCoordinates[1]),
      z: parseFloat(stringCoordinates[2]),
    };
  });

  return junctions;
}

// Returns an array of junction pairs, sorted by straight line distance
export function getSortedJunctionPairs(
  junctions: Junction[]
): [Junction, Junction][] {
  const result: [Junction, Junction][] = [];

  for (let i = 0; i < junctions.length; i++) {
    for (let j = i; j < junctions.length; j++) {
      if (i === j) continue;

      result.push([junctions[i], junctions[j]]);
    }
  }

  result.sort(compareJunctionPairs);

  return result;
}

function compareJunctionPairs(
  pairOne: [Junction, Junction],
  pairTwo: [Junction, Junction]
): 0 | -1 | 1 {
  const distOne = getDistanceBetweenJunctions(pairOne[0], pairOne[1]);
  const distTwo = getDistanceBetweenJunctions(pairTwo[0], pairTwo[1]);

  if (distOne === distTwo) return 0;

  return distOne < distTwo ? -1 : 1;
}

function getDistanceBetweenJunctions(jOne: Junction, jTwo: Junction): number {
  return Math.sqrt(
    Math.pow(jOne.x - jTwo.x, 2) +
      Math.pow(jOne.y - jTwo.y, 2) +
      Math.pow(jOne.z - jTwo.z, 2)
  );
}

function getJunctionKey(junction: Junction): string {
  return `${junction.x}-${junction.y}-${junction.z}`;
}

function makeNetworks(
  junctions: Junction[],
  numConnections: number
): Network[] {
  let result: Network[] = [];

  // initialize networks, each junction gets it's own network
  result = junctions.map<Set<string>>((j) =>
    new Set<string>().add(getJunctionKey(j))
  );

  const sortedPairs = getSortedJunctionPairs(junctions);

  let totalConnections = 0;
  let currentPairIndex = 0;
  while (
    totalConnections < numConnections - 1 &&
    currentPairIndex < sortedPairs.length
  ) {
    const currentPair = sortedPairs[currentPairIndex];
    const firstKey = getJunctionKey(currentPair[0]);
    const secondKey = getJunctionKey(currentPair[1]);

    let networkOneIndex = result.findIndex((network) => network.has(firstKey));
    const networkTwoIndex = result.findIndex((network) =>
      network.has(secondKey)
    );

    // check if current pair is already in the same network
    if (networkOneIndex === networkTwoIndex) {
      // go to next pair
      currentPairIndex++;
      totalConnections++;
      continue;
    }

    // merge network two into network one
    const networkTwo = result.splice(networkTwoIndex, 1)[0];
    // If removing network 2 would shift network down, reflect that in the index
    if (networkTwoIndex < networkOneIndex) {
      networkOneIndex--;
    }
    networkTwo.forEach((junctionKey) =>
      result[networkOneIndex].add(junctionKey)
    );

    totalConnections++;
    currentPairIndex++;
    // console.log("num networks", result.length);
  }

  return result;
}

// Similar to makeNetworks, but goes until all junction boxes are in 1 network
function joinJunctions(junctions: Junction[]): number {
  let result: Network[] = [];

  // initialize networks, each junction gets it's own network
  result = junctions.map<Set<string>>((j) =>
    new Set<string>().add(getJunctionKey(j))
  );

  const sortedPairs = getSortedJunctionPairs(junctions);

  let currentPairIndex = 0;
  while (currentPairIndex < sortedPairs.length && result.length > 1) {
    const currentPair = sortedPairs[currentPairIndex];
    const firstKey = getJunctionKey(currentPair[0]);
    const secondKey = getJunctionKey(currentPair[1]);

    let networkOneIndex = result.findIndex((network) => network.has(firstKey));
    const networkTwoIndex = result.findIndex((network) =>
      network.has(secondKey)
    );

    // check if current pair is already in the same network
    if (networkOneIndex === networkTwoIndex) {
      // go to next pair
      currentPairIndex++;
      continue;
    }

    // merge network two into network one
    const networkTwo = result.splice(networkTwoIndex, 1)[0];

    // Note the two junctions that caused the networks to merge
    if (result.length === 1) {
      console.log("junc 1", firstKey);
      console.log("junc 2", secondKey);

      return (
        parseInt(firstKey.split("-")[0]) * parseInt(secondKey.split("-")[0])
      );
    }

    // If removing network 2 would shift network down, reflect that in the index
    if (networkTwoIndex < networkOneIndex) {
      networkOneIndex--;
    }
    networkTwo.forEach((junctionKey) =>
      result[networkOneIndex].add(junctionKey)
    );

    currentPairIndex++;
  }

  return result;
}

/************************************
 * SOLUTION
 ************************************/

export function solvePartOne(
  preloadedJunctions?: string,
  numConnections?: number
): number {
  const maxConnections = numConnections ?? 1000;
  const junctionsString = preloadedJunctions ? preloadedJunctions : input;
  const junctions = getParsedInput(junctionsString);

  const networks = makeNetworks(junctions, maxConnections);

  networks.sort((net1, net2) => {
    if (net1.size === net2.size) return 0;
    return net1.size < net2.size ? 1 : -1;
  });

  return networks[0].size * networks[1].size * networks[2].size;
}

export function solvePartTwo(preloadedJunctions?: string): number {
  const junctionsString = preloadedJunctions ? preloadedJunctions : input;
  const junctions = getParsedInput(junctionsString);

  const answer = joinJunctions(junctions);

  return answer;
}
