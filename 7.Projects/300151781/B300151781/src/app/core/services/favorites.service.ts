import { Injectable } from '@angular/core'
import { ApplicationSettings } from '@nativescript/core'
import { BehaviorSubject, Observable, map } from 'rxjs'
import { City } from '../models/city'
import { CityService } from './city.service'

const STORAGE_KEY = 'lounivers.favorites'

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly ids$ = new BehaviorSubject<number[]>(this.load())

  readonly favorites$: Observable<City[]> = this.ids$.pipe(
    map((ids) => ids.map((id) => this.cityService.getById(id)).filter((city): city is City => !!city)),
  )

  constructor(private cityService: CityService) {}

  get count(): number {
    return this.ids$.value.length
  }

  isFavorite(id: number): boolean {
    return this.ids$.value.includes(id)
  }

  toggle(id: number): boolean {
    const ids = this.isFavorite(id) ? this.ids$.value.filter((value) => value !== id) : [...this.ids$.value, id]
    this.save(ids)
    return ids.includes(id)
  }

  private load(): number[] {
    try {
      return JSON.parse(ApplicationSettings.getString(STORAGE_KEY, '[]'))
    } catch {
      return []
    }
  }

  private save(ids: number[]): void {
    ApplicationSettings.setString(STORAGE_KEY, JSON.stringify(ids))
    this.ids$.next(ids)
  }
}
