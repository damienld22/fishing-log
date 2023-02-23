<template>
  <div class="flex justify-between my-4 items-center bg-base-200 shadow-xl px-4 border-[1px] rounded-lg border-black">
    <p>{{ props.post.name }}</p>
    <font-awesome-icon icon="fa-trash" size="2xs" @click="emits('deletePost', props.post.id)" />
  </div>
</template>

<script setup lang="ts">
import type { FishingPost } from "@/services/use-places";

const props = defineProps<{
  post: FishingPost;
}>();

const emits = defineEmits<{
  (e: "deletePost", postId: string): void;
}>();
</script>
