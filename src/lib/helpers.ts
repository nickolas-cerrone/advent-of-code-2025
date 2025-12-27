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
import {
  solvePartOne as fiveOne,
  solvePartTwo as fiveTwo,
} from "./solvers/day-five";
import {
  solvePartOne as sixOne,
  solvePartTwo as sixTwo,
} from "./solvers/day-six";
import {
  solvePartOne as sevenOne,
  solvePartTwo as sevenTwo,
} from "./solvers/day-seven";
import {
  solvePartOne as eightOne,
  solvePartTwo as eightTwo,
} from "./solvers/day-eight";
import {
  solvePartOne as nineOne,
  // solvePartTwo as nineTwo,
} from "./solvers/day-nine";

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
    case 5:
      return fiveOne();
    case 6:
      return sixOne();
    case 7:
      return sevenOne();
    case 8:
      return eightOne();
    case 9:
      return nineOne();
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
    case 5:
      return fiveTwo();
    case 6:
      return sixTwo();
    case 7:
      return sevenTwo();
    case 8:
      return eightTwo();
    // case 9:
    // return nineTwo();
    default:
      return "🎄NOT IMPLEMENTED🎄";
  }
}
