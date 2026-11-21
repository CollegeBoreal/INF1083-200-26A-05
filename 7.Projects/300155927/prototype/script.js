// INVESTLY — prototype cliquable (JavaScript)
// Mêmes données simulées et mêmes calculs que l'application NativeScript (services/investly-data.js).


const TYPES = ['Actions', 'ETF', 'Crypto'];

// vol = volatilité quotidienne simulée, tendance = dérive quotidienne moyenne
const ACTIFS = [
  { ticker: 'AAPL', nom: 'Apple', type: 'Actions', secteur: 'Technologie', prix: 228.4, vol: 0.016, tendance: 0.0006, couleur: '#6366F1' },
  { ticker: 'MSFT', nom: 'Microsoft', type: 'Actions', secteur: 'Technologie', prix: 415.2, vol: 0.014, tendance: 0.0005, couleur: '#0EA5E9' },
  { ticker: 'NVDA', nom: 'NVIDIA', type: 'Actions', secteur: 'Technologie', prix: 141.8, vol: 0.028, tendance: 0.0015, couleur: '#22C55E' },
  { ticker: 'AMZN', nom: 'Amazon', type: 'Actions', secteur: 'Consommation', prix: 197.3, vol: 0.018, tendance: 0.0006, couleur: '#F59E0B' },
  { ticker: 'TSLA', nom: 'Tesla', type: 'Actions', secteur: 'Consommation', prix: 251.9, vol: 0.032, tendance: 0.0002, couleur: '#EF4444' },
  { ticker: 'SHOP', nom: 'Shopify', type: 'Actions', secteur: 'Technologie', prix: 108.6, vol: 0.026, tendance: 0.0008, couleur: '#84CC16' },
  { ticker: 'RY', nom: 'Banque Royale', type: 'Actions', secteur: 'Finance', prix: 172.5, vol: 0.010, tendance: 0.0004, couleur: '#3B82F6' },
  { ticker: 'TD', nom: 'Banque TD', type: 'Actions', secteur: 'Finance', prix: 79.4, vol: 0.011, tendance: 0.0001, couleur: '#10B981' },
  { ticker: 'ENB', nom: 'Enbridge', type: 'Actions', secteur: 'Énergie', prix: 59.8, vol: 0.009, tendance: 0.0003, couleur: '#F97316' },
  { ticker: 'XEQT', nom: 'iShares Core Equity', type: 'ETF', secteur: 'Diversifié', prix: 33.1, vol: 0.007, tendance: 0.0004, couleur: '#8B5CF6' },
  { ticker: 'VFV', nom: 'Vanguard S&P 500', type: 'ETF', secteur: 'Diversifié', prix: 145.7, vol: 0.008, tendance: 0.0005, couleur: '#14B8A6' },
  { ticker: 'ZAG', nom: 'BMO Obligations', type: 'ETF', secteur: 'Obligations', prix: 14.2, vol: 0.003, tendance: 0.0001, couleur: '#94A3B8' },
  { ticker: 'BTC', nom: 'Bitcoin', type: 'Crypto', secteur: 'Crypto', prix: 98450, vol: 0.035, tendance: 0.0012, couleur: '#F7931A' },
  { ticker: 'ETH', nom: 'Ethereum', type: 'Crypto', secteur: 'Crypto', prix: 4320, vol: 0.040, tendance: 0.0008, couleur: '#627EEA' },
];

const INDICES = [
  { nom: 'S&P/TSX', base: 25210, vol: 0.007 },
  { nom: 'S&P 500', base: 6012, vol: 0.008 },
  { nom: 'Nasdaq', base: 19480, vol: 0.011 },
];

const PERIODES = [
  { cle: '1S', jours: 7 },
  { cle: '1M', jours: 30 },
  { cle: '3M', jours: 90 },
  { cle: '1A', jours: 365 },
];

// Portefeuille de départ (démonstration)
const PORTEFEUILLE_DEPART = {
  liquidites: 2500,
  positions: [
    { ticker: 'XEQT', quantite: 120, prixRevient: 28.4 },
    { ticker: 'AAPL', quantite: 12, prixRevient: 182.5 },
    { ticker: 'RY', quantite: 15, prixRevient: 138.2 },
    { ticker: 'ENB', quantite: 40, prixRevient: 51.0 },
    { ticker: 'NVDA', quantite: 10, prixRevient: 95.0 },
    { ticker: 'BTC', quantite: 0.03, prixRevient: 61200 },
  ],
  transactions: [],
};

// ---------- Génération des historiques simulés ----------
function hachage(texte) { let h = 7; for (const c of texte) h = (h * 31 + c.charCodeAt(0)) % 2147483647; return h || 1; }
function generateur(graine) { let s = graine; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }

// 366 clôtures quotidiennes ; la dernière valeur = prix actuel
function genererHistorique(ticker, prixActuel, vol, tendance, jours = 366) {
  const alea = generateur(hachage(ticker));
  let p = 100;
  const serie = [];
  for (let i = 0; i < jours; i++) {
    const choc = (alea() + alea() + alea() - 1.5) * 1.15 * vol + tendance; // approx. loi normale
    p = Math.max(p * (1 + choc), 0.5);
    serie.push(p);
  }
  const facteur = prixActuel / serie[serie.length - 1];
  return serie.map((v) => v * facteur);
}

