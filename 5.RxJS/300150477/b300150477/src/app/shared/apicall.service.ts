import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Country } from './country';

interface CountryResponse {
    name: { common: string };
    capital?: string[];
    flag?: string;
}

@Injectable({ providedIn: 'root' })
export class ApicallService {
    constructor(private httpClient: HttpClient) {}

    searchCountryByName(capital: string): Observable<Country[]> {
        const url = `https://countries.nexperts.nl/capital/${encodeURIComponent(capital.trim())}`;

        return this.httpClient.get<CountryResponse[]>(url).pipe(
            map(countries => countries.map((country, index) => ({
                id: index + 1,
                name: country.name.common,
                capital: country.capital?.[0] ?? '',
                flag: country.flag
            }))),
            catchError(() => throwError(
                () => new Error('Impossible de récupérer le résultat.')
            ))
        );
    }
}