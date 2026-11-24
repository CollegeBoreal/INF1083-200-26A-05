import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { RouterExtensions } from '@nativescript/angular'
import { SearchBar } from '@nativescript/core'
import { City } from '../core/models/city'
import { CityService, SortMode } from '../core/services/city.service'
import { FavoritesService } from '../core/services/favorites.service'
import { pulse, slideIn } from '../shared/animations'

@Component({
  standalone: false,
  selector: 'ns-explore',
  templateUrl: './explore.component.html',
})
export class ExploreComponent {
  readonly regions = this.cityService.regions
  readonly cityOfTheDay = this.cityService.cityOfTheDay
  readonly favorites$ = this.favoritesService.favorites$
  readonly totalCities = this.cityService.getAll().length
  readonly sorts: { mode: SortMode; label: string }[] = [
    { mode: 'default', label: '⭐ Populaires' },
    { mode: 'az', label: '🔤 A → Z' },
    { mode: 'timezone', label: '🕒 Fuseau' },
  ]

  cities: City[] = this.cityService.getAll()
  region = 'Toutes'
  sortIndex = 0
  private term = ''

  constructor(
    private cityService: CityService,
    private favoritesService: FavoritesService,
    private routerExtensions: RouterExtensions,
    private route: ActivatedRoute,
  ) {}

  get greeting(): string {
    const hour = new Date().getHours()
    return hour < 12 ? 'Bonjour' : hour < 18 ? 'Bon après-midi' : 'Bonsoir'
  }

  // Le type DOM d'Angular ne connaît pas SearchBar : on convertit l'argument
  onSearch(args: any): void {
    this.term = (args.object as SearchBar).text
    this.refresh()
  }

  onClear(): void {
    this.term = ''
    this.refresh()
  }

  // Animation d'apparition des cartes
  appear(args: any): void {
    slideIn(args.object)
  }

  selectRegion(region: string): void {
    this.region = region
    this.refresh()
  }

  // Change l'ordre : populaires → A à Z → fuseau horaire
  cycleSort(args: any): void {
    this.sortIndex = (this.sortIndex + 1) % this.sorts.length
    pulse(args.object)
    this.refresh()
  }

  // Bouton « Au hasard » : ouvre une destination surprise
  surprise(args: any): void {
    pulse(args.object)
    const city = this.cityService.random()
    setTimeout(() => this.routerExtensions.navigate(['../city', city.id], { relativeTo: this.route }), 250)
  }

  private refresh(): void {
    this.cities = this.cityService.search(this.term, this.region, this.sorts[this.sortIndex].mode)
  }
}
