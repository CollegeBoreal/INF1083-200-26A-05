import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Reservation } from '../../models/models';

@Component({
  selector: 'app-reservations',
  standalone: false,
  templateUrl: 'reservations.component.html',
  styleUrls: ['reservations.component.scss'],
})
export class ReservationsComponent {
  name = '';
  phone = '';
  date = new Date();
  time = new Date();
  persons = 2;
  confirmed = false;
  error = '';

  constructor(public cart: CartService) {}

  decrease(): void {
    if (this.persons > 1) {
      this.persons--;
    }
  }

  increase(): void {
    this.persons++;
  }

  confirm(): void {
    this.error = '';
    if (!this.name.trim()) {
      this.error = 'Veuillez saisir votre nom.';
      return;
    }
    if (!this.phone.trim()) {
      this.error = 'Veuillez saisir votre téléphone.';
      return;
    }
    const reservation: Reservation = {
      id: 'RES-' + Date.now().toString().slice(-6),
      date: this.date.toLocaleDateString('fr-FR'),
      time: this.time.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      persons: this.persons,
      name: this.name,
      phone: this.phone,
    };
    this.cart.addReservation(reservation);
    this.confirmed = true;
  }

  newReservation(): void {
    this.confirmed = false;
    this.name = '';
    this.phone = '';
    this.persons = 2;
  }
}
