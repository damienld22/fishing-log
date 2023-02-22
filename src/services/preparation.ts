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

export function fetchAllPreparationCategories(): PreparationCategory[] {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]") as PreparationCategory[];
}

export function updatePreparationCategories(items: PreparationCategory[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
}
