// Données du salon : catégories, prestations, coiffeurs, horaires et rendez-vous de la cliente / du client
import { ApplicationSettings, Observable, ObservableArray } from '@nativescript/core';

export const SALON = {
  nom: "Bel'Hair",
  adresse: '120, rue Elm, Sudbury (ON)',
  telephone: '+17055550123',
  telephoneTexte: '705 555-0123',
  horaires: 'Mardi au samedi · 9 h – 19 h',
  ouverture: 9, // heure
  fermeture: 19,
  joursOuverts: [2, 3, 4, 5, 6], // 0 = dimanche … 6 = samedi
};

export const CATEGORIES = [
  { nom: 'Femme', emoji: '💇‍♀️' },
  { nom: 'Homme', emoji: '💈' },
  { nom: 'Tresses', emoji: '🎀' },
  { nom: 'Locks', emoji: '🌀' },
  { nom: 'Coloration', emoji: '🎨' },
  { nom: 'Soins', emoji: '🧴' },
  { nom: 'Enfants', emoji: '🧒' },
  { nom: 'Barbe', emoji: '🧔' },
];

// image : nom du fichier photo (dossier photos/) ; si la photo manque, l'emoji s'affiche
const PHOTOS = {
  1: 'coupe-brushing',
  2: 'brushing',
  3: 'chignon',
  4: 'coupe-homme',
  5: 'degrade',
  6: 'box-braids',
  7: 'knotless-braids',
  8: 'nattes-collees',
  9: 'twists',
  10: 'depart-locks',
  11: 'entretien-locks',
  12: 'coloration',
  13: 'balayage',
  14: 'defrisage',
  15: 'soin-hydratant',
  16: 'lissage-bresilien',
  17: 'coupe-enfant',
  18: 'tresses-enfant',
  19: 'barbe',
};

const s = (id, nom, categorie, prix, duree, description, specialite) =>
  ({ id, nom, categorie, prix, duree, description, specialite, emoji: CATEGORIES.find((c) => c.nom === categorie).emoji,
     image: `${PHOTOS[id]}.jpg`,
     prixTexte: formatPrix(prix), dureeTexte: formatDuree(duree) });

export function formatPrix(n) { return `${n.toFixed(2).replace('.', ',')} $`; }
export function formatDuree(min) {
  const h = Math.floor(min / 60), m = min % 60;
  return h ? `${h} h${m ? ' ' + String(m).padStart(2, '0') : ''}` : `${m} min`;
}

export const SERVICES = [
  s(1, 'Coupe + brushing', 'Femme', 55, 60, 'Shampoing, coupe sur mesure et brushing.', 'coupe'),
  s(2, 'Brushing / mise en plis', 'Femme', 40, 45, 'Shampoing et coiffage lisse ou bouclé.', 'coupe'),
  s(3, 'Chignon de cérémonie', 'Femme', 75, 75, 'Coiffure de mariage, bal ou fête, avec essai conseillé.', 'coupe'),
  s(4, 'Coupe homme', 'Homme', 30, 30, 'Coupe aux ciseaux ou à la tondeuse, finitions.', 'homme'),
  s(5, 'Dégradé (fade)', 'Homme', 35, 40, 'Dégradé bas, moyen ou haut, contours nets.', 'homme'),
  s(6, 'Box braids', 'Tresses', 180, 300, 'Tresses classiques avec mèches, longueur épaules ou dos.', 'tresses'),
  s(7, 'Knotless braids', 'Tresses', 200, 330, 'Tresses sans nœud, plus légères et sans tension.', 'tresses'),
  s(8, 'Nattes collées (cornrows)', 'Tresses', 70, 120, 'Nattes plaquées, motifs droits ou créatifs.', 'tresses'),
  s(9, 'Twists sénégalais', 'Tresses', 160, 240, 'Vanilles torsadées avec mèches.', 'tresses'),
  s(10, 'Départ de locks', 'Locks', 150, 180, 'Création des locks (crochet ou twists).', 'tresses'),
  s(11, 'Entretien locks (retwist)', 'Locks', 80, 90, 'Resserrage des racines et soin du cuir chevelu.', 'tresses'),
  s(12, 'Coloration complète', 'Coloration', 90, 120, 'Couleur racines et longueurs, soin après couleur.', 'couleur'),
  s(13, 'Mèches / balayage', 'Coloration', 130, 150, 'Éclaircissement naturel et lumineux.', 'couleur'),
  s(14, 'Défrisage', 'Soins', 85, 120, 'Lissage chimique doux avec protection du cuir chevelu.', 'soins'),
  s(15, 'Soin hydratant cheveux crépus', 'Soins', 50, 45, 'Bain d\'huile, masque et vapeur.', 'soins'),
  s(16, 'Lissage brésilien', 'Soins', 160, 180, 'Cheveux lisses et brillants jusqu\'à 3 mois.', 'soins'),
  s(17, 'Coupe enfant (- 12 ans)', 'Enfants', 20, 25, 'Coupe fille ou garçon dans la bonne humeur.', 'enfants'),
  s(18, 'Petites tresses enfant', 'Enfants', 60, 120, 'Tresses ou nattes adaptées aux enfants.', 'enfants'),
  s(19, 'Taille de barbe', 'Barbe', 20, 20, 'Taille, contours au rasoir et huile à barbe.', 'homme'),
];

