import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Country } from './country';

@Injectable({
    providedIn: 'root'
})
export class ApicallService {

    constructor(private httpClient: HttpClient) {}

    searchCountryByName(name: string): Observable<Country[]> {
        return this.httpClient
            .get<any[]>(
                'https://countries.nexperts.nl/capital/' +
                encodeURIComponent(name.trim())
            )
            .pipe(
                map(data => data.map((c, i) => ({
                    id: i,
                    name: c.name.common,
                    capital: c.capital ? c.capital[0] : ''
                } as Country))),
                catchError(() => {
                    return throwError(() => 'Capital not found!');
                })
            );
    }
}
