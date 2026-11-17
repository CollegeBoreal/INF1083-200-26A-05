import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Utilisateur {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-utilisateurs',
  standalone: true,
  templateUrl: './utilisateurs.component.html',
  styleUrl: './utilisateurs.component.css'
})
export class UtilisateursComponent {
  private http = inject(HttpClient);

  utilisateurs = signal<Utilisateur[]>([]);
  chargement = signal(true);
  erreur = signal('');

  constructor() {
    this.http
      .get<Utilisateur[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe({
        next: (data) => {
          this.utilisateurs.set(data);
          this.chargement.set(false);
        },
        error: () => {
          this.erreur.set('Impossible de charger les utilisateurs.');
          this.chargement.set(false);
        }
      });
  }
}