<template>
  <div
    v-if="typeof props?.place?.boatAuthorized === 'string'"
    class="my-4 collapse collapse-plus border border-base-300 bg-base-100 rounded-box"
  >
    <input type="checkbox" />
    <div class="collapse-title">Boat authorized : Yes</div>
    <div class="collapse-content">
      <p>{{ props?.place?.boatAuthorized }}</p>
    </div>
  </div>
  <div v-else>
    <span>Boat authorized :</span>
    <span class="ml-6">{{ props.place?.boatAuthorized ? "Yes" : "No" }}</span>
  </div>
</template>

<script setup lang="ts">
import type { FishingPlace } from "@/services/places";

const props = defineProps<{
  place?: FishingPlace;
}>();
</script>
