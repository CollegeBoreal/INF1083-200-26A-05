import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem, Dish } from '../models/models';

@Injectable({ providedIn: 'root' })
export class CartService {
  private itemsSubject = new BehaviorSubject<CartItem[]>([]);
  items$: Observable<CartItem[]> = this.itemsSubject.asObservable();

  count$: Observable<number> = this.items$.pipe(
    map((items) => items.reduce((sum, item) => sum + item.quantity, 0))
  );

  total$: Observable<number> = this.items$.pipe(
    map((items) => items.reduce((sum, item) => sum + item.dish.price * item.quantity, 0))
  );

  get items(): CartItem[] {
    return this.itemsSubject.value;
  }

  addToCart(dish: Dish): void {
    const items = [...this.itemsSubject.value];
    const existing = items.find((item) => item.dish.id === dish.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({ dish, quantity: 1 });
    }
    this.itemsSubject.next(items);
  }

  // Alias utilisé par HomeComponent.
  add(dish: Dish): void {
    this.addToCart(dish);
  }

  removeFromCart(dishId: number): void {
    this.itemsSubject.next(this.itemsSubject.value.filter((item) => item.dish.id !== dishId));
  }

  setQuantity(dishId: number, qty: number): void {
    if (qty <= 0) {
      this.removeFromCart(dishId);
      return;
    }
    this.itemsSubject.next(
      this.itemsSubject.value.map((item) =>
        item.dish.id === dishId ? { ...item, quantity: qty } : item
      )
    );
  }

  clearCart(): void {
    this.itemsSubject.next([]);
  }
}
