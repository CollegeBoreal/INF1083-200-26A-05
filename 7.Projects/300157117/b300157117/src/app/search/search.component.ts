import { Component, computed } from '@angular/core'

import { DataService } from '../shared/data.service'
import { FavorisService } from '../shared/favoris.service'

// ⭐ Onglet 3 : mes lieux favoris (sauvegardés avec ApplicationSettings)
@Component({
  standalone: false,
  selector: 'Search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  mesFavoris = computed(() =>
    this.data.getLieux().filter((l) => this.favoris.ids().includes(l.id))
  )

  constructor(
    private data: DataService,
    public favoris: FavorisService
  ) {}

  retirer(id: number) {
    this.favoris.basculer(id)
  }
}
