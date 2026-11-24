import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Utilisateur {
  id: number;
  name: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.html',
  styleUrl: './utilisateurs.css'
})
export class Utilisateurs {
  private http = inject(HttpClient);
  utilisateurs = signal<Utilisateur[]>([]);
  erreur = signal('');
  chargement = signal(false);

  charger() {
    this.chargement.set(true);
    this.erreur.set('');

    this.http
      .get<Utilisateur[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe({
        next: data => {
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
