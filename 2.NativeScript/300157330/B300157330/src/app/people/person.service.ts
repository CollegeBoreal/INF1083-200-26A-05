import { Injectable, signal } from '@angular/core';
import { Person } from './person';

@Injectable({ providedIn: 'root' })
export class PersonService {
  items = signal<Person[]>([
    {
      id: 1,
      name: 'Denzel Washington',
      nationality: 'Américaine',
      notableAchievements: ['Training Day', 'Malcolm X'],
    },
    {
      id: 2,
      name: 'Viola Davis',
      nationality: 'Américaine',
      notableAchievements: ['Fences', 'The Woman King'],
    },
    {
      id: 3,
      name: 'Keanu Reeves',
      nationality: 'Canadienne',
      notableAchievements: ['The Matrix', 'John Wick'],
    },
    {
      id: 4,
      name: 'Michelle Yeoh',
      nationality: 'Malaisienne',
      notableAchievements: ['Everything Everywhere All at Once', 'Crazy Rich Asians'],
    },
    {
      id: 5,
      name: 'Leonardo DiCaprio',
      nationality: 'Américaine',
      notableAchievements: ['Titanic', 'Inception'],
    },
    {
      id: 6,
      name: 'Margot Robbie',
      nationality: 'Australienne',
      notableAchievements: ['Barbie', 'I, Tonya'],
    },
    {
      id: 7,
      name: 'Jackie Chan',
      nationality: 'Chinoise',
      notableAchievements: ['Rush Hour', 'Shanghai Noon'],
    },
    {
      id: 8,
      name: 'Meryl Streep',
      nationality: 'Américaine',
      notableAchievements: ['The Devil Wears Prada', 'Mamma Mia!'],
    },
  ]);

  getPerson(id: number): Person {
    return this.items().find((person) => person.id === id);
  }
}