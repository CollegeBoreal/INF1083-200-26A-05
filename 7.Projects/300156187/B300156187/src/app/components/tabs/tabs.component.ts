import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

interface Tab {
  route: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-tabs',
  standalone: false,
  templateUrl: 'tabs.component.html',
  styleUrls: ['tabs.component.scss'],
})
export class TabsComponent {
  currentRoute = '/accueil';
  cartCount = 0;

  tabs: Tab[] = [
    { route: '/accueil', label: 'Accueil', icon: '🏠' },
    { route: '/menu', label: 'Menu', icon: '🍽️' },
    { route: '/panier', label: 'Panier', icon: '🛒' },
    { route: '/reservations', label: 'Réservations', icon: '📅' },
    { route: '/profil', label: 'Profil', icon: '👤' },
  ];

  constructor(private router: Router, public cart: CartService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
    this.cart.count$.subscribe((count) => (this.cartCount = count));
  }

  go(route: string): void {
    this.router.navigate([route]);
  }

  isActive(route: string): boolean {
    if (route === '/menu') {
      return this.currentRoute === '/menu' || this.currentRoute.startsWith('/plat');
    }
    return this.currentRoute === route;
  }

  showCartBadge(tab: Tab): boolean {
    return tab.route === '/panier' && this.cartCount > 0;
  }
}
