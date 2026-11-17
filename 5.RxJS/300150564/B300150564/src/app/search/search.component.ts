import {
    ChangeDetectorRef,
    Component,
    NO_ERRORS_SCHEMA,
    OnInit
} from '@angular/core';

import {
    NativeScriptCommonModule,
    NativeScriptFormsModule
} from '@nativescript/angular';

import { ApicallService } from '../shared/apicall.service';
import { Country } from '../shared/country';

@Component({
    selector: 'Search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class SearchComponent implements OnInit {

    name: string = '';

    countries: Array<Country> = [];

    constructor(
        private apiService: ApicallService,
        private changeDetector: ChangeDetectorRef
    ) {}

    ngOnInit(): void {}

    searchCapital() {

        this.apiService
            .searchCountryByName(this.name)
            .subscribe({
                next: (data: Country[]) => {

                    console.log(data);

                    this.countries = data;

                    // Actualiser l'interface après la réponse HTTP
                    this.changeDetector.detectChanges();
                },

                error: (error) => {

                    console.log('Erreur :', error);

                    this.countries = [];

                    this.changeDetector.detectChanges();
                }
            });
    }
}