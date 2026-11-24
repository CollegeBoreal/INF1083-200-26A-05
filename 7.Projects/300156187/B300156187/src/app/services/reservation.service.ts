import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApplicationSettings } from '@nativescript/core';
import { Reservation } from '../models/models';

const RESERVATIONS_KEY = 'reservations';

@Injectable({ providedIn: 'root' })
export class ReservationService {
  private reservationsSubject = new BehaviorSubject<Reservation[]>(this.load());
  reservations$: Observable<Reservation[]> = this.reservationsSubject.asObservable();

  get reservations(): Reservation[] {
    return this.reservationsSubject.value;
  }

  addReservation(name: string, phone: string, date: string, time: string, persons: number): Reservation {
    const reservation: Reservation = {
      id: Date.now().toString(),
      name: name.trim(),
      phone: phone.trim(),
      date: date.trim(),
      time: time.trim(),
      persons,
    };
    const list = [...this.reservationsSubject.value, reservation];
    this.save(list);
    return reservation;
  }

  cancelReservation(id: string): void {
    this.save(this.reservationsSubject.value.filter((r) => r.id !== id));
  }

  private save(list: Reservation[]): void {
    this.reservationsSubject.next(list);
    ApplicationSettings.setString(RESERVATIONS_KEY, JSON.stringify(list));
  }

  private load(): Reservation[] {
    const raw = ApplicationSettings.getString(RESERVATIONS_KEY, '[]');
    try {
      return JSON.parse(raw) as Reservation[];
    } catch {
      return [];
    }
  }
}
