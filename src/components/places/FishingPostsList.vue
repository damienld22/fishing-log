<template>
  <div class="my-4 collapse collapse-plus border border-base-300 bg-base-100 rounded-box">
    <input type="checkbox" />
    <div class="collapse-title">Posts</div>
    <div class="collapse-content flex flex-col">
      <div class="mb-6" v-if="props.place">
        <FishingPostItemList
          @delete-post="(id: string) => emits('deletePost', id)"
          :post="post"
          :key="post.id"
          v-for="post in props.place.posts"
        />
      </div>

      <button @click="() => (modalCreationOpen = true)" class="btn btn-circle btn-xs self-end">
        <font-awesome-icon icon="fa-plus" size="2xs" />
      </button>
    </div>
  </div>

  <ModalComponent :open="modalCreationOpen">
    <div class="flex flex-col">
      <font-awesome-icon icon="fa-close" size="sm" class="self-end" @click="modalCreationOpen = false" />
      <TextInput field="name" v-model="form.values.name" placeholder="Name" label="Name" />

      <div class="my-6">
        <PostLocationSelector field="location" v-model="form.values.location" />
      </div>

      <TextAreaInput field="infos" v-model="form.values.infos" placeholder="Infos" label="Infos" />

      <div class="flex justify-between mt-6">
        <button class="btn" @click="modalCreationOpen = false">Cancel</button>
        <button class="btn" @click="handleFishingPostCreation">Validate</button>
      </div>
    </div>
  </ModalComponent>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { ref } from "vue";
import ModalComponent from "../common/ModalComponent.vue";
import type { FishingPlace, NewFishingPost } from "../../services/use-places";
import TextInput from "../form/TextInput.vue";
import TextAreaInput from "../form/TextAreaInput.vue";
import PostLocationSelector from "./PostLocationSelector.vue";
import FishingPostItemList from "./FishingPostItemList.vue";

const modalCreationOpen = ref(false);

const props = defineProps<{
  place?: FishingPlace;
}>();

const emits = defineEmits<{
  (e: "addPost", post: NewFishingPost): void;
  (e: "deletePost", postId: string): void;
}>();

// Form handler
const form = useForm<NewFishingPost>();
const handleFishingPostCreation = async () => {
  const { valid } = await form.validate();

  if (valid) {
    emits("addPost", form.values);
    form.resetForm();
    modalCreationOpen.value = false;
  }
};
</script>
