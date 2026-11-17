import { Injectable, signal } from '@angular/core';
import { Person } from './person';

@Injectable({providedIn: 'root'})
export class PersonService {
  items = signal<Person[]>([
    { id: 1, name: 'Miriam Makeba', nationality: 'South African', notableAchievements: ['Singer known as Mama Africa', 'Hit song "Pata Pata"'] },
    { id: 2, name: 'Mory Kanté', nationality: 'Guinean', notableAchievements: ['Singer and kora player', 'Hit song "Yéké Yéké"'] },
    { id: 3, name: 'Wangari Maathai', nationality: 'Kenyan', notableAchievements: ['Founder of the Green Belt Movement', 'Nobel Peace Prize 2004'] },
    { id: 4, name: 'Nelson Mandela', nationality: 'South African', notableAchievements: ['Anti-apartheid leader', 'President of South Africa from 1994 to 1999'] },
    { id: 5, name: 'Salif Keita', nationality: 'Malian', notableAchievements: ['Singer known as the Golden Voice of Africa'] },
  ]);

  getPerson(id: number): Person {
    return this.items().find((person) => person.id === id);
  }
}