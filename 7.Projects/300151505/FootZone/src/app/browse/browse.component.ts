import { Component, computed, signal } from '@angular/core'

import { FootService } from '../shared/foot.service'

// 🏟️ Onglet 2 : matchs mémorables, filtre "Algérie"
@Component({
  standalone: false,
  selector: 'Browse',
  templateUrl: './browse.component.html',
})
export class BrowseComponent {
  seulementAlgerie = signal(false)

  matchs = computed(() =>
    this.foot
      .getMatchs()
      .filter((m) => !this.seulementAlgerie() || (m.domicile + m.exterieur).includes('Algérie'))
  )

  constructor(private foot: FootService) {}

  basculer() {
    this.seulementAlgerie.update((v) => !v)
  }
}
