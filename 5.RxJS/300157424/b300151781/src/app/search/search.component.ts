import { Component, OnInit } from '@angular/core'
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
  message: string

  constructor(private apiService: ApicallService) {}

  ngOnInit(): void {}

  searchCapital() {
    this.message = ''
    this.apiService.searchCountryByName(this.name).subscribe({
      next: (data: Country[]) => {
        console.log(data)
        this.countries = data
      },
      error: (err: string) => {
        console.log(err)
        this.countries = []
        this.message = err
      },
    })
  }
}
