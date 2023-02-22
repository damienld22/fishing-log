<template>
  <HeaderComponent />

  <div class="mx-4 mt-4 mb-32">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import HeaderComponent from "./components/HeaderComponent.vue";
</script>
