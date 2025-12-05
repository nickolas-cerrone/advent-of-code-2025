import type { Day } from "../App.svelte";

import {
  solvePartOne as oneOne,
  solvePartTwo as oneTwo,
} from "./solvers/day-one";
import {
  solvePartOne as twoOne,
  solvePartTwo as twoTwo,
} from "./solvers/day-two";

export function getSolutionOneForDay(day: Day | null): string | number | null {
  if (day === null) {
    return null;
  }

  switch (day) {
    case 1:
      return oneOne();
    case 2:
      return twoOne();
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
    default:
      return "🎄NOT IMPLEMENTED🎄";
  }
}
