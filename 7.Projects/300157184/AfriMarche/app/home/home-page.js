// Onglet 1 - Accueil : recherche, bannière, catégories et grille de produits
import { Observable } from '@nativescript/core';
import { CATEGORIES, PRODUITS, store } from '../services/store-service';
class AccueilViewModel extends Observable {
    constructor() {
        super();
        this.recherche = '';
        this.categorie = ''; // '' = toutes
        this.produits = [];
        this.categories = [];
        this.titreListe = 'Populaires';
        this.message = '';
        this.on(Observable.propertyChangeEvent, (e) => {
            if (e.propertyName === 'recherche' || e.propertyName === 'categorie')
                this.filtrer();
        });
        this.filtrer();
    }
    filtrer() {
        const q = this.recherche.trim().toLowerCase();
        const liste = PRODUITS.filter((p) => (!this.categorie || p.categorie === this.categorie) &&
            (!q || p.nom.toLowerCase().includes(q) || p.pays.toLowerCase().includes(q)));
        this.set('produits', liste);
        this.set('categories', CATEGORIES.map((c, index) => ({ ...c, index, actif: c.nom === this.categorie })));
        this.set('titreListe', q ? `Résultats pour « ${this.recherche.trim()} »` : this.categorie || 'Populaires');
    }
    afficherMessage(texte) {
        this.set('message', texte);
        clearTimeout(this.minuterie);
        this.minuterie = setTimeout(() => this.set('message', ''), 1800);
    }
    onDecouvrir() { this.set('categorie', ''); this.set('recherche', 'Ghana'); }
    onToutVoir() { this.set('categorie', ''); }
}
const vm = new AccueilViewModel();
export function onNavigatingTo(args) {
    args.object.bindingContext = vm;
}
export function onCategorieTap(args) {
    const nom = args.object.bindingContext.nom;
    vm.set('categorie', vm.categorie === nom ? '' : nom);
}
export function onProduitTap(args) {
    const view = args.object;
    view.page.frame.navigate({ moduleName: 'product/product-page', context: view.bindingContext, animated: true });
}
export function onAjoutRapide(args) {
    const produit = args.object.bindingContext;
    store.ajouter(produit);
    vm.afficherMessage(`✔ ${produit.nom} ajouté au panier`);
}
