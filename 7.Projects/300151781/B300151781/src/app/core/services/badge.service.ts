import { Injectable } from '@angular/core'
import { ApplicationSettings } from '@nativescript/core'
import { BudgetService } from './budget.service'
import { CityService } from './city.service'
import { FavoritesService } from './favorites.service'
import { NotesService } from './notes.service'
import { TripService } from './trip.service'

const VISITED_KEY = 'lounivers.visited'

export interface Badge {
  icon: string
  title: string
  text: string
  unlocked: boolean
}

const LEVELS = ['🎒 Touriste', '🧭 Explorateur', '🗺️ Aventurier', '🌍 Globe-trotteur', '👑 Légende']

@Injectable({ providedIn: 'root' })
export class BadgeService {
  private visited: number[] = this.load()
  private cacheKey = ''
  private cache: Badge[] = []

  constructor(
    private cityService: CityService,
    private favoritesService: FavoritesService,
    private tripService: TripService,
    private budgetService: BudgetService,
    private notesService: NotesService,
  ) {}

  isVisited(cityId: number): boolean {
    return this.visited.includes(cityId)
  }

  // Appelé à chaque ouverture d'une fiche ville
  visit(cityId: number): void {
    if (!this.visited.includes(cityId)) {
      this.visited = [...this.visited, cityId]
      ApplicationSettings.setString(VISITED_KEY, JSON.stringify(this.visited))
    }
  }

  // La liste n'est recalculée que si l'état change (évite les erreurs Angular en mode dev)
  get badges(): Badge[] {
    const regions = new Set(this.visited.map((id) => this.cityService.getById(id)?.region))
    const items = this.tripService.items$.value
    const budget = this.budgetService.budget$.value
    const state = {
      visited: this.visited.length,
      regions: regions.size,
      favorites: this.favoritesService.count,
      quiz: ApplicationSettings.getNumber('lounivers.quiz.best', 0),
      packed: items.length > 0 && items.every((item) => item.done),
      budget: budget.expenses.length > 0 && this.budgetService.remaining(budget) >= 0,
      notes: this.notesService.count,
      departure: !!this.tripService.departure,
    }
    const key = JSON.stringify(state)
    if (key !== this.cacheKey) {
      this.cacheKey = key
      this.cache = [
        { icon: '👣', title: 'Premier pas', text: 'Ouvrir une fiche ville', unlocked: state.visited >= 1 },
        { icon: '🔎', title: 'Curieux', text: 'Consulter 10 villes', unlocked: state.visited >= 10 },
        { icon: '🏙️', title: 'Grand explorateur', text: 'Consulter 30 villes', unlocked: state.visited >= 30 },
        { icon: '🌍', title: 'Tour du monde', text: 'Une ville sur chaque continent', unlocked: state.regions >= 5 },
        { icon: '♥', title: 'Coup de cœur', text: 'Ajouter un favori', unlocked: state.favorites >= 1 },
        { icon: '💎', title: 'Collectionneur', text: '5 villes en favoris', unlocked: state.favorites >= 5 },
        { icon: '🎯', title: 'Quiz parfait', text: 'Obtenir 5 / 5 au quiz', unlocked: state.quiz >= 5 },
        { icon: '🧳', title: 'Valise prête', text: 'Tout cocher dans Mon voyage', unlocked: state.packed },
        { icon: '💰', title: 'Bon gestionnaire', text: 'Dépenses sous le budget', unlocked: state.budget },
        { icon: '📝', title: 'Écrivain', text: '3 notes dans le carnet', unlocked: state.notes >= 3 },
        { icon: '✈️', title: 'Départ prévu', text: 'Choisir une date de départ', unlocked: state.departure },
        { icon: '🏆', title: 'Encyclopédie', text: 'Consulter les 50 villes', unlocked: state.visited >= 50 },
      ]
    }
    return this.cache
  }

  get unlocked(): number {
    return this.badges.filter((badge) => badge.unlocked).length
  }

  get level(): string {
    return LEVELS[Math.min(LEVELS.length - 1, Math.floor(this.unlocked / 3))]
  }

  private load(): number[] {
    try {
      return JSON.parse(ApplicationSettings.getString(VISITED_KEY, '[]'))
    } catch {
      return []
    }
  }
}
