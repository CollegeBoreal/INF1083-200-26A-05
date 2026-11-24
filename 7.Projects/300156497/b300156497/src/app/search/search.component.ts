
import { Component } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  standalone: false,
  selector: 'Search',
  templateUrl: './search.component.html',
})
export class SearchComponent {

  constructor(private dataService: DataService) {}

  get favoritesCount(): number {
    return this.dataService.getFavorites().length;
  }

  get outfitsCount(): number {
    return this.dataService.getOutfits().length;
  }
}
