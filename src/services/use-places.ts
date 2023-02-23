import { ref, onMounted } from "vue";
import uniqid from "uniqid";

export type FishingPlace = {
  id: string;
  name: string;
  link?: string;
  nightFishing?: boolean | string;
  boatAuthorized?: boolean | string;
  surface?: number;
  infos?: string;
};

export type NewFishingPlace = Omit<FishingPlace, "id">;

const LOCAL_STORAGE_KEY = "fishing-log-places";

function fetchFromStorage(): FishingPlace[] {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]") as FishingPlace[];
}

function overrideStorage(items: FishingPlace[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
}

export function usePlaces() {
  const places = ref<FishingPlace[]>([]);

  const addNewPlace = (place: NewFishingPlace) => {
    const newPlace: FishingPlace = { ...place, id: uniqid() };
    places.value = [...places.value, newPlace];
    overrideStorage(places.value);
  };

  const updatePlace = (id: string, place: FishingPlace) => {
    places.value = places.value.map((elt) => (elt.id === id ? place : elt));
    overrideStorage(places.value);
  };

  const deletePlace = (id: string) => {
    places.value = places.value.filter((elt) => elt.id !== id);
    overrideStorage(places.value);
  };

  onMounted(() => {
    places.value = fetchFromStorage();
  });

  return {
    places,
    addNewPlace,
    updatePlace,
    deletePlace,
  };
}
