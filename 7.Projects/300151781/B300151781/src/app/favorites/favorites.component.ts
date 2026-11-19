import { Component } from '@angular/core'
import { FavoritesService } from '../core/services/favorites.service'
import { slideIn } from '../shared/animations'

@Component({
  standalone: false,
  selector: 'ns-favorites',
  templateUrl: './favorites.component.html',
})
export class FavoritesComponent {
  readonly favorites$ = this.favoritesService.favorites$

  constructor(private favoritesService: FavoritesService) {}

  // Animation d'apparition des cartes
  appear(args: any): void {
    slideIn(args.object)
  }
}
