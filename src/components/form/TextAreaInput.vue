<template>
  <div class="form-control">
    <label v-if="props.label" class="label">
      <span class="label-text">{{ props.label }}</span>
    </label>
    <textarea
      class="textarea textarea-bordered h-24"
      :placeholder="props.placeholder"
      :value="modelValue"
      @input="onChange"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";

const props = defineProps<{
  label?: string;
  placeholder?: string;
  modelValue?: string;
  field: string;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

// Field validation
useField<string>(props.field);

const onChange = (event: Event) => {
  emits("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>
