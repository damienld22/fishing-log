<template>
  <div class="my-4 collapse collapse-plus border border-base-300 bg-base-100 rounded-box">
    <input type="checkbox" />
    <div class="collapse-title">Posts</div>
    <div class="collapse-content flex flex-col">
      <div class="mb-6" v-if="props.place">
        <FishingPostItemList :place-id="props.place.id" :post="post" :key="post.id" v-for="post in props.place.posts" />
      </div>

      <button @click="() => (modalCreationOpen = true)" class="btn btn-circle btn-xs self-end">
        <font-awesome-icon icon="fa-plus" size="2xs" />
      </button>
    </div>
  </div>

  <ModalComponent :open="modalCreationOpen">
    <div class="flex flex-col">
      <font-awesome-icon icon="fa-close" size="sm" class="self-end" @click="modalCreationOpen = false" />

      <PostForm @validate="handleValidate" @cancel="() => (modalCreationOpen = false)" />
    </div>
  </ModalComponent>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ModalComponent from "../common/ModalComponent.vue";
import type { FishingPlace, NewFishingPost } from "../../services/use-places";
import FishingPostItemList from "./FishingPostItemList.vue";
import PostForm from "./PostForm.vue";

const modalCreationOpen = ref(false);

const props = defineProps<{
  place?: FishingPlace;
}>();

const emits = defineEmits<{
  (e: "addPost", post: NewFishingPost): void;
}>();

// Form handler
const handleValidate = (post: NewFishingPost) => {
  emits("addPost", post);
  modalCreationOpen.value = false;
};
</script>
