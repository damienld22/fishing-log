<template>
  <p>Location :</p>
  <MapComponent
    :style="style"
    :point="modelValue"
    :center="[longitude, latitude]"
    :zoom="currentZoom"
    @click="handleClick"
  />
  <p class="text-red-500">{{ errorMessage }}</p>
</template>

<script setup lang="ts">
import type { GPSPosition } from "@/services/use-places";
import { useField } from "vee-validate";
import { useGeolocation } from "@vueuse/core";
import MapComponent from "../common/MapComponent.vue";
import { ref, computed } from "vue";

const { coords } = useGeolocation();
const longitude = computed(() => props?.modelValue?.[0] || coords.value?.longitude || 48);
const latitude = computed(() => props?.modelValue?.[1] || coords.value?.latitude || -2);

const currentZoom = ref(10);
const style = "height: 20vh";

const props = defineProps<{
  field: string;
  modelValue?: GPSPosition;
}>();

const handleClick = ({ position, zoom }: { position: GPSPosition; zoom: number }) => {
  currentZoom.value = zoom;
  emits("update:modelValue", position);
};

const emits = defineEmits<{
  (e: "update:modelValue", value: GPSPosition): void;
}>();

const { errorMessage } = useField(props.field, (value?: GPSPosition) => (value ? true : "Please select a location"));
</script>
