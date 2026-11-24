import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, timeout } from 'rxjs/operators';
import { API_BASE_URL } from './api.config';
import { DISHES, RESTAURANTS } from '../data/demo-data';
import { Dish, Restaurant } from '../models/models';

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
