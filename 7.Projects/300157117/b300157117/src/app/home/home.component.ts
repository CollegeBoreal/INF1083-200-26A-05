import { Component, computed, signal } from '@angular/core'

import { DataService } from '../shared/data.service'
import { FavorisService } from '../shared/favoris.service'

// 📍 Onglet 1 : liste des lieux, recherche et filtre par catégorie
@Component({
  standalone: false,
  selector: 'Home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  categories = ['Tous', 'Attractions', 'Culture', 'Nature', 'Bouffe']
  categorie = signal('Tous')
  recherche = signal('')

  lieux = computed(() =>
    this.data
      .getLieux()
      .filter((l) => this.categorie() === 'Tous' || l.categorie === this.categorie())
      .filter((l) => l.nom.toLowerCase().includes(this.recherche().toLowerCase()))
  )

  constructor(
    private data: DataService,
    public favoris: FavorisService
  ) {}

  choisir(categorie: string) {
    this.categorie.set(categorie)
  }

  // L'évènement textChange de la SearchBar contient le texte tapé dans "value"
  rechercher(evenement: unknown) {
    const texte = (evenement as { value?: string }).value ?? ''
    this.recherche.set(texte)
  }
}
