import { Component, OnInit, signal } from '@angular/core'
import { ApicallService } from '../shared/apicall.service'
import { Country } from '../shared/country'

// 🆎 Composant Search
@Component({
  standalone: false,
  selector: 'Search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {

  // Lié au TextField avec [(ngModel)]
  name = ''

  // signal() : met l'écran à jour quand les données arrivent (Angular 22)
  countries = signal<Array<Country>>([])
  message = signal('')

  constructor(private apiService: ApicallService) {}

  ngOnInit(): void {}

  searchCapital() {
    if (!this.name.trim()) {
      this.message.set('Entrez une capitale 🙂')
      return
    }
    this.message.set('Recherche…')

    // subscribe : on s'abonne à l'Observable<Country[]>
    this.apiService.searchCountryByName(this.name).subscribe({
      next: (data: Country[]) => {
        console.log(data)
        this.countries.set(data)
        this.message.set(data.length + ' résultat(s) pour « ' + this.name + ' »')
      },
      error: (erreur: string) => {
        console.log(erreur)
        this.countries.set([])
        this.message.set(erreur)
      },
    })
  }
}
