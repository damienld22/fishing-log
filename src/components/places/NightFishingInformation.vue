<template>
  <div
    v-if="typeof props?.place?.nightFishing === 'string'"
    class="collapse collapse-plus border border-base-300 bg-base-100 rounded-box"
  >
    <input type="checkbox" />
    <div class="collapse-title">Night fishing : Yes</div>
    <div class="collapse-content">
      <p>{{ props?.place?.nightFishing }}</p>
    </div>
  </div>
  <div v-else>
    <span>Night fishing :</span>
    <span class="ml-6">{{ props.place?.nightFishing ? "Yes" : "No" }}</span>
  </div>
</template>

<script setup lang="ts">
import type { FishingPlace } from "@/services/places";

const props = defineProps<{
  place?: FishingPlace;
}>();
</script>
