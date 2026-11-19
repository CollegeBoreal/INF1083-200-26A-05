# Travail 7 — Ticket Assist

**Liza Benhammouche · 300151835 · INF1083**

Ticket Assist est une application mobile de suivi des demandes de soutien informatique. Elle permet de créer un ticket, de consulter les demandes et de fermer une demande résolue. Les données sont enregistrées sur l’appareil.

| Page | Action principale |
|---|---|
| Accueil | Voir le nombre de tickets ouverts et choisir une action |
| Nouveau ticket | Saisir le titre et la description d’une demande |
| Liste des tickets | Consulter les demandes et fermer un ticket |

## 1. Créer le projet

Le modèle est **NativeScript Angular Blank**. Il comprend le routeur natif. L’exercice utilise les formulaires NativeScript et ApplicationSettings pour la sauvegarde locale. Aucun plugin tiers supplémentaire n’est requis.

```powershell
ns create TicketAssist --template @nativescript/template-blank-ng
Set-Location TicketAssist
```

## 2. Ajouter les pages

Créer `src/app/tickets.ts`.

```typescript
import { Component, Injectable, NO_ERRORS_SCHEMA, computed, inject, signal } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptFormsModule, NativeScriptRouterModule } from '@nativescript/angular';
import { ApplicationSettings } from '@nativescript/core';

type Ticket = { id: number; titre: string; description: string; ferme: boolean };
const cle = 'inf1083.ticket-assist.v1';

function lireTickets(): Ticket[] {
  try {
    const resultat: unknown = JSON.parse(ApplicationSettings.getString(cle, '[]'));
    if (!Array.isArray(resultat)) return [];
    return resultat.filter((ticket): ticket is Ticket =>
      !!ticket && Number.isSafeInteger(ticket.id) && typeof ticket.titre === 'string' &&
      typeof ticket.description === 'string' && typeof ticket.ferme === 'boolean');
  } catch {
    return [];
  }
}

@Injectable({ providedIn: 'root' })
class TicketsStore {
  private readonly donnees = signal<Ticket[]>(lireTickets());
  readonly tickets = this.donnees.asReadonly();
  readonly ouverts = computed(() => this.tickets().filter((ticket) => !ticket.ferme).length);

  ajouter(titre: string, description: string): void {
    const id = 1 + this.tickets().reduce((max, ticket) => Math.max(max, ticket.id), 0);
    this.enregistrer([{ id, titre, description, ferme: false }, ...this.tickets()]);
  }

  fermer(id: number): void {
    this.enregistrer(this.tickets().map((ticket) => ticket.id === id ? { ...ticket, ferme: true } : ticket));
  }

  private enregistrer(tickets: Ticket[]): void {
    ApplicationSettings.setString(cle, JSON.stringify(tickets));
    this.donnees.set(tickets);
  }
}

@Component({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule],
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <ActionBar title="Ticket Assist · Accueil" />
    <StackLayout class="p-4">
      <Label [text]="'Tickets ouverts : ' + store.ouverts()"></Label>
      <Button text="Créer un ticket" [nsRouterLink]="['/nouveau']"></Button>
      <Button text="Voir les tickets" [nsRouterLink]="['/tickets']"></Button>
    </StackLayout>`,
})
export class Accueil {
  readonly store = inject(TicketsStore);
}

@Component({
  imports: [NativeScriptCommonModule, NativeScriptFormsModule, NativeScriptRouterModule],
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <ActionBar title="Nouveau ticket" />
    <StackLayout class="p-4">
      <Label text="Titre"></Label>
      <TextField [(ngModel)]="titre" hint="Ex. Imprimante hors ligne" maxLength="80" />
      <Label text="Description"></Label>
      <TextView [(ngModel)]="description" hint="Décris le problème" maxLength="500" height="120" />
      <Button text="Enregistrer" (tap)="enregistrer()"></Button>
      <Label [text]="message()" textWrap="true"></Label>
      <Button text="Voir les tickets" [nsRouterLink]="['/tickets']"></Button>
    </StackLayout>`,
})
export class NouveauTicket {
  private readonly store = inject(TicketsStore);
  titre = '';
  description = '';
  readonly message = signal('');

  enregistrer(): void {
    const titre = this.titre.trim();
    const description = this.description.trim();
    if (!titre || !description) {
      this.message.set('Remplis les deux champs.');
      return;
    }
    try {
      this.store.ajouter(titre, description);
      this.titre = '';
      this.description = '';
      this.message.set('Ticket enregistré.');
    } catch {
      this.message.set('Impossible d’enregistrer le ticket.');
    }
  }
}

@Component({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule],
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <ActionBar title="Liste des tickets" />
    <GridLayout rows="auto, auto, *" class="p-4">
      <Button row="0" text="Nouveau ticket" [nsRouterLink]="['/nouveau']"></Button>
      <Label row="1" [text]="message() || (store.tickets().length ? '' : 'Aucun ticket.')"></Label>
      <ListView row="2" [items]="store.tickets()">
        <ng-template let-ticket="item">
          <StackLayout class="p-2">
            <Label [text]="'#' + ticket.id + ' · ' + ticket.titre" textWrap="true"></Label>
            <Label [text]="ticket.description" textWrap="true"></Label>
            <Label [text]="ticket.ferme ? 'Fermé' : 'Ouvert'"></Label>
            <Button text="Fermer le ticket" [isEnabled]="!ticket.ferme" (tap)="fermer(ticket.id)"></Button>
          </StackLayout>
        </ng-template>
      </ListView>
    </GridLayout>`,
})
export class ListeTickets {
  readonly store = inject(TicketsStore);
  readonly message = signal('');

  fermer(id: number): void {
    try {
      this.store.fermer(id);
      this.message.set('Ticket fermé.');
    } catch {
      this.message.set('Impossible de fermer le ticket.');
    }
  }
}
```

Remplacer `src/app/app.routes.ts`.

```typescript
import { Routes } from '@angular/router';
import { Accueil, ListeTickets, NouveauTicket } from './tickets';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'accueil' },
  { path: 'accueil', component: Accueil },
  { path: 'nouveau', component: NouveauTicket },
  { path: 'tickets', component: ListeTickets },
  { path: '**', redirectTo: 'accueil' },
];
```

## 3. Lancer et vérifier

```powershell
ns run android
```

1. Vérifier que les boutons de l’accueil ouvrent les deux pages.
2. Soumettre le formulaire vide, puis créer un ticket de démonstration.
3. Dans la liste, fermer le ticket et vérifier le compteur de l’accueil.
4. Relancer l’application et vérifier que le ticket et son état sont conservés.

L’exécution sur Android et les captures restent à réaliser. Les captures sont à placer dans le dossier [images](images/).

[Consignes du cours](../README.md)
