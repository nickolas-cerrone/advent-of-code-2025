<script lang="ts">
  import { solvePartOne, solvePartTwo } from "../../lib/solvers/day-two";
  import DayPage from "./DayPage.svelte";

  const solutionOne = solvePartOne();
  const solutionTwo = solvePartTwo();
</script>

<DayPage dayNumber={2} {solutionOne} {solutionTwo} />
