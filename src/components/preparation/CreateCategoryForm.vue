<template>
  <p class="text-xl text-center">Create new category</p>

  <input
    class="input input-bordered my-6"
    @keypress.enter="handleValidate"
    v-model="categoryName"
    placeholder="Category"
  />

  <div class="flex justify-between mt-6">
    <button class="btn" @click="handleCancel">Cancel</button>
    <button class="btn" @click="handleValidate">Validate</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const categoryName = ref("");

const emit = defineEmits<{
  (e: "cancel"): void;
  (e: "validate", value: string): void;
}>();

const handleCancel = () => emit("cancel");
const handleValidate = () => emit("validate", categoryName.value);
</script>
