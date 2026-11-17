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

  constructor(
    private apiService: ApicallService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  searchCapital() {
    this.apiService.searchCountryByName(this.name).subscribe((data: Country[]) => {
      console.log(data)

      this.countries = data
      this.changeDetector.detectChanges()
    })
  }
}