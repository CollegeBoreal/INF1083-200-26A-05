import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, catchError, of } from 'rxjs';

export interface Holiday {
  date: string; // AAAA-MM-JJ
  name: string;
}

interface NagerHoliday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  global: boolean;
}

@Injectable({ providedIn: 'root' })
export class HolidayService {
  // Nager.Date : jours fériés gratuits, sans clé. On prend l'année en cours
  // et la suivante pour être sûr d'avoir des jours à venir à afficher.
  private readonly baseUrl = 'https://date.nager.at/api/v3/PublicHolidays';

  constructor(private http: HttpClient) {}

  // Retourne les 3 prochains jours fériés du Canada (à partir d'aujourd'hui).
  // En cas d'erreur réseau, émet une liste vide.
  getUpcomingHolidays(count = 3): Observable<Holiday[]> {
    const now = new Date();
    const thisYear = now.getFullYear();
    const today = now.toISOString().slice(0, 10);
    return forkJoin([
      this.http.get<NagerHoliday[]>(`${this.baseUrl}/${thisYear}/CA`),
      this.http.get<NagerHoliday[]>(`${this.baseUrl}/${thisYear + 1}/CA`),
    ]).pipe(
      map(([h1, h2]) =>
        [...h1, ...h2]
          .filter((h) => h.global && h.date >= today)
          .sort((a, b) => a.date.localeCompare(b.date))
          .slice(0, count)
          .map((h) => ({ date: h.date, name: h.localName }))
      ),
      catchError(() => of([]))
    );
  }
}
