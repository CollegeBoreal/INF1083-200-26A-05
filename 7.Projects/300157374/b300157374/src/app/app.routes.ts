import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { FicheComponent } from './fiche/fiche.component'
import { AjoutComponent } from './ajout/ajout.component'

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'fiche/:id', component: FicheComponent },
  { path: 'ajout', component: AjoutComponent }
]
