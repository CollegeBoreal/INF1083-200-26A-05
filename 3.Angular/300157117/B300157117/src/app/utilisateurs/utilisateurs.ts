import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Forme des données renvoyées par l'API
interface Utilisateur {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  company: { name: string };
  address: { city: string };
}

@Component({
  imports: [],
  selector: 'app-utilisateurs',
  styleUrl: './utilisateurs.css',
  templateUrl: './utilisateurs.html',
})
export class Utilisateurs implements OnInit {
  private http = inject(HttpClient);

  utilisateurs = signal<Utilisateur[]>([]);
  chargement = signal(true);
  erreur = signal('');

  // 🌐 Consommer une API REST
  ngOnInit() {
    this.http
      .get<Utilisateur[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe({
        next: (data) => {
          console.log(data);
          this.utilisateurs.set(data);
          this.chargement.set(false);
        },
        error: () => {
          this.erreur.set('Impossible de charger les utilisateurs.');
          this.chargement.set(false);
        },
      });
  }
}
