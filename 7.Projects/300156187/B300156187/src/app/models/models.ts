export type Category = 'Pizzas' | 'Burgers' | 'Tacos' | 'Sandwichs' | 'Desserts' | 'Boissons';

export interface Restaurant {
  id: number;
  name: string;
  address: string;
  rating: number;
  image: string;
}

export interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  rating: number;
  popular: boolean;
}

export interface CartItem {
  dish: Dish;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: string;
}

export interface Reservation {
  id: string;
  date: string;
  time: string;
  persons: number;
  name: string;
  phone: string;
}

export interface User {
  id?: number;
  name: string;
  email: string;
  phone: string;
}
