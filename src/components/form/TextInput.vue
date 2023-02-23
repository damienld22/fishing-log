<template>
  <div class="form-control w-full max-w-xs">
    <label v-if="props.label" class="label">
      <span class="label-text">{{ props.label }}</span>
    </label>
    <input
      :type="props.type || 'text'"
      :placeholder="props.placeholder"
      :value="modelValue"
      @input="onChange"
      class="input input-bordered w-full max-w-xs"
    />
    <label v-if="errorMessage" class="label">
      <span class="label-text-alt text-red-500">{{ errorMessage }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";

const props = defineProps<{
  label?: string;
  placeholder?: string;
  validation?: (value?: string) => string | boolean;
  modelValue?: string | number;
  field: string;
  type?: string;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();

// Field validation
const { errorMessage } = useField<string>(props.field, props?.validation);

const onChange = (event: Event) => {
  emits("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>
