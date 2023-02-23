<template>
  <div class="flex flex-col">
    <font-awesome-icon icon="fa-close" size="sm" class="self-end" @click="emits('cancel')" />
    <TextInput field="name" v-model="form.values.name" placeholder="Name" label="Name" :validation="nameValidation" />
    <TextInput
      field="surface"
      type="number"
      v-model.number="form.values.surface"
      placeholder="50"
      label="Surface (ha)"
      :validation="surfaceValidation"
    />

    <YesNoSwitchWithDescription v-model="form.values.nightFishing" label="Night fishing" />
    <YesNoSwitchWithDescription v-model="form.values.boatAuthorized" label="Navigation" />

    <TextInput field="link" v-model="form.values.link" placeholder="Link" label="Link" :validation="linkValidation" />

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
import { isValidUrl } from "@/helpers/url";

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
const nameValidation = (value?: string) => (value && value?.length > 0 ? true : "Please type a name");
const linkValidation = (value?: string) => (!value || isValidUrl(value) ? true : "Please type a valid URL");
const surfaceValidation = (value?: number | string) => {
  if (typeof value === "undefined" || typeof value === "string") {
    return true;
  } else {
    return value > 0 ? true : "Please type a valid surface";
  }
};

// Emits
const emits = defineEmits<{
  (e: "cancel"): void;
  (e: "validate", values: NewFishingPlace): void;
}>();
</script>
