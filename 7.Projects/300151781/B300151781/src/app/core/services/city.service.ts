import { Injectable } from '@angular/core'
import { CITIES } from '../data/cities'
import { City } from '../models/city'

export type SortMode = 'default' | 'az' | 'timezone'

@Injectable({ providedIn: 'root' })
export class CityService {
  getAll(): City[] {
    return CITIES
  }

  getById(id: number): City | undefined {
    return CITIES.find((city) => city.id === id)
  }

  get regions(): string[] {
    return ['Toutes', ...Array.from(new Set(CITIES.map((city) => city.region))).sort()]
  }

  // Destination du jour : change chaque jour, identique pour toute la journée
  get cityOfTheDay(): City {
    const day = Math.floor(Date.now() / 86400000)
    return CITIES[day % CITIES.length]
  }

  random(exceptId?: number): City {
    const pool = CITIES.filter((city) => city.id !== exceptId)
    return pool[Math.floor(Math.random() * pool.length)]
  }

  search(term: string, region = 'Toutes', sort: SortMode = 'default'): City[] {
    const query = this.normalize(term)
    const result = CITIES.filter(
      (city) =>
        (region === 'Toutes' || city.region === region) &&
        (!query || [city.name, city.country, city.region].some((value) => this.normalize(value).includes(query))),
    )
    if (sort === 'az') {
      return [...result].sort((a, b) => a.name.localeCompare(b.name, 'fr'))
    }
    if (sort === 'timezone') {
      return [...result].sort((a, b) => a.tzOffset - b.tzOffset || a.name.localeCompare(b.name, 'fr'))
    }
    return result
  }

  // Ignore les majuscules et les accents : « montreal » trouve « Montréal »
  private normalize(value: string): string {
    return (value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
  }
}
