// Onglet 3 - Profil : informations de la cliente / du client, type de cheveux, contact et partage du salon
import { ApplicationSettings, Dialogs, Observable, Utils } from '@nativescript/core';
import { shareText } from '@nativescript/social-share';
import { SALON } from '../services/salon-service';

const TEXTURES = ['Raides', 'Ondulés', 'Bouclés', 'Frisés', 'Crépus', 'Locks'];

class ProfilViewModel extends Observable {
  constructor() {
    super();
    this.salon = SALON;
    this.nom = ApplicationSettings.getString('nom', '');
    this.telephone = ApplicationSettings.getString('telephone', '');
    this.texture = ApplicationSettings.getString('texture', '');
    this.majInitiales();
  }

  majInitiales() {
    const init = this.nom.split(' ').filter(Boolean).map((m) => m[0].toUpperCase()).slice(0, 2).join('');
    this.set('initiales', init || '👤');
  }

  async onModifier() {
    const n = await Dialogs.prompt({ title: 'Ton nom', defaultText: this.nom, okButtonText: 'Suivant', cancelButtonText: 'Annuler' });
    if (!n.result) return;
    const t = await Dialogs.prompt({ title: 'Ton téléphone', defaultText: this.telephone, okButtonText: 'Enregistrer', cancelButtonText: 'Annuler', inputType: 'phone' });
    this.set('nom', n.text.trim());
    ApplicationSettings.setString('nom', this.nom);
    if (t.result) { this.set('telephone', t.text.trim()); ApplicationSettings.setString('telephone', this.telephone); }
    this.majInitiales();
  }

  async onTexture() {
    const choix = await Dialogs.action({ title: 'Mon type de cheveux', cancelButtonText: 'Annuler', actions: TEXTURES });
    if (TEXTURES.includes(choix)) { this.set('texture', choix); ApplicationSettings.setString('texture', choix); }
  }

  onAppeler() { Utils.openUrl(`tel:${SALON.telephone}`); }
  onItineraire() { Utils.openUrl(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SALON.adresse)}`); }
  onPartager() {
    shareText(`Je te recommande ${SALON.nom} 💇‍♀️ : tresses, locks, coupes, coloration… ${SALON.adresse} · ${SALON.telephoneTexte}`, 'Recommander le salon');
  }
}

const vm = new ProfilViewModel();

export function onNavigatingTo(args) {
  args.object.bindingContext = vm;
}
