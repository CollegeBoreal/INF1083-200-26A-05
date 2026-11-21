import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';

interface Utilisateur {
  id: number;
  name: string;
}

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.html',
  styleUrl: './accueil.css',
})
export class Accueil {
  private readonly http = inject(HttpClient);

  protected readonly titre = 'Bienvenue INF1083';
  protected readonly nom = 'Prof';
  protected readonly connecte = true;
  protected readonly noms = ['Alice', 'Bob', 'Charlie'];
  protected readonly utilisateurs = signal<Utilisateur[]>([]);
  protected readonly chargement = signal(false);
  protected readonly erreur = signal('');

  protected saluer(): void {
    alert('Bonjour !');
  }

  protected chargerUtilisateurs(): void {
    this.chargement.set(true);
    this.erreur.set('');
    this.http.get<Utilisateur[]>('https://jsonplaceholder.typicode.com/users').subscribe({
      next: (utilisateurs) => {
        this.utilisateurs.set(utilisateurs);
        this.chargement.set(false);
      },
      error: () => {
        this.erreur.set('Impossible de charger les utilisateurs.');
        this.chargement.set(false);
      },
    });
  }
}
