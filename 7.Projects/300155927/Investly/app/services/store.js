// État partagé de l'application : marché simulé « en direct », portefeuille, favoris, alertes de prix
import { ApplicationSettings, Observable } from '@nativescript/core';
import { LocalNotifications } from '@nativescript/local-notifications';
import { PORTEFEUILLE_DEPART, creerIndices, creerMarche, formatArgent, prixActuel, tick } from './investly-data';

const lire = (cle, defaut) => { try { return JSON.parse(ApplicationSettings.getString(cle, '')) ?? defaut; } catch { return defaut; } };
const copie = (o) => JSON.parse(JSON.stringify(o));

class Store extends Observable {
  constructor() {
    super();
    this.marche = creerMarche();
    this.indices = creerIndices();
    this.portefeuille = lire('portefeuille', copie(PORTEFEUILLE_DEPART));
    this.favoris = lire('favoris', ['AAPL', 'BTC', 'XEQT']);
    this.alertes = lire('alertes', []); // { ticker, seuil, sens: 'au-dessus' | 'au-dessous' }
    this.profil = lire('profil', { nom: '', biometrie: false });
    this.version = 0; // augmente à chaque mise à jour : les pages s'y abonnent
    this.demarrer();
  }

  // Le marché bouge toutes les 3 secondes (simulation)
  demarrer() {
    if (this.minuterie) return;
    this.minuterie = setInterval(() => {
      Object.values(this.marche).forEach((a) => tick(a));
      this.indices.forEach((i) => tick(i));
      this.verifierAlertes();
      this.set('version', this.version + 1);
    }, 3000);
  }

  sauver() {
    ApplicationSettings.setString('portefeuille', JSON.stringify(this.portefeuille));
    ApplicationSettings.setString('favoris', JSON.stringify(this.favoris));
    ApplicationSettings.setString('alertes', JSON.stringify(this.alertes));
    ApplicationSettings.setString('profil', JSON.stringify(this.profil));
    this.set('version', this.version + 1);
  }

  estFavori(ticker) { return this.favoris.includes(ticker); }
  basculerFavori(ticker) {
    this.favoris = this.estFavori(ticker) ? this.favoris.filter((t) => t !== ticker) : [...this.favoris, ticker];
    this.sauver();
    return this.estFavori(ticker);
  }

  ajouterAlerte(ticker, seuil) {
    const sens = seuil >= prixActuel(this.marche[ticker]) ? 'au-dessus' : 'au-dessous';
    this.alertes.push({ ticker, seuil, sens });
    this.sauver();
    LocalNotifications.requestPermission();
    return sens;
  }

  supprimerAlerte(index) { this.alertes.splice(index, 1); this.sauver(); }

  verifierAlertes() {
    const declenchees = this.alertes.filter((al) => {
      const p = prixActuel(this.marche[al.ticker]);
      return al.sens === 'au-dessus' ? p >= al.seuil : p <= al.seuil;
    });
    if (!declenchees.length) return;
    LocalNotifications.schedule(declenchees.map((al, i) => ({
      id: (Date.now() + i) % 100000,
      title: `INVESTLY · ${al.ticker} 🔔`,
      body: `${al.ticker} est passé ${al.sens} de ${formatArgent(al.seuil)} (${formatArgent(prixActuel(this.marche[al.ticker]))})`,
      at: new Date(Date.now() + 500),
    })));
    this.alertes = this.alertes.filter((al) => !declenchees.includes(al));
    this.sauver();
  }

  reinitialiser() {
    this.portefeuille = copie(PORTEFEUILLE_DEPART);
    this.alertes = [];
    this.sauver();
  }
}

export const store = new Store();
