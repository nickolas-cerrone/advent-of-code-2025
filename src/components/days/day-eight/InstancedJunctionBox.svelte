<script lang="ts">
  import { T } from "@threlte/core";
  import {
    Instance,
    InstancedMesh,
    MeshLineGeometry,
    MeshLineMaterial,
  } from "@threlte/extras";

  import type { Junction } from "../../../lib/solvers/day-eight";
  import { Vector3 } from "three";

  interface Props {
    junctions: Junction[];
  }

  const SCALE = 0.0005;

  function getVector3FromJunction(junction: Junction): Vector3 {
    return new Vector3(
      junction.x * SCALE,
      junction.y * SCALE,
      junction.z * SCALE
    );
  }

  const { junctions }: Props = $props();
</script>

<InstancedMesh>
  <T.BoxGeometry args={[1, 0.4, 1]} />
  <T.MeshBasicMaterial color="lightSteelBlue" />
  <!-- <T.Mesh
    position.y={0.25}
    position.x={-DIVIT_OFFSET}
    position.z={DIVIT_OFFSET}
  >
    <T.BoxGeometry args={[0.2, 0.1, 0.2]} />
    <T.MeshBasicMaterial color="slateGray" />
  </T.Mesh>
  <T.Mesh position.y={0.25} position.x={DIVIT_OFFSET} position.z={DIVIT_OFFSET}>
    <T.BoxGeometry args={[0.2, 0.1, 0.2]} />
    <T.MeshBasicMaterial color="slateGray" />
  </T.Mesh>
  <T.Mesh
    position.y={0.25}
    position.x={DIVIT_OFFSET}
    position.z={-DIVIT_OFFSET}
  >
    <T.BoxGeometry args={[0.2, 0.1, 0.2]} />
    <T.MeshBasicMaterial color="slateGray" />
  </T.Mesh>
  <T.Mesh
    position.y={0.25}
    position.x={-DIVIT_OFFSET}
    position.z={-DIVIT_OFFSET}
  >
    <T.BoxGeometry args={[0.2, 0.1, 0.2]} />
    <T.MeshBasicMaterial color="slateGray" />
  </T.Mesh> -->

  {#each junctions as junction, index}
    <Instance
      position.x={junction.x * SCALE}
      position.y={junction.y * SCALE}
      position.z={junction.z * SCALE}
    />
    {#if index > 0}
      <T.Mesh>
        <MeshLineGeometry
          points={[
            getVector3FromJunction(junctions[index - 1]),
            getVector3FromJunction(junctions[index]),
          ]}
        />
        <MeshLineMaterial width={0.1} color="#fe3d00" />
      </T.Mesh>
    {/if}
  {/each}
</InstancedMesh>
