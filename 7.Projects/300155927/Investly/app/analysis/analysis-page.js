// Onglet 3 - Analyse : rendement par période, comparaison avec le S&P 500, risque, classement et diversification
import { Observable } from '@nativescript/core';
import { store } from '../services/store';
import {
  PERIODES, couleurVariation, derniers, formatArgent, formatNombre, formatPct, formatSigneArgent,
  historiquePortefeuille, lignesPortefeuille, pageGraphique, repartition, statistiques, svgGraphique,
} from '../services/investly-data';

class AnalyseViewModel extends Observable {
  constructor() {
    super();
    this.periode = '3M';
  }

  rafraichir() {
    const jours = PERIODES.find((p) => p.cle === this.periode).jours;
    const serie = historiquePortefeuille(store.portefeuille, store.marche, jours);
    const s = statistiques(serie);
    const sp = statistiques(derniers(store.indices[1].historique, jours));
    this.set('periodes', PERIODES.map((p) => ({ cle: p.cle, actif: p.cle === this.periode })));
    this.set('rendement', formatPct(s.rendement));
    this.set('variation', `${formatSigneArgent(s.variation)} sur la période`);
    this.set('couleur', couleurVariation(s.rendement));
    this.set('graphique', pageGraphique(svgGraphique(serie, { couleur: s.rendement >= 0 ? '#10B981' : '#DC2626' })));
    this.set('indice', formatPct(sp.rendement));
    this.set('indiceCouleur', couleurVariation(sp.rendement));
    const ecart = s.rendement - sp.rendement;
    this.set('comparaison', ecart >= 0
      ? `✅ Ton portefeuille fait mieux que le S&P 500 de ${formatNombre(ecart * 100, 2)} points.`
      : `⚠️ Ton portefeuille fait moins bien que le S&P 500 de ${formatNombre(-ecart * 100, 2)} points.`);
    this.set('volatilite', `${formatNombre(s.volatilite * 100, 1)} %`);
    this.set('niveauRisque', s.volatilite < 0.08 ? 'Risque faible' : s.volatilite < 0.18 ? 'Risque modéré' : 'Risque élevé');
    this.set('baisseMax', `${formatNombre(s.baisseMax * 100, 2)} %`);
    this.set('haut', formatArgent(s.haut));
    this.set('bas', formatArgent(s.bas));

    const lignes = lignesPortefeuille(store.portefeuille, store.marche).sort((a, b) => b.gainPct - a.gainPct);
    const choix = lignes.length > 4 ? [...lignes.slice(0, 2), ...lignes.slice(-2)] : lignes;
    this.set('classement', choix.map((l) => ({
      ticker: l.ticker, nom: l.nom, rang: `${lignes.indexOf(l) + 1}.`, gainTexte: formatPct(l.gainPct), couleur: couleurVariation(l.gainPct),
    })));

    const secteurs = repartition(store.portefeuille, store.marche, 'secteur');
    this.set('secteurs', secteurs.map((r) => ({ ...r, pct100: Math.round(r.pct * 100), pctTexte: `${formatNombre(r.pct * 100, 1)} %` })));
    const max = secteurs[0];
    this.set('conseilDiversification', max && max.pct > 0.4 && max.nom !== 'Diversifié'
      ? `ℹ️ Le secteur « ${max.nom} » représente plus de 40 % du portefeuille : il est peu diversifié.`
      : 'ℹ️ Aucun secteur ne dépasse 40 % : le portefeuille est plutôt bien diversifié.');
  }

  choisirPeriode(cle) { this.set('periode', cle); this.rafraichir(); }
}

const vm = new AnalyseViewModel();

export function onNavigatingTo(args) {
  args.object.bindingContext = vm;
  vm.rafraichir();
}

export function onPeriodeTap(args) {
  vm.choisirPeriode(args.object.bindingContext.cle);
}

export function onPositionTap(args) {
  const vue = args.object;
  vue.page.frame.navigate({ moduleName: 'asset/asset-page', context: { ticker: vue.bindingContext.ticker }, animated: true });
}
