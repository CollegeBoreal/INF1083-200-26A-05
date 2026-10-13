import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-accueil',
  styleUrl: './accueil.scss',
  templateUrl: './accueil.html',
})
export class Accueil {
  titre = 'Bienvenue INF1083';
  nom = 'Lounes';

  saluer() {
    alert('Bonjour !');
  }
}
