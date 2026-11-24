import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';
import { ApplicationSettings } from '@nativescript/core';
import { API_BASE_URL } from './api.config';
import { User } from '../models/models';

export interface AuthResult {
  success: boolean;
  message?: string;
  user?: User;
}

interface StoredAccount extends User {
  password: string;
}

const DEMO_USER: User = {
  id: 1,
  name: 'Utilisateur Démo',
  email: 'demo@restaurant.com',
  phone: '0550 12 34 56',
};
const DEMO_PASSWORD = 'demo1234';
const USERS_KEY = 'local_users';
const CURRENT_USER_KEY = 'current_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(this.loadCurrentUser());
  currentUser: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  get isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<AuthResult> {
    const cleanEmail = email.trim().toLowerCase();
    return this.http.post<{ success: boolean; message?: string; user?: User }>(`${API_BASE_URL}/login`, { email: cleanEmail, password }).pipe(
      timeout(3000),
      map((res) => {
        if (res.success && res.user) {
          this.setSession(res.user);
          return { success: true, user: res.user };
        }
        // L'API a répondu mais refuse : on tente quand même le compte local
        // (utile si l'API tourne sans la base), sinon on renvoie son message.
        const local = this.checkLocal(cleanEmail, password);
        if (local) {
          return { success: true, user: local };
        }
        return { success: false, message: res.message || 'Email ou mot de passe incorrect.' };
      }),
      catchError(() => {
        // API injoignable : vérification locale (compte démo + comptes créés).
        const local = this.checkLocal(cleanEmail, password);
        if (local) {
          return of({ success: true, user: local });
        }
        return of({ success: false, message: 'Email ou mot de passe incorrect.' });
      })
    );
  }

  register(name: string, email: string, phone: string, password: string): Observable<AuthResult> {
    const cleanEmail = email.trim().toLowerCase();
    return this.http.post<{ success: boolean; message?: string; user?: User }>(`${API_BASE_URL}/register`, { name: name.trim(), email: cleanEmail, phone: phone.trim(), password }).pipe(
      timeout(3000),
      map((res) => {
        if (res.success && res.user) {
          this.setSession(res.user);
          return { success: true, user: res.user };
        }
        return { success: false, message: res.message || "Impossible de créer le compte." };
      }),
      catchError(() => {
        // API injoignable : création locale.
        const accounts = this.loadAccounts();
        if (accounts.some((a) => a.email === cleanEmail)) {
          return of({ success: false, message: 'Un compte existe déjà avec cet email.' });
        }
        const user: User = { id: Date.now(), name: name.trim(), email: cleanEmail, phone: phone.trim() };
        accounts.push({ ...user, password });
        this.saveAccounts(accounts);
        this.setSession(user);
        return of({ success: true, user });
      })
    );
  }

  logout(): void {
    this.currentUserSubject.next(null);
    ApplicationSettings.remove(CURRENT_USER_KEY);
  }

  private checkLocal(email: string, password: string): User | null {
    if (email === DEMO_USER.email && password === DEMO_PASSWORD) {
      this.setSession(DEMO_USER);
      return DEMO_USER;
    }
    const account = this.loadAccounts().find((a) => a.email === email && a.password === password);
    if (account) {
      const user: User = { id: account.id, name: account.name, email: account.email, phone: account.phone };
      this.setSession(user);
      return user;
    }
    return null;
  }

  private setSession(user: User): void {
    this.currentUserSubject.next(user);
    ApplicationSettings.setString(CURRENT_USER_KEY, JSON.stringify(user));
  }

  private loadCurrentUser(): User | null {
    const raw = ApplicationSettings.getString(CURRENT_USER_KEY, '');
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  }

  private loadAccounts(): StoredAccount[] {
    const raw = ApplicationSettings.getString(USERS_KEY, '[]');
    try {
      return JSON.parse(raw) as StoredAccount[];
    } catch {
      return [];
    }
  }

  private saveAccounts(accounts: StoredAccount[]): void {
    ApplicationSettings.setString(USERS_KEY, JSON.stringify(accounts));
  }
}
