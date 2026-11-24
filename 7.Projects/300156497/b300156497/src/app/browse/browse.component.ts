
import { Component } from '@angular/core';
import { DataService, Outfit } from '../shared/data.service';

@Component({
  standalone: false,
  selector: 'Browse',
  templateUrl: './browse.component.html',
})
export class BrowseComponent {

  constructor(private dataService: DataService) {}

  get favorites(): Outfit[] {
    return this.dataService.getFavorites();
  }

  removeFavorite(outfit: Outfit): void {
    this.dataService.toggleFavorite(outfit);
  }
}


