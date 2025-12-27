<script lang="ts">
  import { T } from "@threlte/core";
  import { OrbitControls } from "@threlte/extras";

  import { getJunctions } from "../../../lib/solvers/day-eight";
  import InstancedJunctionBox from "./InstancedJunctionBox.svelte";

  const junctions = getJunctions();
</script>

<T.PerspectiveCamera
  makeDefault
  position={[10, 10, 10]}
  oncreate={(ref) => ref.lookAt(0, 1, 0)}
>
  <OrbitControls />
</T.PerspectiveCamera>

<InstancedJunctionBox {junctions} />
