import { ref, onMounted } from "vue";
import uniqid from "uniqid";

export type PreparationItem = {
  id: string;
  label: string;
  checked: boolean;
};

export type PreparationCategory = {
  id: string;
  label: string;
  items: PreparationItem[];
};

const LOCAL_STORAGE_KEY = "fishing-log-preparation";

function fetchFromStorage(): PreparationCategory[] {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]") as PreparationCategory[];
}

function overrideStorage(items: PreparationCategory[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
}

export function usePreparation() {
  const categories = ref<PreparationCategory[]>([]);

  // CRUD CATEGORIES
  const addCategory = (label: string) => {
    categories.value = [...categories.value, { label, id: uniqid(), items: [] }];
    overrideStorage(categories.value);
  };

  const deleteCategory = (categoryId: string) => {
    categories.value = categories.value.filter((elt) => elt.id !== categoryId);
    overrideStorage(categories.value);
  };

  // CRUD ITEMS
  const addItem = (categoryId: string, label: string) => {
    const updatedCategories = [...categories.value];
    const categoryIndex = updatedCategories.findIndex((elt) => elt.id === categoryId);
    updatedCategories[categoryIndex].items.push({ checked: false, id: uniqid(), label });
    categories.value = updatedCategories;
    overrideStorage(categories.value);
  };

  const deleteItem = (categoryId: string, itemId: string) => {
    const updatedCategories = [...categories.value];
    const categoryIndex = updatedCategories.findIndex((elt) => elt.id === categoryId);
    updatedCategories[categoryIndex].items = updatedCategories[categoryIndex].items.filter((elt) => elt.id !== itemId);
    categories.value = updatedCategories;
    overrideStorage(categories.value);
  };

  onMounted(() => {
    categories.value = fetchFromStorage();
  });

  return {
    categories,
    addCategory,
    deleteCategory,
    addItem,
    deleteItem,
  };
}
