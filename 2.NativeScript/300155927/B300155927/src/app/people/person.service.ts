import { Injectable, signal } from '@angular/core';
import { Person } from './person';

@Injectable({providedIn: 'root'})
export class PersonService {
  items = signal<Person[]>([
    {
    id: 1,
    name: 'Lionel Messi',
    nationality: 'Argentine',
    notableAchievements: ['8 Ballon d\'Or awards', '2022 FIFA World Cup winner']
  },
  {
    id: 2,
    name: 'Cristiano Ronaldo',
    nationality: 'Portuguese',
    notableAchievements: ['5 Ballon d\'Or awards', 'UEFA Champions League all-time top scorer']
  },
  {
    id: 3,
    name: 'Neymar Jr.',
    nationality: 'Brazilian',
    notableAchievements: ['Olympic Gold Medal winner', 'Champions League winner']
  },
  {
    id: 4,
    name: 'Kylian Mbappé',
    nationality: 'French',
    notableAchievements: ['2018 FIFA World Cup winner', 'Multiple Ligue 1 titles']
  },
  {
    id: 5,
    name: 'Luka Modrić',
    nationality: 'Croatian',
    notableAchievements: ['2018 Ballon d\'Or winner', 'Multiple Champions League titles']
  },
  {
    id: 6,
    name: 'Kevin De Bruyne',
    nationality: 'Belgian',
    notableAchievements: ['Premier League champion', 'Champions League winner']
  },
  {
    id: 7,
    name: 'Erling Haaland',
    nationality: 'Norwegian',
    notableAchievements: ['Premier League Golden Boot', 'Champions League winner']
  },
  {
    id: 8,
    name: 'Robert Lewandowski',
    nationality: 'Polish',
    notableAchievements: ['European Golden Shoe winner', 'Champions League winner']
  },
  {
    id: 9,
    name: 'Mohamed Salah',
    nationality: 'Egyptian',
    notableAchievements: ['Premier League champion', 'Champions League winner']
  },
  {
    id: 10,
    name: 'Lamine Yamal',
    nationality: 'Spanish',
    notableAchievements: ['UEFA Euro 2024 winner', 'Golden Boy award winner', 'FC Barcelona rising star']
  },
  {
    id: 11,
    name: 'Karim Benzema',
    nationality: 'French',
    notableAchievements: ['2022 Ballon d\'Or winner', 'Multiple Champions League titles']
  },
  {
    id: 12,
    name: 'Harry Kane',
    nationality: 'English',
    notableAchievements: ['England captain', 'Multiple Golden Boot awards']
  },
  {
    id: 13,
    name: 'Jude Bellingham',
    nationality: 'English',
    notableAchievements: ['Golden Boy award winner', 'La Liga champion']
  },
  {
    id: 14,
    name: 'Vinícius Júnior',
    nationality: 'Brazilian',
    notableAchievements: ['Champions League winner', 'La Liga champion']
  },
  {
    id: 15,
    name: 'Pedri',
    nationality: 'Spanish',
    notableAchievements: ['Golden Boy award winner', 'European Championship participant']
  }
];
  getPerson(id: number): Person {
    return this.items().find((person) => person.id === id);
  }
}
