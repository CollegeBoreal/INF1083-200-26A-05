import { Injectable, signal } from '@angular/core';
import { Person } from './person';

@Injectable({ providedIn: 'root' })
export class PersonService {
  readonly people = signal<Person[]>([
    {
      id: 1,
      name: 'Miriam Makeba',
      nationality: 'Sud-africaine',
      description: 'Chanteuse célèbre surnommée Mama Africa. Elle a fait connaître la musique sud-africaine dans le monde.',
      achievements: ['Chanteuse internationale', 'Interprète de la chanson Pata Pata', 'Militante contre l’apartheid']
    },
    {
      id: 2,
      name: 'Mory Kanté',
      nationality: 'Guinéenne',
      description: 'Musicien et chanteur guinéen reconnu pour son travail autour de la musique traditionnelle et de la kora.',
      achievements: ['Chanteur et joueur de kora', 'Succès international Yéké Yéké', 'A contribué à faire connaître la musique africaine']
    },
    {
      id: 3,
      name: 'Wangari Maathai',
      nationality: 'Kényane',
      description: 'Militante écologiste et politique qui a défendu la protection de l’environnement et les droits des femmes.',
      achievements: ['Fondatrice du Green Belt Movement', 'Prix Nobel de la paix en 2004', 'Première femme africaine à recevoir ce prix']
    },
    {
      id: 4,
      name: 'Nelson Mandela',
      nationality: 'Sud-africaine',
      description: 'Dirigeant de la lutte contre l’apartheid et ancien président de l’Afrique du Sud.',
      achievements: ['Prix Nobel de la paix en 1993', 'Premier président noir d’Afrique du Sud', 'Symbole mondial de réconciliation']
    },
    {
      id: 5,
      name: 'Salif Keita',
      nationality: 'Malienne',
      description: 'Chanteur malien connu pour sa voix et pour le mélange de musique traditionnelle mandingue et de sonorités modernes.',
      achievements: ['Surnommé la Voix d’or de l’Afrique', 'Carrière musicale internationale', 'Ambassadeur de la musique mandingue']
    }
  ]);

  getPerson(id: number): Person | undefined {
    return this.people().find(person => person.id === id);
  }
}
