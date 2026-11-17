# 300151609

Introduction à Angular
Étudiant(e) : 300151609
Nom du projet Angular : B300151609
Dossier du dépôt : 3.Angular/300151609

Laboratoire pratique pour découvrir Angular et réaliser une application monopage interactive, responsive et structurée en composants.

Présentation
Ce projet met en pratique les notions fondamentales d’Angular : architecture par composants, liaison entre TypeScript et HTML, gestion des événements, routage et consommation d’une API REST. L’interface est entièrement en français et conçue pour les écrans de bureau et les appareils mobiles.

Aperçu de l’application
La capture ci-dessous provient de l’application exécutée localement avec Angular CLI.

Capture d’écran de la page d’accueil du laboratoire Angular

Objectifs pédagogiques
Expliquer le rôle d’Angular dans le développement d’applications web monopages (SPA).
Créer un projet Angular et le lancer avec Angular CLI.
Organiser une interface en composants autonomes.
Utiliser l’interpolation, la liaison de formulaire et les événements.
Afficher des conditions et des listes avec le contrôle de flux Angular.
Configurer la navigation avec Angular Router.
Envoyer une requête HTTP et présenter des données JSON provenant d’une API REST.
Fonctionnalités et routes
Route	Page	Notions démontrées
/	Accueil	Interpolation, [(ngModel)], événement (click) et affichage conditionnel @if
/composants	Composants & data binding	Composants, interpolation et affichage de listes avec @for
/utilisateurs	API REST	HttpClient, service typé, chargement, erreurs et nouvelle tentative
/routage	Routage	Configuration des routes, routerLink et router-outlet
La page d’accueil est interactive : modifiez le nom pour voir la liaison de données en direct, utilisez le bouton de salutation et basculez l’état de connexion.

Architecture du dépôt
text

300151609/
├── README.md
├── .gitignore
├── images/
│   └── capture-accueil.png
└── B300151609/
    ├── README.md
    ├── angular.json
    ├── package.json
    └── src/
        ├── app/
        │   ├── app.ts
        │   ├── app.config.ts
        │   ├── app.routes.ts
        │   └── pages/
        │       ├── accueil/
        │       ├── concepts/
        │       ├── utilisateurs/
        │       └── routage/
        ├── index.html
        └── styles.css
Choix d’implémentation
Composants autonomes : chaque page possède son template et ses styles.
Angular Router : les pages sont configurées dans src/app/app.routes.ts.
HTTP : provideHttpClient() est fourni dans src/app/app.config.ts; UserService encapsule l’appel à l’API.
Contrôle de flux moderne : les templates utilisent @if, @for et @empty.
Styles : CSS responsive, sans dépendance à une bibliothèque d’interface externe.
Technologies
Angular 20.3
TypeScript
Angular CLI
HTML et CSS
RxJS
JSONPlaceholder (API de démonstration)
Installation et exécution
Prérequis
Node.js 20.19+ (ou une version prise en charge par Angular CLI 20)
npm
Une connexion Internet pour charger les utilisateurs depuis JSONPlaceholder
Démarrer en développement
Depuis le dossier de ce dépôt :

Bash

cd B300151609
npm ci
npm start
Ouvrez ensuite http://localhost:4200.

Générer un build de production
Bash

cd B300151609
npm run build
Le build est généré dans B300151609/dist/.

Détails de l’API
La page API REST interroge l’endpoint public suivant :

text

GET https://jsonplaceholder.typicode.com/users?_limit=6
La réponse est typée dans src/app/pages/utilisateurs/user.service.ts. L’interface gère les états de chargement et d’erreur, ainsi qu’une action pour relancer la requête. Une connexion Internet est nécessaire pour cette page.
