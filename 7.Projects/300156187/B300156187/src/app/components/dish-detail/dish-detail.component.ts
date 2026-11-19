import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { CartService } from '../../services/cart.service';
import { Dish } from '../../models/models';

@Component({
  selector: 'app-dish-detail',
  standalone: false,
  templateUrl: 'dish-detail.component.html',
  styleUrls: ['dish-detail.component.scss'],
})
export class DishDetailComponent implements OnInit {
  dish: Dish | null = null;
  quantity = 1;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private data: DataService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.data.getDishById(id).subscribe((dish) => {
      this.dish = dish ?? null;
      this.loading = false;
    });
  }

  decrease(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increase(): void {
    this.quantity++;
  }

  get totalPrice(): number {
    return this.dish ? this.dish.price * this.quantity : 0;
  }

  addToCart(): void {
    if (this.dish) {
      this.cartService.add(this.dish, this.quantity);
      this.router.navigate(['/panier']);
    }
  }

  goBack(): void {
    this.router.navigate(['/menu']);
  }
}
