<template>
  <div class="flex justify-between items-center">
    <font-awesome-icon @click="back" icon="fa-arrow-left" size="2x" />
    <!-- <div>
      <font-awesome-icon class="mr-2" @click="() => setEditionModalState(true)" icon="fa-pencil" size="1x" />
      <font-awesome-icon class="ml-2" @click="() => setDeleteModalState(true)" icon="fa-trash" size="1x" />
    </div> -->
  </div>

  <!-- Title -->
  <div class="text-center text-xl mt-6">
    <span>{{ post?.name }}</span>
  </div>

  <div class="mx-4 mt-6">
    <MapComponent :style="style" :point="post?.location" :center="post?.location" :zoom="zoom" />
    <CollapseText title="Infos" :content="post?.infos" />
  </div>

  <!-- Delete confirmation -->
  <!-- <ConfirmModal
    :open="deleteModalOpen"
    label="Do you really delete this place ?"
    @cancel="() => setDeleteModalState(false)"
    @validate="() => handleDelete()"
  /> -->

  <!-- Edition modal -->
  <!-- <ModalComponent :open="editionModalOpen">
    <PlaceForm :place="place" @cancel="() => setEditionModalState(false)" @validate="handleEdition" />
  </ModalComponent> -->
</template>

<script setup lang="ts">
import CollapseText from "@/components/common/CollapseText.vue";
import MapComponent from "@/components/common/MapComponent.vue";
import { usePlaces } from "@/services/use-places";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
const { params } = useRoute();

const style = "height: 50vh; width: 100%";
const zoom = 12;

// Element
const { places } = usePlaces();
const place = computed(() => places.value.find((elt) => elt.id === params.id));
const post = computed(() => place?.value?.posts?.find((elt) => elt.id === params.postId));

// Navigation
const { back } = useRouter();

// // Delete
// const deleteModalOpen = ref(false);
// const setDeleteModalState = (value: boolean) => (deleteModalOpen.value = value);
// const handleDelete = () => {
//   deletePlace(params.id as string);
//   setDeleteModalState(false);
//   back();
// };

// // Edition
// const editionModalOpen = ref(false);
// const setEditionModalState = (value: boolean) => (editionModalOpen.value = value);
// const handleEdition = (place: NewFishingPlace) => {
//   const id = params.id as string;
//   updatePlace(id, { ...place, id });
//   setEditionModalState(false);
// };
</script>
