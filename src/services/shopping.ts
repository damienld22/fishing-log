// TYPES
export type ShoppingListItem = {
  id: string;
  label: string;
};

const LOCAL_STORAGE_KEY = "fishing-log-shopping";

export type NewShoppingListItem = Omit<ShoppingListItem, "id">;

export function fetchAllShoppingItems(): ShoppingListItem[] {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]") as ShoppingListItem[];
}

export function updateShoppingItems(items: ShoppingListItem[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
}
