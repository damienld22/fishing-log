<template>
  <div class="flex flex-col my-4 items-center bg-base-200 shadow-xl p-4 border-[1px] rounded-lg border-black">
    <div class="flex justify-between mb-2 w-full">
      <p class="text-xs">{{ props.post.name }}</p>
      <font-awesome-icon icon="fa-trash" size="2xs" @click="emits('deletePost', props.post.id)" />
    </div>
    <MapComponent :style="style" :point="props.post.location" :center="props.post.location" :zoom="zoom" />
  </div>
</template>

<script setup lang="ts">
import type { FishingPost } from "@/services/use-places";
import MapComponent from "../common/MapComponent.vue";

const style = "height: 10vh; width: 70%";
const zoom = 12;

const props = defineProps<{
  post: FishingPost;
}>();

const emits = defineEmits<{
  (e: "deletePost", postId: string): void;
}>();
</script>
