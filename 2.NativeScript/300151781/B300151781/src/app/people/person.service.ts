import { Injectable, signal } from '@angular/core';
import { Person } from './person';

// Nouvelle liste : villes du monde
// name = ville, nationality = pays, notableAchievements = points forts
@Injectable({providedIn: 'root'})
export class PersonService {
  items = signal<Person[]>([
    { id: 1, name: 'Montréal', nationality: 'Canada', notableAchievements: ['Deuxième plus grande ville francophone du monde', 'Festival international de jazz', 'Ville de l\'intelligence artificielle (Mila)'] },
    { id: 2, name: 'Toronto', nationality: 'Canada', notableAchievements: ['Plus grande ville du Canada', 'Tour CN (553 m)', 'Centre financier du pays'] },
    { id: 3, name: 'Alger', nationality: 'Algérie', notableAchievements: ['Surnommée « Alger la Blanche »', 'Casbah classée au patrimoine mondial de l\'UNESCO', 'Mémorial du Martyr'] },
    { id: 4, name: 'Paris', nationality: 'France', notableAchievements: ['Tour Eiffel', 'Musée du Louvre', 'Jeux olympiques de 2024'] },
    { id: 5, name: 'Tokyo', nationality: 'Japon', notableAchievements: ['Plus grande agglomération du monde', 'Trains à grande vitesse Shinkansen', 'Quartier technologique d\'Akihabara'] },
    { id: 6, name: 'New York', nationality: 'États-Unis', notableAchievements: ['Statue de la Liberté', 'Times Square', 'Siège des Nations Unies'] },
    { id: 7, name: 'Le Caire', nationality: 'Égypte', notableAchievements: ['Pyramides de Gizeh à proximité', 'Plus grande ville d\'Afrique', 'Musée égyptien'] },
    { id: 8, name: 'Istanbul', nationality: 'Turquie', notableAchievements: ['Ville sur deux continents', 'Sainte-Sophie', 'Grand Bazar'] },
    { id: 9, name: 'Dubaï', nationality: 'Émirats arabes unis', notableAchievements: ['Burj Khalifa, plus haute tour du monde (828 m)', 'Îles artificielles Palm Jumeirah'] },
    { id: 10, name: 'Rio de Janeiro', nationality: 'Brésil', notableAchievements: ['Christ Rédempteur', 'Carnaval de Rio', 'Plage de Copacabana'] },
    { id: 11, name: 'Sydney', nationality: 'Australie', notableAchievements: ['Opéra de Sydney', 'Harbour Bridge'] },
    { id: 12, name: 'Marrakech', nationality: 'Maroc', notableAchievements: ['Place Jemaa el-Fna', 'Jardin Majorelle', 'Médina classée à l\'UNESCO'] },
    { id: 13, name: 'Londres', nationality: 'Royaume-Uni', notableAchievements: ['Big Ben', 'British Museum', 'Métro le plus ancien du monde (1863)'] },
    { id: 14, name: 'Séoul', nationality: 'Corée du Sud', notableAchievements: ['Capitale de la K-pop', 'Palais Gyeongbokgung', 'Siège de Samsung'] },
    { id: 15, name: 'Barcelone', nationality: 'Espagne', notableAchievements: ['Sagrada Família', 'Parc Güell', 'FC Barcelone'] },
  ]);

  getPerson(id: number): Person {
    return this.items().find((person) => person.id === id);
  }
}
