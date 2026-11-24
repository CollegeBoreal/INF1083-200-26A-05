import { Injectable, signal } from '@angular/core';
import { Person } from './person';

@Injectable({providedIn: 'root'})
export class PersonService {
  items = signal<Person[]>([
    { id: 1, name: 'Lamine Yamal', nationality: 'Spanish', notableAchievements: ['Euro 2024 winner', 'Golden Boy 2024'] },
    { id: 2, name: 'Pedri', nationality: 'Spanish', notableAchievements: ['Golden Boy 2021', 'Euro 2024 winner'] },
    { id: 3, name: 'Gavi', nationality: 'Spanish', notableAchievements: ['Golden Boy 2022', 'Kopa Trophy 2022'] },
    { id: 4, name: 'Raphinha', nationality: 'Brazilian', notableAchievements: ['La Liga champion 2023', 'FC Barcelona winger'] },
    { id: 5, name: 'Frenkie de Jong', nationality: 'Dutch', notableAchievements: ['La Liga champion 2023', 'UEFA Nations League finalist 2019'] },
    { id: 6, name: 'Jules Koundé', nationality: 'French', notableAchievements: ['Europa League winner 2020', 'La Liga champion 2023'] },
    { id: 7, name: 'Ronald Araújo', nationality: 'Uruguayan', notableAchievements: ['La Liga champion 2023', 'Spanish Super Cup winner 2023'] },
    { id: 8, name: 'Dani Olmo', nationality: 'Spanish', notableAchievements: ['Euro 2024 winner', 'Euro 2024 joint top scorer'] },
    { id: 9, name: 'Ferran Torres', nationality: 'Spanish', notableAchievements: ['Euro 2024 winner', 'Premier League champion 2021'] },
    { id: 10, name: 'Pau Cubarsí', nationality: 'Spanish', notableAchievements: ['Olympic gold medal 2024', 'La Masia graduate'] },
  ]);

  getPerson(id: number): Person {
    return this.items().find((person) => person.id === id);
  }
}
