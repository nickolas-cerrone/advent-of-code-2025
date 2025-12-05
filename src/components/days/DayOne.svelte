<script lang="ts">
  import { solvePartOne, solvePartTwo } from "../../lib/solvers/day-one";
  import DayPage from "./DayPage.svelte";

  const solutionOne = solvePartOne();
  const solutionTwo = solvePartTwo();
</script>

<DayPage dayNumber={1} {solutionOne} {solutionTwo} />
