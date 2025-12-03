<script lang="ts">
  import type { Day } from "../App.svelte";
  import NavItem from "./NavItem.svelte";

  interface Props {
    setCurrentDay: (day: Day) => void;
  }

  let { setCurrentDay }: Props = $props();
</script>

<main>
  <div>main page</div>
  <nav>
    {#each Array.from({ length: 12 }, (_, k) => k + 1) as d}
      <NavItem day={d as Day} {setCurrentDay} />
    {/each}
  </nav>
</main>
