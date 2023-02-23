<template>
  <div class="flex flex-col">
    <TextInput v-model="form.values.name" placeholder="Name" label="Name" error-message="Please type a name" />

    <YesNoSwitchWithDescription v-model="form.values.nightFishing" label="Night fishing" />
  </div>

  <div class="flex justify-between mt-6">
    <button class="btn" @click="emits('cancel')">Cancel</button>
    <button class="btn" @click="handleValidate">Validate</button>
  </div>
</template>

<script setup lang="ts">
import TextInput from "../common/TextInput.vue";
import { useForm } from "vee-validate";
import type { NewFishingPlace } from "@/services/places";
import YesNoSwitchWithDescription from "../form/YesNoSwitchWithDescription.vue";

// Form handler
const form = useForm<NewFishingPlace>();
const handleValidate = async () => {
  const { valid } = await form.validate();

  if (valid) {
    emits("validate", form.values);
    form.resetForm();
  }
};

// Emits
const emits = defineEmits<{
  (e: "cancel"): void;
  (e: "validate", values: NewFishingPlace): void;
}>();
</script>
