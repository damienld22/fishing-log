<template>
  <TextInput field="name" v-model="form.values.name" placeholder="Name" label="Name" />

  <div class="my-6">
    <PostLocationSelector field="location" v-model="form.values.location" />
  </div>

  <TextAreaInput field="infos" v-model="form.values.infos" placeholder="Infos" label="Infos" />

  <div class="flex justify-between mt-6">
    <button class="btn" @click="emits('cancel')">Cancel</button>
    <button class="btn" @click="handleValidate">Validate</button>
  </div>
</template>

<script setup lang="ts">
import type { FishingPost, NewFishingPost } from "@/services/use-places";
import { useForm } from "vee-validate";
import TextAreaInput from "../form/TextAreaInput.vue";
import TextInput from "../form/TextInput.vue";
import PostLocationSelector from "./PostLocationSelector.vue";

const props = defineProps<{
  post?: FishingPost;
}>();

const form = useForm<NewFishingPost>({ initialValues: props.post });

const handleValidate = async () => {
  const { valid } = await form.validate();

  if (valid) {
    emits("validate", form.values);
    form.resetForm();
  }
};

const emits = defineEmits<{
  (e: "cancel"): void;
  (e: "validate", newFishingPost: NewFishingPost): void;
}>();
</script>
