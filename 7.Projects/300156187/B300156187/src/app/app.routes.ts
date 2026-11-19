import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { DishDetailComponent } from './components/dish-detail/dish-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/connexion', pathMatch: 'full' },
  { path: 'connexion', component: LoginComponent },
  {
    path: '',
    component: TabsComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'accueil', component: HomeComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'panier', component: CartComponent },
      { path: 'reservations', component: ReservationsComponent },
      { path: 'profil', component: ProfileComponent },
      { path: 'plat/:id', component: DishDetailComponent },
    ],
  },
  { path: '**', redirectTo: '/connexion' },
];