function creerMarche() {
  const marche = {};
  ACTIFS.forEach((a) => {
    marche[a.ticker] = { ...a, historique: genererHistorique(a.ticker, a.prix, a.vol, a.tendance) };
  });
  return marche;
}

function creerIndices() {
  return INDICES.map((i) => ({ ...i, historique: genererHistorique(i.nom, i.base, i.vol, 0.0003) }));
}

// Petite variation « en direct » (toutes les quelques secondes)
function tick(actif, alea = Math.random) {
  const h = actif.historique;
  const nouveau = h[h.length - 1] * (1 + (alea() - 0.5) * actif.vol * 0.35);
  h[h.length - 1] = Math.max(nouveau, 0.01);
}

// ---------- Calculs ----------
const prixActuel = (actif) => actif.historique[actif.historique.length - 1];
const prixVeille = (actif) => actif.historique[actif.historique.length - 2];
const variationJour = (actif) => prixActuel(actif) / prixVeille(actif) - 1;
const derniers = (serie, jours) => serie.slice(-(jours + 1));

function valeurPortefeuille(portefeuille, marche) {
  let investi = 0, cout = 0, veille = 0;
  portefeuille.positions.forEach((p) => {
    const a = marche[p.ticker];
    investi += p.quantite * prixActuel(a);
    veille += p.quantite * prixVeille(a);
    cout += p.quantite * p.prixRevient;
  });
  const total = investi + portefeuille.liquidites;
  return {
    total, investi, cout, liquidites: portefeuille.liquidites,
    gain: investi - cout, gainPct: cout ? (investi - cout) / cout : 0,
    jour: investi - veille, jourPct: veille ? investi / veille - 1 : 0,
  };
}

function lignesPortefeuille(portefeuille, marche) {
  const total = valeurPortefeuille(portefeuille, marche).total;
  return portefeuille.positions.map((p) => {
    const a = marche[p.ticker];
    const valeur = p.quantite * prixActuel(a);
    const gain = valeur - p.quantite * p.prixRevient;
    return { ...p, nom: a.nom, type: a.type, couleur: a.couleur, prix: prixActuel(a), valeur, gain,
      gainPct: gain / (p.quantite * p.prixRevient), jourPct: variationJour(a), poids: valeur / total };
  }).sort((x, y) => y.valeur - x.valeur);
}

// Valeur du portefeuille jour par jour (positions actuelles appliquées au passé)
function historiquePortefeuille(portefeuille, marche, jours) {
  const n = jours + 1;
  const serie = new Array(n).fill(portefeuille.liquidites);
  portefeuille.positions.forEach((p) => {
    derniers(marche[p.ticker].historique, jours).forEach((prix, i) => { serie[i] += p.quantite * prix; });
  });
  return serie;
}

function statistiques(serie) {
  const rendements = [];
  for (let i = 1; i < serie.length; i++) rendements.push(serie[i] / serie[i - 1] - 1);
  const moyenne = rendements.reduce((s, r) => s + r, 0) / (rendements.length || 1);
  const variance = rendements.reduce((s, r) => s + (r - moyenne) ** 2, 0) / (rendements.length || 1);
  let sommet = serie[0], baisseMax = 0;
  serie.forEach((v) => { sommet = Math.max(sommet, v); baisseMax = Math.min(baisseMax, v / sommet - 1); });
  return {
    rendement: serie[serie.length - 1] / serie[0] - 1,
    variation: serie[serie.length - 1] - serie[0],
    volatilite: Math.sqrt(variance) * Math.sqrt(252),
    baisseMax,
    haut: Math.max(...serie),
    bas: Math.min(...serie),
  };
}

function repartition(portefeuille, marche, cle) {
  const groupes = {};
  lignesPortefeuille(portefeuille, marche).forEach((l) => {
    const nom = cle === 'type' ? l.type : marche[l.ticker].secteur;
    groupes[nom] = (groupes[nom] || 0) + l.valeur;
  });
  if (portefeuille.liquidites > 0) groupes['Liquidités'] = portefeuille.liquidites;
  const total = Object.values(groupes).reduce((s, v) => s + v, 0);
  const couleurs = ['#10B981', '#6366F1', '#F59E0B', '#0EA5E9', '#EF4444', '#8B5CF6', '#94A3B8', '#F97316'];
  return Object.entries(groupes).sort((a, b) => b[1] - a[1])
    .map(([nom, valeur], i) => ({ nom, valeur, pct: valeur / total, couleur: nom === 'Liquidités' ? '#CBD5E1' : couleurs[i % couleurs.length] }));
}

