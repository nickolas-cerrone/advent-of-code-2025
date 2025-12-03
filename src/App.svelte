<script lang="ts" module>
  import MainPage from "./components/MainPage.svelte";

  export type Day = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

  let currentDay = $state<Day | null>(null);

  function setCurrentDay(day: Day | null) {
    currentDay = day;
  }
</script>

<main>
  {#if currentDay === null}
    <MainPage {setCurrentDay} />
  {:else if currentDay === 1}
    <div>day 1</div>
  {:else if currentDay === 2}
    <div>day 2</div>
  {:else if currentDay === 3}
    <div>day 3</div>
  {:else if currentDay === 4}
    <div>day 4</div>
  {:else if currentDay === 5}
    <div>day 5</div>
  {:else if currentDay === 6}
    <div>day 6</div>
  {:else if currentDay === 7}
    <div>day 7</div>
  {:else if currentDay === 8}
    <div>day 8</div>
  {:else if currentDay === 9}
    <div>day 9</div>
  {:else if currentDay === 10}
    <div>day 10</div>
  {:else if currentDay === 11}
    <div>day 11</div>
  {:else if currentDay === 12}
    <div>day 12</div>
  {/if}
</main>
