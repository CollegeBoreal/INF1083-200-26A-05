// AfriMarché — prototype cliquable (JavaScript)
// Même catalogue et même logique que l'application NativeScript.

const ROUGE = '#B23A2B', OR = '#E0A526', VERT = '#1F4D3A', NOIR = '#2B2B2B';

const CATEGORIES = [
  { nom: 'Épicerie', emoji: '🍲', couleur: ROUGE },
  { nom: 'Beauté', emoji: '🧴', couleur: OR },
  { nom: 'Artisanat', emoji: '🧺', couleur: VERT },
  { nom: 'Mode', emoji: '🧵', couleur: NOIR },
];

const PRODUITS = [
  { id: 1, nom: 'Café Yirgacheffe', pays: 'Éthiopie', categorie: 'Épicerie', emoji: '☕', couleur: ROUGE, note: 5, avis: 48, formats: [['340 g', 18.99], ['1 kg', 49.99]], description: 'Arabica en grains, notes florales et citronnées. Coopérative de Gedeo.' },
  { id: 2, nom: 'Fleurs de bissap', pays: 'Sénégal', categorie: 'Épicerie', emoji: '🌺', couleur: ROUGE, note: 4, avis: 31, formats: [['200 g', 7.5], ['500 g', 16]], description: "Fleurs d'hibiscus séchées pour préparer le jus de bissap." },
  { id: 3, nom: 'Thé rooibos', pays: 'Afrique du Sud', categorie: 'Épicerie', emoji: '🍵', couleur: ROUGE, note: 5, avis: 22, formats: [['40 sachets', 9.25]], description: 'Infusion naturelle sans théine, douce et légèrement sucrée.' },
  { id: 4, nom: 'Attiéké', pays: "Côte d'Ivoire", categorie: 'Épicerie', emoji: '🍚', couleur: ROUGE, note: 4, avis: 17, formats: [['500 g', 6], ['1 kg', 11]], description: 'Semoule de manioc fermenté, prête en 5 minutes.' },
  { id: 5, nom: 'Karité brut', pays: 'Burkina Faso', categorie: 'Beauté', emoji: '🧴', couleur: OR, note: 5, avis: 64, formats: [['250 g', 14], ['500 g', 25]], description: 'Beurre de karité non raffiné, produit par une coopérative de femmes.' },
  { id: 6, nom: "Huile d'argan", pays: 'Maroc', categorie: 'Beauté', emoji: '💧', couleur: OR, note: 5, avis: 40, formats: [['100 ml', 22.5]], description: "Huile d'argan pure pressée à froid, pour la peau et les cheveux." },
  { id: 7, nom: 'Savon noir africain', pays: 'Ghana', categorie: 'Beauté', emoji: '🧼', couleur: OR, note: 4, avis: 29, formats: [['1 pain', 8.75], ['3 pains', 22]], description: 'Savon traditionnel à base de cendres de cacao et de plantain.' },
  { id: 8, nom: 'Panier Bolga', pays: 'Ghana', categorie: 'Artisanat', emoji: '🧺', couleur: VERT, note: 5, avis: 19, formats: [['Moyen', 45], ['Grand', 60]], description: 'Panier tressé à la main en herbe éléphant, anses en cuir.' },
  { id: 9, nom: 'Masque sculpté', pays: 'Mali', categorie: 'Artisanat', emoji: '🎭', couleur: VERT, note: 4, avis: 8, formats: [['Unique', 65]], description: 'Masque décoratif sculpté à la main par un artisan de Bamako.' },
  { id: 10, nom: 'Tissu wax', pays: "Côte d'Ivoire", categorie: 'Mode', emoji: '🧵', couleur: NOIR, note: 5, avis: 52, formats: [['6 yards', 39.99], ['3 yards', 22]], description: 'Pagne wax 100 % coton, motifs colorés.' },
  { id: 11, nom: 'Écharpe kente', pays: 'Ghana', categorie: 'Mode', emoji: '🧣', couleur: NOIR, note: 5, avis: 26, formats: [['Unique', 29]], description: 'Étole kente tissée à la main, idéale pour les cérémonies.' },
  { id: 12, nom: 'Bracelet maasaï', pays: 'Kenya', categorie: 'Mode', emoji: '📿', couleur: NOIR, note: 4, avis: 34, formats: [['Unique', 12.5]], description: 'Bracelet en perles fait main par des artisanes maasaïes.' },
];

