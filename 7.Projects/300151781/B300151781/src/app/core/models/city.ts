export interface City {
  id: number
  name: string
  country: string
  flag: string
  region: string
  tagline: string
  description: string
  highlights: string[]
  bestSeason: string
  currency: string
  language: string
  timezone: string
  tzOffset: number
  color: string
  lang: string // code de langue pour les phrases utiles
  wiki?: string // titre Wikipédia s'il diffère du nom
}

export interface TripItem {
  id: number
  label: string
  category: 'ville' | 'valise'
  done: boolean
}
