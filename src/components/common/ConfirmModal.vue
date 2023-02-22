<template>
  <Modal :open="props.open">
    <p class="py-4">{{ props.label }}</p>

    <div class="flex justify-around">
      <button @click="() => emits('cancel')" class="btn">Cancel</button>
      <button @click="() => emits('validate')" class="btn">Confirm</button>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import Modal from "./ModalComponent.vue";

const props = defineProps<{
  open: boolean;
  label: string;
}>();

const emits = defineEmits<{
  (e: "cancel"): void;
  (e: "validate"): void;
}>();
</script>
