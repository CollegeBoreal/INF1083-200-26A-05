// Bel'Hair — prototype cliquable (JavaScript)
// Mêmes données et même logique de réservation que l'application NativeScript.

const SALON = {
  nom: "Bel'Hair",
  adresse: '120, rue Elm, Sudbury (ON)',
  telephone: '+17055550123',
  telephoneTexte: '705 555-0123',
  horaires: 'Mardi au samedi · 9 h – 19 h',
  ouverture: 9, // heure
  fermeture: 19,
  joursOuverts: [2, 3, 4, 5, 6], // 0 = dimanche … 6 = samedi
};

const CATEGORIES = [
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

function formatPrix(n) { return `${n.toFixed(2).replace('.', ',')} $`; }
function formatDuree(min) {
  const h = Math.floor(min / 60), m = min % 60;
  return h ? `${h} h${m ? ' ' + String(m).padStart(2, '0') : ''}` : `${m} min`;
}

const SERVICES = [
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

const COIFFEURS = [
  { id: 0, nom: 'Peu importe', specialites: [] },
  { id: 1, nom: 'Aïcha', specialites: ['tresses', 'enfants'] },
  { id: 2, nom: 'Marc', specialites: ['homme', 'coupe'] },
  { id: 3, nom: 'Sofia', specialites: ['couleur', 'coupe'] },
  { id: 4, nom: 'Nadia', specialites: ['soins', 'enfants', 'tresses'] },
];

const JOURS = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'];
const MOIS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];

function coiffeursPour(service) {
  return COIFFEURS.filter((c) => c.id === 0 || c.specialites.includes(service.specialite));
}

// Les prochains jours d'ouverture du salon
function prochainsJours(nombre = 10) {
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

function cleJour(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function texteDate(cle) {
  const [a, m, j] = cle.split('-').map(Number);
  const d = new Date(a, m - 1, j);
  return `${JOURS[d.getDay()]} ${j} ${MOIS[m - 1]}`;
}

// Créneaux de 30 min ; un créneau est pris s'il chevauche un rendez-vous existant
// (les rendez-vous des autres clients sont simulés de façon fixe)
function creneaux(service, coiffeurId, cleDuJour, rendezVous) {
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

function dateHeure(rdv) {
  const [a, m, j] = rdv.date.split('-').map(Number);
  const [h, mi] = rdv.heure.split(':').map(Number);
  return new Date(a, m - 1, j, h, mi);
}

// ---------- Outils ----------
const $ = (id) => document.getElementById(id);
const echapper = (t) => String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const memoire = {
  lire(cle, defaut) { try { const v = localStorage.getItem('belhair.' + cle); return v ? JSON.parse(v) : defaut; } catch { return defaut; } },
  ecrire(cle, valeur) { try { localStorage.setItem('belhair.' + cle, JSON.stringify(valeur)); } catch { /* rien */ } },
};

// ---------- État ----------
const etat = {
  recherche: '', categorie: '',
  service: null, coiffeur: null, date: '', heure: '', photo: false,
  rendezVous: memoire.lire('rendezVous', []),
  profil: memoire.lire('profil', { nom: '', telephone: '', texture: '' }),
};
const sauver = () => { memoire.ecrire('rendezVous', etat.rendezVous); memoire.ecrire('profil', etat.profil); };

// ---------- Navigation ----------
function afficherVue(nom) {
  document.querySelectorAll('.vue').forEach((v) => v.classList.toggle('active', v.id === 'vue-' + nom));
  document.querySelectorAll('.onglet').forEach((o) => o.classList.toggle('actif', o.dataset.vue === nom));
  $('onglets').hidden = nom === 'reservation';
  if (nom === 'rdv') afficherRendezVous();
  if (nom === 'profil') afficherProfil();
}
document.querySelectorAll('.onglet').forEach((o) => o.addEventListener('click', () => afficherVue(o.dataset.vue)));

let minuterie;
function toast(texte) {
  $('toast').textContent = texte; $('toast').hidden = false;
  clearTimeout(minuterie);
  minuterie = setTimeout(() => ($('toast').hidden = true), 2000);
}

function fenetre(titre, html, boutons = [{ texte: 'OK', classe: 'ok' }]) {
  return new Promise((resoudre) => {
    $('fenetre-titre').textContent = titre;
    $('fenetre-contenu').innerHTML = html;
    $('fenetre-boutons').innerHTML = '';
    boutons.forEach((b) => {
      const el = document.createElement('button');
      el.textContent = b.texte; el.className = b.classe || '';
      el.onclick = () => { $('voile').hidden = true; resoudre(b.valeur ?? b.texte); };
      $('fenetre-boutons').appendChild(el);
    });
    // les boutons d'option (data-option) ferment aussi la fenêtre
    $('fenetre-contenu').querySelectorAll('[data-option]').forEach((el) => {
      el.onclick = () => { $('voile').hidden = true; resoudre(el.dataset.option); };
    });
    $('voile').hidden = false;
  });
}

// Vignette : la photo s'affiche si elle existe dans prototype/photos/, sinon l'emoji reste visible
const vignette = (emoji, image, classe = 'vignette') =>
  `<span class="${classe}">${emoji}${image ? `<img src="photos/${image}" alt="" onerror="this.remove()">` : ''}</span>`;

// ---------- Accueil ----------
function afficherAccueil() {
  $('categories').innerHTML = CATEGORIES.map((c) => `
    <button class="cat ${c.nom === etat.categorie ? 'actif' : ''}" data-cat="${c.nom}"><span class="rond">${c.emoji}</span>${c.nom}</button>`).join('');
  const q = etat.recherche.trim().toLowerCase();
  const liste = SERVICES.filter((s) => (!etat.categorie || s.categorie === etat.categorie) &&
    (!q || s.nom.toLowerCase().includes(q) || s.categorie.toLowerCase().includes(q)));
  $('titre-liste').textContent = q ? `Résultats pour « ${etat.recherche.trim()} »` : etat.categorie || 'Toutes les prestations';
  $('tout-voir').hidden = !etat.categorie && !q;
  $('aucun').hidden = liste.length > 0;
  $('services').innerHTML = liste.map((s) => `
    <button class="carte" data-service="${s.id}">
      ${vignette(s.emoji, s.image)}
      <span class="infos"><b>${s.nom}</b><small>${s.categorie} · ${s.dureeTexte}</small><span class="prix">${s.prixTexte}</span></span>
      <span class="btn-reserver">Réserver</span>
    </button>`).join('');
}
$('recherche').addEventListener('input', (e) => { etat.recherche = e.target.value; afficherAccueil(); });
$('categories').addEventListener('click', (e) => {
  const b = e.target.closest('[data-cat]'); if (!b) return;
  etat.categorie = etat.categorie === b.dataset.cat ? '' : b.dataset.cat; afficherAccueil();
});
$('tout-voir').addEventListener('click', () => { etat.categorie = ''; etat.recherche = ''; $('recherche').value = ''; afficherAccueil(); });
$('banniere').addEventListener('click', () => { etat.categorie = 'Tresses'; afficherAccueil(); });
$('services').addEventListener('click', (e) => { const b = e.target.closest('[data-service]'); if (b) ouvrirReservation(+b.dataset.service); });

// ---------- Réservation ----------
function ouvrirReservation(id) {
  const s = SERVICES.find((x) => x.id === id);
  Object.assign(etat, { service: s, coiffeur: coiffeursPour(s)[0], date: prochainsJours(1)[0].cle, heure: '', photo: false });
  $('r-emoji').innerHTML = vignette(s.emoji, s.image, 'vignette grande'); $('r-nom').textContent = s.nom;
  $('r-detail').textContent = `${s.dureeTexte} · ${s.prixTexte}`; $('r-description').textContent = s.description;
  $('r-prix').textContent = s.prixTexte; $('note').value = '';
  majReservation();
  afficherVue('reservation');
  document.querySelector('#vue-reservation .defile').scrollTop = 0;
}

function majReservation() {
  const s = etat.service;
  $('coiffeurs').innerHTML = coiffeursPour(s).map((c) => `<button class="chip ${c.id === etat.coiffeur.id ? 'actif' : ''}" data-coiffeur="${c.id}">${c.nom}</button>`).join('');
  $('jours').innerHTML = prochainsJours(10).map((j) => `<button class="jour ${j.cle === etat.date ? 'actif' : ''}" data-jour="${j.cle}">${j.jour}<b>${j.numero}</b>${j.mois}</button>`).join('');
  const liste = creneaux(s, etat.coiffeur.id, etat.date, etat.rendezVous);
  if (etat.heure && !liste.some((c) => c.heure === etat.heure && c.libre)) etat.heure = '';
  $('creneaux').innerHTML = liste.map((c) => `<button class="chip ${c.heure === etat.heure ? 'actif' : ''}" data-heure="${c.heure}" ${c.libre ? '' : 'disabled title="Déjà pris"'}>${c.heure}</button>`).join('');
  $('r-choix').textContent = etat.heure ? `${texteDate(etat.date)} · ${etat.heure}` : 'Choisis une heure';
  $('btn-confirmer').disabled = !etat.heure;
  $('photo-apercu').hidden = !etat.photo;
  $('btn-photo').textContent = etat.photo ? '📷  Reprendre la photo' : '📷  Prendre une photo du style voulu';
}

$('coiffeurs').addEventListener('click', (e) => { const b = e.target.closest('[data-coiffeur]'); if (b) { etat.coiffeur = COIFFEURS.find((c) => c.id === +b.dataset.coiffeur); majReservation(); } });
$('jours').addEventListener('click', (e) => { const b = e.target.closest('[data-jour]'); if (b) { etat.date = b.dataset.jour; etat.heure = ''; majReservation(); } });
$('creneaux').addEventListener('click', (e) => { const b = e.target.closest('[data-heure]'); if (b && !b.disabled) { etat.heure = b.dataset.heure; majReservation(); } });
$('btn-retour').addEventListener('click', () => afficherVue('accueil'));
$('btn-photo').addEventListener('click', () => { etat.photo = true; majReservation(); toast('📷 Photo ajoutée (simulation du plugin caméra)'); });

$('btn-confirmer').addEventListener('click', async () => {
  const s = etat.service;
  const r = await fenetre('Confirmer le rendez-vous',
    `<p><b>${s.nom}</b><br>${texteDate(etat.date)} à ${etat.heure}<br>Avec : ${etat.coiffeur.nom}<br>Prix : ${s.prixTexte}</p>`,
    [{ texte: 'Annuler', classe: 'annuler' }, { texte: 'Confirmer', classe: 'ok', valeur: 'ok' }]);
  if (r !== 'ok') return;
  etat.rendezVous.push({
    id: Date.now(), serviceId: s.id, service: s.nom, emoji: s.emoji, image: s.image, duree: s.duree, prixTexte: s.prixTexte,
    coiffeur: etat.coiffeur.nom, date: etat.date, heure: etat.heure, note: $('note').value.trim(), photo: etat.photo,
    dateTexte: `${texteDate(etat.date)} · ${etat.heure.replace(':', ' h ')}`,
  });
  etat.rendezVous.sort((a, b) => dateHeure(a) - dateHeure(b));
  sauver(); majPastille();
  afficherVue('rdv');
  toast('✔ Rendez-vous confirmé · rappel programmé 🔔');
});

// ---------- Rendez-vous ----------
function majPastille() {
  const n = etat.rendezVous.filter((r) => dateHeure(r) > new Date()).length;
  $('pastille-rdv').textContent = n; $('pastille-rdv').hidden = n === 0;
}

function afficherRendezVous() {
  const maintenant = new Date();
  const aVenir = etat.rendezVous.filter((r) => dateHeure(r) > maintenant);
  const passes = etat.rendezVous.filter((r) => dateHeure(r) <= maintenant).reverse();
  $('titre-avenir').textContent = `À venir (${aVenir.length})`;
  $('rdv-vide').hidden = aVenir.length > 0;
  $('rdv-liste').innerHTML = aVenir.map((r) => `
    <div class="rdv">
      ${vignette(r.emoji, r.image)}
      <div class="infos">
        <span class="date">${r.dateTexte}</span><b>${r.service}</b>
        <small>Avec ${r.coiffeur} · ${r.prixTexte}</small>
        ${r.note ? `<small>📝 ${echapper(r.note)}</small>` : ''}${r.photo ? '<small>📷 Photo d\'inspiration jointe</small>' : ''}
        <button class="btn-annuler" data-annuler="${r.id}">Annuler le rendez-vous</button>
      </div>
    </div>`).join('');
  $('titre-historique').hidden = passes.length === 0;
  $('rdv-historique').innerHTML = passes.map((r) => `
    <div class="rdv passe">${vignette(r.emoji, r.image)}<div class="infos"><small>${r.dateTexte}</small><b>${r.service}</b><small>Avec ${r.coiffeur}</small></div></div>`).join('');
  majPastille();
}

$('rdv-liste').addEventListener('click', async (e) => {
  const b = e.target.closest('[data-annuler]'); if (!b) return;
  const rdv = etat.rendezVous.find((r) => r.id === +b.dataset.annuler);
  const r = await fenetre('Annuler ce rendez-vous ?', `<p>${rdv.service}<br>${rdv.dateTexte}</p>`,
    [{ texte: 'Non', classe: 'annuler' }, { texte: 'Oui, annuler', classe: 'ok', valeur: 'ok' }]);
  if (r !== 'ok') return;
  etat.rendezVous = etat.rendezVous.filter((x) => x.id !== rdv.id);
  sauver(); afficherRendezVous(); toast('Rendez-vous annulé');
});

// ---------- Profil ----------
const TEXTURES = ['Raides', 'Ondulés', 'Bouclés', 'Frisés', 'Crépus', 'Locks'];

function afficherProfil() {
  const { nom, telephone, texture } = etat.profil;
  $('avatar').textContent = nom.split(' ').filter(Boolean).map((m) => m[0].toUpperCase()).slice(0, 2).join('') || '👤';
  $('profil-nom').textContent = nom || 'Touche ici pour ajouter ton nom';
  $('profil-tel').textContent = telephone || 'téléphone non renseigné';
  $('sous-texture').textContent = texture || 'À préciser';
}

async function modifierInfos() {
  const r = await fenetre('Mes informations', `
    <label>Nom</label><input id="f-nom" value="${echapper(etat.profil.nom)}" placeholder="Ton nom complet">
    <label>Téléphone</label><input id="f-tel" type="tel" value="${echapper(etat.profil.telephone)}" placeholder="705 555-0000">`,
    [{ texte: 'Annuler', classe: 'annuler' }, { texte: 'Enregistrer', classe: 'ok', valeur: 'ok' }]);
  if (r === 'ok') { etat.profil.nom = $('f-nom').value.trim(); etat.profil.telephone = $('f-tel').value.trim(); sauver(); afficherProfil(); }
}
$('profil-entete').addEventListener('click', modifierInfos);

document.querySelectorAll('.menu[data-action]').forEach((m) => m.addEventListener('click', async () => {
  const a = m.dataset.action;
  if (a === 'infos') modifierInfos();
  if (a === 'texture') {
    const r = await fenetre('Mon type de cheveux', `<div class="options">${TEXTURES.map((t) => `<button class="chip" data-option="${t}">${t}</button>`).join('')}</div>`,
      [{ texte: 'Annuler', classe: 'annuler' }]);
    if (TEXTURES.includes(r)) { etat.profil.texture = r; sauver(); afficherProfil(); }
  }
  if (a === 'appeler') fenetre('Appeler le salon', "<p>Dans l'application, ce bouton ouvre le téléphone avec le numéro <b>705 555-0123</b> (fonction <code>Utils.openUrl('tel:…')</code> de NativeScript).</p>");
  if (a === 'itineraire') fenetre('Adresse et itinéraire', "<p><b>120, rue Elm, Sudbury (ON)</b><br>Dans l'application, ce bouton ouvre Google Maps avec l'itinéraire jusqu'au salon.</p>");
  if (a === 'partager') fenetre('Recommander le salon', "<p>Dans l'application, ce bouton ouvre le menu de partage du téléphone (plugin <b>@nativescript/social-share</b>) :</p><p style=\"margin-top:8px\"><i>« Je te recommande Bel'Hair 💇‍♀️ : tresses, locks, coupes, coloration… »</i></p>");
}));

// ---------- Réinitialiser ----------
$('reinit').addEventListener('click', () => {
  Object.assign(etat, { recherche: '', categorie: '', rendezVous: [], profil: { nom: '', telephone: '', texture: '' } });
  $('recherche').value = '';
  sauver(); afficherAccueil(); majPastille(); afficherVue('accueil');
  toast('Prototype réinitialisé');
});

// ---------- Démarrage ----------
afficherAccueil();
majPastille();