// Achat / vente simulés ; renvoie un message d'erreur ou null
function acheter(portefeuille, actif, quantite) {
  const prix = prixActuel(actif), montant = prix * quantite;
  if (!(quantite > 0)) return 'Quantité invalide.';
  if (montant > portefeuille.liquidites + 1e-9) return `Liquidités insuffisantes (il faut ${formatArgent(montant)}).`;
  const p = portefeuille.positions.find((x) => x.ticker === actif.ticker);
  if (p) {
    p.prixRevient = (p.prixRevient * p.quantite + montant) / (p.quantite + quantite);
    p.quantite += quantite;
  } else {
    portefeuille.positions.push({ ticker: actif.ticker, quantite, prixRevient: prix });
  }
  portefeuille.liquidites -= montant;
  portefeuille.transactions.unshift({ date: new Date().toISOString(), sens: 'Achat', ticker: actif.ticker, quantite, prix });
  return null;
}

function vendre(portefeuille, actif, quantite) {
  const p = portefeuille.positions.find((x) => x.ticker === actif.ticker);
  if (!p) return "Tu ne possèdes pas cet actif.";
  if (!(quantite > 0) || quantite > p.quantite + 1e-9) return `Quantité invalide (maximum ${formatQuantite(p.quantite)}).`;
  const prix = prixActuel(actif);
  p.quantite -= quantite;
  if (p.quantite < 1e-9) portefeuille.positions = portefeuille.positions.filter((x) => x !== p);
  portefeuille.liquidites += prix * quantite;
  portefeuille.transactions.unshift({ date: new Date().toISOString(), sens: 'Vente', ticker: actif.ticker, quantite, prix });
  return null;
}

// ---------- Mise en forme (format canadien français) ----------
function formatNombre(n, decimales = 2) {
  const [ent, dec] = Math.abs(n).toFixed(decimales).split('.');
  const groupes = ent.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return (n < 0 ? '−' : '') + groupes + (dec ? ',' + dec : '');
}
const formatArgent = (n) => `${formatNombre(n, Math.abs(n) >= 1000000 ? 0 : 2)} $`;
const formatSigneArgent = (n) => (n >= 0 ? '+' : '') + formatArgent(n);
const formatPct = (x) => `${x >= 0 ? '+' : ''}${formatNombre(x * 100, 2)} %`;
const formatQuantite = (q) => (q % 1 === 0 ? formatNombre(q, 0) : formatNombre(q, 4).replace(/0+$/, ''));
const couleurVariation = (x) => (x >= 0 ? '#16A34A' : '#DC2626');

