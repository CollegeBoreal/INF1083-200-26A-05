import { Routes } from '@angular/router';
import { Accueil } from './accueil/accueil';
import { Contact } from './contact/contact';

export const routes: Routes = [
  { path: '', component: Accueil },
  { path: 'contact', component: Contact },
];
