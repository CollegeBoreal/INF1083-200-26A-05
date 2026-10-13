import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Utilisateur {
  id: number;
  name: string;
  email: string;
  company: { name: string };
}

@Component({
  selector: 'app-accueil',
  imports: [],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class Accueil {
  private http = inject(HttpClient);

  etudiant = 'B300157184';
  nom = 'ANTA TOP';
  connecte = true;
  liens = ['Accueil', 'Cours', 'Projets', 'Contact'];

  utilisateurs = signal<Utilisateur[]>([]);
  erreur = signal(false);

  stats = [
    { valeur: '12', libelle: 'Laboratoires' },
    { valeur: '5', libelle: 'Projets' },
    { valeur: '98%', libelle: 'Progression' }
  ];

  cartes = [
    { icone: '🧩', titre: 'Composants', texte: 'Construire des interfaces réutilisables.' },
    { icone: '🔄', titre: 'Data Binding', texte: 'Lier les données TypeScript au HTML.' },
    { icone: '🌐', titre: 'API REST', texte: 'Consommer des données avec HttpClient.' },
    { icone: '🛣️', titre: 'Routage', texte: 'Naviguer entre plusieurs pages.' }
  ];

  constructor() {
    this.http
      .get<Utilisateur[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe({
        next: (data) => this.utilisateurs.set(data),
        error: () => this.erreur.set(true)
      });
  }

  saluer() {
    alert('Bienvenue sur la plateforme, ' + this.etudiant + ' !');
  }
}