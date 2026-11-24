import { Injectable, signal } from '@angular/core'
import { ApplicationSettings } from '@nativescript/core'

// ⭐ Favoris sauvegardés sur le téléphone (restent après la fermeture de l'application)
const CLE = 'torontogo-favoris'

@Injectable({
  providedIn: 'root',
})
export class FavorisService {
  readonly ids = signal<number[]>(JSON.parse(ApplicationSettings.getString(CLE, '[]')))

  estFavori(id: number): boolean {
    return this.ids().includes(id)
  }

  basculer(id: number): void {
    const liste = this.estFavori(id) ? this.ids().filter((x) => x !== id) : [...this.ids(), id]
    this.ids.set(liste)
    ApplicationSettings.setString(CLE, JSON.stringify(liste))
  }
}
