// Onglet 1 - Accueil : recherche, bannière, catégories et liste des prestations du salon
import { Observable } from '@nativescript/core';
import { CATEGORIES, SERVICES } from '../services/salon-service';

class AccueilViewModel extends Observable {
  constructor() {
    super();
    this.recherche = '';
    this.categorie = '';
    this.on(Observable.propertyChangeEvent, (e) => {
      if (e.propertyName === 'recherche' || e.propertyName === 'categorie') this.filtrer();
    });
    this.filtrer();
  }

  filtrer() {
    const q = this.recherche.trim().toLowerCase();
    this.set('services', SERVICES.filter((s) =>
      (!this.categorie || s.categorie === this.categorie) &&
      (!q || s.nom.toLowerCase().includes(q) || s.categorie.toLowerCase().includes(q))));
    this.set('categories', CATEGORIES.map((c) => ({ ...c, actif: c.nom === this.categorie })));
    this.set('titreListe', q ? `Résultats pour « ${this.recherche.trim()} »` : this.categorie || 'Toutes les prestations');
  }

  onBanniere() { this.set('categorie', 'Tresses'); }
  onToutVoir() { this.set('categorie', ''); this.set('recherche', ''); }
}

const vm = new AccueilViewModel();

export function onNavigatingTo(args) {
  args.object.bindingContext = vm;
}

export function onCategorieTap(args) {
  const nom = args.object.bindingContext.nom;
  vm.set('categorie', vm.categorie === nom ? '' : nom);
}

export function onServiceTap(args) {
  const vue = args.object;
  vue.page.frame.navigate({ moduleName: 'booking/booking-page', context: vue.bindingContext, animated: true });
}
