<template>
  <header
    class="bg-gray-300 flex flex-col justify-center items-center h-[10vh] sticky top-0 left-0 w-full z-50"
  >
    <div class="flex items-center justify-between w-11/12">
      <font-awesome-icon @click="handleGoHome" icon="fa-house" size="1x" />
      <h1 class="text-3xl self-center">Fishing log</h1>
      <div />
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const { push } = useRouter();

const handleGoHome = () => push("/");
</script>
