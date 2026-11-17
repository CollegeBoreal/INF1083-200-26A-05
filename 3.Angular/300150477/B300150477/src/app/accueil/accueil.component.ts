import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-accueil',
  standalone: true,
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {
  titre = 'Bienvenue INF1083';
  numero = '300150477';
  message = signal('');
  connecte = signal(true);
  noms = ['Alice', 'Bob', 'Charlie'];

  saluer() {
    this.message.set('Bonjour ! Étudiant ' + this.numero);
  }
}