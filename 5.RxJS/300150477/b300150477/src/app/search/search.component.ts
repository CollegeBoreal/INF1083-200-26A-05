import { ChangeDetectorRef, Component } from '@angular/core';
import { ApicallService } from '../shared/apicall.service';
import { Country } from '../shared/country';

@Component({
    selector: 'Search',
    templateUrl: './search.component.html',
    standalone: false
})
export class SearchComponent {
    name = '';
    countries: Country[] = [];
    message = '';
    loading = false;

    constructor(
        private apiService: ApicallService,
        private changeDetector: ChangeDetectorRef
    ) {}

    searchCapital(): void {
        if (this.loading) {
            return;
        }

        const capital = this.name.trim();
        this.countries = [];

        if (!capital) {
            this.message = '✍️ Saisis le nom d’une capitale.';
            return;
        }

        this.loading = true;
        this.message = '⏳ Recherche en cours…';

        this.apiService.searchCountryByName(capital).subscribe({
            next: (countries) => {
                console.log('Résultats RxJS', countries);
                this.countries = countries;
                this.message = countries.length ? '' : '🔎 Aucun pays trouvé.';
                this.loading = false;
                this.changeDetector.detectChanges();
            },
            error: () => {
                this.message = '⚠️ Recherche impossible. Vérifie la capitale et réessaie.';
                this.loading = false;
                this.changeDetector.detectChanges();
            }
        });
    }
}