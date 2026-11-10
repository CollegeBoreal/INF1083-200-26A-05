import { Injectable, signal } from '@angular/core';
import { Person } from './person';

@Injectable({providedIn: 'root'})
export class PersonService {
  items = signal<Person[]>([
    { id: 1, name: 'Jean-Joseph Rabearivelo', nationality: 'Malagasy', notableAchievements: ['Modern Malagasy poetry pioneer', 'Promoted Malagasy literature and cultural identity'] },
    { id: 2, name: 'Jacques Rabemananjara', nationality: 'Malagasy', notableAchievements: ['Poet, writer and intellectual', 'Celebrated Malagasy heritage through literature'] },
    { id: 3, name: 'Elie Rajaonarison', nationality: 'Malagasy', notableAchievements: ['Prominent Malagasy poet', 'Contributed to the revival of poetic expression in Madagascar'] },
    { id: 4, name: 'Flavien Ranaivo', nationality: 'Malagasy', notableAchievements: ['Known for poetic works', 'Helped shape modern Malagasy literary voices'] },
    { id: 5, name: 'Jean-Luc Raharimanana', nationality: 'Malagasy', notableAchievements: ['Writer and poet', 'Blended Malagasy cultural themes with modern storytelling'] },
    { id: 6, name: 'Daniel Rakotondravony', nationality: 'Malagasy', notableAchievements: ['Poet of Malagasy literature', 'Noted for lyrical reflections on identity and memory'] },
    { id: 7, name: 'Rado Raveloson', nationality: 'Malagasy', notableAchievements: ['Contemporary Malagasy poet', 'Known for expressive and socially engaged verse'] },
    { id: 8, name: 'Mialy Rindranirina', nationality: 'Malagasy', notableAchievements: ['Modern poet and writer', 'Contributed to contemporary Malagasy cultural expression'] },
    { id: 9, name: 'Haja Ramanjato', nationality: 'Malagasy', notableAchievements: ['Poet and cultural advocate', 'Using poetry to preserve Malagasy language and traditions'] },
    { id: 10, name: 'Tiana Rakotomalala', nationality: 'Malagasy', notableAchievements: ['Malagasy poet and literary voice', 'Celebrated for lyrical works and public culture'] },
  ]);

  getPerson(id: number): Person {
    return this.items().find((person) => person.id === id);
  }
}
