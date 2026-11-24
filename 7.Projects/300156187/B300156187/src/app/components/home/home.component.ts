import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Application } from '@nativescript/core';
import { DataService } from '../../services/data.service';
import { CartService } from '../../services/cart.service';
import { ThemeService } from '../../services/theme.service';
import { Dish, Restaurant } from '../../models/models';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit {
  loading = true;
  restaurants: Restaurant[] = [];
  popularDishes: Dish[] = [];
  search = '';
  categories = ['Toutes', 'Pizzas', 'Burgers', 'Tacos', 'Sandwichs', 'Desserts', 'Boissons'];
  selectedCategory = 'Toutes';

  constructor(
    private data: DataService,
    private cartService: CartService,
    public theme: ThemeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.data.getRestaurants().subscribe((restaurants) => {
      this.restaurants = restaurants;
    });
    this.data.getDishes().subscribe((dishes) => {
      this.popularDishes = dishes.filter((dish) => dish.popular);
      this.loading = false;
    });
  }

  get filteredDishes(): Dish[] {
    let list = this.popularDishes;
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

  toggleTheme(): void {
    this.theme.toggle();
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
  }
}
