// Onglet 2 - Rendez-vous : rendez-vous à venir (avec annulation) et historique
import { Dialogs, Observable } from '@nativescript/core';
import { LocalNotifications } from '@nativescript/local-notifications';
import { dateHeure, salon } from '../services/salon-service';

const vm = new Observable();

function rafraichir() {
  const maintenant = new Date();
  const aVenir = [], passes = [];
  salon.rendezVous.forEach((r) => (dateHeure(r) > maintenant ? aVenir : passes).push(r));
  vm.set('aVenir', aVenir);
  vm.set('passes', passes.reverse());
}

export function onNavigatingTo(args) {
  args.object.bindingContext = vm;
  rafraichir();
}

export async function onAnnuler(args) {
  const rdv = args.object.bindingContext;
  const ok = await Dialogs.confirm({
    title: 'Annuler ce rendez-vous ?',
    message: `${rdv.service}\n${rdv.dateTexte}`,
    okButtonText: 'Oui, annuler',
    cancelButtonText: 'Non',
  });
  if (!ok) return;
  salon.annuler(rdv.id);
  LocalNotifications.cancel(rdv.id % 100000);
  rafraichir();
}
