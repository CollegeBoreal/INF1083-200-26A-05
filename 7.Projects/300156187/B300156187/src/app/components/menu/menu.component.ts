import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { CartService } from '../../services/cart.service';
import { ThemeService } from '../../services/theme.service';
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
  search = '';
  categories = ['Toutes', 'Pizzas', 'Burgers', 'Tacos', 'Sandwichs', 'Desserts', 'Boissons'];
  selectedCategory = 'Toutes';

  // Emojis d'affichage des chips (la valeur filtrée reste le nom simple).
  categoryEmoji: Record<string, string> = {
    Toutes: '🍽️',
    Pizzas: '🍕',
    Burgers: '🍔',
    Tacos: '🌮',
    Sandwichs: '🥪',
    Desserts: '🍰',
    Boissons: '🥤',
  };

  constructor(
    private data: DataService,
    private cartService: CartService,
    public theme: ThemeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.data.getDishes().subscribe((dishes) => {
      this.dishes = dishes;
      this.loading = false;
    });
  }

  get filteredDishes(): Dish[] {
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
    this.cartService.addToCart(dish);
  }
}
