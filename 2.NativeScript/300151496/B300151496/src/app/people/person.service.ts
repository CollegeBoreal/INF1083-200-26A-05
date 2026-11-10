import { Injectable, signal } from '@angular/core';

import { Person } from './person';

@Injectable({providedIn: 'root'})
export class PersonService {
  items = signal([
    { id: 1, name: 'Michael Jordan', nationality: 'American', notableAchievements: ['6x NBA champion', '5x MVP'] },
    { id: 2, name: 'LeBron James', nationality: 'American', notableAchievements: ['4x NBA champion', '4x MVP'] },
    { id: 3, name: 'Stephen Curry', nationality: 'American', notableAchievements: ['4x NBA champion', '2x MVP'] },
    { id: 4, name: 'Kobe Bryant', nationality: 'American', notableAchievements: ['5x NBA champion', '2x Finals MVP'] },
    { id: 5, name: "Shaquille O'Neal", nationality: 'American', notableAchievements: ['4x NBA champion', '3x Finals MVP'] },
    { id: 6, name: 'Kevin Durant', nationality: 'American', notableAchievements: ['2x NBA champion', '2x Finals MVP'] },
    { id: 7, name: 'Giannis Antetokounmpo', nationality: 'Greek', notableAchievements: ['NBA champion 2021', '2x MVP'] },
    { id: 8, name: 'Nikola Jokic', nationality: 'Serbian', notableAchievements: ['NBA champion 2023', '3x MVP'] },
    { id: 9, name: 'Luka Doncic', nationality: 'Slovenian', notableAchievements: ['5x All-Star', 'Scoring champion 2024'] },
    { id: 10, name: 'Magic Johnson', nationality: 'American', notableAchievements: ['5x NBA champion', '3x MVP'] },
  ]);

  getPerson(id: number): Person {
    return this.items().find((person) => person.id === id);
  }
}
