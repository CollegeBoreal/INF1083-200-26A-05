// Modèle d'un lieu à visiter
export interface Lieu {
  id: number
  nom: string
  emoji: string
  categorie: 'Attractions' | 'Culture' | 'Nature' | 'Bouffe'
  quartier: string
  adresse: string
  description: string
  conseil: string
}
