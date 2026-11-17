import { Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import {
    NativeScriptCommonModule,
    NativeScriptFormsModule
} from '@nativescript/angular';
import { ApicallService } from '../shared/apicall.service';
import { Country } from '../shared/country';

@Component({
    selector: 'Search',
    standalone: true,
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule
    ],
    schemas: [NO_ERRORS_SCHEMA],
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

    name: string = '';

    countries: Array<Country> = [];

    constructor(
        private apiService: ApicallService
    ) {}

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
