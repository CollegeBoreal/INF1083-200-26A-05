import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss'],
})
export class RegisterComponent {
  name = '';
  email = '';
  phone = '';
  password = '';
  error = '';
  loading = false;

  constructor(
    private auth: AuthService,
    private routerExtensions: RouterExtensions,
    public theme: ThemeService
  ) {}

  onRegister(): void {
    this.error = '';
    if (!this.name.trim() || !this.email.trim() || !this.phone.trim() || !this.password) {
      this.error = 'Veuillez remplir tous les champs.';
      return;
    }
    if (this.password.length < 6) {
      this.error = 'Le mot de passe doit contenir au moins 6 caractères.';
      return;
    }
    this.loading = true;
    this.auth.register(this.name, this.email, this.phone, this.password).subscribe((res) => {
      this.loading = false;
      if (res.success) {
        // Compte créé et connecté directement.
        this.routerExtensions.navigate(['/accueil'], { clearHistory: true });
      } else {
        this.error = res.message || "Impossible de créer le compte.";
      }
    });
  }

  goLogin(): void {
    this.routerExtensions.navigate(['/connexion']);
  }
}
