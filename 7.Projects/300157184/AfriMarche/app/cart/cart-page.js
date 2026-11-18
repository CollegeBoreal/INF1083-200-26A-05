// Onglet 2 - Panier : quantités, total et commande (avec notification)
import { ApplicationSettings, Dialogs } from '@nativescript/core';
import { LocalNotifications } from '@nativescript/local-notifications';
import { store } from '../services/store-service';
export function onNavigatingTo(args) {
    args.object.bindingContext = store;
}
function index(args) {
    const ligne = args.object.bindingContext;
    return store.panier.findIndex((l) => l.cle === ligne.cle);
}
export function onPlus(args) {
    const i = index(args);
    store.changerQuantite(i, store.panier.getItem(i).quantite + 1);
}
export function onMoins(args) {
    const i = index(args);
    store.changerQuantite(i, store.panier.getItem(i).quantite - 1);
}
export async function onCommander() {
    const adresse = ApplicationSettings.getString('adresse', '');
    if (!adresse) {
        await Dialogs.alert("Ajoute d'abord ton adresse de livraison dans l'onglet Profil.");
        return;
    }
    const ok = await Dialogs.confirm({
        title: 'Confirmer la commande',
        message: `Total : ${store.total}\nLivraison : ${adresse}`,
        okButtonText: 'Commander',
        cancelButtonText: 'Annuler',
    });
    if (!ok)
        return;
    const commande = store.commander();
    if (await LocalNotifications.requestPermission()) {
        await LocalNotifications.schedule([{
                id: Date.now() % 100000,
                title: 'AfriMarché 🌍',
                body: `Merci ! Ta commande de ${commande.total} est confirmée.`,
                at: new Date(Date.now() + 2000),
            }]);
    }
}
