import { Injectable, signal } from '@angular/core';
import { Person } from './person';

@Injectable({providedIn: 'root'})
export class PersonService {
items = signal<Person[]>([
  { id: 1, name: 'Adolf Hitler', nationality: 'Austrian-German', notableAchievements: ['Chancellor of Germany from 1933', 'Leader of Nazi Germany during World War II'] },

  { id: 2, name: 'Joseph Stalin', nationality: 'Georgian-Soviet', notableAchievements: ['Leader of the Soviet Union', 'Led the USSR during most of World War II'] },

  { id: 3, name: 'Winston Churchill', nationality: 'British', notableAchievements: ['Prime Minister of the United Kingdom', 'Led Britain during much of World War II'] },

  { id: 4, name: 'Franklin D. Roosevelt', nationality: 'American', notableAchievements: ['32nd President of the United States', 'Led the United States during most of World War II'] },

  { id: 5, name: 'Benito Mussolini', nationality: 'Italian', notableAchievements: ['Prime Minister of Italy', 'Founder and leader of Italian Fascism'] },

  { id: 6, name: 'Charles de Gaulle', nationality: 'French', notableAchievements: ['Leader of Free France during World War II', 'President of France'] },

  { id: 7, name: 'Vladimir Lenin', nationality: 'Russian', notableAchievements: ['Leader of the Bolshevik Revolution', 'First head of government of Soviet Russia'] },

  { id: 8, name: 'Mao Zedong', nationality: 'Chinese', notableAchievements: ['Founding leader of the People’s Republic of China', 'Leader of the Chinese Communist Party'] },

  { id: 9, name: 'Nelson Mandela', nationality: 'South African', notableAchievements: ['President of South Africa', 'Major figure in the struggle against apartheid'] },

  { id: 10, name: 'Mahatma Gandhi', nationality: 'Indian', notableAchievements: ['Leader of the Indian independence movement', 'Advocated nonviolent resistance'] },

  { id: 11, name: 'John F. Kennedy', nationality: 'American', notableAchievements: ['35th President of the United States', 'President during the Cuban Missile Crisis'] },

  { id: 12, name: 'Fidel Castro', nationality: 'Cuban', notableAchievements: ['Leader of the Cuban Revolution', 'Led Cuba for several decades'] },

  { id: 13, name: 'Margaret Thatcher', nationality: 'British', notableAchievements: ['Prime Minister of the United Kingdom', 'First woman to serve as British prime minister'] },

  { id: 14, name: 'Napoleon Bonaparte', nationality: 'French', notableAchievements: ['Emperor of the French', 'Introduced the Napoleonic Code'] },

  { id: 15, name: 'Abraham Lincoln', nationality: 'American', notableAchievements: ['16th President of the United States', 'Led the United States during the Civil War'] },
]);

  getPerson(id: number): Person {
    return this.items().find((person) => person.id === id);
  }
}
