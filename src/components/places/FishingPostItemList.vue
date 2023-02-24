<template>
  <div class="flex flex-col my-4 items-center bg-base-200 shadow-xl p-4 border-[1px] rounded-lg border-black">
    <div class="flex justify-between mb-2 w-full">
      <p class="text-xs">{{ props.post.name }}</p>
      <div>
        <font-awesome-icon class="mx-2" icon="fa-pencil" size="2xs" @click="editPostOpen = true" />
        <font-awesome-icon class="mx-2" icon="fa-trash" size="2xs" @click="emits('deletePost', props.post.id)" />
      </div>
    </div>
    <MapComponent :style="style" :point="props.post.location" :center="props.post.location" :zoom="zoom" />
  </div>

  <ModalComponent :open="editPostOpen">
    <div class="flex flex-col">
      <font-awesome-icon icon="fa-close" size="sm" class="self-end" @click="editPostOpen = false" />

      <PostForm :post="props.post" @validate="handleEdition" @cancel="() => (editPostOpen = false)" />
    </div>
  </ModalComponent>
</template>

<script setup lang="ts">
import type { FishingPost, NewFishingPost } from "@/services/use-places";
import { ref } from "vue";
import MapComponent from "../common/MapComponent.vue";
import ModalComponent from "../common/ModalComponent.vue";
import PostForm from "./PostForm.vue";

const style = "height: 10vh; width: 70%";
const zoom = 12;

const props = defineProps<{
  post: FishingPost;
}>();

const editPostOpen = ref(false);
const handleEdition = (post: NewFishingPost) => {
  emits("editPost", props.post.id, post);
  editPostOpen.value = false;
};

const emits = defineEmits<{
  (e: "editPost", postId: string, post: NewFishingPost): void;
  (e: "deletePost", postId: string): void;
}>();
</script>
