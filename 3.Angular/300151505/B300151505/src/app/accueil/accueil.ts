
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-accueil',
  imports: [CommonModule],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class AccueilComponent implements OnInit {
  titre = 'Bienvenue INF1083';
  nom = 'Aidene Arezki';
  id = '300151505';

  connecte = true;
  noms = ['Alice', 'Bob', 'Charlie'];
  utilisateurs: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<any[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe({
        next: (data) => {
          this.utilisateurs = data;
        },
        error: (erreur) => {
          console.error('Erreur API :', erreur);
        }
      });
  }

  saluer() {
    alert('Bonjour !');
  }
}
