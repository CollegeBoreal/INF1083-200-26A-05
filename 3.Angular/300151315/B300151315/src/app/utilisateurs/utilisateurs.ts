import { Component, OnInit, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Utilisateur {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: { name: string };
  address: { city: string };
}

@Component({
  selector: 'app-utilisateurs',
  imports: [NgIf, NgFor],
  templateUrl: './utilisateurs.html',
  styleUrl: './utilisateurs.css',
})
export class Utilisateurs implements OnInit {
  private http = inject(HttpClient);

  utilisateurs = signal<Utilisateur[]>([]);
  chargement = signal(true);
  erreur = signal('');

  ngOnInit() {
    this.http
      .get<Utilisateur[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe({
        next: data => {
          console.log(data);
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
