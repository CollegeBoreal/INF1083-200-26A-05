import { Component, computed } from '@angular/core'

import { FootService } from '../shared/foot.service'
import { FavorisService } from '../shared/favoris.service'

// ⭐ Onglet 3 : mes équipes favorites (ApplicationSettings)
@Component({
  standalone: false,
  selector: 'Search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  mesFavoris = computed(() =>
    this.foot.getEquipes().filter((e) => this.favoris.ids().includes(e.id))
  )

  constructor(
    private foot: FootService,
    public favoris: FavorisService
  ) {}

  retirer(id: number) {
    this.favoris.basculer(id)
  }
}
