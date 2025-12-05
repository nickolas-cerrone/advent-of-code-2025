<script lang="ts">
  interface Props {
    dayNumber: number;
    solutionOne: string | number | null;
    solutionTwo: string | number | null;
  }

  const { dayNumber, solutionOne, solutionTwo }: Props = $props();
</script>

<h1>Day {dayNumber} answer:</h1>

<p>
  Part 1: {solutionOne || "🎄NOT IMPLEMENTED🎄"}
</p>
<p>Part 2: {solutionTwo || "🎄NOT IMPLEMENTED🎄"}</p>

<p>(see logs for more details)</p>

<a target="_blank" href="https://adventofcode.com/2025/day/{dayNumber}"
  >View day {dayNumber} puzzle</a
>

<br />
<br />

<a href="/">Return to main page</a>
