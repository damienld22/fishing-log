<template>
  <Teleport to="body">
    <div v-if="props.open" class="modal modal-open">
      <div class="modal-box">
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  open: boolean;
}>();
</script>
