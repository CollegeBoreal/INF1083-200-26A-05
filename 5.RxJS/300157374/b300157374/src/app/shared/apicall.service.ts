import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Observable, map } from 'rxjs'
import { Country } from './country'

interface ApiCountry { name: { common: string }; capital?: string[] }

@Injectable({ providedIn: 'root' })
export class ApicallService {
  private http = inject(HttpClient)
  searchCountryByName(capital: string): Observable<Country[]> {
    const url = 'https://countries.nexperts.nl/capital/' + encodeURIComponent(capital.trim())
    return this.http.get<ApiCountry[]>(url).pipe(
      map(rows => rows.map((row, id) => ({
        id, name: row.name.common, capital: (row.capital ?? []).join(', ')
      })))
    )
  }
}
