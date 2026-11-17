import { Injectable, signal } from '@angular/core';
import { Person } from './person';

@Injectable({providedIn: 'root'})
export class PersonService {
  readonly items = signal<Person[]>([
    {
      id: 1,
      name: 'Syphax',
      nameTifinagh: 'ⵙⵉⴼⴰⴽⵙ',
      period: '213–203 av. J.-C.',
      territoryFr: 'Massæsylie occidentale · Siga (près d’Aïn Témouchent)',
      territoryTifinagh: 'ⵎⴰⵙⴰⵙⵉⵍⵉ · ⵙⵉⴳⴰ · ⵄⵉⵏ ⵜⵉⵎⵓⵛⵉⵏⵜ',
      historyFr: [
        'Roi des Massæsyles, peuple de l’ouest de la Numidie.',
        'Son royaume avait pour centre Siga, dans l’actuelle région d’Aïn Témouchent.',
      ],
      historyTifinagh: ['ⴰⴳⴻⵍⵍⵉⴷ ⵏ ⵎⴰⵙⴰⵙⵉⵍⵉ.', 'ⵙⵉⴳⴰ · ⵄⵉⵏ ⵜⵉⵎⵓⵛⵉⵏⵜ.'],
    },
    {
      id: 2,
      name: 'Massinissa',
      nameTifinagh: 'ⵎⴰⵙⵙⵉⵏⵉⵙⵙⴰ',
      period: 'vers 202–148 av. J.-C.',
      territoryFr: 'Numidie unifiée · Cirta (actuelle Constantine)',
      territoryTifinagh: 'ⵏⵓⵎⵉⴷⵢⴰ · ⵙⵉⵔⵜⴰ · ⵇⵙⵏⵟⵉⵏⴰ',
      historyFr: [
        'Unifie les royaumes numides après la défaite de Syphax.',
        'Cirta, l’actuelle Constantine, devient la capitale de son royaume.',
      ],
      historyTifinagh: ['ⴰⴳⴻⵍⵍⵉⴷ ⵏ ⵎⴰⵙⵙⵉⵍⵉⵢⵏ.', 'ⵏⵓⵎⵉⴷⵢⴰ · ⵙⵉⵔⵜⴰ.'],
    },
    {
      id: 3,
      name: 'Micipsa',
      nameTifinagh: 'ⵎⵉⴽⵉⴱⵙⴰ',
      period: '148–118 av. J.-C.',
      territoryFr: 'Numidie · Cirta (actuelle Constantine)',
      territoryTifinagh: 'ⵏⵓⵎⵉⴷⵢⴰ · ⵙⵉⵔⵜⴰ · ⵇⵙⵏⵟⵉⵏⴰ',
      historyFr: ['Fils et successeur de Massinissa.', 'Son règne est associé au développement de Cirta.'],
      historyTifinagh: ['ⴰⴳⴻⵍⵍⵉⴷ ⵏ ⵏⵓⵎⵉⴷⵢⴰ.', 'ⵙⵉⵔⵜⴰ.'],
    },
    {
      id: 4,
      name: 'Jugurtha',
      nameTifinagh: 'ⵢⵓⴳⵓⵔⵜⴰ',
      period: '118–105 av. J.-C.',
      territoryFr: 'Numidie · notamment Cirta et l’ouest du royaume',
      territoryTifinagh: 'ⵏⵓⵎⵉⴷⵢⴰ · ⵙⵉⵔⵜⴰ',
      historyFr: ['Petit-fils de Massinissa et roi de Numidie.', 'Sa résistance à Rome a marqué la guerre de Jugurtha.'],
      historyTifinagh: ['ⴰⴳⴻⵍⵍⵉⴷ ⵏ ⵏⵓⵎⵉⴷⵢⴰ.', 'ⵏⵓⵎⵉⴷⵢⴰ · ⵔⵓⵎⴰ.'],
    },
    {
      id: 5,
      name: 'Juba Ier',
      nameTifinagh: 'ⵢⵓⴱⴰ ⵉ',
      period: '60–46 av. J.-C.',
      territoryFr: 'Numidie · région de Cirta',
      territoryTifinagh: 'ⵏⵓⵎⵉⴷⵢⴰ · ⵙⵉⵔⵜⴰ',
      historyFr: ['Roi de Numidie pendant les guerres civiles romaines.', 'Après sa défaite en 46 av. J.-C., son royaume passe sous domination romaine.'],
      historyTifinagh: ['ⴰⴳⴻⵍⵍⵉⴷ ⵏ ⵏⵓⵎⵉⴷⵢⴰ.', 'ⵏⵓⵎⵉⴷⵢⴰ · ⵔⵓⵎⴰ.'],
    },
  ]);

  getPerson(id: number): Person | undefined {
    return this.items().find((person) => person.id === id);
  }
}
