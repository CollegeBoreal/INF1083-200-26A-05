import { Routes } from '@angular/router';
import { Accueil } from './accueil/accueil';
import { Utilisateurs } from './utilisateurs/utilisateurs';

export const routes: Routes = [
  { path: '', component: Accueil },
  { path: 'utilisateurs', component: Utilisateurs },
  { path: '**', redirectTo: '' }
];
