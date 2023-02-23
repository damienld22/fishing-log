<template>
  <div class="my-4 collapse collapse-plus border border-base-300 bg-base-100 rounded-box">
    <input type="checkbox" />
    <div class="collapse-title">{{ props.title }}</div>
    <div class="collapse-content">
      <p class="whitespace-pre-wrap">{{ props.content }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  content?: string;
}>();
</script>
