import { Injectable, signal } from '@angular/core'
import { ApplicationSettings } from '@nativescript/core'

export interface Recette { id: string; nom: string; ingredients: string[]; etapes: string[] }
const catalogue: Recette[] = [
  { id: 'kesra', nom: 'Galette de semoule', ingredients: ['Semoule fine', 'Huile', 'Sel', 'Eau'], etapes: ['Mélanger la semoule, le sel et un filet d’huile.', 'Ajouter progressivement de l’eau pour former une pâte.', 'Aplatir et cuire à la poêle des deux côtés.'] },
  { id: 'salade', nom: 'Salade de pois chiches', ingredients: ['Pois chiches cuits', 'Tomate', 'Persil', 'Citron'], etapes: ['Couper la tomate et hacher le persil.', 'Mélanger avec les pois chiches et arroser de jus de citron.'] }
]

@Injectable({ providedIn: 'root' })
export class Carnet {
  private lire<T>(cle: string, defaut: T): T {
    try { return JSON.parse(ApplicationSettings.getString(cle, JSON.stringify(defaut))) }
    catch { return defaut }
  }
  readonly recettes = signal(this.lire<Recette[]>('toque.recettes', catalogue))
  readonly favoris = signal(this.lire<string[]>('toque.favoris', []))
  basculer(id: string) {
    const ids = this.favoris()
    const suivants = ids.includes(id) ? ids.filter(x => x !== id) : [...ids, id]
    ApplicationSettings.setString('toque.favoris', JSON.stringify(suivants))
    this.favoris.set(suivants)
  }
  ajouter(nom: string, ingredients: string[], etapes: string[]) {
    const recettes = [...this.recettes(), { id: String(Date.now()), nom, ingredients, etapes }]
    ApplicationSettings.setString('toque.recettes', JSON.stringify(recettes))
    this.recettes.set(recettes)
  }
}
