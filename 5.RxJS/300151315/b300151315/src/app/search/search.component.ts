import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { ApicallService } from '../shared/apicall.service'
import { Country } from '../shared/country'

@Component({
  standalone: false,
  selector: 'Search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  name: string

  countries: Array<Country>

  erreur = ''

  constructor(
    private apiService: ApicallService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  searchCapital() {
    this.erreur = ''
    this.apiService.searchCountryByName(this.name).subscribe({
      next: (data: Country[]) => {
        console.log(data)

        this.countries = data
        this.changeDetector.detectChanges()
      },
      error: (message: string) => {
        console.log(message)
        this.countries = []
        this.erreur = message
        this.changeDetector.detectChanges()
      },
    })
  }
}
