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
      <font-awesome-icon icon="fa-trash" size="xs" @click="() => deleteItem(category.id, item.id)" />
    </div>
    <ListInput placeholder="New item" @validate="(value: string) => addItem(category.id, value)" />
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
import { ref } from "vue";
import { usePreparation } from "@/services/use-preparation";
import ListInput from "@/components/form/ListInput.vue";
import AddButton from "@/components/common/AddButton.vue";
import Modal from "@/components/common/ModalComponent.vue";
import CreateCategoryForm from "@/components/preparation/CreateCategoryForm.vue";
import ConfirmModal from "@/components/common/ConfirmModal.vue";
import CollapseCategory from "@/components/preparation/CollapseCategory.vue";

const { categories, addCategory, deleteCategory, addItem, deleteItem } = usePreparation();

// Modal delete
const toDeleteCategoryId = ref<string | null>(null);
const setToDeleteCategoryId = (value: string | null) => (toDeleteCategoryId.value = value);

// Modal category creation
const creationModalOpen = ref(false);
const toggleCreationModal = (value: boolean) => (creationModalOpen.value = value);

// Events handlers categories
const handleCategoryCreation = (value: string) => {
  toggleCreationModal(false);
  addCategory(value);
};
const handleCategoryDelete = () => {
  deleteCategory(toDeleteCategoryId.value!);
  setToDeleteCategoryId(null);
};
</script>
