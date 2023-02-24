<template>
  <ol-map
    ref="map"
    @singleclick="onMapClick"
    :loadTilesWhileAnimating="true"
    :loadTilesWhileInteracting="true"
    :style="props.style"
  >
    <ol-view
      ref="view"
      :center="props.center"
      :rotation="rotation"
      :zoom="props.zoom"
      projection="EPSG:4326"
      @zoomChanged="onZoomChanged"
    />

    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>

    <ol-vector-layer v-if="props.point">
      <ol-source-vector>
        <ol-feature>
          <ol-geom-point :coordinates="props.point"></ol-geom-point>
          <ol-style>
            <ol-style-circle :radius="radius">
              <ol-style-fill color="red"></ol-style-fill>
              <ol-style-stroke color="white" :width="width"></ol-style-stroke>
            </ol-style-circle>
          </ol-style>
        </ol-feature>
      </ol-source-vector>
    </ol-vector-layer>
  </ol-map>
</template>

<script setup lang="ts">
import type { GPSPosition } from "@/services/use-places";
import { ref } from "vue";

const props = defineProps<{
  center?: GPSPosition;
  zoom: number;
  point?: GPSPosition;
  style: string;
}>();

const rotation = ref(0);
const radius = ref(5);
const width = ref(2);
const currentZoom = ref(props.zoom);

const onZoomChanged = (value: number) => (currentZoom.value = value);

const emits = defineEmits<{
  (e: "click", { zoom, position }: { zoom: number; position: GPSPosition }): void;
}>();

const onMapClick = (event: any) => {
  emits("click", { zoom: currentZoom.value, position: event.coordinate });
};
</script>