// ---------- Graphique en SVG (utilisé par l'app dans une WebView et par le prototype) ----------
function svgGraphique(valeurs, { largeur = 340, hauteur = 160, couleur = '#10B981', remplir = true, epaisseur = 2.2 } = {}) {
  const min = Math.min(...valeurs), max = Math.max(...valeurs);
  const ecart = max - min || 1, marge = 6;
  const pts = valeurs.map((v, i) => [
    (i / (valeurs.length - 1)) * largeur,
    marge + (1 - (v - min) / ecart) * (hauteur - 2 * marge),
  ]);
  const ligne = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const id = 'g' + Math.round(Math.random() * 1e6);
  const aire = remplir
    ? `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${couleur}" stop-opacity="0.28"/><stop offset="1" stop-color="${couleur}" stop-opacity="0"/></linearGradient></defs>
       <path d="${ligne} L${largeur},${hauteur} L0,${hauteur} Z" fill="url(#${id})"/>`
    : '';
  const fin = pts[pts.length - 1];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${largeur} ${hauteur}" width="100%" height="100%" preserveAspectRatio="none">${aire}
    <path d="${ligne}" fill="none" stroke="${couleur}" stroke-width="${epaisseur}" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
    ${remplir ? `<circle cx="${fin[0]}" cy="${fin[1]}" r="3.5" fill="${couleur}"/>` : ''}</svg>`;
}

// Page HTML minimale pour afficher un SVG dans une WebView NativeScript
const pageGraphique = (svg, fond = '#FFFFFF') =>
  `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;padding:0;background:${fond};height:100%;overflow:hidden}</style></head><body>${svg}</body></html>`;

// =====================================================================
// Interface du prototype
// =====================================================================
const $ = (id) => document.getElementById(id);
const echapper = (t) => String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const copie = (o) => JSON.parse(JSON.stringify(o));
const memoire = {
  lire(cle, defaut) { try { const v = localStorage.getItem('investly.' + cle); return v ? JSON.parse(v) : defaut; } catch { return defaut; } },
  ecrire(cle, valeur) { try { localStorage.setItem('investly.' + cle, JSON.stringify(valeur)); } catch { /* rien */ } },
};

// ---------- État ----------
const marche = creerMarche();
const indices = creerIndices();
const etat = {
  vue: 'portefeuille',
  portefeuille: memoire.lire('portefeuille', copie(PORTEFEUILLE_DEPART)),
  favoris: memoire.lire('favoris', ['AAPL', 'BTC', 'XEQT']),
  alertes: memoire.lire('alertes', []),
  profil: memoire.lire('profil', { nom: '', biometrie: false }),
  periodePf: '1M', periodeActif: '3M', periodeAnalyse: '3M',
  filtre: 'Tout', recherche: '', ticker: null,
};
const sauver = () => ['portefeuille', 'favoris', 'alertes', 'profil'].forEach((c) => memoire.ecrire(c, etat[c]));

// ---------- Outils d'affichage ----------
let minuterieToast;
function toast(texte) {
  $('toast').textContent = texte; $('toast').hidden = false;
  clearTimeout(minuterieToast);
  minuterieToast = setTimeout(() => ($('toast').hidden = true), 2400);
}

function fenetre(titre, html, boutons = [{ texte: 'OK', classe: 'ok' }], surOuverture) {
  return new Promise((resoudre) => {
    $('fenetre-titre').textContent = titre;
    $('fenetre-contenu').innerHTML = html;
    $('fenetre-boutons').innerHTML = '';
    boutons.forEach((b) => {
      const el = document.createElement('button');
      el.textContent = b.texte; el.className = b.classe || '';
      el.onclick = () => {
        const valeur = b.lire ? b.lire() : (b.valeur ?? b.texte);
        if (b.valider && !b.valider(valeur)) return; // la fenêtre reste ouverte
        $('voile').hidden = true; resoudre(valeur);
      };
      $('fenetre-boutons').appendChild(el);
    });
    $('voile').hidden = false;
    if (surOuverture) surOuverture();
    const champ = $('fenetre-contenu').querySelector('input');
    if (champ) { champ.focus(); champ.select(); }
  });
}

const periodesHtml = (active) => PERIODES.map((p) => `<button class="periode ${p.cle === active ? 'actif' : ''}" data-periode="${p.cle}">${p.cle}</button>`).join('');
const badge = (a) => `<span class="badge" style="background:${a.couleur}">${a.ticker}</span>`;
const couleurClaire = (x) => (x >= 0 ? '#4ADE80' : '#F87171');

// ---------- Navigation ----------
function afficherVue(nom) {
  etat.vue = nom;
  document.querySelectorAll('.vue').forEach((v) => v.classList.toggle('active', v.id === 'vue-' + nom));
  const onglet = nom === 'actif' ? null : nom;
  document.querySelectorAll('.onglet').forEach((o) => o.classList.toggle('actif', o.dataset.vue === onglet));
  $('onglets').hidden = nom === 'actif';
  rendre(true);
}
document.querySelectorAll('.onglet').forEach((o) => o.addEventListener('click', () => afficherVue(o.dataset.vue)));

function rendre(complet = false) {
  if (etat.vue === 'portefeuille') rendrePortefeuille(complet);
  if (etat.vue === 'marches') rendreMarches();
  if (etat.vue === 'actif') rendreActif(complet);
  if (etat.vue === 'analyse' && complet) rendreAnalyse();
  if (etat.vue === 'profil' && complet) rendreProfil();
}

function ouvrirActif(ticker) {
  etat.ticker = ticker;
  etat.vueAvantActif = etat.vue;
  afficherVue('actif');
  document.querySelector('#vue-actif .defile').scrollTop = 0;
}

// ---------- 1. Portefeuille ----------
let ancienTotal = null;
function rendrePortefeuille(complet) {
  const pf = etat.portefeuille;
  const v = valeurPortefeuille(pf, marche);
  $('bonjour').textContent = etat.profil.nom ? `Bonjour ${etat.profil.nom.split(' ')[0]} 👋` : 'Bonjour 👋';
  $('pf-total').textContent = formatArgent(v.total);
  if (ancienTotal !== null && v.total !== ancienTotal) {
    $('pf-total').classList.remove('flash-vert', 'flash-rouge'); void $('pf-total').offsetWidth;
    $('pf-total').classList.add(v.total > ancienTotal ? 'flash-vert' : 'flash-rouge');
  }
  ancienTotal = v.total;
  $('pf-jour').textContent = `${formatSigneArgent(v.jour)} (${formatPct(v.jourPct)}) aujourd'hui`;
  $('pf-jour').style.color = couleurClaire(v.jour);
  $('pf-gain').textContent = formatSigneArgent(v.gain); $('pf-gain').style.color = couleurVariation(v.gain);
  $('pf-gain-pct').textContent = formatPct(v.gainPct); $('pf-gain-pct').style.color = couleurVariation(v.gain);
  $('pf-liquidites').textContent = formatArgent(v.liquidites);

  if (complet) {
    const jours = PERIODES.find((p) => p.cle === etat.periodePf).jours;
    const serie = historiquePortefeuille(pf, marche, jours);
    $('pf-graphique').innerHTML = svgGraphique(serie, { couleur: serie[serie.length - 1] >= serie[0] ? '#10B981' : '#F87171' });
    $('pf-periodes').innerHTML = periodesHtml(etat.periodePf);
  }

  const rep = repartition(pf, marche, 'type');
  $('pf-barre').innerHTML = rep.map((r) => `<span style="width:${r.pct * 100}%;background:${r.couleur}" title="${r.nom}"></span>`).join('');
  $('pf-legende').innerHTML = rep.map((r) => `<div><span class="point" style="background:${r.couleur}"></span>${r.nom}<b>${formatNombre(r.pct * 100, 1)} %</b></div>`).join('');

  const lignes = lignesPortefeuille(pf, marche);
  $('pf-titre-positions').textContent = `Mes positions (${lignes.length})`;
  $('pf-positions').innerHTML = lignes.map((l) => `
    <button class="ligne" data-ticker="${l.ticker}">
      ${badge(l)}
      <span class="milieu"><b>${l.nom}</b><small>${formatQuantite(l.quantite)} × ${formatArgent(l.prix)}</small></span>
      <span class="droite"><b>${formatArgent(l.valeur)}</b><small style="color:${couleurVariation(l.gain)}">${formatSigneArgent(l.gain)} (${formatPct(l.gainPct)})</small></span>
    </button>`).join('') || '<p class="vide">Aucune position. Va dans Marchés pour acheter un actif.</p>';

  const t = pf.transactions.slice(0, 5);
  $('pf-titre-transactions').hidden = $('pf-transactions').hidden = t.length === 0;
  $('pf-transactions').innerHTML = t.map((x) => `
    <div class="ligne"><span class="milieu"><b>${x.sens} · ${x.ticker}</b><small>${new Date(x.date).toLocaleString('fr-CA', { dateStyle: 'short', timeStyle: 'short' })}</small></span>
    <span class="droite"><small style="color:var(--texte)">${formatQuantite(x.quantite)} × ${formatArgent(x.prix)}</small></span></div>`).join('');
}
$('pf-periodes').addEventListener('click', (e) => { const b = e.target.closest('[data-periode]'); if (b) { etat.periodePf = b.dataset.periode; rendrePortefeuille(true); } });
$('pf-positions').addEventListener('click', (e) => { const b = e.target.closest('[data-ticker]'); if (b) ouvrirActif(b.dataset.ticker); });

