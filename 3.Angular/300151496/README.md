# Laboratoire Angular — INF1083

**Étudiant :** Anis Ouhocine (B300151496)

## Description
Application Angular : composant accueil, data binding, évènements, directives, API REST, routage, CSS.

## Étapes
1. npm install -g @angular/cli puis ng version
2. ng new B300151496 (routing Yes, CSS)
3. ng generate component accueil
4. Data binding : titre et nom
5. Évènement : bouton (click)
6. Directives : *ngIf, *ngFor
7. API REST : HttpClient + jsonplaceholder
8. Routage : path vide vers Accueil
9. CSS : h1 en bleu

## Captures
<image src=images/Appli.png width=50% height=50% > </image>
<image src=images/ng_v.png width=50% height=50% > </image>

Lancement

cd B300151496 puis ng serve, ouvrir http://localhost:4200

Le laboratoire Angular du cours INF1083 demandait de créer une application web complète : installer les outils, générer un projet avec Angular CLI, créer un composant, utiliser le data binding, les évènements, les directives, consommer une API REST, mettre en place le routage et styliser avec CSS. 

Ce qui a été réalisé

Installation — Node.js v24.21.0 et npm 11.19.0 vérifiés, puis Angular CLI installé globalement (npm install -g @angular/cli).
Création du projet — ng new B300151496 avec routage activé et styles CSS, dans le dossier 3.Angular/300151496/.
Composant accueil — ng generate component accueil, avec la propriété titre = 'Bienvenue INF1083' affichée via <h1>{{ titre }}</h1>.
Data binding — affichage de {{ titre }} et {{ nom }} (avec nom = 'Prof'), reliant les données TypeScript au HTML.
Évènements — bouton <button (click)="saluer()"> qui déclenche saluer() affichant une alerte « Bonjour ! ».
Directives — *ngIf="connecte" pour afficher « Connecté », et *ngFor pour la liste Alice, Bob, Charlie.
API REST — HttpClient configuré via provideHttpClient(), récupération des utilisateurs depuis jsonplaceholder.typicode.com/users, affichés en cartes avec avatar, nom et email.
Routage — route par défaut path: '' vers le composant Accueil dans app.routes.ts, avec <router-outlet> dans le composant racine.
Design — barre de navigation sombre avec badge « Connecté », titre bleu, bouton stylisé, cartes utilisateurs en grille responsive.
Livraison — README.md documentant chaque étape, captures d'écran dans images/ (l'application et ng version), puis git add, commit et push vers le dépôt du cours.
Difficultés rencontrées et solutions

Nouvelle convention de nommage : la version récente d'Angular CLI génère app.ts / app.html / accueil.ts au lieu des anciens app.component.ts / accueil.component.ts. Le code avait d'abord été écrit dans les mauvais fichiers, ce qui expliquait que rien ne s'affichait. Résolu en écrivant dans les bons noms de fichiers.
Écran blanc (erreur NG0908) : l'application exigeait Zone.js qui n'était pas chargé. Résolu en passant l'application en mode « zoneless » (retrait de provideZoneChangeDetection dans app.config.ts), le mode moderne d'Angular.
