<template>
  <div
    @click="handleClick"
    class="card bg-base-100 shadow-xl w-[30vw] h-[30vw] flex flex-col items-center justify-center"
  >
    <font-awesome-icon :icon="props.icon" />
    <p class="text-xs mt-2">{{ props.label }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const props = defineProps<{ icon: string; label: string; path: string }>();
const { push } = useRouter();

const handleClick = () => push(props.path);
</script>