// ---------- 2. Marchés ----------
function rendreMarches() {
  $('indices').innerHTML = indices.map((i) => {
    const h = i.historique, v = h[h.length - 1] / h[h.length - 2] - 1;
    return `<div class="indice"><small>${i.nom}</small><b>${formatNombre(h[h.length - 1], 0)}</b><span style="color:${couleurVariation(v)};font-weight:700">${formatPct(v)}</span></div>`;
  }).join('');
  $('filtres').innerHTML = ['Tout', 'Favoris', ...TYPES].map((f) => `<button class="chip ${f === etat.filtre ? 'actif' : ''}" data-filtre="${f}">${f === 'Favoris' ? '★ ' : ''}${f}</button>`).join('');
  const q = etat.recherche.trim().toLowerCase();
  const liste = Object.values(marche)
    .filter((a) => etat.filtre === 'Tout' || (etat.filtre === 'Favoris' ? etat.favoris.includes(a.ticker) : a.type === etat.filtre))
    .filter((a) => !q || a.ticker.toLowerCase().includes(q) || a.nom.toLowerCase().includes(q) || a.type.toLowerCase().includes(q));
  $('aucun-actif').hidden = liste.length > 0;
  $('liste-actifs').hidden = liste.length === 0;
  $('liste-actifs').innerHTML = liste.map((a) => {
    const v = variationJour(a);
    return `<button class="ligne" data-ticker="${a.ticker}">
      ${badge(a)}
      <span class="milieu"><b>${a.ticker}${etat.favoris.includes(a.ticker) ? ' <span class="etoile-petite">★</span>' : ''}</b><small>${a.nom} · ${a.type}</small></span>
      <span class="droite"><b>${formatArgent(prixActuel(a))}</b><span class="pill" style="background:${couleurVariation(v)}">${formatPct(v)}</span></span>
    </button>`;
  }).join('');
}
$('recherche').addEventListener('input', (e) => { etat.recherche = e.target.value; rendreMarches(); });
$('filtres').addEventListener('click', (e) => { const b = e.target.closest('[data-filtre]'); if (b) { etat.filtre = b.dataset.filtre; rendreMarches(); } });
$('liste-actifs').addEventListener('click', (e) => { const b = e.target.closest('[data-ticker]'); if (b) ouvrirActif(b.dataset.ticker); });

