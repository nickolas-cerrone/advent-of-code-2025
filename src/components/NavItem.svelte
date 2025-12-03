<script lang="ts">
  import type { Day } from "../App.svelte";

  interface Props {
    day: Day;
    setCurrentDay: (day: Day) => void;
  }

  let { day, setCurrentDay }: Props = $props();
</script>

<main>
  <ol>
    <li>
      <a href={null} onclick={() => setCurrentDay(day)}>Day {day}</a>
    </li>
  </ol>
</main>
