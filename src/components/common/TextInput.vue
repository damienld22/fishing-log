<template>
  <div class="form-control w-full max-w-xs">
    <label v-if="props.label" class="label">
      <span class="label-text">{{ props.label }}</span>
    </label>
    <input
      type="text"
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

const DEFAULT_ERROR_MESSAGE = "Please fill this input";

const props = defineProps<{
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  modelValue?: string;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

// Field validation
const { errorMessage } = useField<string>("name", (value: string) =>
  value?.length > 0 ? true : props.errorMessage || DEFAULT_ERROR_MESSAGE
);

const onChange = (event: Event) => {
  emits("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>
