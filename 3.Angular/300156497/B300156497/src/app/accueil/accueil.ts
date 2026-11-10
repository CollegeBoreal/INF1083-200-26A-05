import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-accueil',
  imports: [],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class Accueil {

  titre = 'Bienvenue INF1083';

  connecte = true;

  noms = [
    'Alice',
    'Bob',
    'Charlie'
  ];

  constructor(private http: HttpClient) {}

  saluer() {
    alert('Bonjour !');
  }

  chargerUtilisateurs() {
    this.http
      .get('https://jsonplaceholder.typicode.com/users')
      .subscribe(data => {
        console.log(data);
      });
  }
}