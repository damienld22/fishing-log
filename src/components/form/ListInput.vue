<template>
  <div class="inline-flex justify-between items-center w-full">
    <input
      type="text"
      :placeholder="props.placeholder"
      v-model="inputValue"
      class="input input-ghost focus:outline-none input-md"
      @keyup.enter="onValidate"
    />

    <font-awesome-icon icon="fa-check" @click="onValidate" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const inputValue = ref("");

const props = defineProps<{
  placeholder: string;
}>();

const emits = defineEmits<{
  (e: "validate", value: string): void;
}>();

const onValidate = () => {
  emits("validate", inputValue.value);
  inputValue.value = "";
};
</script>