const ARTISANS = [
  'Coopérative de Gedeo (Éthiopie) — café',
  'Union des femmes de Léo (Burkina Faso) — karité',
  'Coopérative Tighanimine (Maroc) — argan',
  'Tisserands de Bolgatanga (Ghana) — paniers',
  'Tisserands de Bonwire (Ghana) — kente',
  'Artisanes maasaïes de Narok (Kenya) — perles',
];

const LIVRAISON_GRATUITE = 50, FRAIS_LIVRAISON = 7.99;

// ---------- Outils ----------
const $ = (id) => document.getElementById(id);
const prix = (n) => n.toFixed(2).replace('.', ',') + ' $';
const etoiles = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);
const echapper = (t) => String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Sauvegarde légère dans le navigateur (peut être indisponible : on garde alors tout en mémoire)
const memoire = {
  lire(cle, defaut) { try { const v = localStorage.getItem('afrimarche.' + cle); return v ? JSON.parse(v) : defaut; } catch { return defaut; } },
  ecrire(cle, valeur) { try { localStorage.setItem('afrimarche.' + cle, JSON.stringify(valeur)); } catch { /* rien */ } },
};

// ---------- État de l'application ----------
const etat = {
  recherche: '',
  categorie: '',
  produit: null, format: 0, quantite: 1,
  panier: memoire.lire('panier', []),        // [{ id, format, quantite }]
  favoris: memoire.lire('favoris', []),      // [id]
  commandes: memoire.lire('commandes', []),  // [{ date, total, articles }]
  profil: memoire.lire('profil', { nom: '', courriel: '', adresse: '' }),
};
const sauver = () => ['panier', 'favoris', 'commandes', 'profil'].forEach((c) => memoire.ecrire(c, etat[c]));

// ---------- Navigation ----------
let vueCourante = 'accueil';
function afficherVue(nom) {
  document.querySelectorAll('.vue').forEach((v) => v.classList.toggle('active', v.id === 'vue-' + nom));
  document.querySelectorAll('.onglet').forEach((o) => o.classList.toggle('actif', o.dataset.vue === nom || (nom === 'fiche' && o.dataset.vue === 'accueil')));
  $('onglets').hidden = nom === 'fiche';
  vueCourante = nom;
  if (nom === 'panier') afficherPanier();
  if (nom === 'profil') afficherProfil();
}
document.querySelectorAll('.onglet').forEach((o) => o.addEventListener('click', () => afficherVue(o.dataset.vue)));

// ---------- Toast et fenêtre ----------
let minuterie;
function toast(texte) {
  const t = $('toast');
  t.textContent = texte; t.hidden = false;
  clearTimeout(minuterie);
  minuterie = setTimeout(() => (t.hidden = true), 1800);
}

function fenetre(titre, html, boutons = [{ texte: 'OK', classe: 'ok' }]) {
  return new Promise((resoudre) => {
    $('fenetre-titre').textContent = titre;
    $('fenetre-contenu').innerHTML = html;
    const zone = $('fenetre-boutons');
    zone.innerHTML = '';
    boutons.forEach((b) => {
      const el = document.createElement('button');
      el.textContent = b.texte; el.className = b.classe || '';
      el.onclick = () => { $('voile').hidden = true; resoudre(b.valeur ?? b.texte); };
      zone.appendChild(el);
    });
    $('voile').hidden = false;
    const champ = $('fenetre-contenu').querySelector('input, textarea');
    if (champ) champ.focus();
  });
}

