# Travail 3 — Introduction à Angular

**Liza Benhammouche · 300151835 · INF1083**

L’application présente une page d’accueil et charge une liste d’utilisateurs depuis une API REST. Elle illustre les composants, le routage, l’interpolation, les événements et le rendu conditionnel.

## 1. Créer le projet

Dans ce dossier, avec Node.js LTS et npm installés, exécuter les commandes suivantes.

```powershell
node --version
npm --version
npx @angular/cli new b300151835 --directory B300151835 --routing --style css --skip-git --skip-tests --ssr=false --file-name-style-guide=2025
Set-Location B300151835
npx ng generate component accueil --skip-tests
```

## 2. Configurer l’application

Dans `src/app/app.ts`, mettre le point d’entrée du routeur.

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet />',
})
export class App {}
```

Dans `src/app/app.routes.ts`, relier la route d’accueil au composant.

```typescript
import { Routes } from '@angular/router';
import { Accueil } from './accueil/accueil';

export const routes: Routes = [{ path: '', component: Accueil }];
```

Dans `src/app/app.config.ts`, ajouter `import { provideHttpClient } from '@angular/common/http';`, puis ajouter `provideHttpClient()` au tableau `providers` en gardant `provideRouter(routes)`.

## 3. Créer le composant d’accueil

Remplacer `src/app/accueil/accueil.ts` par ce code.

```typescript
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';

interface Utilisateur { id: number; name: string; }

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.html',
  styles: ['h1 { color: #174da5; }'],
})
export class Accueil {
  private readonly http = inject(HttpClient);
  readonly titre = 'Bienvenue INF1083';
  readonly utilisateurs = signal<Utilisateur[]>([]);
  readonly message = signal('');
  readonly chargement = signal(false);

  saluer(): void {
    this.message.set('Bonjour !');
  }

  charger(): void {
    this.chargement.set(true);
    this.message.set('');
    this.utilisateurs.set([]);
    this.http.get<Utilisateur[]>('https://jsonplaceholder.typicode.com/users').subscribe({
      next: (utilisateurs) => {
        this.utilisateurs.set(utilisateurs);
        this.chargement.set(false);
        if (!utilisateurs.length) this.message.set('Aucun utilisateur trouvé.');
      },
      error: () => {
        this.message.set('Impossible de charger la liste. Réessaie.');
        this.chargement.set(false);
      },
    });
  }
}
```

Dans `src/app/accueil/accueil.html`, mettre le gabarit suivant.

```html
<main>
  <h1>{{ titre }}</h1>
  <button type="button" (click)="saluer()">Dire bonjour</button>
  <button type="button" (click)="charger()" [disabled]="chargement()">
    Charger les utilisateurs
  </button>
  @if (chargement()) { <p role="status">Chargement…</p> }
  @if (message()) { <p role="status">{{ message() }}</p> }
  <ul>
    @for (utilisateur of utilisateurs(); track utilisateur.id) {
      <li>{{ utilisateur.name }}</li>
    }
  </ul>
</main>
```

## 4. Lancer

```powershell
npx ng build
npx ng serve
```

Ouvrir [localhost:4200](http://localhost:4200). Le premier bouton doit afficher « Bonjour ! ». Le deuxième doit charger les utilisateurs dès que l’API répond.

## Vérification

Les étapes ci-dessus décrivent le résultat attendu. L’exécution dans le navigateur et les captures restent à vérifier. Le dossier [images](images/) est prévu pour les captures.

[Consignes du cours](../README.md)
