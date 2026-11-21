import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { User } from '../../models/models';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor(
    private auth: AuthService,
    public theme: ThemeService,
    private router: Router,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    this.auth.currentUser.subscribe((user) => (this.user = user));
  }

  get displayName(): string {
    return this.user?.name || 'Utilisateur Démo';
  }

  get displayEmail(): string {
    return this.user?.email || 'demo@restaurant.com';
  }

  get displayPhone(): string {
    return this.user?.phone || '0550 12 34 56';
  }

  get avatarInitial(): string {
    return this.displayName.charAt(0).toUpperCase();
  }

  toggleTheme(): void {
    this.theme.toggleTheme();
  }

  goOrders(): void {
    this.router.navigate(['/panier']);
  }

  goReservations(): void {
    this.router.navigate(['/reservations']);
  }

  logout(): void {
    this.auth.logout();
    this.routerExtensions.navigate(['/connexion'], { clearHistory: true });
  }
}
