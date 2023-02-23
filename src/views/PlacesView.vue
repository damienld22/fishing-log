<template>
  <PlacesTable :places="places" />

  <!-- Creation modal -->
  <ModalComponent :open="creationModalOpen">
    <PlaceForm @cancel="() => toggleCreationModal(false)" @validate="handlePlaceCreation" />
  </ModalComponent>

  <AddButton @click="() => toggleCreationModal(true)" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import AddButton from "@/components/common/AddButton.vue";
import ModalComponent from "@/components/common/ModalComponent.vue";
import PlaceForm from "@/components/places/PlaceForm.vue";
import PlacesTable from "@/components/places/PlacesTable.vue";
import { usePlaces, type NewFishingPlace } from "@/services/use-places";

// Interaction with service
const { places, addNewPlace } = usePlaces();

// Creation modal
const creationModalOpen = ref(false);
const toggleCreationModal = (value: boolean) => (creationModalOpen.value = value);
const handlePlaceCreation = (newPlace: NewFishingPlace) => {
  addNewPlace(newPlace);
  creationModalOpen.value = false;
};
</script>
