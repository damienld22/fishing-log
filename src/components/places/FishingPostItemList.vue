<template>
  <div
    class="flex flex-col my-4 items-center bg-base-200 shadow-xl p-4 border-[1px] rounded-lg border-black"
    @click.stop="handleClick"
  >
    <div class="flex justify-between mb-2 w-full">
      <p class="text-xs">{{ props.post.name }}</p>
    </div>
    <MapComponent :style="style" :point="props.post.location" :center="props.post.location" :zoom="zoom" />
  </div>
</template>

<script setup lang="ts">
import type { FishingPost } from "@/services/use-places";
import { useRouter } from "vue-router";
import MapComponent from "../common/MapComponent.vue";

const { push } = useRouter();
const style = "height: 10vh; width: 70%";
const zoom = 12;

const props = defineProps<{
  post: FishingPost;
  placeId: string;
}>();

const handleClick = () => {
  push(`/places/${props.placeId}/posts/${props.post.id}`);
};
</script>
