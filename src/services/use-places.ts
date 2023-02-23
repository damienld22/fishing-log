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
  posts: FishingPost[];
};

export type NewFishingPlace = Omit<FishingPlace, "id">;

export type FishingPost = {
  id: string;
  name: string;
  location: GPSPosition;
  infos: string;
};

export type GPSPosition = [number, number];

export type NewFishingPost = Omit<FishingPost, "id">;

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
    const newPlace: FishingPlace = { ...place, id: uniqid(), posts: [] };
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

  const addPost = (placeId: string, newPost: NewFishingPost) => {
    const updatedPlaces = [...places.value];
    const indexPlace = updatedPlaces.findIndex((elt) => elt.id === placeId);
    const place = updatedPlaces[indexPlace];

    if (place) {
      const post: FishingPost = {
        ...newPost,
        id: uniqid(),
        name: newPost?.name || (place.posts.length + 1).toString(),
      };
      place.posts = [...place.posts, post];
      places.value = updatedPlaces;
      overrideStorage(places.value);
    }
  };

  const deletePost = (placeId: string, postId: string) => {
    const updatedPlaces = [...places.value];
    const indexPlace = updatedPlaces.findIndex((elt) => elt.id === placeId);
    const place = updatedPlaces[indexPlace];

    if (place) {
      place.posts = place.posts.filter((elt) => elt.id !== postId);
      places.value = updatedPlaces;
      overrideStorage(places.value);
    }
  };

  onMounted(() => {
    places.value = fetchFromStorage();
  });

  return {
    places,
    addNewPlace,
    updatePlace,
    deletePlace,
    addPost,
    deletePost,
  };
}
