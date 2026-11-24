// Onglet 1 - Portefeuille : valeur totale, graphique, répartition, positions et transactions
import { Observable } from '@nativescript/core';
import { BiometricAuth } from '@nativescript/biometrics';
import { store } from '../services/store';
import {
  PERIODES, couleurVariation, formatArgent, formatPct, formatQuantite, formatSigneArgent,
  historiquePortefeuille, lignesPortefeuille, pageGraphique, repartition, svgGraphique, valeurPortefeuille,
} from '../services/investly-data';

class PortefeuilleViewModel extends Observable {
  constructor() {
    super();
    this.periode = '1M';
    this.verrouille = store.profil.biometrie; // verrouillé au démarrage si l'option est activée
    store.on(Observable.propertyChangeEvent, (e) => { if (e.propertyName === 'version') this.rafraichir(false); });
  }

  rafraichir(avecGraphique = true) {
    const pf = store.portefeuille, m = store.marche;
    const v = valeurPortefeuille(pf, m);
    this.set('bonjour', store.profil.nom ? `Bonjour ${store.profil.nom.split(' ')[0]} 👋` : 'Bonjour 👋');
    this.set('total', formatArgent(v.total));
    this.set('jourTexte', `${formatSigneArgent(v.jour)} (${formatPct(v.jourPct)}) aujourd'hui`);
    this.set('jourCouleur', v.jour >= 0 ? '#4ADE80' : '#F87171');
    this.set('gain', formatSigneArgent(v.gain));
    this.set('gainPct', formatPct(v.gainPct));
    this.set('gainCouleur', couleurVariation(v.gain));
    this.set('liquidites', formatArgent(v.liquidites));
    this.set('repartition', repartition(pf, m, 'type').map((r) => ({ ...r, pct100: Math.round(r.pct * 100), pctTexte: `${(r.pct * 100).toFixed(1).replace('.', ',')} %` })));
    this.set('positions', lignesPortefeuille(pf, m).map((l) => ({
      ...l,
      quantiteTexte: `${formatQuantite(l.quantite)} × ${formatArgent(l.prix)}`,
      valeurTexte: formatArgent(l.valeur),
      gainTexte: `${formatSigneArgent(l.gain)} (${formatPct(l.gainPct)})`,
      gainCouleur: couleurVariation(l.gain),
    })));
    this.set('transactions', pf.transactions.slice(0, 5).map((t) => ({
      titre: `${t.sens} · ${t.ticker}`,
      date: new Date(t.date).toLocaleDateString('fr-CA'),
      montant: `${formatQuantite(t.quantite)} × ${formatArgent(t.prix)}`,
    })));
    if (avecGraphique) this.majGraphique();
  }

  majGraphique() {
    const jours = PERIODES.find((p) => p.cle === this.periode).jours;
    const serie = historiquePortefeuille(store.portefeuille, store.marche, jours);
    const couleur = serie[serie.length - 1] >= serie[0] ? '#10B981' : '#F87171';
    this.set('graphique', pageGraphique(svgGraphique(serie, { couleur }), '#0B1B3F'));
    this.set('periodes', PERIODES.map((p) => ({ cle: p.cle, actif: p.cle === this.periode })));
  }

  choisirPeriode(cle) { this.periode = cle; this.majGraphique(); }

  async onDeverrouiller() {
    try {
      const bio = new BiometricAuth();
      const dispo = await bio.available();
      if (!dispo.any) { this.set('verrouille', false); return; }
      await bio.verifyBiometric({ title: 'INVESTLY', message: 'Déverrouille ton portefeuille', pinFallback: true });
      this.set('verrouille', false);
    } catch {
      // échec ou annulation : l'écran reste verrouillé
    }
  }
}

const vm = new PortefeuilleViewModel();

export function onNavigatingTo(args) {
  args.object.bindingContext = vm;
  vm.rafraichir();
  if (vm.verrouille) vm.onDeverrouiller();
}

export function onPeriodeTap(args) {
  vm.choisirPeriode(args.object.bindingContext.cle);
}

export function onPositionTap(args) {
  const vue = args.object;
  vue.page.frame.navigate({ moduleName: 'asset/asset-page', context: { ticker: vue.bindingContext.ticker }, animated: true });
}
