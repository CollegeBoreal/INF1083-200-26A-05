// Fiche d'un actif : prix en direct, graphique, statistiques, position, achat / vente simulés, favori, alerte, partage
import { Dialogs, Frame, Observable } from '@nativescript/core';
import { shareText } from '@nativescript/social-share';
import { store } from '../services/store';
import {
  PERIODES, acheter, couleurVariation, derniers, formatArgent, formatNombre, formatPct, formatQuantite, formatSigneArgent,
  pageGraphique, prixActuel, statistiques, svgGraphique, variationJour, vendre,
} from '../services/investly-data';

class ActifViewModel extends Observable {
  constructor(ticker) {
    super();
    this.actif = store.marche[ticker];
    Object.assign(this, { ticker, nom: this.actif.nom, type: this.actif.type, secteur: this.actif.secteur });
    this.periode = '3M';
    this.ecouteur = (e) => { if (e.propertyName === 'version') this.rafraichir(false); };
    store.on(Observable.propertyChangeEvent, this.ecouteur);
    this.rafraichir();
  }

  detacher() { store.off(Observable.propertyChangeEvent, this.ecouteur); }

  rafraichir(avecGraphique = true) {
    const a = this.actif, v = variationJour(a);
    this.set('prix', formatArgent(prixActuel(a)));
    this.set('variationJour', `${formatPct(v)} aujourd'hui`);
    this.set('couleurJour', couleurVariation(v));
    this.set('favori', store.estFavori(a.ticker));
    const p = store.portefeuille.positions.find((x) => x.ticker === a.ticker);
    if (p) {
      const valeur = p.quantite * prixActuel(a), gain = valeur - p.quantite * p.prixRevient;
      this.set('position', { quantite: formatQuantite(p.quantite), prixRevient: formatArgent(p.prixRevient), valeur: formatArgent(valeur),
        gain: `${formatSigneArgent(gain)} (${formatPct(gain / (p.quantite * p.prixRevient))})`, couleur: couleurVariation(gain) });
    } else {
      this.set('position', null);
    }
    const alertes = store.alertes.filter((al) => al.ticker === a.ticker);
    this.set('alertesTexte', alertes.length ? '🔔 Alerte : ' + alertes.map((al) => `${al.sens} de ${formatArgent(al.seuil)}`).join(', ') : '');
    if (avecGraphique) this.majGraphique();
  }

  majGraphique() {
    const jours = PERIODES.find((p) => p.cle === this.periode).jours;
    const serie = derniers(this.actif.historique, jours);
    const s = statistiques(serie);
    this.set('stats', { variation: formatPct(s.rendement), couleur: couleurVariation(s.rendement), volatilite: `${formatNombre(s.volatilite * 100, 1)} %`,
      haut: formatArgent(s.haut), bas: formatArgent(s.bas) });
    this.set('graphique', pageGraphique(svgGraphique(serie, { couleur: s.rendement >= 0 ? '#10B981' : '#DC2626' })));
    this.set('periodes', PERIODES.map((p) => ({ cle: p.cle, actif: p.cle === this.periode })));
  }

  choisirPeriode(cle) { this.set('periode', cle); this.majGraphique(); }
  onRetour() { Frame.topmost().goBack(); }
  onFavori() { this.set('favori', store.basculerFavori(this.ticker)); }

  async demanderQuantite(sens) {
    const r = await Dialogs.prompt({
      title: `${sens} ${this.ticker}`,
      message: `Prix actuel : ${formatArgent(prixActuel(this.actif))}\nLiquidités : ${formatArgent(store.portefeuille.liquidites)}\nQuantité :`,
      okButtonText: sens, cancelButtonText: 'Annuler', inputType: 'decimal', defaultText: '1',
    });
    if (!r.result) return null;
    return parseFloat(r.text.replace(',', '.'));
  }

  async onAcheter() {
    const q = await this.demanderQuantite('Acheter');
    if (q === null) return;
    const erreur = acheter(store.portefeuille, this.actif, q);
    if (erreur) return Dialogs.alert(erreur);
    store.sauver();
    Dialogs.alert(`Achat simulé : ${formatQuantite(q)} ${this.ticker} ✔`);
  }

  async onVendre() {
    const q = await this.demanderQuantite('Vendre');
    if (q === null) return;
    const erreur = vendre(store.portefeuille, this.actif, q);
    if (erreur) return Dialogs.alert(erreur);
    store.sauver();
    Dialogs.alert(`Vente simulée : ${formatQuantite(q)} ${this.ticker} ✔`);
  }

  async onAlerte() {
    const r = await Dialogs.prompt({
      title: `Alerte de prix · ${this.ticker}`,
      message: `Prix actuel : ${formatArgent(prixActuel(this.actif))}\nM'avertir quand le prix atteint :`,
      okButtonText: 'Créer l\'alerte', cancelButtonText: 'Annuler', inputType: 'decimal',
    });
    const seuil = r.result ? parseFloat(r.text.replace(',', '.')) : NaN;
    if (!(seuil > 0)) return;
    const sens = store.ajouterAlerte(this.ticker, seuil);
    Dialogs.alert(`🔔 Tu recevras une notification quand ${this.ticker} passera ${sens} de ${formatArgent(seuil)}.`);
  }

  onPartager() {
    shareText(`${this.nom} (${this.ticker}) : ${this.stats.variation} sur ${this.periode} — suivi avec INVESTLY 📈`, 'Partager');
  }
}

let vm;

export function onNavigatingTo(args) {
  if (args.isBackNavigation && vm) return;
  vm = new ActifViewModel(args.object.navigationContext.ticker);
  args.object.bindingContext = vm;
}

export function onNavigatedFrom(args) {
  if (args.isBackNavigation) vm?.detacher(); // la fiche est fermée : on arrête d'écouter le marché
}

export function onPeriodeTap(args) {
  vm.choisirPeriode(args.object.bindingContext.cle);
}
