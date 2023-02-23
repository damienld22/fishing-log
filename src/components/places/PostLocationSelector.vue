<template>
  <p>Location :</p>
  <MapComponent
    :style="style"
    :point="modelValue"
    :center="center"
    :zoom="zoom"
    @click="(value: GPSPosition) => emits('update:modelValue', value)"
  />
  <p class="text-red-500">{{ errorMessage }}</p>
</template>

<script setup lang="ts">
import type { GPSPosition } from "@/services/use-places";
import { useField } from "vee-validate";
import MapComponent from "../common/MapComponent.vue";
import { ref } from "vue";

const center = ref<GPSPosition>([-2, 48]);
const zoom = ref(10);
const style = "height: 20vh";

const props = defineProps<{
  field: string;
  modelValue?: GPSPosition;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: GPSPosition): void;
}>();

const { errorMessage } = useField(props.field, (value?: GPSPosition) => (value ? true : "Please select a location"));
</script>
