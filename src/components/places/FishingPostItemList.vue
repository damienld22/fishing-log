<template>
  <div>
    <p>{{ props.post.name }}</p>
  </div>
</template>

<script setup lang="ts">
import type { FishingPost } from "@/services/use-places";

const props = defineProps<{
  post: FishingPost;
}>();
</script>
