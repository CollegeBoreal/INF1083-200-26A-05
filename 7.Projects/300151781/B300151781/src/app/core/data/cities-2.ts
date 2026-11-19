import { City } from '../models/city'

// Europe (13 à 24)
export const CITIES_2: City[] = [
  {
    id: 13, name: 'Rome', country: 'Italie', flag: '🇮🇹', region: 'Europe', color: '#009246', lang: 'it',
    tagline: 'La Ville éternelle',
    description: 'Musée à ciel ouvert, Rome réunit près de 3 000 ans d\'histoire, des ruines antiques aux places baroques et au Vatican.',
    highlights: ['Colisée et Forum romain', 'Basilique Saint-Pierre et Vatican', 'Fontaine de Trevi', 'Panthéon'],
    bestSeason: 'Avril à juin, septembre à octobre', currency: 'Euro (EUR)', language: 'Italien', timezone: 'UTC+1', tzOffset: 1,
  },
  {
    id: 14, name: 'Londres', country: 'Royaume-Uni', flag: '🇬🇧', region: 'Europe', color: '#012169', lang: 'en',
    tagline: 'Royale et cosmopolite',
    description: 'Capitale multiculturelle, Londres mêle traditions royales, musées gratuits et quartiers branchés au bord de la Tamise.',
    highlights: ['Big Ben et Westminster', 'Tower Bridge et Tour de Londres', 'British Museum', 'Palais de Buckingham'],
    bestSeason: 'Mai à septembre', currency: 'Livre sterling (GBP)', language: 'Anglais', timezone: 'UTC+0', tzOffset: 0,
  },
  {
    id: 15, name: 'Madrid', country: 'Espagne', flag: '🇪🇸', region: 'Europe', color: '#AA151B', lang: 'es',
    tagline: 'Le cœur vibrant de l\'Espagne',
    description: 'Capitale animée jour et nuit, Madrid est réputée pour ses musées prestigieux, ses parcs et ses tapas.',
    highlights: ['Musée du Prado', 'Palais royal', 'Parc du Retiro', 'Plaza Mayor'],
    bestSeason: 'Avril à juin, septembre à octobre', currency: 'Euro (EUR)', language: 'Espagnol', timezone: 'UTC+1', tzOffset: 1,
  },
  {
    id: 16, name: 'Lisbonne', country: 'Portugal', flag: '🇵🇹', region: 'Europe', color: '#006600', lang: 'pt',
    tagline: 'La ville aux sept collines',
    description: 'Lumineuse et pleine de charme, Lisbonne séduit par ses tramways jaunes, ses azulejos et ses points de vue sur le Tage.',
    highlights: ['Tour de Belém', 'Quartier de l\'Alfama', 'Tramway 28', 'Monastère des Hiéronymites'],
    bestSeason: 'Mars à juin, septembre à octobre', currency: 'Euro (EUR)', language: 'Portugais', timezone: 'UTC+0', tzOffset: 0,
  },
  {
    id: 17, name: 'Berlin', country: 'Allemagne', flag: '🇩🇪', region: 'Europe', color: '#DD0000', lang: 'de',
    tagline: 'Histoire et créativité',
    description: 'Ville marquée par l\'histoire du XXe siècle, Berlin est aujourd\'hui une capitale créative, verte et festive.',
    highlights: ['Porte de Brandebourg', 'East Side Gallery (mur de Berlin)', 'Île aux Musées', 'Reichstag'],
    bestSeason: 'Mai à septembre', currency: 'Euro (EUR)', language: 'Allemand', timezone: 'UTC+1', tzOffset: 1,
  },
  {
    id: 18, name: 'Amsterdam', country: 'Pays-Bas', flag: '🇳🇱', region: 'Europe', color: '#AE1C28', lang: 'nl',
    tagline: 'La Venise du Nord',
    description: 'Célèbre pour ses canaux, ses vélos et ses maisons étroites, Amsterdam offre aussi des musées de renommée mondiale.',
    highlights: ['Rijksmuseum', 'Musée Van Gogh', 'Maison d\'Anne Frank', 'Balade sur les canaux'],
    bestSeason: 'Avril à mai (tulipes), juin à août', currency: 'Euro (EUR)', language: 'Néerlandais', timezone: 'UTC+1', tzOffset: 1,
  },
  {
    id: 19, name: 'Prague', country: 'Tchéquie', flag: '🇨🇿', region: 'Europe', color: '#11457E', lang: 'cs',
    tagline: 'La ville aux cent clochers',
    description: 'Avec son centre médiéval intact, Prague ressemble à un conte de fées entre ponts, châteaux et ruelles pavées.',
    highlights: ['Pont Charles', 'Château de Prague', 'Horloge astronomique', 'Place de la Vieille-Ville'],
    bestSeason: 'Avril à juin, septembre', currency: 'Couronne tchèque (CZK)', language: 'Tchèque', timezone: 'UTC+1', tzOffset: 1,
  },
  {
    id: 20, name: 'Vienne', country: 'Autriche', flag: '🇦🇹', region: 'Europe', color: '#ED2939', lang: 'de', wiki: 'Vienne (Autriche)',
    tagline: 'La capitale de la musique',
    description: 'Ville impériale de Mozart et de Strauss, Vienne est réputée pour ses palais, ses cafés et sa vie culturelle.',
    highlights: ['Château de Schönbrunn', 'Cathédrale Saint-Étienne', 'Palais du Belvédère', 'Opéra national'],
    bestSeason: 'Avril à juin, décembre (marchés de Noël)', currency: 'Euro (EUR)', language: 'Allemand', timezone: 'UTC+1', tzOffset: 1,
  },
  {
    id: 21, name: 'Athènes', country: 'Grèce', flag: '🇬🇷', region: 'Europe', color: '#0D5EAF', lang: 'el',
    tagline: 'Le berceau de la démocratie',
    description: 'Dominée par l\'Acropole, Athènes est l\'une des plus anciennes villes du monde et le berceau de la civilisation grecque.',
    highlights: ['Acropole et Parthénon', 'Musée de l\'Acropole', 'Quartier de Plaka', 'Agora antique'],
    bestSeason: 'Avril à juin, septembre à octobre', currency: 'Euro (EUR)', language: 'Grec', timezone: 'UTC+2', tzOffset: 2,
  },
  {
    id: 22, name: 'Venise', country: 'Italie', flag: '🇮🇹', region: 'Europe', color: '#009246', lang: 'it',
    tagline: 'La Sérénissime',
    description: 'Bâtie sur plus de cent îles, Venise est une ville unique au monde, sans voitures, parcourue de canaux et de gondoles.',
    highlights: ['Place Saint-Marc', 'Grand Canal en gondole', 'Pont du Rialto', 'Îles de Murano et Burano'],
    bestSeason: 'Avril à juin, septembre à octobre', currency: 'Euro (EUR)', language: 'Italien', timezone: 'UTC+1', tzOffset: 1,
  },
  {
    id: 23, name: 'Stockholm', country: 'Suède', flag: '🇸🇪', region: 'Europe', color: '#006AA7', lang: 'sv',
    tagline: 'La beauté sur l\'eau',
    description: 'Répartie sur quatorze îles, Stockholm allie design scandinave, vieille ville colorée et nature omniprésente.',
    highlights: ['Gamla Stan (vieille ville)', 'Musée Vasa', 'Palais royal', 'Archipel de Stockholm'],
    bestSeason: 'Juin à août', currency: 'Couronne suédoise (SEK)', language: 'Suédois', timezone: 'UTC+1', tzOffset: 1,
  },
  {
    id: 24, name: 'Dublin', country: 'Irlande', flag: '🇮🇪', region: 'Europe', color: '#169B62', lang: 'en',
    tagline: 'L\'âme celtique',
    description: 'Chaleureuse et littéraire, Dublin est célèbre pour ses pubs, sa musique traditionnelle et son riche passé.',
    highlights: ['Trinity College et le Livre de Kells', 'Temple Bar', 'Guinness Storehouse', 'Château de Dublin'],
    bestSeason: 'Mai à septembre', currency: 'Euro (EUR)', language: 'Anglais, irlandais', timezone: 'UTC+0', tzOffset: 0,
  },
]
