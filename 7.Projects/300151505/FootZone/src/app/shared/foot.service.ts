import { Injectable } from '@angular/core'
import { Equipe, Match } from './equipe'

// ⚽ Données de l'application FootZone (Aidene Arezki — 300151505)
@Injectable({
  providedIn: 'root',
})
export class FootService {
  private equipes: Array<Equipe> = [
    {
      id: 1, nom: 'Algérie', drapeau: '🇩🇿', type: 'Sélection', pays: 'Algérie', surnom: 'Les Fennecs',
      stade: 'Stade Nelson-Mandela (Alger)',
      palmares: ["Coupe d'Afrique des nations 1990", "Coupe d'Afrique des nations 2019"],
      stars: ['Riyad Mahrez', 'Ismaël Bennacer', 'Rabah Madjer', 'Lakhdar Belloumi'],
    },
    {
      id: 2, nom: 'Maroc', drapeau: '🇲🇦', type: 'Sélection', pays: 'Maroc', surnom: "Les Lions de l'Atlas",
      stade: 'Complexe Mohammed-V (Casablanca)',
      palmares: ["Coupe d'Afrique des nations 1976", 'Demi-finale de la Coupe du monde 2022'],
      stars: ['Achraf Hakimi', 'Hakim Ziyech', 'Yassine Bounou'],
    },
    {
      id: 3, nom: 'Sénégal', drapeau: '🇸🇳', type: 'Sélection', pays: 'Sénégal', surnom: 'Les Lions de la Teranga',
      stade: 'Stade Abdoulaye-Wade (Diamniadio)',
      palmares: ["Coupe d'Afrique des nations 2021"],
      stars: ['Sadio Mané', 'Kalidou Koulibaly', 'Édouard Mendy'],
    },
    {
      id: 4, nom: 'Égypte', drapeau: '🇪🇬', type: 'Sélection', pays: 'Égypte', surnom: 'Les Pharaons',
      stade: 'Stade international du Caire',
      palmares: ["7 Coupes d'Afrique des nations (record)"],
      stars: ['Mohamed Salah', 'Mohamed Aboutrika'],
    },
    {
      id: 5, nom: 'France', drapeau: '🇫🇷', type: 'Sélection', pays: 'France', surnom: 'Les Bleus',
      stade: 'Stade de France (Saint-Denis)',
      palmares: ['Coupe du monde 1998', 'Coupe du monde 2018', 'Euro 1984 et 2000'],
      stars: ['Kylian Mbappé', 'Zinédine Zidane', 'Antoine Griezmann'],
    },
    {
      id: 6, nom: 'Brésil', drapeau: '🇧🇷', type: 'Sélection', pays: 'Brésil', surnom: 'La Seleção',
      stade: 'Maracanã (Rio de Janeiro)',
      palmares: ['5 Coupes du monde (record) : 1958, 1962, 1970, 1994, 2002'],
      stars: ['Pelé', 'Ronaldo', 'Ronaldinho', 'Neymar'],
    },
    {
      id: 7, nom: 'Argentine', drapeau: '🇦🇷', type: 'Sélection', pays: 'Argentine', surnom: "L'Albiceleste",
      stade: 'Stade Monumental (Buenos Aires)',
      palmares: ['Coupe du monde 1978, 1986 et 2022'],
      stars: ['Lionel Messi', 'Diego Maradona', 'Ángel Di María'],
    },
    {
      id: 8, nom: 'Canada', drapeau: '🇨🇦', type: 'Sélection', pays: 'Canada', surnom: 'Les Rouges',
      stade: 'BMO Field (Toronto)',
      palmares: ['Coupe du monde 1986 et 2022 (participations)', 'Pays co-organisateur de la Coupe du monde 2026'],
      stars: ['Alphonso Davies', 'Jonathan David', 'Christine Sinclair'],
    },
    {
      id: 9, nom: 'JS Kabylie', drapeau: '🟡🟢', type: 'Club', pays: 'Algérie (Tizi Ouzou)', surnom: 'Les Canaris',
      stade: 'Stade du 1er-Novembre-1954 (Tizi Ouzou)',
      palmares: ['Coupe des clubs champions africains 1981 et 1990', "Nombreux titres de champion d'Algérie"],
      stars: ['Moussa Saïb', 'Ali Fergani'],
    },
    {
      id: 10, nom: 'MC Alger', drapeau: '🔴🟢', type: 'Club', pays: 'Algérie (Alger)', surnom: 'Le Mouloudia',
      stade: 'Stade du 5-Juillet-1962 (Alger)',
      palmares: ['Coupe des clubs champions africains 1976', 'Club fondé en 1921'],
      stars: ['Omar Betrouni', 'Abdeslam Bousri'],
    },
    {
      id: 11, nom: 'Real Madrid', drapeau: '⚪', type: 'Club', pays: 'Espagne', surnom: 'Los Blancos',
      stade: 'Santiago-Bernabéu (Madrid)',
      palmares: ['Record de Ligues des champions', 'Nombreux titres de champion d\'Espagne'],
      stars: ['Cristiano Ronaldo', 'Zinédine Zidane', 'Vinícius Júnior'],
    },
    {
      id: 12, nom: 'FC Barcelone', drapeau: '🔵🔴', type: 'Club', pays: 'Espagne', surnom: 'Le Barça',
      stade: 'Camp Nou (Barcelone)',
      palmares: ['5 Ligues des champions', 'Nombreux titres de champion d\'Espagne'],
      stars: ['Lionel Messi', 'Xavi', 'Andrés Iniesta', 'Lamine Yamal'],
    },
  ]

