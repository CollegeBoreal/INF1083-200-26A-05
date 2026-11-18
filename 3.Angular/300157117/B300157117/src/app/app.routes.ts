import { Routes } from '@angular/router';
import { Accueil } from './accueil/accueil';
import { Utilisateurs } from './utilisateurs/utilisateurs';

// 🛣️ Routage : chaque chemin affiche un composant
export const routes: Routes = [
  { path: '', component: Accueil, title: 'Accueil — B300157117' },
  { path: 'utilisateurs', component: Utilisateurs, title: 'Utilisateurs — B300157117' },
  { path: '**', redirectTo: '' }
];
