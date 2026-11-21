import { Component } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { ThemeService } from '../../services/theme.service';
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
  date = '';
  time = '';
  persons = 2;
  error = '';
  confirmMessage = '';

  constructor(public reservations: ReservationService, public theme: ThemeService) {}

  decreasePersons(): void {
    if (this.persons > 1) {
      this.persons -= 1;
    }
  }

  increasePersons(): void {
    if (this.persons < 20) {
      this.persons += 1;
    }
  }

  confirm(): void {
    this.error = '';
    this.confirmMessage = '';
    if (!this.name.trim() || !this.phone.trim() || !this.date.trim() || !this.time.trim()) {
      this.error = 'Veuillez remplir tous les champs.';
      return;
    }
    this.reservations.addReservation(this.name, this.phone, this.date, this.time, this.persons);
    this.confirmMessage = 'Réservation confirmée ! À bientôt chez Wonder Food\'s. 🎉';
    this.name = '';
    this.phone = '';
    this.date = '';
    this.time = '';
    this.persons = 2;
  }

  cancel(reservation: Reservation): void {
    this.reservations.cancelReservation(reservation.id);
  }
}
