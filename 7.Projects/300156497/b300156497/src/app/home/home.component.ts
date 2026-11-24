import { Component } from '@angular/core';
import { DataService, Outfit } from '../shared/data.service';

@Component({
  standalone: false,
  selector: 'Home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  categories: string[] = [
    'All',
    'Casual',
    'Chic',
    'Evening',
    'Summer'
  ];

  selectedCategory = 'All';

  constructor(private dataService: DataService) {}

  get outfits(): Outfit[] {
    return this.dataService.getOutfits();
  }

  get filteredOutfits(): Outfit[] {
    if (this.selectedCategory === 'All') {
      return this.outfits;
    }

    return this.outfits.filter(
      outfit => outfit.category === this.selectedCategory
    );
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  toggleFavorite(outfit: Outfit): void {
    this.dataService.toggleFavorite(outfit);
  }
}


