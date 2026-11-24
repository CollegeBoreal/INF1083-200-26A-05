import { Component, computed, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-accueil',
  styleUrl: './accueil.css',
  templateUrl: './accueil.html',
})
export class Accueil {
  // 🔄 Data binding (interpolation)
  titre = 'Bienvenue INF1083';
  nom = 'Rayan Lounis';
  matricule = '300157117';

  // 🖱️ Évènements
  compteur = signal(0);
  message = signal('');

  // 📋 Condition
  connecte = signal(false);

  // 📋 Liste
  noms = ['Alice', 'Bob', 'Charlie'];
  inventeurs = signal([
    { nom: 'Thomas Edison', invention: 'Ampoule électrique' },
    { nom: 'Marie Curie', invention: 'Radium et polonium' },
    { nom: 'Nikola Tesla', invention: 'Courant alternatif' },
    { nom: 'Hedy Lamarr', invention: 'Saut de fréquence (Wi-Fi)' },
    { nom: 'J.-A. Bombardier', invention: 'Motoneige' },
  ]);

  // Recherche dans la liste (property + event binding)
  recherche = signal('');
  inventeursFiltres = computed(() =>
    this.inventeurs().filter((i) =>
      i.nom.toLowerCase().includes(this.recherche().toLowerCase())
    )
  );

  saluer() {
    this.compteur.update((n) => n + 1);
    this.message.set(`Bonjour ${this.nom} ! 👋 (clic n° ${this.compteur()})`);
  }

  basculerConnexion() {
    this.connecte.update((c) => !c);
  }

  filtrer(evenement: Event) {
    this.recherche.set((evenement.target as HTMLInputElement).value);
  }
}
