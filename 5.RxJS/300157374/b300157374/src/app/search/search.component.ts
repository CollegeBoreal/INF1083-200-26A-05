import { Component, OnDestroy, inject } from '@angular/core'
import { Subscription } from 'rxjs'
import { Country } from '../shared/country'
import { ApicallService } from '../shared/apicall.service'

@Component({ standalone: false, selector: 'Search', templateUrl: './search.component.html' })
export class SearchComponent implements OnDestroy {
  private api = inject(ApicallService)
  private request?: Subscription
  name = ''
  countries: Country[] = []
  message = ''
  searchCapital() {
    this.request?.unsubscribe()
    this.countries = []
    if (!this.name.trim()) { this.message = 'Entre une capitale.'; return }
    this.message = 'Recherche en cours…'
    this.request = this.api.searchCountryByName(this.name).subscribe({
      next: rows => { this.countries = rows; this.message = rows.length + ' résultat(s)' },
      error: err => { this.message = err.status === 404 ? 'Capitale introuvable.' : 'Service indisponible.' }
    })
  }
  ngOnDestroy() { this.request?.unsubscribe() }
}
