import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, delay, map, timeout } from 'rxjs/operators';
import { User } from '../models/models';
import { API_BASE_URL } from './api.config';

interface LoginApiResponse {
  success: boolean;
  message?: string;
  user?: { id: number; name: string; email: string; phone: string };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly DEMO_EMAIL = 'demo@restaurant.com';
  private readonly DEMO_PASSWORD = 'demo1234';

  private loggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedInSubject.asObservable();

  currentUser: User | null = null;

  constructor(private http: HttpClient) {}

  get isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }

  /**
   * Tente d'abord la connexion via l'API (vérification bcrypt côté serveur).
   * Si l'API est hors ligne, retombe sur la vérification locale du compte démo.
   */
  login(email: string, password: string): Observable<{ success: boolean; message: string }> {
    return this.http
      .post<LoginApiResponse>(`${API_BASE_URL}/login`, { email, password })
      .pipe(
        timeout(3000),
        map((res) => {
          if (res.success && res.user) {
            this.currentUser = {
              id: res.user.id,
              name: res.user.name,
              email: res.user.email,
              phone: res.user.phone,
            };
            this.loggedInSubject.next(true);
            return { success: true, message: '' };
          }
          return { success: false, message: res.message || 'Email ou mot de passe incorrect.' };
        }),
        catchError(() => this.localLogin(email, password))
      );
  }

  private localLogin(email: string, password: string): Observable<{ success: boolean; message: string }> {
    return of(null).pipe(
      delay(900),
      map(() => {
        if (email.trim().toLowerCase() === this.DEMO_EMAIL && password === this.DEMO_PASSWORD) {
          this.currentUser = {
            name: 'Utilisateur Démo',
            email: this.DEMO_EMAIL,
            phone: '0550 12 34 56',
          };
          this.loggedInSubject.next(true);
          return { success: true, message: '' };
        }
        return { success: false, message: 'Email ou mot de passe incorrect.' };
      })
    );
  }

  logout(): void {
    this.currentUser = null;
    this.loggedInSubject.next(false);
  }
}
