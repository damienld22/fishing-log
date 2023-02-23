import { ref, onMounted } from "vue";
import uniqid from "uniqid";

// TYPES
export type ShoppingListItem = {
  id: string;
  label: string;
};

export type NewShoppingListItem = Omit<ShoppingListItem, "id">;

function fetchFromStorage(): ShoppingListItem[] {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]") as ShoppingListItem[];
}

function overrideStorage(items: ShoppingListItem[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
}

const LOCAL_STORAGE_KEY = "fishing-log-shopping";

export function useShopping() {
  const items = ref<ShoppingListItem[]>([]);

  onMounted(() => {
    items.value = fetchFromStorage();
  });

  const deleteItem = (itemId: string) => {
    items.value = items.value.filter((elt) => elt.id !== itemId);
    overrideStorage(items.value);
  };

  const addItem = (label: string) => {
    items.value = [...items.value, { label, id: uniqid() }];
    overrideStorage(items.value);
  };

  return {
    items,
    deleteItem,
    addItem,
  };
}
