<template>
  <button @click="onClick" class="btn btn-circle fixed right-10 bottom-10 z-50">
    <font-awesome-icon icon="fa-plus" />
  </button>
</template>

<script setup lang="ts">
const emits = defineEmits<{
  (e: "click"): void;
}>();

const onClick = () => {
  emits("click");
};
</script>