// ---------- Écran Accueil ----------
function afficherAccueil() {
  $('categories').innerHTML = CATEGORIES.map((c) => `
    <button class="cat ${c.nom === etat.categorie ? 'actif' : ''}" data-cat="${c.nom}">
      <span class="rond-cat" style="background:${c.couleur}">${c.emoji}</span>${c.nom}
    </button>`).join('');

  const q = etat.recherche.trim().toLowerCase();
  const liste = PRODUITS.filter((p) =>
    (!etat.categorie || p.categorie === etat.categorie) &&
    (!q || p.nom.toLowerCase().includes(q) || p.pays.toLowerCase().includes(q)));

  $('titre-liste').textContent = q ? `Résultats pour « ${etat.recherche.trim()} »` : etat.categorie || 'Populaires';
  $('tout-voir').hidden = !etat.categorie && !q;
  $('aucun').hidden = liste.length > 0;
  $('grille').innerHTML = liste.map((p) => `
    <div class="carte" data-id="${p.id}" role="button" tabindex="0">
      <div class="vignette" style="background:${p.couleur}">${p.emoji}</div>
      <div class="nom">${p.nom}</div>
      <div class="pays">${p.pays}</div>
      <div class="bas"><span class="prix">${prix(p.formats[0][1])}</span><button class="plus" data-ajout="${p.id}" aria-label="Ajouter">+</button></div>
    </div>`).join('');
}

$('recherche').addEventListener('input', (e) => { etat.recherche = e.target.value; afficherAccueil(); });
$('categories').addEventListener('click', (e) => {
  const b = e.target.closest('[data-cat]');
  if (!b) return;
  etat.categorie = etat.categorie === b.dataset.cat ? '' : b.dataset.cat;
  afficherAccueil();
});
$('tout-voir').addEventListener('click', () => { etat.categorie = ''; etat.recherche = ''; $('recherche').value = ''; afficherAccueil(); });
$('btn-decouvrir').addEventListener('click', () => { etat.categorie = ''; etat.recherche = 'Ghana'; $('recherche').value = 'Ghana'; afficherAccueil(); });
$('grille').addEventListener('click', (e) => {
  const ajout = e.target.closest('[data-ajout]');
  if (ajout) {
    const p = PRODUITS.find((x) => x.id === +ajout.dataset.ajout);
    ajouterAuPanier(p, 0, 1);
    toast(`✔ ${p.nom} ajouté au panier`);
    return;
  }
  const carte = e.target.closest('[data-id]');
  if (carte) ouvrirFiche(+carte.dataset.id);
});

// ---------- Fiche produit ----------
function ouvrirFiche(id) {
  etat.produit = PRODUITS.find((p) => p.id === id);
  etat.format = 0; etat.quantite = 1;
  const p = etat.produit;
  $('fiche-photo').style.background = p.couleur;
  $('fiche-emoji').textContent = p.emoji;
  $('fiche-origine').textContent = 'Origine : ' + p.pays;
  $('fiche-nom').textContent = p.nom;
  $('fiche-etoiles').textContent = etoiles(p.note);
  $('fiche-avis').textContent = `(${p.avis} avis)`;
  $('fiche-description').textContent = p.description;
  majFiche();
  afficherVue('fiche');
  document.querySelector('#vue-fiche .defile').scrollTop = 0;
}

function majFiche() {
  const p = etat.produit;
  $('formats').innerHTML = p.formats.map((f, i) => `<button class="chip ${i === etat.format ? 'actif' : ''}" data-format="${i}">${f[0]}</button>`).join('');
  $('fiche-qte').textContent = etat.quantite;
  $('fiche-prix').textContent = prix(p.formats[etat.format][1] * etat.quantite);
  $('btn-favori').textContent = etat.favoris.includes(p.id) ? '♥' : '♡';
}

$('formats').addEventListener('click', (e) => { const b = e.target.closest('[data-format]'); if (b) { etat.format = +b.dataset.format; majFiche(); } });
$('plus').addEventListener('click', () => { etat.quantite++; majFiche(); });
$('moins').addEventListener('click', () => { if (etat.quantite > 1) { etat.quantite--; majFiche(); } });
$('btn-retour').addEventListener('click', () => afficherVue('accueil'));
$('btn-favori').addEventListener('click', () => {
  const id = etat.produit.id;
  etat.favoris = etat.favoris.includes(id) ? etat.favoris.filter((x) => x !== id) : [...etat.favoris, id];
  sauver(); majFiche();
  toast(etat.favoris.includes(id) ? '♥ Ajouté aux favoris' : 'Retiré des favoris');
});
$('btn-partager').addEventListener('click', () => {
  const p = etat.produit;
  fenetre('Partager le produit', `<p>Dans l'application, ce bouton ouvre le menu de partage du téléphone (WhatsApp, SMS, courriel…) grâce au plugin <b>@nativescript/social-share</b>.</p><p style="margin-top:8px"><i>« Découvre ${p.nom} (${p.pays}) à ${prix(p.formats[0][1])} sur AfriMarché 🌍 »</i></p>`);
});
$('btn-ajouter').addEventListener('click', () => {
  const p = etat.produit;
  ajouterAuPanier(p, etat.format, etat.quantite);
  toast(`✔ ${etat.quantite} × ${p.nom} (${p.formats[etat.format][0]}) ajouté`);
  etat.quantite = 1; majFiche();
});

