import { Injectable, signal } from '@angular/core';
import { Person } from './person';

// Liste modifiée par Rayan Lounis (300157117) : Inventeurs célèbres
@Injectable({providedIn: 'root'})
export class PersonService {
  items = signal<Person[]>([
    { id: 1, name: 'Thomas Edison', nationality: 'Américaine', notableAchievements: ['Ampoule électrique à incandescence durable', 'Phonographe'] },
    { id: 2, name: 'Nikola Tesla', nationality: 'Serbo-américaine', notableAchievements: ['Moteur à courant alternatif', 'Bobine Tesla'] },
    { id: 3, name: 'Alexander Graham Bell', nationality: 'Écossaise / Canadienne / Américaine', notableAchievements: ['Brevet du téléphone (1876)'] },
    { id: 4, name: 'Marie Curie', nationality: 'Polonaise / Française', notableAchievements: ['Découverte du polonium et du radium', 'Deux prix Nobel (physique et chimie)'] },
    { id: 5, name: 'Louis Pasteur', nationality: 'Française', notableAchievements: ['Vaccin contre la rage', 'Pasteurisation'] },
    { id: 6, name: 'Louis Lumière', nationality: 'Française', notableAchievements: ['Cinématographe (1895), avec son frère Auguste'] },
    { id: 7, name: 'Johannes Gutenberg', nationality: 'Allemande', notableAchievements: ['Imprimerie à caractères mobiles'] },
    { id: 8, name: 'Wilbur Wright', nationality: 'Américaine', notableAchievements: ['Premier vol motorisé contrôlé (1903), avec son frère Orville'] },
    { id: 9, name: 'Guglielmo Marconi', nationality: 'Italienne', notableAchievements: ['Télégraphie sans fil (radio)', 'Prix Nobel de physique (1909)'] },
    { id: 10, name: 'James Watt', nationality: 'Écossaise', notableAchievements: ['Amélioration de la machine à vapeur'] },
    { id: 11, name: 'Alessandro Volta', nationality: 'Italienne', notableAchievements: ['Pile électrique (1800)'] },
    { id: 12, name: 'Louis Braille', nationality: 'Française', notableAchievements: ['Système d\'écriture en relief pour les personnes aveugles'] },
    { id: 13, name: 'Karl Benz', nationality: 'Allemande', notableAchievements: ['Première automobile à moteur à essence (1886)'] },
    { id: 14, name: 'Hedy Lamarr', nationality: 'Austro-américaine', notableAchievements: ['Technique d\'étalement de spectre par saut de fréquence', 'Base du Wi-Fi et du Bluetooth'] },
    { id: 15, name: 'Joseph-Armand Bombardier', nationality: 'Canadienne (Québec)', notableAchievements: ['Motoneige', 'Fondateur de Bombardier'] },
  ]);

  getPerson(id: number): Person {
    return this.items().find((person) => person.id === id);
  }
}
