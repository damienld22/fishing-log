<template>
  <p>Location :</p>
  <ol-map
    ref="map"
    @singleclick="onMapClick"
    :loadTilesWhileAnimating="true"
    :loadTilesWhileInteracting="true"
    style="height: 20vh"
  >
    <ol-view ref="view" :center="center" rotation="0" :zoom="zoom" projection="EPSG:4326" />

    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>

    <ol-vector-layer v-if="props.modelValue">
      <ol-source-vector>
        <ol-feature>
          <ol-geom-point :coordinates="props.modelValue"></ol-geom-point>
          <ol-style>
            <ol-style-circle radius="5">
              <ol-style-fill color="red"></ol-style-fill>
              <ol-style-stroke color="white" width="2"></ol-style-stroke>
            </ol-style-circle>
          </ol-style>
        </ol-feature>
      </ol-source-vector>
    </ol-vector-layer>
  </ol-map>
  <p class="text-red-500">{{ errorMessage }}</p>
</template>

<script setup lang="ts">
import type { GPSPosition } from "@/services/use-places";
import { useField } from "vee-validate";
import { ref } from "vue";

const center = ref([-2, 48]);
const zoom = ref(10);

const props = defineProps<{
  field: string;
  modelValue?: GPSPosition;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: GPSPosition): void;
}>();

const onMapClick = (event: any) => {
  emits("update:modelValue", event.coordinate);
};

const { errorMessage } = useField(props.field, (value?: GPSPosition) => (value ? true : "Please select a location"));
</script>
