<template>
  <CollapseCategory
    :key="category.id"
    v-for="category in categories"
    :category="category"
    @click="() => setToDeleteCategoryId(category.id)"
  >
    <div class="my-2 flex justify-between" :key="item.id" v-for="item in category.items">
      <div>
        <input type="checkbox" v-model="item.checked" class="checkbox checkbox-sm align-middle" />
        <span class="mx-4">{{ item.label }}</span>
      </div>
      <font-awesome-icon icon="fa-trash" size="xs" @click="() => handleCategoryItemDelete(category.id, item.id)" />
    </div>
    <ListInput placeholder="New item" @validate="(value: string) => handleCategoryItemCreation(category.id, value)" />
  </CollapseCategory>

  <!-- Category creation modal -->
  <Modal :open="creationModalOpen">
    <CreateCategoryForm @cancel="() => toggleCreationModal(false)" @validate="handleCategoryCreation" />
  </Modal>

  <!-- Delete category confirmation -->
  <ConfirmModal
    :open="Boolean(toDeleteCategoryId)"
    label="Do you really delete this category ?"
    @cancel="() => setToDeleteCategoryId(null)"
    @validate="() => handleCategoryDelete()"
  />

  <AddButton @click="() => toggleCreationModal(true)" />
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import uniqid from "uniqid";
import {
  fetchAllPreparationCategories,
  updatePreparationCategories,
  type PreparationCategory,
} from "@/services/preparation";
import ListInput from "@/components/form/ListInput.vue";
import AddButton from "@/components/common/AddButton.vue";
import Modal from "@/components/common/ModalComponent.vue";
import CreateCategoryForm from "@/components/preparation/CreateCategoryForm.vue";
import ConfirmModal from "@/components/common/ConfirmModal.vue";
import CollapseCategory from "@/components/preparation/CollapseCategory.vue";

const categories = ref<PreparationCategory[]>(fetchAllPreparationCategories());
watchEffect(() => updatePreparationCategories(categories.value));

// Modal delete
const toDeleteCategoryId = ref<string | null>(null);
const setToDeleteCategoryId = (value: string | null) => (toDeleteCategoryId.value = value);

// Modal category creation
const creationModalOpen = ref(false);
const toggleCreationModal = (value: boolean) => (creationModalOpen.value = value);

// Events handlers categories
const handleCategoryCreation = (value: string) => {
  toggleCreationModal(false);
  categories.value = [...categories.value, { label: value, id: uniqid(), items: [] }];
};
const handleCategoryDelete = () => {
  categories.value = categories.value.filter((elt) => elt.id !== toDeleteCategoryId.value);
  setToDeleteCategoryId(null);
};

// Events handlers items
const handleCategoryItemCreation = (categoryId: string, label: string) => {
  const updatedCategories = [...categories.value];
  const categoryIndex = updatedCategories.findIndex((elt) => elt.id === categoryId);
  updatedCategories[categoryIndex].items.push({ checked: false, id: uniqid(), label });
  categories.value = updatedCategories;
};
const handleCategoryItemDelete = (categoryId: string, itemId: string) => {
  const updatedCategories = [...categories.value];
  const categoryIndex = updatedCategories.findIndex((elt) => elt.id === categoryId);
  updatedCategories[categoryIndex].items = updatedCategories[categoryIndex].items.filter((elt) => elt.id !== itemId);
  categories.value = updatedCategories;
};
</script>
