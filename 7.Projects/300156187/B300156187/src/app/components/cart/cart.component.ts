import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/models';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: 'cart.component.html',
  styleUrls: ['cart.component.scss'],
})
export class CartComponent {
  confirmed = false;
  lastOrderId = '';

  constructor(public cart: CartService, private router: Router) {}

  get showEmptyState(): boolean {
    return !this.confirmed && this.cart.items.length === 0;
  }

  get showList(): boolean {
    return !this.confirmed && this.cart.items.length > 0;
  }

  increase(item: CartItem): void {
    this.cart.updateQuantity(item.dish.id, item.quantity + 1);
  }

  decrease(item: CartItem): void {
    this.cart.updateQuantity(item.dish.id, item.quantity - 1);
  }

  remove(item: CartItem): void {
    this.cart.remove(item.dish.id);
  }

  openDish(item: CartItem): void {
    this.router.navigate(['/plat', item.dish.id]);
  }

  checkout(): void {
    const order = this.cart.checkout();
    this.lastOrderId = order.id;
    this.confirmed = true;
  }

  continueShopping(): void {
    this.confirmed = false;
    this.router.navigate(['/menu']);
  }
}
