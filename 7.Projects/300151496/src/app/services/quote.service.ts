import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';

export interface Quote {
  text: string;
  author: string;
}

interface DummyJsonQuote {
  id: number;
  quote: string;
  author: string;
}

@Injectable({ providedIn: 'root' })
export class QuoteService {
  // DummyJSON : citations gratuites, sans clé. Une citation aléatoire à chaque appel.
  private readonly url = 'https://dummyjson.com/quotes/random';

  constructor(private http: HttpClient) {}

  // Retourne une citation motivante (Observable). En cas d'erreur réseau,
  // émet null pour que le tableau de bord garde son message par défaut.
  getQuote(): Observable<Quote | null> {
    return this.http.get<DummyJsonQuote>(this.url).pipe(
      map((res) => ({ text: res.quote, author: res.author })),
      catchError(() => of(null))
    );
  }
}
