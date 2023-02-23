<template>
  <PlacesTable :places="places" />

  <!-- Creation modal -->
  <ModalComponent :open="creationModalOpen">
    <CreatePlaceForm @cancel="() => toggleCreationModal(false)" @validate="handlePlaceCreation" />
  </ModalComponent>

  <AddButton @click="() => toggleCreationModal(true)" />
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import uniqid from "uniqid";
import AddButton from "@/components/common/AddButton.vue";
import ModalComponent from "@/components/common/ModalComponent.vue";
import CreatePlaceForm from "@/components/places/CreatePlaceForm.vue";
import PlacesTable from "@/components/places/PlacesTable.vue";
import { fetchAllFishingPlaces, updateFishingPlaces, type FishingPlace, type NewFishingPlace } from "@/services/places";

// Interaction with service
const places = ref<FishingPlace[]>(fetchAllFishingPlaces());
watchEffect(() => updateFishingPlaces(places.value));

// Creation modal
const creationModalOpen = ref(false);
const toggleCreationModal = (value: boolean) => (creationModalOpen.value = value);
const handlePlaceCreation = (newPlace: NewFishingPlace) => {
  places.value = [...places.value, { ...newPlace, id: uniqid() }];
  creationModalOpen.value = false;
};
</script>
