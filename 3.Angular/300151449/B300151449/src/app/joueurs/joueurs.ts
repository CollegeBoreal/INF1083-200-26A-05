import { Component } from '@angular/core';

@Component({
  selector: 'app-joueurs',
  templateUrl: './joueurs.html',
  styleUrl: './joueurs.css'
})
export class Joueurs {
  joueurs = [
    { nom: 'Lamine Yamal', pays: 'Espagne', poste: 'Attaquant' },
    { nom: 'Pedri', pays: 'Espagne', poste: 'Milieu' },
    { nom: 'Gavi', pays: 'Espagne', poste: 'Milieu' },
    { nom: 'Raphinha', pays: 'Bresil', poste: 'Attaquant' },
    { nom: 'Frenkie de Jong', pays: 'Pays-Bas', poste: 'Milieu' },
    { nom: 'Jules Koundé', pays: 'France', poste: 'Defenseur' },
    { nom: 'Ronald Araújo', pays: 'Uruguay', poste: 'Defenseur' },
    { nom: 'Dani Olmo', pays: 'Espagne', poste: 'Milieu' },
    { nom: 'Ferran Torres', pays: 'Espagne', poste: 'Attaquant' },
    { nom: 'Pau Cubarsí', pays: 'Espagne', poste: 'Defenseur' }
  ];
}
