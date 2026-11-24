import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApicallService } from '../shared/apicall.service';
import { Country } from '../shared/country';

@Component({
    selector: 'Search',
    templateUrl: './search.component.html',
    standalone: false
})
export class SearchComponent implements OnInit {

    name = '';
    countries: Country[] = [];
    message = '';

    constructor(private apiService: ApicallService, private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {}

    searchCapital() {
        if (!this.name.trim()) {
            this.message = 'Enter a capital.';
            return;
        }

        this.message = 'Searching...';
        this.countries = [];

        this.apiService
            .searchCountryByName(this.name)
            .subscribe({
                next: (data: Country[]) => {
                    console.log(JSON.stringify(data));
                    this.countries = data;
                    this.message = data.length + ' result(s)'; this.cdr.detectChanges();
                },
                error: error => {
                    this.message = String(error);
                    console.log(error); this.cdr.detectChanges();
                }
            });
    }
}

