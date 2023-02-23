<template>
  <table class="table w-full">
    <thead>
      <tr>
        <th>Name</th>
        <th class="text-center w-[33%]">Infos</th>
      </tr>
    </thead>
    <tbody>
      <tr @click="() => handleClickItem(place.id)" :key="place.id" v-for="place in props.places">
        <td class="text-xs">
          {{ place.name }}
        </td>
        <td class="text-center">
          <font-awesome-icon v-if="place.nightFishing" icon="fa-moon" size="xs" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { FishingPlace } from "@/services/places";
import { useRouter } from "vue-router";

const props = defineProps<{
  places: FishingPlace[];
}>();

// Navigation
const { push } = useRouter();
const handleClickItem = (placeId: string) => push(`/places/${placeId}`);
</script>
