// Modèle d'une équipe de football
export interface Equipe {
  id: number
  nom: string
  drapeau: string
  type: 'Sélection' | 'Club'
  pays: string
  surnom: string
  stade: string
  palmares: string[]
  stars: string[]
}

// Modèle d'un match mémorable
export interface Match {
  id: number
  date: string
  competition: string
  domicile: string
  exterieur: string
  score: string
  resume: string
}
