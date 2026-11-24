// Données et calculs d'INVESTLY (fonctions pures, sans interface)
// ⚠️ Tous les prix sont SIMULÉS à des fins pédagogiques : ce ne sont pas de vraies données de marché.

export const TYPES = ['Actions', 'ETF', 'Crypto'];

// vol = volatilité quotidienne simulée, tendance = dérive quotidienne moyenne
export const ACTIFS = [
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

export const INDICES = [
  { nom: 'S&P/TSX', base: 25210, vol: 0.007 },
  { nom: 'S&P 500', base: 6012, vol: 0.008 },
  { nom: 'Nasdaq', base: 19480, vol: 0.011 },
];

export const PERIODES = [
  { cle: '1S', jours: 7 },
  { cle: '1M', jours: 30 },
  { cle: '3M', jours: 90 },
  { cle: '1A', jours: 365 },
];

// Portefeuille de départ (démonstration)
export const PORTEFEUILLE_DEPART = {
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
export function genererHistorique(ticker, prixActuel, vol, tendance, jours = 366) {
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

export function creerMarche() {
  const marche = {};
  ACTIFS.forEach((a) => {
    marche[a.ticker] = { ...a, historique: genererHistorique(a.ticker, a.prix, a.vol, a.tendance) };
  });
  return marche;
}

export function creerIndices() {
  return INDICES.map((i) => ({ ...i, historique: genererHistorique(i.nom, i.base, i.vol, 0.0003) }));
}

// Petite variation « en direct » (toutes les quelques secondes)
export function tick(actif, alea = Math.random) {
  const h = actif.historique;
  const nouveau = h[h.length - 1] * (1 + (alea() - 0.5) * actif.vol * 0.35);
  h[h.length - 1] = Math.max(nouveau, 0.01);
}

// ---------- Calculs ----------
export const prixActuel = (actif) => actif.historique[actif.historique.length - 1];
export const prixVeille = (actif) => actif.historique[actif.historique.length - 2];
export const variationJour = (actif) => prixActuel(actif) / prixVeille(actif) - 1;
export const derniers = (serie, jours) => serie.slice(-(jours + 1));

export function valeurPortefeuille(portefeuille, marche) {
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

export function lignesPortefeuille(portefeuille, marche) {
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
export function historiquePortefeuille(portefeuille, marche, jours) {
  const n = jours + 1;
  const serie = new Array(n).fill(portefeuille.liquidites);
  portefeuille.positions.forEach((p) => {
    derniers(marche[p.ticker].historique, jours).forEach((prix, i) => { serie[i] += p.quantite * prix; });
  });
  return serie;
}

export function statistiques(serie) {
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

export function repartition(portefeuille, marche, cle) {
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
export function acheter(portefeuille, actif, quantite) {
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

export function vendre(portefeuille, actif, quantite) {
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
export function formatNombre(n, decimales = 2) {
  const [ent, dec] = Math.abs(n).toFixed(decimales).split('.');
  const groupes = ent.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return (n < 0 ? '−' : '') + groupes + (dec ? ',' + dec : '');
}
export const formatArgent = (n) => `${formatNombre(n, Math.abs(n) >= 1000000 ? 0 : 2)} $`;
export const formatSigneArgent = (n) => (n >= 0 ? '+' : '') + formatArgent(n);
export const formatPct = (x) => `${x >= 0 ? '+' : ''}${formatNombre(x * 100, 2)} %`;
export const formatQuantite = (q) => (q % 1 === 0 ? formatNombre(q, 0) : formatNombre(q, 4).replace(/0+$/, ''));
export const couleurVariation = (x) => (x >= 0 ? '#16A34A' : '#DC2626');

// ---------- Graphique en SVG (utilisé par l'app dans une WebView et par le prototype) ----------
export function svgGraphique(valeurs, { largeur = 340, hauteur = 160, couleur = '#10B981', remplir = true, epaisseur = 2.2 } = {}) {
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
export const pageGraphique = (svg, fond = '#FFFFFF') =>
  `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;padding:0;background:${fond};height:100%;overflow:hidden}</style></head><body>${svg}</body></html>`;
