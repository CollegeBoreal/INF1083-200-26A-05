import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private darkSubject = new BehaviorSubject<boolean>(false);
  dark$ = this.darkSubject.asObservable();

  get isDark(): boolean {
    return this.darkSubject.value;
  }

  toggle(): void {
    this.darkSubject.next(!this.darkSubject.value);
  }
}
