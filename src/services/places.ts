export type FishingPlace = {
  id: string;
  name: string;
  link?: string;
  gpsPosition?: GPSPosition;
  nightFishing?: boolean | string;
  boatAuthorized?: boolean | string;
  surface?: number;
  infos?: string;
};

export type NewFishingPlace = Omit<FishingPlace, "id">;

export type GPSPosition = {
  latitude: number;
  longitude: number;
};

const LOCAL_STORAGE_KEY = "fishing-log-places";

export function fetchAllFishingPlaces(): FishingPlace[] {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]") as FishingPlace[];
}

export function updateFishingPlaces(items: FishingPlace[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
}

export function getOneFishingPlaceById(placeId: string): FishingPlace | undefined {
  const allPlaces = fetchAllFishingPlaces();
  return allPlaces.find((elt) => elt.id === placeId);
}

export function deleteFishingPlace(placeId: string) {
  const allPlaces = fetchAllFishingPlaces();
  const updatedPlaces = allPlaces.filter((elt) => elt.id !== placeId);
  updateFishingPlaces(updatedPlaces);
}
