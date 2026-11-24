import { Injectable } from '@angular/core'
import { ApplicationSettings } from '@nativescript/core'
import { Theme } from '@nativescript/theme'
import { BehaviorSubject } from 'rxjs'

const DARK_KEY = 'lounivers.dark'

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly dark$ = new BehaviorSubject<boolean>(ApplicationSettings.getBoolean(DARK_KEY, false))

  constructor() {
    this.apply(this.dark$.value)
  }

  setDark(dark: boolean): void {
    if (dark === this.dark$.value) return
    ApplicationSettings.setBoolean(DARK_KEY, dark)
    this.dark$.next(dark)
    this.apply(dark)
  }

  // Ajoute la classe .ns-dark (ou .ns-light) sur la vue racine
  private apply(dark: boolean): void {
    Theme.setMode(dark ? Theme.Dark : Theme.Light)
  }
}
