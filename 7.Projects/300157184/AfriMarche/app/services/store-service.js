// Données de la boutique : catalogue des produits africains, panier, favoris et commandes
import { ApplicationSettings, Observable, ObservableArray } from '@nativescript/core';
export const formatPrix = (n) => `${n.toFixed(2).replace('.', ',')} $`;
const ROUGE = '#B23A2B', OR = '#E0A526', VERT = '#1F4D3A', NOIR = '#2B2B2B';
export const CATEGORIES = [
    { nom: 'Épicerie', emoji: '🍲', couleur: ROUGE },
    { nom: 'Beauté', emoji: '🧴', couleur: OR },
    { nom: 'Artisanat', emoji: '🧺', couleur: VERT },
    { nom: 'Mode', emoji: '🧵', couleur: NOIR },
];
const p = (id, nom, pays, categorie, formats, emoji, couleur, note, avis, description) => ({ id, nom, pays, categorie, formats, emoji, couleur, note, avis, description, prix: formats[0].prix, prixTexte: formatPrix(formats[0].prix) });
export const PRODUITS = [
    p(1, 'Café Yirgacheffe', 'Éthiopie', 'Épicerie', [{ label: '340 g', prix: 18.99 }, { label: '1 kg', prix: 49.99 }], '☕', ROUGE, 5, 48, 'Arabica en grains, notes florales et citronnées. Coopérative de Gedeo.'),
    p(2, 'Fleurs de bissap', 'Sénégal', 'Épicerie', [{ label: '200 g', prix: 7.5 }, { label: '500 g', prix: 16.0 }], '🌺', ROUGE, 4, 31, "Fleurs d'hibiscus séchées pour préparer le jus de bissap."),
    p(3, 'Thé rooibos', 'Afrique du Sud', 'Épicerie', [{ label: '40 sachets', prix: 9.25 }], '🍵', ROUGE, 5, 22, 'Infusion naturelle sans théine, douce et légèrement sucrée.'),
    p(4, 'Attiéké', "Côte d'Ivoire", 'Épicerie', [{ label: '500 g', prix: 6.0 }, { label: '1 kg', prix: 11.0 }], '🍚', ROUGE, 4, 17, 'Semoule de manioc fermenté, prête en 5 minutes.'),
    p(5, 'Karité brut', 'Burkina Faso', 'Beauté', [{ label: '250 g', prix: 14.0 }, { label: '500 g', prix: 25.0 }], '🧴', OR, 5, 64, 'Beurre de karité non raffiné, produit par une coopérative de femmes.'),
    p(6, "Huile d'argan", 'Maroc', 'Beauté', [{ label: '100 ml', prix: 22.5 }], '💧', OR, 5, 40, "Huile d'argan pure pressée à froid, pour la peau et les cheveux."),
    p(7, 'Savon noir africain', 'Ghana', 'Beauté', [{ label: '1 pain', prix: 8.75 }, { label: '3 pains', prix: 22.0 }], '🧼', OR, 4, 29, 'Savon traditionnel à base de cendres de cacao et de plantain.'),
    p(8, 'Panier Bolga', 'Ghana', 'Artisanat', [{ label: 'Moyen', prix: 45.0 }, { label: 'Grand', prix: 60.0 }], '🧺', VERT, 5, 19, 'Panier tressé à la main en herbe éléphant, anses en cuir.'),
    p(9, 'Masque sculpté', 'Mali', 'Artisanat', [{ label: 'Unique', prix: 65.0 }], '🎭', VERT, 4, 8, 'Masque décoratif sculpté à la main par un artisan de Bamako.'),
    p(10, 'Tissu wax', "Côte d'Ivoire", 'Mode', [{ label: '6 yards', prix: 39.99 }, { label: '3 yards', prix: 22.0 }], '🧵', NOIR, 5, 52, 'Pagne wax 100 % coton, motifs colorés.'),
    p(11, 'Écharpe kente', 'Ghana', 'Mode', [{ label: 'Unique', prix: 29.0 }], '🧣', NOIR, 5, 26, 'Étole kente tissée à la main, idéale pour les cérémonies.'),
    p(12, 'Bracelet maasaï', 'Kenya', 'Mode', [{ label: 'Unique', prix: 12.5 }], '📿', NOIR, 4, 34, 'Bracelet en perles fait main par des artisanes maasaïes.'),
];
export const ARTISANS = [
    'Coopérative de Gedeo (Éthiopie) — café',
    'Union des femmes de Léo (Burkina Faso) — karité',
    "Coopérative Tighanimine (Maroc) — argan",
    'Tisserands de Bolgatanga (Ghana) — paniers',
    'Tisserands de Bonwire (Ghana) — kente',
    'Artisanes maasaïes de Narok (Kenya) — perles',
];
export const LIVRAISON_GRATUITE = 50;
export const FRAIS_LIVRAISON = 7.99;
export const etoiles = (note) => '★'.repeat(note) + '☆'.repeat(5 - note);
class StoreService extends Observable {
    constructor() {
        super();
        this.panier = new ObservableArray();
        this.favoris = JSON.parse(ApplicationSettings.getString('favoris', '[]'));
        this.commandes = JSON.parse(ApplicationSettings.getString('commandes', '[]'));
        this.sousTotal = formatPrix(0);
        this.livraison = 'Gratuite';
        this.total = formatPrix(0);
        this.totalNombre = 0;
        this.nbArticles = 0;
        const sauve = JSON.parse(ApplicationSettings.getString('panier', '[]'));
        sauve.forEach((l) => {
            const prod = PRODUITS.find((x) => x.id === l.id);
            const f = prod?.formats.find((x) => x.label === l.format);
            if (prod && f)
                this.panier.push(this.ligne(prod, f, l.quantite));
        });
        this.maj();
    }
    ajouter(produit, format = produit.formats[0], quantite = 1) {
        const cle = `${produit.id}|${format.label}`;
        const i = this.panier.findIndex((l) => l.cle === cle);
        if (i >= 0)
            this.changerQuantite(i, this.panier.getItem(i).quantite + quantite);
        else {
            this.panier.push(this.ligne(produit, format, quantite));
            this.maj();
        }
    }
    changerQuantite(index, quantite) {
        const l = this.panier.getItem(index);
        if (quantite <= 0)
            this.panier.splice(index, 1);
        else
            this.panier.setItem(index, this.ligne(l.produit, l.format, quantite));
        this.maj();
    }
    commander() {
        const c = { date: new Date().toLocaleDateString('fr-CA'), total: this.total, articles: this.nbArticles };
        this.commandes.unshift(c);
        ApplicationSettings.setString('commandes', JSON.stringify(this.commandes));
        this.panier.splice(0);
        this.maj();
        return c;
    }
    estFavori(id) { return this.favoris.includes(id); }
    basculerFavori(id) {
        this.favoris = this.estFavori(id) ? this.favoris.filter((x) => x !== id) : [...this.favoris, id];
        ApplicationSettings.setString('favoris', JSON.stringify(this.favoris));
        return this.estFavori(id);
    }
    ligne(produit, format, quantite) {
        return { cle: `${produit.id}|${format.label}`, produit, format, quantite, sousTotal: formatPrix(format.prix * quantite) };
    }
    maj() {
        let st = 0, nb = 0;
        const sauve = [];
        this.panier.forEach((l) => {
            st += l.format.prix * l.quantite;
            nb += l.quantite;
            sauve.push({ id: l.produit.id, format: l.format.label, quantite: l.quantite });
        });
        const frais = st === 0 || st >= LIVRAISON_GRATUITE ? 0 : FRAIS_LIVRAISON;
        this.set('sousTotal', formatPrix(st));
        this.set('livraison', frais ? formatPrix(frais) : 'Gratuite');
        this.set('totalNombre', st + frais);
        this.set('total', formatPrix(st + frais));
        this.set('nbArticles', nb);
        ApplicationSettings.setString('panier', JSON.stringify(sauve));
    }
}
export const store = new StoreService();
