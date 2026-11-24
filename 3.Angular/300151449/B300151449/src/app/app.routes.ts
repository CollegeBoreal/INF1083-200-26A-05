import { Routes } from '@angular/router';
import { Accueil } from './accueil/accueil';
import { Joueurs } from './joueurs/joueurs';
import { Utilisateurs } from './utilisateurs/utilisateurs';

export const routes: Routes = [
  { path: '', component: Accueil },
  { path: 'joueurs', component: Joueurs },
  { path: 'utilisateurs', component: Utilisateurs },
  { path: '**', redirectTo: '' }
];
