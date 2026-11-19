import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem, Dish, Order, Reservation } from '../models/models';
import { AuthService } from './auth.service';
import { API_BASE_URL } from './api.config';

@Injectable({ providedIn: 'root' })
export class CartService {
  private itemsSubject = new BehaviorSubject<CartItem[]>([]);
  items$ = this.itemsSubject.asObservable();
  count$ = this.itemsSubject.pipe(
    map((items) => items.reduce((sum, item) => sum + item.quantity, 0))
  );

  private ordersSubject = new BehaviorSubject<Order[]>([]);
  orders$ = this.ordersSubject.asObservable();

  private reservationsSubject = new BehaviorSubject<Reservation[]>([]);
  reservations$ = this.reservationsSubject.asObservable();

  constructor(private http: HttpClient, private auth: AuthService) {}

  get items(): CartItem[] {
    return this.itemsSubject.value;
  }

  get orders(): Order[] {
    return this.ordersSubject.value;
  }

  get reservations(): Reservation[] {
    return this.reservationsSubject.value;
  }

  get count(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  get total(): number {
    return this.items.reduce((sum, item) => sum + item.quantity * item.dish.price, 0);
  }

  add(dish: Dish, quantity = 1): void {
    const items = [...this.items];
    const existing = items.find((item) => item.dish.id === dish.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      items.push({ dish, quantity });
    }
    this.itemsSubject.next(items);
  }

  updateQuantity(dishId: number, quantity: number): void {
    let items = [...this.items];
    if (quantity <= 0) {
      items = items.filter((item) => item.dish.id !== dishId);
    } else {
      items.forEach((item) => {
        if (item.dish.id === dishId) {
          item.quantity = quantity;
        }
      });
    }
    this.itemsSubject.next(items);
  }

  remove(dishId: number): void {
    this.updateQuantity(dishId, 0);
  }

  clear(): void {
    this.itemsSubject.next([]);
  }

  checkout(): Order {
    const order: Order = {
      id: 'CMD-' + Date.now().toString().slice(-6),
      items: [...this.items],
      total: this.total,
      date: new Date().toLocaleString('fr-FR'),
      status: 'En préparation',
    };
    this.ordersSubject.next([order, ...this.orders]);
    this.clear();
    this.syncOrder(order);
    return order;
  }

  addReservation(reservation: Reservation): void {
    this.reservationsSubject.next([reservation, ...this.reservations]);
    this.syncReservation(reservation);
  }

  /**
   * Enregistre la commande dans la base SQL Server via l'API,
   * quand elle est disponible. L'historique local reste inchangé.
   */
  private syncOrder(order: Order): void {
    const userId = this.auth.currentUser?.id;
    if (!userId) {
      return;
    }
    this.http
      .post(`${API_BASE_URL}/orders`, {
        userId,
        branchId: 1,
        total: order.total,
        items: order.items.map((item) => ({
          dishId: item.dish.id,
          quantity: item.quantity,
          unitPrice: item.dish.price,
        })),
      })
      .subscribe({ error: () => {} });
  }

  /**
   * Enregistre la réservation dans la base SQL Server via l'API,
   * quand elle est disponible. La liste locale reste inchangée.
   */
  private syncReservation(reservation: Reservation): void {
    const userId = this.auth.currentUser?.id;
    if (!userId) {
      return;
    }
    const parts = reservation.date.split('/');
    const isoDate = parts.length === 3 ? `${parts[2]}-${parts[1]}-${parts[0]}` : reservation.date;
    this.http
      .post(`${API_BASE_URL}/reservations`, {
        userId,
        branchId: 1,
        date: isoDate,
        time: reservation.time,
        persons: reservation.persons,
      })
      .subscribe({ error: () => {} });
  }
}
