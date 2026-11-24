
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then(m => m.HomeComponent)
  },

  {
    path: 'calendar',
    loadComponent: () =>
      import('./calendar/calendar.component').then(m => m.CalendarComponent)
  },
];
