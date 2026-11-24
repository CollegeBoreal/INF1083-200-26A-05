import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Country } from './country';

// 🅲️ Service d'accès aux données (RxJS + HttpClient)
@Injectable({
  providedIn: 'root',
})
export class ApicallService {

  constructor(private httpClient: HttpClient) {}

  searchCountryByName(name: string): Observable<Country[]> {
    const capitale = encodeURIComponent(name.trim());

    return this.httpClient
      .get<any[]>('https://countries.nexperts.nl/capital/' + capitale)
      .pipe(
        // Si la 1re API ne répond pas, on essaie l'API publique restcountries.com (même format)
        catchError(() =>
          this.httpClient.get<any[]>('https://restcountries.com/v3.1/capital/' + capitale)
        ),
        // map : transformer la réponse de l'API en tableau de Country
        map((data: any[]) =>
          data.map(
            (c, i) =>
              ({
                id: i,
                name: c.name.common,
                capital: c.capital ? c.capital[0] : '',
              }) as Country
          )
        ),
        // catchError : renvoyer un message clair si la capitale n'existe pas
        catchError(() => throwError(() => 'Capital not found!'))
      );
  }
}