// ---------- Fiche actif ----------
function rendreActif(complet) {
  const a = marche[etat.ticker];
  const v = variationJour(a);
  $('a-ticker').textContent = a.ticker;
  $('a-info').textContent = `${a.nom} · ${a.type} · ${a.secteur}`;
  $('a-prix').textContent = formatArgent(prixActuel(a));
  $('a-jour').textContent = `${formatPct(v)} aujourd'hui`; $('a-jour').style.color = couleurVariation(v);
  $('btn-favori').textContent = etat.favoris.includes(a.ticker) ? '★' : '☆';

  if (complet) {
    const jours = PERIODES.find((p) => p.cle === etat.periodeActif).jours;
    const serie = derniers(a.historique, jours);
    const s = statistiques(serie);
    $('a-graphique').innerHTML = svgGraphique(serie, { couleur: s.rendement >= 0 ? '#10B981' : '#DC2626', hauteur: 180 });
    $('a-graphique').style.height = '180px';
    $('a-periodes').innerHTML = periodesHtml(etat.periodeActif);
    $('a-l-var').textContent = `Variation ${etat.periodeActif}`;
    $('a-var').textContent = formatPct(s.rendement); $('a-var').style.color = couleurVariation(s.rendement);
    $('a-vol').textContent = `${formatNombre(s.volatilite * 100, 1)} %`;
    $('a-l-haut').textContent = `Plus haut ${etat.periodeActif}`; $('a-haut').textContent = formatArgent(s.haut);
    $('a-l-bas').textContent = `Plus bas ${etat.periodeActif}`; $('a-bas').textContent = formatArgent(s.bas);
    etat.dernierRendement = s.rendement;
  }

  const p = etat.portefeuille.positions.find((x) => x.ticker === a.ticker);
  $('a-position-bloc').hidden = !p;
  $('btn-vendre').disabled = !p;
  if (p) {
    const valeur = p.quantite * prixActuel(a), gain = valeur - p.quantite * p.prixRevient;
    $('a-position').innerHTML = `
      <div><small>Quantité</small><b>${formatQuantite(p.quantite)}</b></div>
      <div><small>Prix de revient moyen</small><b>${formatArgent(p.prixRevient)}</b></div>
      <div><small>Valeur actuelle</small><b>${formatArgent(valeur)}</b></div>
      <div><small>Gain / perte</small><b style="color:${couleurVariation(gain)}">${formatSigneArgent(gain)} (${formatPct(gain / (p.quantite * p.prixRevient))})</b></div>`;
  }
  const al = etat.alertes.filter((x) => x.ticker === a.ticker);
  $('a-alertes').hidden = al.length === 0;
  $('a-alertes').textContent = '🔔 Alerte : ' + al.map((x) => `${x.sens} de ${formatArgent(x.seuil)}`).join(', ');
}
$('a-periodes').addEventListener('click', (e) => { const b = e.target.closest('[data-periode]'); if (b) { etat.periodeActif = b.dataset.periode; rendreActif(true); } });
$('btn-retour').addEventListener('click', () => afficherVue(etat.vueAvantActif || 'marches'));
$('btn-favori').addEventListener('click', () => {
  const t = etat.ticker;
  etat.favoris = etat.favoris.includes(t) ? etat.favoris.filter((x) => x !== t) : [...etat.favoris, t];
  sauver(); rendreActif(false);
  toast(etat.favoris.includes(t) ? `★ ${t} ajouté aux favoris` : `${t} retiré des favoris`);
});
$('btn-partager').addEventListener('click', () => {
  const a = marche[etat.ticker];
  fenetre('Partager', `<p>Dans l'application, le menu de partage du téléphone s'ouvre (plugin <b>@nativescript/social-share</b>) avec ce message :</p>
    <p style="margin-top:8px"><i>« ${a.nom} (${a.ticker}) : ${formatPct(etat.dernierRendement)} sur ${etat.periodeActif} — suivi avec INVESTLY 📈 »</i></p>`);
});

async function transaction(sens) {
  const a = marche[etat.ticker];
  const p = etat.portefeuille.positions.find((x) => x.ticker === a.ticker);
  const maxi = sens === 'Acheter' ? etat.portefeuille.liquidites / prixActuel(a) : p.quantite;
  const pas = a.type === 'Crypto' ? '0.001' : '1';
  const q = await fenetre(`${sens} ${a.ticker}`, `
      <p>Prix actuel : <b>${formatArgent(prixActuel(a))}</b><br>Liquidités : ${formatArgent(etat.portefeuille.liquidites)}${p ? `<br>Tu possèdes : ${formatQuantite(p.quantite)}` : ''}</p>
      <label>Quantité (maximum ${formatQuantite(Math.floor(maxi * (a.type === 'Crypto' ? 1000 : 1)) / (a.type === 'Crypto' ? 1000 : 1))})</label>
      <input id="f-qte" type="number" min="0" step="${pas}" value="${a.type === 'Crypto' ? '0.01' : '1'}">
      <p class="estimation" id="f-estimation"></p><p class="erreur" id="f-erreur"></p>`,
    [{ texte: 'Annuler', classe: 'annuler', valeur: null },
     { texte: sens, classe: sens === 'Acheter' ? 'vert' : 'ok', lire: () => parseFloat($('f-qte').value),
       valider: (val) => {
         const essai = copie(etat.portefeuille);
         const erreur = sens === 'Acheter' ? acheter(essai, a, val) : vendre(essai, a, val);
         $('f-erreur').textContent = erreur || '';
         return !erreur;
       } }],
    () => {
      const maj = () => { const val = parseFloat($('f-qte').value) || 0; $('f-estimation').textContent = `Montant estimé : ${formatArgent(val * prixActuel(a))}`; };
      $('f-qte').addEventListener('input', maj); maj();
    });
  if (q === null || q === undefined) return;
  sens === 'Acheter' ? acheter(etat.portefeuille, a, q) : vendre(etat.portefeuille, a, q);
  sauver(); rendreActif(false);
  toast(`✔ ${sens === 'Acheter' ? 'Achat' : 'Vente'} simulé${sens === 'Acheter' ? '' : 'e'} : ${formatQuantite(q)} ${a.ticker}`);
}
$('btn-acheter').addEventListener('click', () => transaction('Acheter'));
$('btn-vendre').addEventListener('click', () => transaction('Vendre'));