// ---------- Panier ----------
function ajouterAuPanier(p, format, quantite) {
  const ligne = etat.panier.find((l) => l.id === p.id && l.format === format);
  if (ligne) ligne.quantite += quantite;
  else etat.panier.push({ id: p.id, format, quantite });
  sauver(); majPastille();
}

function calculs() {
  let st = 0, nb = 0;
  etat.panier.forEach((l) => { const p = PRODUITS.find((x) => x.id === l.id); st += p.formats[l.format][1] * l.quantite; nb += l.quantite; });
  const frais = st === 0 || st >= LIVRAISON_GRATUITE ? 0 : FRAIS_LIVRAISON;
  return { st, nb, frais, total: st + frais };
}

function majPastille() {
  const { nb } = calculs();
  $('pastille-panier').textContent = nb;
  $('pastille-panier').hidden = nb === 0;
}

function afficherPanier() {
  const { st, nb, frais, total } = calculs();
  $('panier-vide').hidden = nb > 0;
  $('recap').hidden = $('btn-commander').hidden = nb === 0;
  $('lignes').innerHTML = etat.panier.map((l, i) => {
    const p = PRODUITS.find((x) => x.id === l.id);
    const f = p.formats[l.format];
    return `<div class="ligne">
      <div class="mini" style="background:${p.couleur}">${p.emoji}</div>
      <div class="infos"><b>${p.nom}</b><small>${p.pays} · ${f[0]}</small><span class="prix">${prix(f[1] * l.quantite)}</span></div>
      <div class="qtes"><button class="qte" data-moins="${i}">−</button><span>${l.quantite}</span><button class="qte" data-plus="${i}">+</button></div>
    </div>`;
  }).join('');
  $('recap-label').textContent = `Sous-total (${nb} article${nb > 1 ? 's' : ''})`;
  $('recap-st').textContent = prix(st);
  $('recap-livraison').textContent = frais ? prix(frais) : 'Gratuite';
  $('recap-total').textContent = prix(total);
  majPastille();
}

$('lignes').addEventListener('click', (e) => {
  const plus = e.target.closest('[data-plus]'), moins = e.target.closest('[data-moins]');
  if (plus) etat.panier[+plus.dataset.plus].quantite++;
  if (moins) {
    const i = +moins.dataset.moins;
    if (--etat.panier[i].quantite <= 0) etat.panier.splice(i, 1);
  }
  if (plus || moins) { sauver(); afficherPanier(); }
});

$('btn-commander').addEventListener('click', async () => {
  if (!etat.profil.adresse) {
    const r = await fenetre('Adresse manquante', "<p>Ajoute d'abord ton adresse de livraison dans l'onglet Profil.</p>",
      [{ texte: 'Plus tard', classe: 'annuler' }, { texte: 'Aller au Profil', classe: 'ok', valeur: 'profil' }]);
    if (r === 'profil') afficherVue('profil');
    return;
  }
  const { total, nb } = calculs();
  const r = await fenetre('Confirmer la commande', `<p>Total : <b>${prix(total)}</b><br>Livraison : ${echapper(etat.profil.adresse)}</p>`,
    [{ texte: 'Annuler', classe: 'annuler' }, { texte: 'Commander', classe: 'ok', valeur: 'ok' }]);
  if (r !== 'ok') return;
  etat.commandes.unshift({ date: new Date().toLocaleDateString('fr-CA'), total: prix(total), articles: nb });
  etat.panier = [];
  sauver(); afficherPanier();
  setTimeout(() => toast(`🔔 AfriMarché : commande de ${prix(total)} confirmée !`), 400);
});

