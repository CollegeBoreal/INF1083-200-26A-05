# Travail 5 — Recherche de pays avec RxJS

**Liza Benhammouche · 300151835 · INF1083**

L’onglet Search demande une capitale et affiche les pays correspondants. Le formulaire utilise `ngModel`, et le service retourne un `Observable<Country[]>` construit à partir de la réponse HTTP.

## 1. Créer le projet

```powershell
ns create b300151835 --template @nativescript/template-tab-navigation-ng
Set-Location b300151835
```

## 2. Ajouter le modèle et le service

Créer `src/app/shared/country.ts`.

```typescript
export interface Country {
  id: string;
  name: string;
  capital: string;
}
```

Créer `src/app/shared/apicall.service.ts`. Le service appelle l’URL utilisée dans l’exercice et encode la saisie dans le chemin. Cet appel ne nécessite aucune clé RapidAPI dans le code.

```typescript
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Country } from './country';

type ApiCountry = { cca3: string; name: { common: string }; capital?: string[] };

@Injectable({ providedIn: 'root' })
export class ApicallService {
  private readonly http = inject(HttpClient);

  searchCapital(capital: string): Observable<Country[]> {
    const url = 'https://countries.nexperts.nl/capital/' + encodeURIComponent(capital.trim());
    return this.http.get<ApiCountry[]>(url).pipe(map((items) =>
      items.map((item) => ({
        id: item.cca3 || item.name.common,
        name: item.name.common,
        capital: item.capital?.join(', ') || 'Capitale inconnue',
      }))
    ));
  }
}
```

## 3. Activer HTTP et les formulaires

- Dans `src/app/app.module.ts`, importer `NativeScriptHttpClientModule` depuis `@nativescript/angular` et l’ajouter à `imports`.
- Dans `src/app/search/search.module.ts`, importer `NativeScriptFormsModule` depuis `@nativescript/angular` et l’ajouter à `imports`.

## 4. Relier la recherche à l’interface

Remplacer `src/app/search/search.component.ts`.

```typescript
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { ApicallService } from '../shared/apicall.service';
import { Country } from '../shared/country';

@Component({ standalone: false, selector: 'Search', templateUrl: './search.component.html' })
export class SearchComponent {
  private readonly api = inject(ApicallService);
  capital = '';
  readonly countries = signal<Country[]>([]);
  readonly message = signal('');
  readonly loading = signal(false);

  searchCapital(): void {
    if (this.loading()) return;
    this.countries.set([]);
    const capital = this.capital.trim();
    if (!capital) {
      this.message.set('Entre une capitale.');
      return;
    }
    this.loading.set(true);
    this.message.set('Recherche en cours…');
    this.api.searchCapital(capital).subscribe({
      next: (countries) => {
        this.countries.set(countries);
        this.message.set(countries.length ? '' : 'Aucun résultat.');
        this.loading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.message.set(error.status === 404 ? 'Aucun résultat.' : 'Le service est indisponible. Réessaie.');
        this.loading.set(false);
      },
    });
  }
}
```

Remplacer `src/app/search/search.component.html`.

```html
<GridLayout rows="auto, auto, auto, *" class="p-4">
  <TextField row="0" [(ngModel)]="capital" hint="Capitale, par exemple Ottawa" />
  <Button row="1" text="Rechercher" [isEnabled]="!loading()" (tap)="searchCapital()" />
  <Label row="2" [text]="message()" textWrap="true" />
  <ListView row="3" [items]="countries()">
    <ng-template let-country="item">
      <StackLayout class="p-2">
        <Label [text]="country.name" />
        <Label [text]="country.capital" />
      </StackLayout>
    </ng-template>
  </ListView>
</GridLayout>
```

## 5. Vérifier

Avec `ns run android`, ouvrir **Search**, saisir **Ottawa** et lancer la recherche. Si l’API répond, la liste doit afficher **Canada** et **Ottawa**. Vérifier aussi une saisie vide, une capitale inexistante et une coupure réseau.

## Vérification

Les étapes ci-dessus décrivent le résultat attendu. L’exécution sur Android et les captures restent à vérifier. Le dossier [images](images/) est prévu pour les captures.

[Consignes du cours](../README.md)