export const COIFFEURS = [
  { id: 0, nom: 'Peu importe', specialites: [] },
  { id: 1, nom: 'Aïcha', specialites: ['tresses', 'enfants'] },
  { id: 2, nom: 'Marc', specialites: ['homme', 'coupe'] },
  { id: 3, nom: 'Sofia', specialites: ['couleur', 'coupe'] },
  { id: 4, nom: 'Nadia', specialites: ['soins', 'enfants', 'tresses'] },
];

const JOURS = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'];
const MOIS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];

export function coiffeursPour(service) {
  return COIFFEURS.filter((c) => c.id === 0 || c.specialites.includes(service.specialite));
}

// Les prochains jours d'ouverture du salon
export function prochainsJours(nombre = 10) {
  const jours = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  while (jours.length < nombre) {
    d.setDate(d.getDate() + 1);
    if (SALON.joursOuverts.includes(d.getDay())) {
      jours.push({ cle: cleJour(d), jour: JOURS[d.getDay()], numero: d.getDate(), mois: MOIS[d.getMonth()] });
    }
  }
  return jours;
}

export function cleJour(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function texteDate(cle) {
  const [a, m, j] = cle.split('-').map(Number);
  const d = new Date(a, m - 1, j);
  return `${JOURS[d.getDay()]} ${j} ${MOIS[m - 1]}`;
}

// Créneaux de 30 min ; un créneau est pris s'il chevauche un rendez-vous existant
// (les rendez-vous des autres clients sont simulés de façon fixe)
export function creneaux(service, coiffeurId, cleDuJour, rendezVous) {
  const liste = [];
  for (let min = SALON.ouverture * 60; min + service.duree <= SALON.fermeture * 60; min += 30) {
    const heure = `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`;
    const prisParAutre = hachage(`${cleDuJour}|${coiffeurId}|${heure}`) % 4 === 0;
    const prisParMoi = rendezVous.some((r) => r.date === cleDuJour && chevauche(min, service.duree, minutes(r.heure), r.duree));
    liste.push({ heure, libre: !prisParAutre && !prisParMoi });
  }
  return liste;
}

const minutes = (h) => { const [a, b] = h.split(':').map(Number); return a * 60 + b; };
const chevauche = (debut1, duree1, debut2, duree2) => debut1 < debut2 + duree2 && debut2 < debut1 + duree1;
function hachage(texte) { let h = 7; for (const c of texte) h = (h * 31 + c.charCodeAt(0)) % 100003; return h; }

export function dateHeure(rdv) {
  const [a, m, j] = rdv.date.split('-').map(Number);
  const [h, mi] = rdv.heure.split(':').map(Number);
  return new Date(a, m - 1, j, h, mi);
}

class SalonService extends Observable {
  constructor() {
    super();
    this.rendezVous = new ObservableArray(JSON.parse(ApplicationSettings.getString('rendezVous', '[]')));
    this.nbAVenir = 0;
    this.maj();
  }

  reserver({ service, coiffeur, date, heure, note, photo }) {
    const rdv = {
      id: Date.now(),
      serviceId: service.id, service: service.nom, emoji: service.emoji, image: service.image, duree: service.duree,
      prixTexte: service.prixTexte, coiffeur: coiffeur.nom, date, heure, note: note || '', photo: photo || '',
      dateTexte: `${texteDate(date)} · ${heure.replace(':', ' h ')}`,
    };
    this.rendezVous.push(rdv);
    this.trier();
    this.sauver();
    return rdv;
  }

  annuler(id) {
    const i = this.rendezVous.findIndex((r) => r.id === id);
    if (i >= 0) this.rendezVous.splice(i, 1);
    this.sauver();
  }

  trier() {
    const liste = [];
    this.rendezVous.forEach((r) => liste.push(r));
    liste.sort((a, b) => dateHeure(a) - dateHeure(b));
    this.rendezVous.splice(0, this.rendezVous.length, ...liste);
  }

  sauver() {
    const liste = [];
    this.rendezVous.forEach((r) => liste.push(r));
    ApplicationSettings.setString('rendezVous', JSON.stringify(liste));
    this.maj();
  }

  maj() {
    const maintenant = new Date();
    let n = 0;
    this.rendezVous.forEach((r) => { if (dateHeure(r) > maintenant) n++; });
    this.set('nbAVenir', n);
  }
}

export const salon = new SalonService();
