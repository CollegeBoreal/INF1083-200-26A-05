import { Component, computed, signal } from '@angular/core'

import { FootService } from '../shared/foot.service'
import { FavorisService } from '../shared/favoris.service'

// ⚽ Onglet 1 : équipes, recherche et filtre Sélections / Clubs
@Component({
  standalone: false,
  selector: 'Home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  filtres = ['Toutes', 'Sélection', 'Club']
  filtre = signal('Toutes')
  recherche = signal('')

  equipes = computed(() =>
    this.foot
      .getEquipes()
      .filter((e) => this.filtre() === 'Toutes' || e.type === this.filtre())
      .filter((e) => e.nom.toLowerCase().includes(this.recherche().toLowerCase()))
  )

  constructor(
    private foot: FootService,
    public favoris: FavorisService
  ) {}

  choisir(filtre: string) {
    this.filtre.set(filtre)
  }

  // textChange de la SearchBar : le texte tapé est dans "value"
  rechercher(evenement: unknown) {
    this.recherche.set((evenement as { value?: string }).value ?? '')
  }
}
