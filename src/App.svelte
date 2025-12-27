<script lang="ts" module>
  import DayEightPage from "./components/days/day-eight/DayEightPage.svelte";
  import DayPage from "./components/days/DayPage.svelte";
  import MainPage from "./components/MainPage.svelte";
  import { getSolutionOneForDay, getSolutionTwoForDay } from "./lib/helpers";

  export type Day = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

  let currentDay = $state<Day | null>(null);

  const solutionOne = $derived(getSolutionOneForDay(currentDay));
  const solutionTwo = $derived(getSolutionTwoForDay(currentDay));

  function setCurrentDay(day: Day | null) {
    currentDay = day;
  }
</script>

<main>
  {#if currentDay === null}
    <MainPage {setCurrentDay} />
  {:else if currentDay === 8}
    <DayEightPage />
  {:else}
    <DayPage dayNumber={currentDay} {solutionOne} {solutionTwo} />
  {/if}
</main>
