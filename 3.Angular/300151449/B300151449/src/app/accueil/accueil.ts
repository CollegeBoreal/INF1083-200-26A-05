import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class Accueil {
  titre = 'Bienvenue INF1083';
  club = 'FC Barcelona';
  connecte = signal(false);

  saluer() {
    this.connecte.set(!this.connecte());
  }
}
