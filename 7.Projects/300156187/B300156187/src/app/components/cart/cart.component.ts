import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ThemeService } from '../../services/theme.service';
import { CartItem } from '../../models/models';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: 'cart.component.html',
  styleUrls: ['cart.component.scss'],
})
export class CartComponent {
  orderMessage = '';

  constructor(public cart: CartService, public theme: ThemeService) {}

  increase(item: CartItem): void {
    this.cart.setQuantity(item.dish.id, item.quantity + 1);
  }

  decrease(item: CartItem): void {
    this.cart.setQuantity(item.dish.id, item.quantity - 1);
  }

  remove(item: CartItem): void {
    this.cart.removeFromCart(item.dish.id);
  }

  clear(): void {
    this.cart.clearCart();
    this.orderMessage = '';
  }

  order(): void {
    // Commande démo : pas de paiement, on vide le panier et on confirme.
    this.cart.clearCart();
    this.orderMessage = 'Merci ! Votre commande démo a bien été enregistrée. 🎉';
  }
}
