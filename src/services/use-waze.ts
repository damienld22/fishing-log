import type { GPSPosition } from "./use-places";

const URL_WAZE = "https://www.waze.com/ul?ll={longitude}%2C{latitude}&navigate=yes&zoom=17";

export function useWaze() {
  const goTo = (position: GPSPosition) => {
    window.open(
      URL_WAZE.replace("{latitude}", position[0].toString()).replace("{longitude}", position[1].toString()),
      "_blank"
    );
  };

  return {
    goTo,
  };
}
