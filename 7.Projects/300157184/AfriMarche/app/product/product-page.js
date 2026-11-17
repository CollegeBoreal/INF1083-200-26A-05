// Fiche produit : format, quantité, favori, partage et ajout au panier
import { Frame, Observable } from '@nativescript/core';
import { shareText } from '@nativescript/social-share';
import { etoiles, formatPrix, store } from '../services/store-service';
class ProduitViewModel extends Observable {
    constructor(produit) {
        super();
        this.produit = produit;
        this.quantite = 1;
        this.formats = [];
        this.prixTexte = '';
        this.message = '';
        this.etoiles = etoiles(produit.note);
        this.favori = store.estFavori(produit.id);
        this.choisirFormat(produit.formats[0]);
    }
    choisirFormat(f) {
        this.set('format', f);
        this.set('formats', this.produit.formats.map((x) => ({ label: x.label, actif: x.label === f.label, format: x })));
        this.majPrix();
    }
    majPrix() { this.set('prixTexte', formatPrix(this.format.prix * this.quantite)); }
    onPlus() { this.set('quantite', this.quantite + 1); this.majPrix(); }
    onMoins() {
        if (this.quantite > 1) {
            this.set('quantite', this.quantite - 1);
            this.majPrix();
        }
    }
    onRetour() { Frame.topmost().goBack(); }
    onFavori() { this.set('favori', store.basculerFavori(this.produit.id)); }
    onAjouter() {
        store.ajouter(this.produit, this.format, this.quantite);
        this.set('message', `✔ ${this.quantite} × ${this.produit.nom} (${this.format.label}) ajouté au panier`);
        clearTimeout(this.minuterie);
        this.minuterie = setTimeout(() => this.set('message', ''), 2000);
        this.set('quantite', 1);
        this.majPrix();
    }
    onPartager() {
        shareText(`Découvre « ${this.produit.nom} » (${this.produit.pays}) à ${this.produit.prixTexte} sur AfriMarché 🌍`, 'Partager le produit');
    }
}
let vm;
export function onNavigatingTo(args) {
    const page = args.object;
    if (args.isBackNavigation)
        return;
    vm = new ProduitViewModel(page.navigationContext);
    page.bindingContext = vm;
}
export function onFormatTap(args) {
    vm.choisirFormat(args.object.bindingContext.format);
}
