import { Injectable, signal } from '@angular/core';
import { Person } from './person';

// Liste modifiée par Aidene Arezki (300151505) : Footballeurs célèbres
@Injectable({providedIn: 'root'})
export class PersonService {
  items = signal<Person[]>([
    { id: 1, name: 'Zinédine Zidane', nationality: 'Française (origine kabyle, Algérie)', notableAchievements: ['Champion du monde 1998', 'Ballon d\'Or 1998', '3 Ligues des champions comme entraîneur du Real Madrid'] },
    { id: 2, name: 'Riyad Mahrez', nationality: 'Algérienne', notableAchievements: ['Champion d\'Afrique 2019 avec l\'Algérie', 'Champion d\'Angleterre avec Leicester (2016)', 'Ligue des champions 2023 avec Manchester City'] },
    { id: 3, name: 'Rabah Madjer', nationality: 'Algérienne', notableAchievements: ['Talonnade célèbre en finale de Coupe d\'Europe 1987 (FC Porto)', 'Champion d\'Afrique 1990'] },
    { id: 4, name: 'Lakhdar Belloumi', nationality: 'Algérienne', notableAchievements: ['Ballon d\'Or africain 1981', 'But historique contre l\'Allemagne de l\'Ouest (Coupe du monde 1982)'] },
    { id: 5, name: 'Lionel Messi', nationality: 'Argentine', notableAchievements: ['Champion du monde 2022', '8 Ballons d\'Or'] },
    { id: 6, name: 'Cristiano Ronaldo', nationality: 'Portugaise', notableAchievements: ['5 Ballons d\'Or', 'Meilleur buteur de l\'histoire en sélection nationale'] },
    { id: 7, name: 'Pelé', nationality: 'Brésilienne', notableAchievements: ['3 Coupes du monde (1958, 1962, 1970)'] },
    { id: 8, name: 'Diego Maradona', nationality: 'Argentine', notableAchievements: ['Champion du monde 1986', 'Le « but du siècle » contre l\'Angleterre'] },
    { id: 9, name: 'Kylian Mbappé', nationality: 'Française', notableAchievements: ['Champion du monde 2018', 'Triplé en finale de Coupe du monde 2022'] },
    { id: 10, name: 'Mohamed Salah', nationality: 'Égyptienne', notableAchievements: ['Ligue des champions 2019 avec Liverpool', 'Plusieurs fois meilleur buteur de Premier League'] },
    { id: 11, name: 'Didier Drogba', nationality: 'Ivoirienne', notableAchievements: ['Ligue des champions 2012 avec Chelsea', 'Ballon d\'Or africain 2006 et 2009'] },
    { id: 12, name: 'Ronaldinho', nationality: 'Brésilienne', notableAchievements: ['Champion du monde 2002', 'Ballon d\'Or 2005'] },
    { id: 13, name: 'Johan Cruyff', nationality: 'Néerlandaise', notableAchievements: ['3 Ballons d\'Or', 'Père du « football total »'] },
    { id: 14, name: 'Alphonso Davies', nationality: 'Canadienne', notableAchievements: ['Ligue des champions 2020 avec le Bayern Munich', 'Star de l\'équipe du Canada'] },
    { id: 15, name: 'Christine Sinclair', nationality: 'Canadienne', notableAchievements: ['Meilleure buteuse de l\'histoire en sélection (hommes et femmes)', 'Championne olympique 2021'] },
  ]);

  getPerson(id: number): Person {
    return this.items().find((person) => person.id === id);
  }
}
