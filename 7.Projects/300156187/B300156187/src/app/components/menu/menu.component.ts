import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { CartService } from '../../services/cart.service';
import { Dish } from '../../models/models';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.scss'],
})
export class MenuComponent implements OnInit {
  loading = true;
  dishes: Dish[] = [];
  categories = ['Toutes', 'Entrées', 'Plats', 'Desserts', 'Boissons'];
  selectedCategory = 'Toutes';
  search = '';

  constructor(
    private data: DataService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.data.getDishes().subscribe((dishes) => {
      this.dishes = dishes;
      this.loading = false;
    });
  }

  get filtered(): Dish[] {
    let list = this.dishes;
    if (this.selectedCategory !== 'Toutes') {
      list = list.filter((dish) => dish.category === this.selectedCategory);
    }
    if (this.search.trim()) {
      list = list.filter((dish) =>
        dish.name.toLowerCase().includes(this.search.trim().toLowerCase())
      );
    }
    return list;
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  openDish(dish: Dish): void {
    this.router.navigate(['/plat', dish.id]);
  }

  addToCart(dish: Dish): void {
    this.cartService.add(dish);
  }
}
