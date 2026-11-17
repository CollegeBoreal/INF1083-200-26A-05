// Onglet 3 - Profil : nom, courriel, adresse, position GPS, commandes, artisans, favoris
import { ApplicationSettings, CoreTypes, Dialogs, Observable } from '@nativescript/core';
import * as geolocation from '@nativescript/geolocation';
import { ARTISANS, PRODUITS, store } from '../services/store-service';
class ProfilViewModel extends Observable {
    constructor() {
        super(...arguments);
        this.nom = ApplicationSettings.getString('nom', '');
        this.courriel = ApplicationSettings.getString('courriel', '');
        this.adresse = ApplicationSettings.getString('adresse', '');
        this.position = '';
        this.initiales = '';
        this.nbCommandes = 0;
        this.nbFavoris = 0;
        this.nbArtisans = ARTISANS.length;
    }
    rafraichir() {
        const init = this.nom.split(' ').filter(Boolean).map((m) => m[0].toUpperCase()).slice(0, 2).join('');
        this.set('initiales', init || '👤');
        this.set('nbCommandes', store.commandes.length);
        this.set('nbFavoris', store.favoris.length);
    }
    async onModifierProfil() {
        const n = await Dialogs.prompt({ title: 'Ton nom', defaultText: this.nom, okButtonText: 'Suivant', cancelButtonText: 'Annuler' });
        if (!n.result)
            return;
        const c = await Dialogs.prompt({ title: 'Ton courriel', defaultText: this.courriel, okButtonText: 'Enregistrer', cancelButtonText: 'Annuler', inputType: 'email' });
        this.set('nom', n.text.trim());
        ApplicationSettings.setString('nom', this.nom);
        if (c.result) {
            this.set('courriel', c.text.trim());
            ApplicationSettings.setString('courriel', this.courriel);
        }
        this.rafraichir();
    }
    async onAdresse() {
        const r = await Dialogs.prompt({ title: 'Adresse de livraison', message: 'Rue, ville, code postal', defaultText: this.adresse, okButtonText: 'Enregistrer', cancelButtonText: 'Annuler' });
        if (!r.result)
            return;
        this.set('adresse', r.text.trim());
        ApplicationSettings.setString('adresse', this.adresse);
    }
    async onPosition() {
        try {
            await geolocation.enableLocationRequest();
            const loc = await geolocation.getCurrentLocation({ desiredAccuracy: CoreTypes.Accuracy.high, timeout: 15000 });
            const gps = `GPS ${loc.latitude.toFixed(5)}, ${loc.longitude.toFixed(5)}`;
            this.set('position', gps);
            this.set('adresse', this.adresse ? `${this.adresse} (${gps})` : gps);
            ApplicationSettings.setString('adresse', this.adresse);
        }
        catch {
            await Dialogs.alert("Impossible d'obtenir la position. Vérifie les permissions de localisation.");
        }
    }
    onCommandes() {
        const texte = store.commandes.length
            ? store.commandes.map((c) => `${c.date} · ${c.articles} article(s) · ${c.total}`).join('\n')
            : "Tu n'as pas encore passé de commande.";
        Dialogs.alert({ title: 'Mes commandes', message: texte, okButtonText: 'OK' });
    }
    onArtisans() {
        Dialogs.alert({ title: 'Nos artisans', message: ARTISANS.join('\n\n'), okButtonText: 'OK' });
    }
    onFavoris() {
        const liste = PRODUITS.filter((p) => store.estFavori(p.id)).map((p) => `♥ ${p.nom} (${p.pays})`);
        Dialogs.alert({ title: 'Mes favoris', message: liste.length ? liste.join('\n') : 'Aucun favori pour le moment.', okButtonText: 'OK' });
    }
}
const vm = new ProfilViewModel();
export function onNavigatingTo(args) {
    args.object.bindingContext = vm;
    vm.rafraichir();
}
