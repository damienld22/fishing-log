<template>
  <div class="form-control w-full max-w-xs">
    <label v-if="label" class="label">
      <span class="label-text">{{ label }}</span>
    </label>

    <div class="flex">
      <div class="flex mr-4">
        <label class="mr-2" for="switchId_yes">Yes</label>
        <input
          id="switchId_yes"
          type="radio"
          class="radio"
          :checked="props.modelValue"
          :value="true"
          @click="setValue(true)"
        />
      </div>

      <div class="flex">
        <label class="mr-2" for="switchId_no">No</label>
        <input
          id="switchId_no"
          type="radio"
          class="radio"
          :checked="!props.modelValue"
          :value="false"
          @click="setValue(false)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label?: string;
  modelValue: boolean;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const setValue = (value: boolean) => emits("update:modelValue", value);
</script>
