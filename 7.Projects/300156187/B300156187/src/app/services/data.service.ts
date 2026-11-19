import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, delay, timeout } from 'rxjs/operators';
import { Dish, Restaurant } from '../models/models';
import { DISHES, RESTAURANTS } from '../data/demo-data';
import { API_BASE_URL } from './api.config';

/**
 * Lit les données depuis l'API REST (SQL Server) quand elle est disponible.
 * Si l'API est hors ligne, retombe automatiquement sur les données de
 * démonstration (demo-data.ts) avec le même délai de chargement simulé.
 */
@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private http: HttpClient) {}

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${API_BASE_URL}/branches`).pipe(
      timeout(3000),
      catchError(() => of(RESTAURANTS).pipe(delay(1100)))
    );
  }

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(`${API_BASE_URL}/dishes`).pipe(
      timeout(3000),
      catchError(() => of(DISHES).pipe(delay(1300)))
    );
  }

  getDishById(id: number): Observable<Dish | undefined> {
    return this.http.get<Dish>(`${API_BASE_URL}/dishes/${id}`).pipe(
      timeout(3000),
      catchError(() => of(DISHES.find((dish) => dish.id === id)).pipe(delay(500)))
    );
  }
}
