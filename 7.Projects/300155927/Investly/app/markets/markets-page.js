// Onglet 2 - Marchés : indices, recherche, filtres (favoris, actions, ETF, crypto) et liste des actifs en direct
import { Observable } from '@nativescript/core';
import { store } from '../services/store';
import { TYPES, couleurVariation, formatArgent, formatNombre, formatPct, prixActuel, variationJour } from '../services/investly-data';

const FILTRES = ['Tout', 'Favoris', ...TYPES];

class MarchesViewModel extends Observable {
  constructor() {
    super();
    this.recherche = '';
    this.filtre = 'Tout';
    this.on(Observable.propertyChangeEvent, (e) => { if (e.propertyName === 'recherche') this.rafraichir(); });
    store.on(Observable.propertyChangeEvent, (e) => { if (e.propertyName === 'version') this.rafraichir(); });
    this.rafraichir();
  }

  rafraichir() {
    const q = this.recherche.trim().toLowerCase();
    this.set('filtres', FILTRES.map((nom) => ({ nom, actif: nom === this.filtre })));
    this.set('indices', store.indices.map((i, colonne) => {
      const h = i.historique, v = h[h.length - 1] / h[h.length - 2] - 1;
      return { colonne, nom: i.nom, valeur: formatNombre(h[h.length - 1], 0), variation: formatPct(v), couleur: couleurVariation(v) };
    }));
    this.set('actifs', Object.values(store.marche)
      .filter((a) => this.filtre === 'Tout' || (this.filtre === 'Favoris' ? store.estFavori(a.ticker) : a.type === this.filtre))
      .filter((a) => !q || a.ticker.toLowerCase().includes(q) || a.nom.toLowerCase().includes(q) || a.type.toLowerCase().includes(q))
      .map((a) => {
        const v = variationJour(a);
        return { ticker: a.ticker, nom: a.nom, type: a.type, couleur: a.couleur, favori: store.estFavori(a.ticker),
          prixTexte: formatArgent(prixActuel(a)), variationTexte: formatPct(v), couleurVar: couleurVariation(v) };
      }));
  }

  choisirFiltre(nom) { this.filtre = nom; this.rafraichir(); }
}

const vm = new MarchesViewModel();

export function onNavigatingTo(args) {
  args.object.bindingContext = vm;
  vm.rafraichir();
}

export function onFiltreTap(args) {
  vm.choisirFiltre(args.object.bindingContext.nom);
}

export function onActifTap(args) {
  const actif = vm.actifs[args.index];
  args.object.page.frame.navigate({ moduleName: 'asset/asset-page', context: { ticker: actif.ticker }, animated: true });
}
