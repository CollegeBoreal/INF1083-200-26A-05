import { City } from '../models/city'

// Les 12 destinations d'origine
export const CITIES_1: City[] = [
  {
    id: 1, name: 'Montréal', country: 'Canada', flag: '🇨🇦', region: 'Amérique', color: '#C8102E', lang: 'qc',
    tagline: 'La métropole francophone d\'Amérique',
    description: 'Ville bilingue et créative, Montréal mêle charme européen et énergie nord-américaine, entre festivals, gastronomie et quartiers historiques.',
    highlights: ['Vieux-Montréal et basilique Notre-Dame', 'Parc du Mont-Royal', 'Festival international de jazz', 'Marché Jean-Talon'],
    bestSeason: 'Juin à septembre', currency: 'Dollar canadien (CAD)', language: 'Français, anglais', timezone: 'UTC−5', tzOffset: -5,
  },
  {
    id: 2, name: 'Alger', country: 'Algérie', flag: '🇩🇿', region: 'Afrique', color: '#006233', lang: 'ar',
    tagline: 'Alger la Blanche, face à la Méditerranée',
    description: 'Capitale aux façades blanches qui descendent vers la mer, Alger offre une histoire riche, de la Casbah ottomane aux grands boulevards.',
    highlights: ['Casbah classée à l\'UNESCO', 'Mémorial du Martyr', 'Basilique Notre-Dame d\'Afrique', 'Jardin d\'essai du Hamma'],
    bestSeason: 'Avril à juin, septembre à octobre', currency: 'Dinar algérien (DZD)', language: 'Arabe, tamazight, français', timezone: 'UTC+1', tzOffset: 1,
  },
  {
    id: 3, name: 'Paris', country: 'France', flag: '🇫🇷', region: 'Europe', color: '#0055A4', lang: 'fr',
    tagline: 'La ville lumière',
    description: 'Capitale de l\'art et de la mode, Paris est célèbre pour ses monuments, ses musées et ses cafés au bord de la Seine.',
    highlights: ['Tour Eiffel', 'Musée du Louvre', 'Montmartre et le Sacré-Cœur', 'Croisière sur la Seine'],
    bestSeason: 'Avril à juin', currency: 'Euro (EUR)', language: 'Français', timezone: 'UTC+1', tzOffset: 1,
  },
  {
    id: 4, name: 'Tokyo', country: 'Japon', flag: '🇯🇵', region: 'Asie', color: '#BC002D', lang: 'ja',
    tagline: 'Tradition et futur se rencontrent',
    description: 'Immense et ultra-moderne, Tokyo cache des temples paisibles entre ses gratte-ciel, ses quartiers lumineux et ses trains ultra-rapides.',
    highlights: ['Temple Senso-ji à Asakusa', 'Carrefour de Shibuya', 'Quartier d\'Akihabara', 'Tokyo Skytree'],
    bestSeason: 'Mars à mai (cerisiers en fleurs)', currency: 'Yen (JPY)', language: 'Japonais', timezone: 'UTC+9', tzOffset: 9,
  },
  {
    id: 5, name: 'New York', country: 'États-Unis', flag: '🇺🇸', region: 'Amérique', color: '#3C3B6E', lang: 'en',
    tagline: 'La ville qui ne dort jamais',
    description: 'Centre culturel et financier mondial, New York impressionne par ses gratte-ciel, ses musées et la diversité de ses quartiers.',
    highlights: ['Statue de la Liberté', 'Central Park', 'Times Square', 'Pont de Brooklyn'],
    bestSeason: 'Septembre à novembre', currency: 'Dollar américain (USD)', language: 'Anglais', timezone: 'UTC−5', tzOffset: -5,
  },
  {
    id: 6, name: 'Marrakech', country: 'Maroc', flag: '🇲🇦', region: 'Afrique', color: '#C1272D', lang: 'ar',
    tagline: 'La perle du Sud',
    description: 'Entre souks colorés, palais et jardins, Marrakech est une ville vibrante aux portes du désert et de l\'Atlas.',
    highlights: ['Place Jemaa el-Fna', 'Jardin Majorelle', 'Palais de la Bahia', 'Souks de la médina'],
    bestSeason: 'Mars à mai, octobre à novembre', currency: 'Dirham marocain (MAD)', language: 'Arabe, tamazight, français', timezone: 'UTC+1', tzOffset: 1,
  },
  {
    id: 7, name: 'Istanbul', country: 'Turquie', flag: '🇹🇷', region: 'Europe', color: '#E30A17', lang: 'tr',
    tagline: 'Entre deux continents',
    description: 'Seule grande ville à cheval sur l\'Europe et l\'Asie, Istanbul fascine par ses mosquées, ses bazars et le Bosphore.',
    highlights: ['Sainte-Sophie', 'Mosquée Bleue', 'Grand Bazar', 'Croisière sur le Bosphore'],
    bestSeason: 'Avril à mai, septembre à octobre', currency: 'Livre turque (TRY)', language: 'Turc', timezone: 'UTC+3', tzOffset: 3,
  },
  {
    id: 8, name: 'Dubaï', country: 'Émirats arabes unis', flag: '🇦🇪', region: 'Asie', color: '#00732F', lang: 'ar',
    tagline: 'La ville des records',
    description: 'Métropole futuriste née dans le désert, Dubaï est connue pour ses tours géantes, ses îles artificielles et son luxe.',
    highlights: ['Burj Khalifa (828 m)', 'Dubai Mall et fontaines', 'Palm Jumeirah', 'Safari dans le désert'],
    bestSeason: 'Novembre à mars', currency: 'Dirham (AED)', language: 'Arabe, anglais', timezone: 'UTC+4', tzOffset: 4,
  },
  {
    id: 9, name: 'Rio de Janeiro', country: 'Brésil', flag: '🇧🇷', region: 'Amérique', color: '#009C3B', lang: 'pt',
    tagline: 'La cidade maravilhosa',
    description: 'Entre mer et montagnes, Rio séduit par ses plages mythiques, son carnaval et son ambiance festive.',
    highlights: ['Christ Rédempteur', 'Pain de Sucre', 'Plage de Copacabana', 'Carnaval de Rio'],
    bestSeason: 'Décembre à mars', currency: 'Real brésilien (BRL)', language: 'Portugais', timezone: 'UTC−3', tzOffset: -3,
  },
  {
    id: 10, name: 'Séoul', country: 'Corée du Sud', flag: '🇰🇷', region: 'Asie', color: '#0047A0', lang: 'ko',
    tagline: 'La capitale de la K-culture',
    description: 'Dynamique et connectée, Séoul combine palais royaux, technologie de pointe et la culture K-pop.',
    highlights: ['Palais Gyeongbokgung', 'Quartier de Myeongdong', 'N Seoul Tower', 'Village Bukchon Hanok'],
    bestSeason: 'Avril à juin, septembre à novembre', currency: 'Won (KRW)', language: 'Coréen', timezone: 'UTC+9', tzOffset: 9,
  },
  {
    id: 11, name: 'Le Caire', country: 'Égypte', flag: '🇪🇬', region: 'Afrique', color: '#C09300', lang: 'ar',
    tagline: 'Aux portes des pyramides',
    description: 'Plus grande ville d\'Afrique, Le Caire est le point de départ idéal pour découvrir les trésors de l\'Égypte ancienne.',
    highlights: ['Pyramides de Gizeh et Sphinx', 'Grand Musée égyptien', 'Souk Khan el-Khalili', 'Balade sur le Nil'],
    bestSeason: 'Octobre à avril', currency: 'Livre égyptienne (EGP)', language: 'Arabe', timezone: 'UTC+2', tzOffset: 2,
  },
  {
    id: 12, name: 'Barcelone', country: 'Espagne', flag: '🇪🇸', region: 'Europe', color: '#AA151B', lang: 'es',
    tagline: 'L\'art de Gaudí au bord de la mer',
    description: 'Ville méditerranéenne pleine de vie, Barcelone est célèbre pour l\'architecture de Gaudí, ses plages et ses tapas.',
    highlights: ['Sagrada Família', 'Parc Güell', 'Quartier gothique', 'La Rambla'],
    bestSeason: 'Mai à juin, septembre', currency: 'Euro (EUR)', language: 'Catalan, espagnol', timezone: 'UTC+1', tzOffset: 1,
  },
]
