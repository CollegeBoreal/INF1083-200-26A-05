import { Injectable, signal } from '@angular/core';
import { Person } from './person';

@Injectable({providedIn: 'root'})
export class PersonService {
  items = signal<Person[]>([
  { id: 1, name: 'Vladimir Guerrero Jr.', nationality: 'Canadian/Dominican', notableAchievements: ['MLB All-Star', 'Silver Slugger Award winner'] },
  { id: 2, name: 'Bo Bichette', nationality: 'American', notableAchievements: ['MLB All-Star', 'One of the top shortstops in baseball'] },
  { id: 3, name: 'George Springer', nationality: 'American', notableAchievements: ['World Series champion', 'MLB All-Star'] },
  { id: 4, name: 'Kevin Gausman', nationality: 'American', notableAchievements: ['MLB All-Star pitcher', 'Strikeout specialist'] },
  { id: 5, name: 'José Berríos', nationality: 'Puerto Rican', notableAchievements: ['MLB All-Star', 'Reliable starting pitcher'] },
  { id: 6, name: 'Daulton Varsho', nationality: 'American', notableAchievements: ['Gold Glove winner', 'Elite defensive outfielder'] },
  { id: 7, name: 'Alejandro Kirk', nationality: 'Mexican', notableAchievements: ['MLB All-Star catcher', 'Strong offensive contributor'] },
  { id: 8, name: 'Chris Bassitt', nationality: 'American', notableAchievements: ['Veteran MLB pitcher', 'Consistent starter'] },
  { id: 9, name: 'Jordan Romano', nationality: 'Canadian', notableAchievements: ['MLB All-Star closer', 'One of Canada\'s top baseball players'] },
  { id: 10, name: 'Ernie Clement', nationality: 'American', notableAchievements: ['Versatile infielder', 'Excellent defensive player'] },
  { id: 11, name: 'Davis Schneider', nationality: 'American', notableAchievements: ['Power hitter', 'Promising young player'] },
  { id: 12, name: 'Nathan Lukes', nationality: 'Canadian', notableAchievements: ['Outfielder', 'Strong defensive skills'] },
  { id: 13, name: 'Will Wagner', nationality: 'American', notableAchievements: ['Infielder', 'Developing MLB talent'] },
  { id: 14, name: 'Alan Roden', nationality: 'Canadian', notableAchievements: ['Top prospect', 'Strong batting performance'] },
  { id: 15, name: 'Addison Barger', nationality: 'Canadian', notableAchievements: ['Utility player', 'Promising young talent'] },
]);

  getPerson(id: number): Person | undefined {
  return this.items().find((person) => person.id === id);
}
}
