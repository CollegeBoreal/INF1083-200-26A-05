import { Injectable, signal } from '@angular/core'
import { ApplicationSettings } from '@nativescript/core'

// ⭐ Équipes favorites, sauvegardées sur le téléphone
const CLE = 'footzone-favoris'

@Injectable({
  providedIn: 'root',
})
export class FavorisService {
  readonly ids = signal<number[]>(JSON.parse(ApplicationSettings.getString(CLE, '[]')))

  estFavori(id: number): boolean {
    return this.ids().includes(id)
  }

  basculer(id: number): boolean {
    const ajout = !this.estFavori(id)
    const liste = ajout ? [...this.ids(), id] : this.ids().filter((x) => x !== id)
    this.ids.set(liste)
    ApplicationSettings.setString(CLE, JSON.stringify(liste))
    return ajout
  }
}
