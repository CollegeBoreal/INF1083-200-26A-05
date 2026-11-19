// Réservation : choix du coiffeur, du jour, de l'heure, photo d'inspiration (caméra) et rappel par notification
import { Dialogs, Frame, ImageSource, Observable, knownFolders, path } from '@nativescript/core';
import * as camera from '@nativescript/camera';
import { LocalNotifications } from '@nativescript/local-notifications';
import { coiffeursPour, creneaux, dateHeure, prochainsJours, salon, texteDate } from '../services/salon-service';

class ReservationViewModel extends Observable {
  constructor(service) {
    super();
    this.service = service;
    this.listeCoiffeurs = coiffeursPour(service);
    this.listeJours = prochainsJours(10);
    this.coiffeur = this.listeCoiffeurs[0];
    this.date = this.listeJours[0].cle;
    this.heure = '';
    this.note = '';
    this.photo = '';
    this.majTout();
  }

  majTout() {
    this.set('coiffeurs', this.listeCoiffeurs.map((c) => ({ ...c, actif: c.id === this.coiffeur.id })));
    this.set('jours', this.listeJours.map((j) => ({ ...j, actif: j.cle === this.date })));
    const liste = creneaux(this.service, this.coiffeur.id, this.date, this.rendezVousExistants());
    if (this.heure && !liste.some((c) => c.heure === this.heure && c.libre)) this.set('heure', '');
    this.set('creneaux', liste.map((c) => ({ ...c, actif: c.heure === this.heure })));
    this.set('resumeChoix', this.heure ? `${texteDate(this.date)} · ${this.heure}` : 'Choisis une heure');
  }

  rendezVousExistants() {
    const liste = [];
    salon.rendezVous.forEach((r) => liste.push(r));
    return liste;
  }

  choisirCoiffeur(c) { this.coiffeur = c; this.majTout(); }
  choisirJour(cle) { this.date = cle; this.set('heure', ''); this.majTout(); }
  choisirHeure(h) { this.set('heure', h); this.majTout(); }
  onRetour() { Frame.topmost().goBack(); }

  async onPhoto() {
    try {
      await camera.requestPermissions();
      const asset = await camera.takePicture({ width: 600, height: 600, keepAspectRatio: true });
      const image = await ImageSource.fromAsset(asset);
      const fichier = path.join(knownFolders.documents().path, `inspiration-${Date.now()}.jpg`);
      image.saveToFile(fichier, 'jpg');
      this.set('photo', fichier);
    } catch {
      await Dialogs.alert("Impossible d'utiliser la caméra. Vérifie les permissions.");
    }
  }

  async onConfirmer() {
    if (!this.heure) return;
    const ok = await Dialogs.confirm({
      title: 'Confirmer le rendez-vous',
      message: `${this.service.nom}\n${texteDate(this.date)} à ${this.heure}\nAvec : ${this.coiffeur.nom}\nPrix : ${this.service.prixTexte}`,
      okButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
    });
    if (!ok) return;

    const rdv = salon.reserver({ service: this.service, coiffeur: this.coiffeur, date: this.date, heure: this.heure, note: this.note, photo: this.photo });

    // Rappel 24 h avant (ou 1 h avant si le rendez-vous est demain matin)
    const debut = dateHeure(rdv);
    let rappel = new Date(debut.getTime() - 24 * 3600 * 1000);
    if (rappel <= new Date()) rappel = new Date(debut.getTime() - 3600 * 1000);
    if (rappel > new Date() && (await LocalNotifications.requestPermission())) {
      await LocalNotifications.schedule([{
        id: rdv.id % 100000,
        title: "Bel'Hair 💇‍♀️",
        body: `Rappel : ${rdv.service} le ${rdv.dateTexte} avec ${rdv.coiffeur}`,
        at: rappel,
      }]);
    }

    await Dialogs.alert({ title: 'Rendez-vous confirmé ✔', message: `${rdv.service}\n${rdv.dateTexte}\nTu le retrouves dans l'onglet « Rendez-vous ».`, okButtonText: 'OK' });
    Frame.topmost().goBack();
  }
}

let vm;

export function onNavigatingTo(args) {
  if (args.isBackNavigation) return;
  vm = new ReservationViewModel(args.object.navigationContext);
  args.object.bindingContext = vm;
}

export function onCoiffeurTap(args) {
  vm.choisirCoiffeur(vm.listeCoiffeurs.find((c) => c.id === args.object.bindingContext.id));
}

export function onJourTap(args) {
  vm.choisirJour(args.object.bindingContext.cle);
}

export function onHeureTap(args) {
  vm.choisirHeure(args.object.bindingContext.heure);
}
