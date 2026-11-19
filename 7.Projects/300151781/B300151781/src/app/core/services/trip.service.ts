import { Injectable } from '@angular/core'
import { ApplicationSettings } from '@nativescript/core'
import { BehaviorSubject } from 'rxjs'
import { TripItem } from '../models/city'

const STORAGE_KEY = 'lounivers.trip'
const DATE_KEY = 'lounivers.trip.date'

const DEFAULT_ITEMS: TripItem[] = [
  { id: 1, label: 'Passeport valide', category: 'valise', done: false },
  { id: 2, label: 'Billets d\'avion', category: 'valise', done: false },
  { id: 3, label: 'Adaptateur de prise', category: 'valise', done: false },
]

@Injectable({ providedIn: 'root' })
export class TripService {
  readonly items$ = new BehaviorSubject<TripItem[]>(this.load())
  departure: Date | null = this.loadDate()

  // Nombre de jours avant le départ (null si aucune date choisie)
  get daysLeft(): number | null {
    if (!this.departure) return null
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const start = new Date(this.departure)
    start.setHours(0, 0, 0, 0)
    return Math.round((start.getTime() - today.getTime()) / 86400000)
  }

  setDeparture(date: Date): void {
    this.departure = date
    ApplicationSettings.setString(DATE_KEY, date.toISOString())
  }

  private loadDate(): Date | null {
    const saved = ApplicationSettings.getString(DATE_KEY)
    return saved ? new Date(saved) : null
  }

  get progress(): number {
    const items = this.items$.value
    return items.length ? Math.round((items.filter((item) => item.done).length / items.length) * 100) : 0
  }

  hasCity(name: string): boolean {
    return this.items$.value.some((item) => item.category === 'ville' && item.label === name)
  }

  addCity(name: string): void {
    if (!this.hasCity(name)) {
      this.add(name, 'ville')
    }
  }

  add(label: string, category: TripItem['category']): void {
    const text = (label || '').trim()
    if (!text) {
      return
    }
    const nextId = Math.max(0, ...this.items$.value.map((item) => item.id)) + 1
    this.save([...this.items$.value, { id: nextId, label: text, category, done: false }])
  }

  toggle(id: number): void {
    this.save(this.items$.value.map((item) => (item.id === id ? { ...item, done: !item.done } : item)))
  }

  remove(id: number): void {
    this.save(this.items$.value.filter((item) => item.id !== id))
  }

  private load(): TripItem[] {
    try {
      const saved = ApplicationSettings.getString(STORAGE_KEY)
      return saved ? JSON.parse(saved) : DEFAULT_ITEMS
    } catch {
      return DEFAULT_ITEMS
    }
  }

  private save(items: TripItem[]): void {
    ApplicationSettings.setString(STORAGE_KEY, JSON.stringify(items))
    this.items$.next(items)
  }
}
