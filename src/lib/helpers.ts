import type { Day } from "../App.svelte";

import {
  solvePartOne as oneOne,
  solvePartTwo as oneTwo,
} from "./solvers/day-one";
import {
  solvePartOne as twoOne,
  solvePartTwo as twoTwo,
} from "./solvers/day-two";
import {
  solvePartOne as threeOne,
  solvePartTwo as threeTwo,
} from "./solvers/day-three";
import {
  solvePartOne as fourOne,
  solvePartTwo as fourTwo,
} from "./solvers/day-four";

export function getSolutionOneForDay(day: Day | null): string | number | null {
  if (day === null) {
    return null;
  }

  switch (day) {
    case 1:
      return oneOne();
    case 2:
      return twoOne();
    case 3:
      return threeOne();
    case 4:
      return fourOne();
    default:
      return "🎄NOT IMPLEMENTED🎄";
  }
}

export function getSolutionTwoForDay(day: Day | null): string | number | null {
  if (day === null) {
    return null;
  }

  switch (day) {
    case 1:
      return oneTwo();
    case 2:
      return twoTwo();
    case 3:
      return threeTwo();
    case 4:
      return fourTwo();
    default:
      return "🎄NOT IMPLEMENTED🎄";
  }
}