$('btn-alerte').addEventListener('click', async () => {
  const a = marche[etat.ticker];
  const seuil = await fenetre(`Alerte de prix · ${a.ticker}`, `
      <p>Prix actuel : <b>${formatArgent(prixActuel(a))}</b></p>
      <label>M'avertir quand le prix atteint :</label>
      <input id="f-seuil" type="number" min="0" step="0.01" value="${(prixActuel(a) * 1.002).toFixed(2)}">
      <p class="estimation">Astuce : mets un prix très proche du prix actuel pour voir l'alerte se déclencher en quelques secondes.</p>`,
    [{ texte: 'Annuler', classe: 'annuler', valeur: null },
     { texte: "Créer l'alerte", classe: 'ok', lire: () => parseFloat($('f-seuil').value), valider: (v) => v > 0 }]);
  if (!seuil) return;
  const sens = seuil >= prixActuel(a) ? 'au-dessus' : 'au-dessous';
  etat.alertes.push({ ticker: a.ticker, seuil, sens });
  sauver(); rendreActif(false);
  toast(`🔔 Alerte créée : ${a.ticker} ${sens} de ${formatArgent(seuil)}`);
});

function verifierAlertes() {
  const declenchees = etat.alertes.filter((al) => {
    const p = prixActuel(marche[al.ticker]);
    return al.sens === 'au-dessus' ? p >= al.seuil : p <= al.seuil;
  });
  if (!declenchees.length) return;
  const al = declenchees[0];
  toast(`🔔 Notification : ${al.ticker} est passé ${al.sens} de ${formatArgent(al.seuil)} !`);
  etat.alertes = etat.alertes.filter((x) => !declenchees.includes(x));
  sauver();
  if (etat.vue === 'profil') rendreProfil();
}

// ---------- 3. Analyse ----------
function rendreAnalyse() {
  const pf = etat.portefeuille;
  const jours = PERIODES.find((p) => p.cle === etat.periodeAnalyse).jours;
  const serie = historiquePortefeuille(pf, marche, jours);
  const s = statistiques(serie);
  const sp = statistiques(derniers(indices[1].historique, jours));
  $('an-periodes').innerHTML = periodesHtml(etat.periodeAnalyse);
  $('an-l-rendement').textContent = `Rendement sur ${etat.periodeAnalyse}`;
  $('an-rendement').textContent = formatPct(s.rendement); $('an-rendement').style.color = couleurVariation(s.rendement);
  $('an-variation').textContent = `${formatSigneArgent(s.variation)} sur la période`; $('an-variation').style.color = couleurVariation(s.rendement);
  $('an-graphique').innerHTML = svgGraphique(serie, { couleur: s.rendement >= 0 ? '#10B981' : '#DC2626' });
  $('an-indice').textContent = formatPct(sp.rendement); $('an-indice').style.color = couleurVariation(sp.rendement);
  const ecart = s.rendement - sp.rendement;
  $('an-comparaison').textContent = ecart >= 0
    ? `✅ Ton portefeuille fait mieux que le S&P 500 de ${formatNombre(ecart * 100, 2)} points.`
    : `⚠️ Ton portefeuille fait moins bien que le S&P 500 de ${formatNombre(-ecart * 100, 2)} points.`;
  $('an-vol').textContent = `${formatNombre(s.volatilite * 100, 1)} %`;
  $('an-risque').textContent = s.volatilite < 0.08 ? 'Risque faible' : s.volatilite < 0.18 ? 'Risque modéré' : 'Risque élevé';
  $('an-baisse').textContent = `${formatNombre(s.baisseMax * 100, 2)} %`;
  $('an-haut').textContent = formatArgent(s.haut);
  $('an-bas').textContent = formatArgent(s.bas);

  const lignes = lignesPortefeuille(pf, marche).sort((x, y) => y.gainPct - x.gainPct);
  const choix = lignes.length > 4 ? [...lignes.slice(0, 2), ...lignes.slice(-2)] : lignes;
  $('an-classement').innerHTML = choix.map((l) => `
    <button class="ligne" data-ticker="${l.ticker}"><b style="width:22px;color:var(--gris)">${lignes.indexOf(l) + 1}.</b>
      <span class="milieu"><b>${l.ticker}</b><small>${l.nom}</small></span>
      <span class="pill" style="background:${couleurVariation(l.gainPct)}">${formatPct(l.gainPct)}</span></button>`).join('')
    || '<p class="vide">Aucune position.</p>';

  const sect = repartition(pf, marche, 'secteur');
  $('an-secteurs').innerHTML = sect.map((r) => `
    <div class="barre-secteur"><div class="haut"><span class="point" style="background:${r.couleur}"></span>${r.nom}<b>${formatNombre(r.pct * 100, 1)} %</b></div>
    <div class="progression"><span style="width:${r.pct * 100}%;background:${r.couleur}"></span></div></div>`).join('');
  const max = sect[0];
  $('an-conseil').textContent = max && max.pct > 0.4 && max.nom !== 'Diversifié'
    ? `ℹ️ Le secteur « ${max.nom} » représente plus de 40 % du portefeuille : il est peu diversifié.`
    : 'ℹ️ Aucun secteur ne dépasse 40 % : le portefeuille est plutôt bien diversifié.';
}
$('an-periodes').addEventListener('click', (e) => { const b = e.target.closest('[data-periode]'); if (b) { etat.periodeAnalyse = b.dataset.periode; rendreAnalyse(); } });
$('an-classement').addEventListener('click', (e) => { const b = e.target.closest('[data-ticker]'); if (b) ouvrirActif(b.dataset.ticker); });

