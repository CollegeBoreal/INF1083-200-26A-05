// Coordonnées GPS (latitude, longitude) de chaque ville, par identifiant
export const COORDS: { [cityId: number]: [number, number] } = {
  1: [45.5, -73.57], 2: [36.75, 3.06], 3: [48.86, 2.35], 4: [35.68, 139.69], 5: [40.71, -74.01],
  6: [31.63, -8.01], 7: [41.01, 28.98], 8: [25.2, 55.27], 9: [-22.91, -43.17], 10: [37.57, 126.98],
  11: [30.04, 31.24], 12: [41.39, 2.17], 13: [41.9, 12.5], 14: [51.51, -0.13], 15: [40.42, -3.7],
  16: [38.72, -9.14], 17: [52.52, 13.4], 18: [52.37, 4.9], 19: [50.08, 14.44], 20: [48.21, 16.37],
  21: [37.98, 23.73], 22: [45.44, 12.32], 23: [59.33, 18.07], 24: [53.35, -6.26], 25: [36.81, 10.18],
  26: [35.7, -0.63], 27: [36.37, 6.61], 28: [33.57, -7.59], 29: [14.72, -17.47], 30: [-33.92, 18.42],
  31: [-1.29, 36.82], 32: [5.36, -4.01], 33: [46.81, -71.21], 34: [43.65, -79.38], 35: [49.28, -123.12],
  36: [19.43, -99.13], 37: [-34.6, -58.38], 38: [-12.05, -77.04], 39: [23.11, -82.37], 40: [37.77, -122.42],
  41: [35.01, 135.77], 42: [39.9, 116.41], 43: [13.76, 100.5], 44: [1.35, 103.82], 45: [21.03, 105.85],
  46: [19.08, 72.88], 47: [25.29, 51.53], 48: [33.89, 35.5], 49: [-33.87, 151.21], 50: [-36.85, 174.76],
}

// Collège Boréal (Sudbury, Ontario) : point de départ pour les distances
export const HOME: [number, number] = [46.49, -80.99]

// Limites de l'image world_dots.png (projection équirectangulaire, sans l'Antarctique)
export const MAP_LAT_TOP = 84
export const MAP_LAT_BOTTOM = -58
export const MAP_RATIO = (MAP_LAT_TOP - MAP_LAT_BOTTOM) / 360

// Latitude / longitude → position en pixels sur une carte de largeur `width`
export function project(lat: number, lon: number, width: number): { x: number; y: number } {
  const height = width * MAP_RATIO
  return {
    x: ((lon + 180) / 360) * width,
    y: ((MAP_LAT_TOP - lat) / (MAP_LAT_TOP - MAP_LAT_BOTTOM)) * height,
  }
}

// Distance à vol d'oiseau en kilomètres (formule de haversine)
export function distanceKm(a: [number, number], b: [number, number]): number {
  const rad = (deg: number) => (deg * Math.PI) / 180
  const dLat = rad(b[0] - a[0])
  const dLon = rad(b[1] - a[1])
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a[0])) * Math.cos(rad(b[0])) * Math.sin(dLon / 2) ** 2
  return Math.round(6371 * 2 * Math.asin(Math.sqrt(h)))
}
