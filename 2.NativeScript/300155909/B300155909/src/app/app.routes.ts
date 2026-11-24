import { Routes } from '@angular/router';
import { PersonListComponent } from './people/person-list.component';
import { PersonDetailComponent } from './people/person-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/people', pathMatch: 'full' },
  { path: 'people', component: PersonListComponent },
  { path: 'people/:id', component: PersonDetailComponent },
];
