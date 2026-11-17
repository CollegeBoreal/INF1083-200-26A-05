import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';

export const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'utilisateurs', component: UtilisateursComponent },
  { path: '**', redirectTo: '' }
];