  private matchs: Array<Match> = [
    {
      id: 1, date: '16 juin 1982', competition: 'Coupe du monde 1982', domicile: '🇩🇿 Algérie', exterieur: '🇩🇪 RFA', score: '2 – 1',
      resume: "L'Algérie bat l'Allemagne de l'Ouest à Gijón grâce à Madjer et Belloumi : un exploit historique.",
    },
    {
      id: 2, date: '19 juillet 2019', competition: "Finale de la CAN 2019", domicile: '🇸🇳 Sénégal', exterieur: '🇩🇿 Algérie', score: '0 – 1',
      resume: "Les Fennecs remportent leur 2ᵉ Coupe d'Afrique au Caire, but de Baghdad Bounedjah.",
    },
    {
      id: 3, date: '30 juin 2014', competition: 'Coupe du monde 2014 — 8ᵉ de finale', domicile: '🇩🇪 Allemagne', exterieur: '🇩🇿 Algérie', score: '2 – 1 (a.p.)',
      resume: "L'Algérie pousse le futur champion du monde jusqu'aux prolongations à Porto Alegre.",
    },
    {
      id: 4, date: '18 décembre 2022', competition: 'Finale de la Coupe du monde 2022', domicile: '🇦🇷 Argentine', exterieur: '🇫🇷 France', score: '3 – 3 (4 – 2 t.a.b.)',
      resume: 'Une finale folle : triplé de Mbappé, mais Messi et l\'Argentine gagnent aux tirs au but.',
    },
    {
      id: 5, date: '10 décembre 2022', competition: 'Coupe du monde 2022 — quart de finale', domicile: '🇲🇦 Maroc', exterieur: '🇵🇹 Portugal', score: '1 – 0',
      resume: 'Le Maroc devient la première nation africaine à atteindre une demi-finale de Coupe du monde.',
    },
    {
      id: 6, date: '12 juillet 1998', competition: 'Finale de la Coupe du monde 1998', domicile: '🇫🇷 France', exterieur: '🇧🇷 Brésil', score: '3 – 0',
      resume: 'Doublé de la tête de Zidane : la France remporte sa première Coupe du monde au Stade de France.',
    },
  ]

  getEquipes(): Array<Equipe> {
    return this.equipes
  }

  getEquipe(id: number): Equipe {
    return this.equipes.filter((e) => e.id === id)[0]
  }

  getMatchs(): Array<Match> {
    return this.matchs
  }
}
