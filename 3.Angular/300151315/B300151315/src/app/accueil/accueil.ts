import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-accueil',
  imports: [NgIf, NgFor],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css',
})
export class Accueil {
  titre = 'Bienvenue INF1083';
  nom = 'Prof';
  connecte = true;
  noms = ['Alice', 'Bob', 'Charlie'];

  saluer() {
    alert('Bonjour !');
  }

  basculerConnexion() {
    this.connecte = !this.connecte;
  }
}
