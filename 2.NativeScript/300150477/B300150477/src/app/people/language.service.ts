import { Injectable, signal } from '@angular/core';
import { ApplicationSettings } from '@nativescript/core';

export type AppLanguage = 'fr' | 'tz';
export type TextKey = 'listTitle' | 'listIntro' | 'detailTitle' | 'back' | 'period' | 'territory' | 'history';

const labels: Record<AppLanguage, Record<TextKey, string>> = {
  fr: {
    listTitle: 'Rois amazighs de Numidie',
    listIntro: "Quelques souverains de l'Antiquité liés à l'actuelle Algérie",
    detailTitle: 'Détails historiques',
    back: 'Retour',
    period: 'Règne',
    territory: 'Territoire',
    history: 'Repères historiques',
  },
  tz: {
    listTitle: 'ⵉⴳⵍⴷⴰⵏ ⵏ ⵏⵓⵎⵉⴷⵢⴰ',
    listIntro: 'ⵉⵎⴰⵣⵉⵖⵏ · ⵏⵓⵎⵉⴷⵢⴰ · ⵍⵣⵣⴰⵢⵔ',
    detailTitle: 'ⴰⵎⵣⵔⵓⵢ',
    back: 'ⵓⵖⴰⵍ',
    period: 'ⵜⵉⵣⵉ',
    territory: 'ⵜⴰⵎⵏⴰⴹⵜ',
    history: 'ⴰⵎⵣⵔⵓⵢ',
  },
};

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly language = signal<AppLanguage>(ApplicationSettings.getString('amazigh-app-language', 'fr') === 'tz' ? 'tz' : 'fr');

  text(key: TextKey): string {
    return labels[this.language()][key];
  }

  switchLabel(): string {
    return this.language() === 'fr' ? 'ⵜⴰⵎⴰⵣⵉⵖⵜ' : 'Français';
  }

  toggle(): void {
    const nextLanguage: AppLanguage = this.language() === 'fr' ? 'tz' : 'fr';
    this.language.set(nextLanguage);
    ApplicationSettings.setString('amazigh-app-language', nextLanguage);
  }
}
