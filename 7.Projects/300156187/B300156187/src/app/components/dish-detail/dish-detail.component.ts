import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { DataService } from '../../services/data.service';
import { CartService } from '../../services/cart.service';
import { ThemeService } from '../../services/theme.service';
import { Dish } from '../../models/models';

@Component({
  selector: 'app-dish-detail',
  standalone: false,
  templateUrl: 'dish-detail.component.html',
  styleUrls: ['dish-detail.component.scss'],
})
export class DishDetailComponent implements OnInit {
  dish: Dish | undefined;
  loading = true;
  quantity = 1;
  addedMessage = '';

  constructor(
    private route: ActivatedRoute,
    private data: DataService,
    private cartService: CartService,
    public theme: ThemeService,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.data.getDishById(id).subscribe((dish) => {
      this.dish = dish;
      this.loading = false;
    });
  }

  decrease(): void {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
  }

  increase(): void {
    this.quantity += 1;
  }

  addToCart(): void {
    if (!this.dish) {
      return;
    }
    for (let i = 0; i < this.quantity; i++) {
      this.cartService.addToCart(this.dish);
    }
    this.addedMessage = 'Ajouté au panier ✓';
    this.routerExtensions.navigate(['/panier']);
  }

  goBack(): void {
    this.routerExtensions.back();
  }
}
