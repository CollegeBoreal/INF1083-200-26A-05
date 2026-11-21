// Onglet 4 - Profil : nom, verrouillage biométrique, alertes de prix, transactions, partage, réinitialisation
import { Dialogs, Observable } from '@nativescript/core';
import { BiometricAuth } from '@nativescript/biometrics';
import { shareText } from '@nativescript/social-share';
import { store } from '../services/store';
import { formatArgent, formatPct, formatQuantite, valeurPortefeuille } from '../services/investly-data';

class ProfilViewModel extends Observable {
  rafraichir() {
    const nom = store.profil.nom;
    this.set('nom', nom);
    this.set('initiales', nom.split(' ').filter(Boolean).map((m) => m[0].toUpperCase()).slice(0, 2).join('') || '👤');
    this.set('biometrie', store.profil.biometrie);
    this.set('alertes', store.alertes.map((al, index) => ({ index, ticker: al.ticker, description: `Quand le prix passe ${al.sens} de ${formatArgent(al.seuil)}` })));
    const n = store.portefeuille.transactions.length;
    this.set('nbTransactions', `${n} transaction${n > 1 ? 's' : ''}`);
  }

  async onNom() {
    const r = await Dialogs.prompt({ title: 'Ton nom', defaultText: store.profil.nom, okButtonText: 'Enregistrer', cancelButtonText: 'Annuler' });
    if (!r.result) return;
    store.profil.nom = r.text.trim();
    store.sauver();
    this.rafraichir();
  }

  async activerBiometrie(active) {
    if (active === store.profil.biometrie) return;
    if (active) {
      try {
        const bio = new BiometricAuth();
        const dispo = await bio.available();
        if (!dispo.any) {
          await Dialogs.alert("Cet appareil n'a pas d'empreinte digitale ni de reconnaissance faciale configurée.");
          this.set('biometrie', false);
          return;
        }
        await bio.verifyBiometric({ title: 'INVESTLY', message: 'Confirme pour activer le verrouillage', pinFallback: true });
      } catch {
        this.set('biometrie', false);
        return;
      }
    }
    store.profil.biometrie = active;
    store.sauver();
  }

  onTransactions() {
    const t = store.portefeuille.transactions;
    Dialogs.alert({
      title: 'Historique des transactions',
      message: t.length
        ? t.map((x) => `${new Date(x.date).toLocaleDateString('fr-CA')} · ${x.sens} ${formatQuantite(x.quantite)} ${x.ticker} à ${formatArgent(x.prix)}`).join('\n')
        : "Aucune transaction pour l'instant. Ouvre un actif et touche « Acheter ».",
      okButtonText: 'OK',
    });
  }

  onPartager() {
    const v = valeurPortefeuille(store.portefeuille, store.marche);
    shareText(`Mon portefeuille INVESTLY : ${formatPct(v.gainPct)} de rendement total 📈`, 'Partager ma performance');
  }

  async onReinitialiser() {
    const ok = await Dialogs.confirm({ title: 'Réinitialiser ?', message: 'Ton portefeuille revient à son état de départ et tes alertes sont supprimées.', okButtonText: 'Réinitialiser', cancelButtonText: 'Annuler' });
    if (!ok) return;
    store.reinitialiser();
    this.rafraichir();
  }
}

const vm = new ProfilViewModel();

export function onNavigatingTo(args) {
  args.object.bindingContext = vm;
  vm.rafraichir();
}

export function onBiometrie(args) {
  vm.activerBiometrie(args.object.checked);
}

export function onSupprimerAlerte(args) {
  store.supprimerAlerte(args.object.bindingContext.index);
  vm.rafraichir();
}
