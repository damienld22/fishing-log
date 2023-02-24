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
    <span>{{ place?.name }}</span>
    <font-awesome-icon v-if="place?.link" @click="handleClickLink" icon="fa-up-right-from-square" class="ml-2" />
    <p v-if="place?.surface" class="italic text-sm">({{ place?.surface }} ha)</p>
  </div>

  <div class="mx-4 mt-6">
    <CollapseText title="Night fishing" :content="computedNightFishing" />
    <CollapseText title="Boat authorized" :content="computedBoatInfos" />
    <CollapseText title="Infos" :content="place?.infos" />
    <FishingPostsList
      :place="place"
      @add-post="handleAddPost"
      @delete-post="handleDeletePost"
      @edit-post="handleEditPost"
    />
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
    <PlaceForm :place="place" @cancel="() => setEditionModalState(false)" @validate="handleEdition" />
  </ModalComponent>
</template>

<script setup lang="ts">
import CollapseText from "@/components/common/CollapseText.vue";
import ConfirmModal from "@/components/common/ConfirmModal.vue";
import ModalComponent from "@/components/common/ModalComponent.vue";
import FishingPostsList from "@/components/places/FishingPostsList.vue";
import PlaceForm from "@/components/places/PlaceForm.vue";
import { usePlaces, type NewFishingPlace, type NewFishingPost } from "@/services/use-places";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
const { params } = useRoute();

// Element
const { places, updatePlace, deletePlace, addPost, deletePost, editPost } = usePlaces();
const place = computed(() => places.value.find((elt) => elt.id === params.id));

// Navigation
const { back } = useRouter();
const handleClickLink = () => window.open(place?.value?.link, "_blank");

// Computed infos
const computedNightFishing = computed(() =>
  typeof place?.value?.nightFishing === "boolean"
    ? place?.value?.nightFishing
      ? "Yes"
      : "No"
    : place?.value?.nightFishing
);
const computedBoatInfos = computed(() =>
  typeof place?.value?.boatAuthorized === "boolean"
    ? place?.value?.boatAuthorized
      ? "Yes"
      : "No"
    : place?.value?.boatAuthorized
);

// Delete
const deleteModalOpen = ref(false);
const setDeleteModalState = (value: boolean) => (deleteModalOpen.value = value);
const handleDelete = () => {
  deletePlace(params.id as string);
  setDeleteModalState(false);
  back();
};

// Edition
const editionModalOpen = ref(false);
const setEditionModalState = (value: boolean) => (editionModalOpen.value = value);
const handleEdition = (place: NewFishingPlace) => {
  const id = params.id as string;
  updatePlace(id, { ...place, id });
  setEditionModalState(false);
};

// Posts
const handleAddPost = (post: NewFishingPost) => {
  addPost(params.id as string, post);
};
const handleDeletePost = (postId: string) => {
  deletePost(params.id as string, postId);
};
const handleEditPost = (postId: string, post: NewFishingPost) => {
  editPost(params.id as string, postId, post);
};
</script>