// ---------- Profil ----------
function afficherProfil() {
  const { nom, courriel, adresse } = etat.profil;
  const init = nom.split(' ').filter(Boolean).map((m) => m[0].toUpperCase()).slice(0, 2).join('');
  $('avatar').textContent = init || '👤';
  $('profil-nom').textContent = nom || 'Touche ici pour ajouter ton nom';
  $('profil-courriel').textContent = courriel || 'courriel non renseigné';
  const n = etat.commandes.length, f = etat.favoris.length;
  $('sous-commandes').textContent = `${n} commande${n > 1 ? 's' : ''}`;
  $('sous-favoris').textContent = `${f} produit${f > 1 ? 's' : ''}`;
  $('sous-adresse').textContent = adresse || 'À ajouter';
}

$('profil-entete').addEventListener('click', async () => {
  const r = await fenetre('Mon profil', `
    <label>Nom</label><input id="f-nom" value="${echapper(etat.profil.nom)}" placeholder="Ton nom complet">
    <label>Courriel</label><input id="f-courriel" type="email" value="${echapper(etat.profil.courriel)}" placeholder="nom@exemple.com">`,
    [{ texte: 'Annuler', classe: 'annuler' }, { texte: 'Enregistrer', classe: 'ok', valeur: 'ok' }]);
  // les champs existent encore dans la fenêtre fermée : on les lit tout de suite
  if (r === 'ok') { etat.profil.nom = $('f-nom').value.trim(); etat.profil.courriel = $('f-courriel').value.trim(); sauver(); afficherProfil(); }
});

document.querySelectorAll('.menu').forEach((m) => m.addEventListener('click', async () => {
  const action = m.dataset.action;
  if (action === 'commandes') {
    const html = etat.commandes.length
      ? '<ul>' + etat.commandes.map((c) => `<li>${c.date} · ${c.articles} article(s) · <b>${c.total}</b></li>`).join('') + '</ul>'
      : "<p>Tu n'as pas encore passé de commande.</p>";
    fenetre('Mes commandes', html);
  }
  if (action === 'adresse') {
    const r = await fenetre('Adresse de livraison', `<label>Rue, ville, code postal</label><textarea id="f-adresse" rows="3">${echapper(etat.profil.adresse)}</textarea>`,
      [{ texte: 'Annuler', classe: 'annuler' }, { texte: 'Enregistrer', classe: 'ok', valeur: 'ok' }]);
    if (r === 'ok') { etat.profil.adresse = $('f-adresse').value.trim(); sauver(); afficherProfil(); }
  }
  if (action === 'position') {
    // Simulation du plugin @nativescript/geolocation
    const gps = 'GPS 46.49000, -80.99000 (Sudbury, ON)';
    $('sous-position').textContent = gps;
    if (!etat.profil.adresse) { etat.profil.adresse = gps; sauver(); afficherProfil(); }
    toast('📍 Position obtenue (simulation)');
  }
  if (action === 'artisans') fenetre('Nos artisans', '<ul>' + ARTISANS.map((a) => `<li>${a}</li>`).join('') + '</ul>');
  if (action === 'favoris') {
    const liste = PRODUITS.filter((p) => etat.favoris.includes(p.id));
    fenetre('Mes favoris', liste.length ? '<ul>' + liste.map((p) => `<li>♥ ${p.nom} (${p.pays})</li>`).join('') + '</ul>' : '<p>Aucun favori pour le moment.</p>');
  }
}));

// ---------- Réinitialiser ----------
$('reinit').addEventListener('click', () => {
  Object.assign(etat, { recherche: '', categorie: '', panier: [], favoris: [], commandes: [], profil: { nom: '', courriel: '', adresse: '' } });
  $('recherche').value = '';
  sauver(); afficherAccueil(); majPastille(); afficherVue('accueil');
  $('sous-position').textContent = 'GPS';
  toast('Prototype réinitialisé');
});

// ---------- Démarrage ----------
afficherAccueil();
majPastille();
