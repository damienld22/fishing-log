<template>
  <div class="flex justify-between items-center">
    <font-awesome-icon @click="back" icon="fa-arrow-left" size="2x" />
    <div>
      <font-awesome-icon class="mr-2" @click="() => setEditionModalState(true)" icon="fa-pencil" size="1x" />
      <font-awesome-icon class="ml-2" @click="() => setDeleteModalState(true)" icon="fa-trash" size="1x" />
    </div>
  </div>

  <!-- Title -->
  <div class="text-center text-xl mt-6">
    <span>{{ post?.name }}</span>
    <font-awesome-icon @click="() => post?.location && goTo(post?.location)" class="ml-4" icon="fa-route" size="md" />
  </div>

  <div class="mx-4 mt-6">
    <MapComponent :style="style" :point="post?.location" :center="post?.location" :zoom="zoom" />
    <CollapseText title="Infos" :content="post?.infos" />
  </div>

  <!-- Delete confirmation -->
  <ConfirmModal
    :open="deleteModalOpen"
    label="Do you really delete this place ?"
    @cancel="() => setDeleteModalState(false)"
    @validate="() => handleDelete()"
  />

  <!-- Edition modal -->
  <ModalComponent :open="editionModalOpen">
    <div class="flex flex-col">
      <font-awesome-icon icon="fa-close" size="sm" class="self-end" @click="editionModalOpen = false" />

      <PostForm :post="post" @validate="handleEdition" @cancel="() => (editionModalOpen = false)" />
    </div>
  </ModalComponent>
</template>

<script setup lang="ts">
import CollapseText from "@/components/common/CollapseText.vue";
import ConfirmModal from "@/components/common/ConfirmModal.vue";
import MapComponent from "@/components/common/MapComponent.vue";
import ModalComponent from "@/components/common/ModalComponent.vue";
import PostForm from "@/components/places/PostForm.vue";
import { usePlaces, type NewFishingPost } from "@/services/use-places";
import { useWaze } from "@/services/use-waze";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const { params } = useRoute();
const { goTo } = useWaze();

const style = "height: 50vh; width: 100%";
const zoom = 16;

// Element
const { places, deletePost, editPost } = usePlaces();
const place = computed(() => places.value.find((elt) => elt.id === params.id));
const post = computed(() => place?.value?.posts?.find((elt) => elt.id === params.postId));

// Navigation
const { back } = useRouter();

// // Delete
const deleteModalOpen = ref(false);
const setDeleteModalState = (value: boolean) => (deleteModalOpen.value = value);
const handleDelete = () => {
  deletePost(params.id as string, params.postId as string);
  setDeleteModalState(false);
  back();
};

// // Edition
const editionModalOpen = ref(false);
const setEditionModalState = (value: boolean) => (editionModalOpen.value = value);
const handleEdition = (post: NewFishingPost) => {
  editPost(params.id as string, params.postId as string, post);
  setEditionModalState(false);
};
</script>
