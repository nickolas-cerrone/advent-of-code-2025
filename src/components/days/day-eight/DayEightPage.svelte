<script lang="ts">
  import { Canvas, T } from "@threlte/core";

  import { solvePartOne, solvePartTwo } from "../../../lib/solvers/day-eight";
  import DayPage from "../DayPage.svelte";
  import Circuits from "./Circuits.svelte";

  const solutionOne = solvePartOne();
  const solutionTwo = solvePartTwo();
</script>

<DayPage dayNumber={8} {solutionOne} {solutionTwo} />

<Canvas>
  <Circuits />
</Canvas>
