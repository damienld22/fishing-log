<template>
  <div class="flex justify-between items-center">
    <font-awesome-icon @click="back" icon="fa-arrow-left" size="2x" />
    <font-awesome-icon @click="() => setDeleteModalState(true)" icon="fa-trash" size="1x" />
  </div>

  <!-- Title -->
  <p class="text-center text-xl mt-6">
    <span>{{ place?.name }}</span>
    <font-awesome-icon v-if="place?.link" @click="handleClickLink" icon="fa-up-right-from-square" class="ml-2" />
  </p>

  <div class="mx-4 mt-6">
    <CollapseText title="Night fishing" :content="computedNightFishing" />
    <CollapseText title="Boat authorized" :content="computedBoatInfos" />
    <CollapseText title="Infos" :content="place?.infos" />
  </div>

  <!-- Delete confirmation -->
  <ConfirmModal
    :open="deleteModalOpen"
    label="Do you really delete this place ?"
    @cancel="() => setDeleteModalState(false)"
    @validate="() => handleDelete()"
  />
</template>

<script setup lang="ts">
import CollapseText from "@/components/common/CollapseText.vue";
import ConfirmModal from "@/components/common/ConfirmModal.vue";
import { deleteFishingPlace, getOneFishingPlaceById } from "@/services/places";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
const { params } = useRoute();

// Element
const place = ref(getOneFishingPlaceById(params.id as string));

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
  deleteFishingPlace(params.id as string);
  setDeleteModalState(false);
  back();
};
</script>
