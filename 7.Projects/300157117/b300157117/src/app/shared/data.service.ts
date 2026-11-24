import { Injectable } from '@angular/core'
import { Lieu } from './lieu'

// 📍 Les lieux incontournables de Toronto
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private lieux: Array<Lieu> = [
    {
      id: 1, nom: 'Tour CN', emoji: '🗼', categorie: 'Attractions',
      quartier: 'Entertainment District', adresse: '290 Bremner Blvd',
      description: "Symbole de Toronto, la Tour CN mesure 553 m. On y trouve un plancher de verre, un restaurant tournant et l'EdgeWalk, une marche à l'extérieur, attaché, au sommet.",
      conseil: 'Montez au coucher du soleil pour voir la ville de jour et de nuit.',
    },
    {
      id: 2, nom: "Ripley's Aquarium of Canada", emoji: '🦈', categorie: 'Attractions',
      quartier: 'Entertainment District', adresse: '288 Bremner Blvd',
      description: "Juste au pied de la Tour CN : des milliers d'animaux marins et un long tunnel où les requins nagent au-dessus de vous.",
      conseil: 'Combinez-le avec la Tour CN le même jour.',
    },
    {
      id: 3, nom: 'Nathan Phillips Square', emoji: '🏛️', categorie: 'Attractions',
      quartier: 'Centre-ville', adresse: '100 Queen St W',
      description: "La grande place devant l'hôtel de ville, avec l'enseigne colorée TORONTO. L'hiver, le bassin devient une patinoire gratuite.",
      conseil: "La photo devant l'enseigne TORONTO est un classique.",
    },
    {
      id: 4, nom: 'Temple de la renommée du hockey', emoji: '🏒', categorie: 'Attractions',
      quartier: 'Financial District', adresse: '30 Yonge St',
      description: "Le musée du hockey : souvenirs des grands joueurs, jeux interactifs et la vraie Coupe Stanley.",
      conseil: 'Parfait pour une journée de pluie.',
    },
    {
      id: 5, nom: 'Musée royal de l’Ontario (ROM)', emoji: '🦕', categorie: 'Culture',
      quartier: 'Bloor-Yorkville', adresse: "100 Queen's Park",
      description: "Un des plus grands musées du Canada : dinosaures, histoire naturelle, cultures du monde. Son entrée en forme de cristal est très célèbre.",
      conseil: 'Ne manquez pas la galerie des dinosaures.',
    },
    {
      id: 6, nom: 'Musée des beaux-arts de l’Ontario (AGO)', emoji: '🎨', categorie: 'Culture',
      quartier: 'Grange Park', adresse: '317 Dundas St W',
      description: "Un grand musée d'art avec des œuvres canadiennes, autochtones et internationales, dans un bâtiment redessiné par l'architecte Frank Gehry.",
      conseil: 'Allez voir le grand escalier en spirale en bois.',
    },
    {
      id: 7, nom: 'Casa Loma', emoji: '🏰', categorie: 'Culture',
      quartier: 'Midtown', adresse: '1 Austin Terrace',
      description: "Un vrai château construit au début du XXᵉ siècle par Sir Henry Pellatt, avec ses tours, son tunnel secret et ses jardins.",
      conseil: 'Montez dans les tours pour la vue sur le centre-ville.',
    },
    {
      id: 8, nom: 'Distillery District', emoji: '🧱', categorie: 'Culture',
      quartier: 'Distillery District', adresse: '55 Mill St',
      description: "Un quartier piéton aux bâtiments industriels victoriens en brique : boutiques, cafés, galeries et, l'hiver, un marché de Noël.",
      conseil: 'Idéal en décembre pour le marché de Noël.',
    },
    {
      id: 9, nom: 'Îles de Toronto', emoji: '⛴️', categorie: 'Nature',
      quartier: 'Lac Ontario', adresse: 'Traversier : Jack Layton Ferry Terminal',
      description: "Un court trajet en traversier mène à des îles sans voitures : plages, pistes cyclables et la plus belle vue sur la ligne d'horizon de Toronto.",
      conseil: "Louez un vélo sur l'île Centre.",
    },
    {
      id: 10, nom: 'High Park', emoji: '🌸', categorie: 'Nature',
      quartier: 'West End', adresse: '1873 Bloor St W',
      description: "Le plus grand parc public de la ville : sentiers, lac Grenadier, petit zoo et, au printemps, les célèbres cerisiers en fleurs.",
      conseil: 'Venez au printemps pour les cerisiers.',
    },
    {
      id: 11, nom: 'Marché St. Lawrence', emoji: '🥪', categorie: 'Bouffe',
      quartier: 'Old Town', adresse: '93 Front St E',
      description: "Un marché historique plein de produits frais, fromages et spécialités. Le sandwich au peameal bacon est un incontournable torontois.",
      conseil: 'Goûtez le sandwich au peameal bacon.',
    },
    {
      id: 12, nom: 'Kensington Market', emoji: '🌮', categorie: 'Bouffe',
      quartier: 'Kensington', adresse: 'Augusta Ave & Baldwin St',
      description: "Un quartier coloré et bohème : friperies, épiceries et restaurants du monde entier dans de petites maisons peintes.",
      conseil: 'Venez le ventre vide et essayez plusieurs cuisines.',
    },
  ]

  getLieux(): Array<Lieu> {
    return this.lieux
  }

  getLieu(id: number): Lieu {
    return this.lieux.filter((lieu) => lieu.id === id)[0]
  }
}
