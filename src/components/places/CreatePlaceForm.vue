<template>
  <div class="flex flex-col">
    <TextInput field="name" v-model="form.values.name" placeholder="Name" label="Name" :validation="nameValidation" />

    <YesNoSwitchWithDescription v-model="form.values.nightFishing" label="Night fishing" />
    <YesNoSwitchWithDescription v-model="form.values.boatAuthorized" label="Navigation" />

    <TextInput field="link" v-model="form.values.link" placeholder="Link" label="Link" />

    <TextAreaInput field="infos" v-model="form.values.infos" placeholder="Infos" label="Infos" />
  </div>

  <div class="flex justify-between mt-6">
    <button class="btn" @click="emits('cancel')">Cancel</button>
    <button class="btn" @click="handleValidate">Validate</button>
  </div>
</template>

<script setup lang="ts">
import TextInput from "../form/TextInput.vue";
import { useForm } from "vee-validate";
import type { NewFishingPlace } from "@/services/places";
import YesNoSwitchWithDescription from "../form/YesNoSwitchWithDescription.vue";
import TextAreaInput from "../form/TextAreaInput.vue";

// Form handler
const form = useForm<NewFishingPlace>();
const handleValidate = async () => {
  const { valid } = await form.validate();

  if (valid) {
    emits("validate", form.values);
    form.resetForm();
  }
};

// Validations
const nameValidation = (value: string) => (value?.length > 0 ? true : "Please type a name");

// Emits
const emits = defineEmits<{
  (e: "cancel"): void;
  (e: "validate", values: NewFishingPlace): void;
}>();
</script>
