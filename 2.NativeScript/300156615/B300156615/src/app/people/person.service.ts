import { Injectable, signal } from '@angular/core';
import { Person } from './person';

@Injectable({providedIn: 'root'})
export class PersonService {
  items = signal<Person[]>([
    { id: 1, name: 'Michael Jackson', nationality: 'Américaine', notableAchievements: ['Album Thriller (1982)', 'Surnommé le Roi de la pop'] },
    { id: 2, name: 'Céline Dion', nationality: 'Canadienne', notableAchievements: ["Victoire à l'Eurovision 1988", 'Chanson My Heart Will Go On (1997)'] },
    { id: 3, name: 'The Weeknd', nationality: 'Canadienne', notableAchievements: ['Chanson Blinding Lights', 'Spectacle du Super Bowl 2021'] },
    { id: 4, name: 'Drake', nationality: 'Canadienne', notableAchievements: ['Chanson One Dance (2016)', 'Album Scorpion (2018)'] },
    { id: 5, name: 'Khaled', nationality: 'Algérienne', notableAchievements: ['Chansons Didi et Aïcha', 'Surnommé le Roi du raï'] },
    { id: 6, name: 'Dahmane El Harrachi', nationality: 'Algérienne', notableAchievements: ['Chanson Ya Rayah', 'Figure du chaâbi algérien'] },
    { id: 7, name: 'Fairuz', nationality: 'Libanaise', notableAchievements: ['Voix majeure du monde arabe', 'Carrière de plus de 50 ans'] },
    { id: 8, name: 'Oum Kalthoum', nationality: 'Égyptienne', notableAchievements: ["Surnommée l'Étoile de l'Orient", 'Concerts radiodiffusés dans tout le monde arabe'] },
    { id: 9, name: 'Beyoncé', nationality: 'Américaine', notableAchievements: ['Album Lemonade (2016)', 'Nombreux Grammy Awards'] },
    { id: 10, name: 'Bob Marley', nationality: 'Jamaïcaine', notableAchievements: ['Album Exodus (1977)', 'Ambassadeur mondial du reggae'] },
    { id: 11, name: 'Wolfgang Amadeus Mozart', nationality: 'Autrichienne', notableAchievements: ['Opéra La Flûte enchantée (1791)', 'Plus de 600 œuvres'] },
    { id: 12, name: 'Ludwig van Beethoven', nationality: 'Allemande', notableAchievements: ['Neuvième symphonie (1824)', 'Compositeur devenu sourd'] },
    { id: 13, name: 'Adele', nationality: 'Britannique', notableAchievements: ['Album 21 (2011)', 'Chanson Hello (2015)'] },
    { id: 14, name: 'Stromae', nationality: 'Belge', notableAchievements: ['Chanson Papaoutai (2013)', 'Album Racine carrée'] },
    { id: 15, name: 'Burna Boy', nationality: 'Nigériane', notableAchievements: ['Grammy Award 2021 pour Twice as Tall', "Figure de l'afrobeats"] },
  ]);

  getItem(id: number): Person | undefined {
    return this.items().find((item) => item.id === id);
  }
}