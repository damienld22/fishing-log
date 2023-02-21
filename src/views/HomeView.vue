<template>
  <div class="mt-10 mx-6 grid grid-cols-2 gap-6 justify-items-center">
    <HomeCard icon="fa-cart-shopping" label="Shopping list" path="/shopping" />
    <HomeCard icon="fa-location-dot" label="Fishing places" path="/places" />
    <HomeCard icon="fa-box-archive" label="Preparation" path="/preparation" />
  </div>
</template>

<script setup lang="ts">
import HomeCard from "@/components/home/HomeCard.vue";
</script>
