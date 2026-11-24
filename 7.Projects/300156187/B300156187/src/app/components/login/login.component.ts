import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(
    private auth: AuthService,
    private routerExtensions: RouterExtensions,
    public theme: ThemeService
  ) {}

  onLogin(): void {
    this.error = '';
    if (!this.email.trim() || !this.password) {
      this.error = 'Veuillez saisir votre email et votre mot de passe.';
      return;
    }
    this.loading = true;
    this.auth.login(this.email, this.password).subscribe((res) => {
      this.loading = false;
      if (res.success) {
        this.routerExtensions.navigate(['/accueil'], { clearHistory: true });
      } else {
        this.error = res.message ?? 'Échec de la connexion.';
      }
    });
  }

  goRegister(): void {
    this.routerExtensions.navigate(['/inscription']);
  }

  loginDemo(): void {
    this.email = 'demo@restaurant.com';
    this.password = 'demo1234';
    this.onLogin();
  }
}
