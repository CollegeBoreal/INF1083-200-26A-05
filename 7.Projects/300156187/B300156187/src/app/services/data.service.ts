import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { concat, EMPTY, Observable, of } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { API_BASE_URL } from './api.config';
import { DISHES, RESTAURANTS } from '../data/demo-data';
import { Dish, Restaurant } from '../models/models';

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private http: HttpClient) {}

  // Données démo TOUT DE SUITE, puis les vraies données si l'API répond.
  // Avant, l'appli attendait le timeout de 3 s avant d'afficher les
  // données démo : l'accueil restait vide (squelettes) après la connexion.
  getRestaurants(): Observable<Restaurant[]> {
    const live$ = this.http.get<Restaurant[]>(`${API_BASE_URL}/branches`).pipe(
      timeout(3000),
      catchError(() => EMPTY)
    );
    return concat(of(RESTAURANTS), live$);
  }

  getDishes(): Observable<Dish[]> {
    const live$ = this.http.get<Dish[]>(`${API_BASE_URL}/dishes`).pipe(
      timeout(3000),
      catchError(() => EMPTY)
    );
    return concat(of(DISHES), live$);
  }

  getDishById(id: number): Observable<Dish | undefined> {
    const live$ = this.http.get<Dish>(`${API_BASE_URL}/dishes/${id}`).pipe(
      timeout(3000),
      catchError(() => EMPTY)
    );
    return concat(of(DISHES.find((dish) => dish.id === id)), live$);
  }
}