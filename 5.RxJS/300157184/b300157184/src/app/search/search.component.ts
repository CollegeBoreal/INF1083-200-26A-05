import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../shared/apicall.service';
import { Country } from '../shared/country';

@Component({
    selector: 'Search',
    templateUrl: './search.component.html',
    standalone: false
})
export class SearchComponent implements OnInit {

    name: string = '';
    countries: Array<Country> = [];

    constructor(private apiService: ApicallService) {}

    ngOnInit(): void {}

    searchCapital() {
        this.apiService
            .searchCountryByName(this.name)
            .subscribe((data: Country[]) => {
                console.log(data);
                this.countries = data;
            });
    }
}