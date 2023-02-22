<template>
  <div class="collapse border border-base-300 bg-base-100 rounded-box my-4">
    <input type="checkbox" />
    <div class="collapse-title text-xl font-medium flex justify-between items-center">
      <span>{{ props.category.label }}</span>
      <font-awesome-icon class="z-10" icon="fa-trash" size="xs" @click.stop="() => emits('click')" />
    </div>
    <div class="collapse-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PreparationCategory } from "@/services/preparation";

const props = defineProps<{
  category: PreparationCategory;
}>();

const emits = defineEmits<{
  (e: "click"): void;
}>();
</script>
