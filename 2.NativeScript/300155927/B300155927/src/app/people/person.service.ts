import { Injectable, signal } from '@angular/core';
import { Person } from './person';

@Injectable({providedIn: 'root'})
export class PersonService {
  items = signal<Person[]>([
    {
    id: 1,
    name: 'Jacques Roumain',
    nationality: 'Haitian',
    notableAchievements: ['Author of Masters of the Dew', 'Founder of Haitian Ethnology Office']
  },
  {
    id: 2,
    name: 'Edwidge Danticat',
    nationality: 'Haitian-American',
    notableAchievements: ['Author of Breath, Eyes, Memory', 'Author of Krik? Krak!']
  },
  {
    id: 3,
    name: 'Frankétienne',
    nationality: 'Haitian',
    notableAchievements: ['Father of Haitian letters', 'Creator of Spiralism']
  },
  {
    id: 4,
    name: 'Dany Laferrière',
    nationality: 'Haitian-Canadian',
    notableAchievements: ['Member of the Académie française', 'Author of The Return']
  },
  {
    id: 5,
    name: 'Jacques Stephen Alexis',
    nationality: 'Haitian',
    notableAchievements: ['Author of Compère Général Soleil', 'Major Haitian novelist']
  },
  {
    id: 6,
    name: 'Marie Vieux-Chauvet',
    nationality: 'Haitian',
    notableAchievements: ['Author of Love, Anger, Madness']
  },
  {
    id: 7,
    name: 'René Depestre',
    nationality: 'Haitian',
    notableAchievements: ['Poet and novelist', 'Author of Hadriana in All My Dreams']
  },
  {
    id: 8,
    name: 'Yanick Lahens',
    nationality: 'Haitian',
    notableAchievements: ['Prix Femina winner', 'Author of Bain de Lune']
  },
  {
    id: 9,
    name: 'Émile Ollivier',
    nationality: 'Haitian-Canadian',
    notableAchievements: ['Prominent novelist', 'Author of Passages']
  },
  {
    id: 10,
    name: 'Anténor Firmin',
    nationality: 'Haitian',
    notableAchievements: ['Author of On the Equality of Human Races', 'Scholar and diplomat']
  },
  {
    id: 11,
    name: 'Oswald Durand',
    nationality: 'Haitian',
    notableAchievements: ['Poet of Choucoune', 'National literary figure']
  },
  {
    id: 12,
    name: 'Jean Price-Mars',
    nationality: 'Haitian',
    notableAchievements: ['Ethnologist and writer', 'Pioneer of Haitian indigénisme']
  },
  {
    id: 13,
    name: 'Makenzy Orcel',
    nationality: 'Haitian',
    notableAchievements: ['Award-winning novelist', 'Author of The Immortals']
  },
  {
    id: 14,
    name: 'Gary Victor',
    nationality: 'Haitian',
    notableAchievements: ['Prolific novelist', 'Master of Haitian crime fiction']
  },
  {
    id: 15,
    name: 'Louis-Philippe Dalembert',
    nationality: 'Haitian',
    notableAchievements: ['Internationally acclaimed novelist', 'Multiple literary awards']
  }
];
  getPerson(id: number): Person {
    return this.items().find((person) => person.id === id);
  }
}
