import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  constructor(private auth: AuthService, private router: Router) {}

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
        this.router.navigate(['/accueil']);
      } else {
        this.error = res.message;
      }
    });
  }

  useDemoAccount(): void {
    this.email = 'demo@restaurant.com';
    this.password = 'demo1234';
    this.onLogin();
  }
}
