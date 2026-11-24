
import { Injectable } from '@angular/core';
import { ApplicationSettings } from '@nativescript/core';

export interface DataItem {
  id: number;
  name: string;
  description: string;
}

export interface Outfit {
  id: number;
  name: string;
  category: string;
  image: string;
  favorite: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private outfits: Outfit[] = [
    {
      id: 1,
      name: 'Pink Princess 🎀',
      category: 'Chic',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600',
      favorite: false
    },
    {
      id: 2,
      name: 'Classic Black 🖤',
      category: 'Casual',
      image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600',
      favorite: false
    },
    {
      id: 3,
      name: 'Elegant Dress 🌸',
      category: 'Evening',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600',
      favorite: false
    },
    {
      id: 4,
      name: 'Soft Girl 💗',
      category: 'Casual',
      image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600',
      favorite: false
    },
    {
      id: 5,
      name: 'Summer Vibes ☀️',
      category: 'Summer',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600',
      favorite: false
    },
    {
      id: 6,
      name: 'Pink Mood 🌷',
      category: 'Chic',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600',
      favorite: false
    }
  ];

  private readonly storageKey = 'fashionmood_favorites';

  private getFavoriteIds(): number[] {
    const saved = ApplicationSettings.getString(this.storageKey, '[]');

    try {
      return JSON.parse(saved) as number[];
    } catch {
      return [];
    }
  }

  getOutfits(): Outfit[] {
    const favoriteIds = this.getFavoriteIds();

    this.outfits.forEach(outfit => {
      outfit.favorite = favoriteIds.includes(outfit.id);
    });

    return this.outfits;
  }

  getFavorites(): Outfit[] {
    const favoriteIds = this.getFavoriteIds();

    return this.getOutfits().filter(
      outfit => favoriteIds.includes(outfit.id)
    );
  }

  toggleFavorite(outfit: Outfit): void {
    const favoriteIds = this.getFavoriteIds();

    const index = favoriteIds.indexOf(outfit.id);

    if (index === -1) {
      favoriteIds.push(outfit.id);
    } else {
      favoriteIds.splice(index, 1);
    }

    ApplicationSettings.setString(
      this.storageKey,
      JSON.stringify(favoriteIds)
    );

    this.getOutfits();
  }

  getItem(id: number): DataItem {
    const outfit = this.outfits.find(item => item.id === id);

    return {
      id,
      name: outfit ? outfit.name : 'Item ' + id,
      description: outfit ? outfit.category : 'Fashion outfit'
    };
  }
}
