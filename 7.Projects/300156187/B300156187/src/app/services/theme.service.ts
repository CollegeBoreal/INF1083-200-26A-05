import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private darkSubject = new BehaviorSubject<boolean>(false);
  dark$: Observable<boolean> = this.darkSubject.asObservable();

  get dark(): boolean {
    return this.darkSubject.value;
  }

  toggleTheme(): void {
    this.darkSubject.next(!this.darkSubject.value);
  }

  // Alias utilisé par HomeComponent.
  toggle(): void {
    this.toggleTheme();
  }

  setDark(value: boolean): void {
    this.darkSubject.next(value);
  }
}
