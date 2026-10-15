import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [],
  selector: 'app-accueil',
  styleUrl: './accueil.scss',
  templateUrl: './accueil.html',
})
export class Accueil implements OnInit {
  titre = 'Bienvenue INF1083';
  nom = 'Lounes';
  connecte = true;
  users = signal<any[]>([]);

  private http = inject(HttpClient);

  ngOnInit() {
    this.http
      .get<any[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe((data) => this.users.set(data));
  }

  saluer() {
    alert('Bonjour ' + this.nom + ' !');
  }
}