// ---------- 4. Profil ----------
function rendreProfil() {
  const nom = etat.profil.nom;
  $('avatar').textContent = nom.split(' ').filter(Boolean).map((m) => m[0].toUpperCase()).slice(0, 2).join('') || '👤';
  $('profil-nom').textContent = nom || 'Touche ici pour ajouter ton nom';
  $('bio').checked = etat.profil.biometrie;
  $('titre-alertes').textContent = `Mes alertes de prix (${etat.alertes.length})`;
  $('alertes-vide').hidden = etat.alertes.length > 0;
  $('liste-alertes').innerHTML = etat.alertes.map((al, i) => `
    <div class="menu"><span class="pastille">🔔</span><span><b>${al.ticker}</b><small>Quand le prix passe ${al.sens} de ${formatArgent(al.seuil)}</small></span>
    <button class="supprimer" data-supprimer="${i}" aria-label="Supprimer">✕</button></div>`).join('');
  const n = etat.portefeuille.transactions.length;
  $('nb-transactions').textContent = `${n} transaction${n > 1 ? 's' : ''}`;
}
$('profil-entete').addEventListener('click', async () => {
  const nom = await fenetre('Ton nom', `<input id="f-nom" value="${echapper(etat.profil.nom)}" placeholder="Prénom Nom">`,
    [{ texte: 'Annuler', classe: 'annuler', valeur: null }, { texte: 'Enregistrer', classe: 'ok', lire: () => $('f-nom').value.trim() }]);
  if (nom === null) return;
  etat.profil.nom = nom; sauver(); rendreProfil();
});
$('bio').addEventListener('change', (e) => {
  etat.profil.biometrie = e.target.checked; sauver();
  toast(e.target.checked ? '🔒 Verrouillage activé : il sera demandé au prochain démarrage' : 'Verrouillage désactivé');
});
$('liste-alertes').addEventListener('click', (e) => {
  const b = e.target.closest('[data-supprimer]'); if (!b) return;
  etat.alertes.splice(+b.dataset.supprimer, 1); sauver(); rendreProfil(); toast('Alerte supprimée');
});
document.querySelectorAll('.menu[data-action]').forEach((m) => m.addEventListener('click', async () => {
  const a = m.dataset.action;
  if (a === 'transactions') {
    const t = etat.portefeuille.transactions;
    fenetre('Historique des transactions', t.length
      ? '<ul>' + t.map((x) => `<li>${new Date(x.date).toLocaleDateString('fr-CA')} · <b>${x.sens}</b> ${formatQuantite(x.quantite)} ${x.ticker} à ${formatArgent(x.prix)}</li>`).join('') + '</ul>'
      : "<p>Aucune transaction pour l'instant. Ouvre un actif et touche « Acheter ».</p>");
  }
  if (a === 'partager') {
    const v = valeurPortefeuille(etat.portefeuille, marche);
    fenetre('Partager ma performance', `<p>Dans l'application, le menu de partage s'ouvre (plugin <b>@nativescript/social-share</b>) avec :</p><p style="margin-top:8px"><i>« Mon portefeuille INVESTLY : ${formatPct(v.gainPct)} de rendement total 📈 »</i></p>`);
  }
  if (a === 'reinitialiser') {
    const r = await fenetre('Réinitialiser ?', '<p>Ton portefeuille revient à son état de départ et tes alertes sont supprimées.</p>',
      [{ texte: 'Annuler', classe: 'annuler', valeur: null }, { texte: 'Réinitialiser', classe: 'ok', valeur: 'ok' }]);
    if (r === 'ok') { etat.portefeuille = copie(PORTEFEUILLE_DEPART); etat.alertes = []; sauver(); rendreProfil(); toast('Simulation réinitialisée'); }
  }
}));

// ---------- Verrouillage ----------
$('btn-deverrouiller').addEventListener('click', () => { $('verrou').hidden = true; toast('👆 Déverrouillé'); });

// ---------- Réinitialiser tout le prototype ----------
$('reinit').addEventListener('click', () => {
  Object.assign(etat, { portefeuille: copie(PORTEFEUILLE_DEPART), favoris: ['AAPL', 'BTC', 'XEQT'], alertes: [], profil: { nom: '', biometrie: false }, filtre: 'Tout', recherche: '' });
  $('recherche').value = '';
  sauver(); afficherVue('portefeuille'); toast('Prototype réinitialisé');
});

// ---------- Marché en direct (toutes les 3 s) ----------
setInterval(() => {
  Object.values(marche).forEach((a) => tick(a));
  indices.forEach((i) => tick(i));
  verifierAlertes();
  if ($('voile').hidden) rendre(false);
}, 3000);

// ---------- Démarrage ----------
$('verrou').hidden = !etat.profil.biometrie;
afficherVue('portefeuille');
