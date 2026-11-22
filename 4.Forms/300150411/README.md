# 🚗 Formulaires — ReactiveForms avec NativeScript Angular
# Projet : DRIVE NOW – Application de réservation de voitures

**Nom de l'étudiant :** Bourhane Kessouri  
**Numéro étudiant :** 300150411  
**Cours :** Développement d'applications  
**Projet :** Application Car Rental

---

## 1. Introduction

Dans le cadre de ce travail, j'ai réalisé une application de réservation de voitures appelée DRIVE NOW.

L'objectif principal du projet est de créer une interface qui permet à un utilisateur de saisir ses informations personnelles et de choisir un véhicule pour effectuer une réservation.

L'application contient un formulaire dans lequel l'utilisateur doit entrer plusieurs informations, comme son nom, son adresse courriel, son numéro de téléphone, le type de voiture souhaité, le lieu de prise en charge et les dates de réservation.

Pour réaliser ce projet, j'ai utilisé Angular, TypeScript, HTML et CSS. J'ai également utilisé Angular Reactive Forms pour gérer les informations saisies dans le formulaire.

## 2. Préparation de l'environnement de développement

Pour commencer le travail, j'ai utilisé Visual Studio Code comme environnement de développement.

J'ai ouvert le dossier du projet nommé B300150411 et j'ai examiné son organisation.

Le projet contient plusieurs dossiers et fichiers. Le dossier `src` contient les fichiers principaux de l'application. Dans ce dossier, j'ai travaillé principalement dans `src/app`.

J'ai ensuite créé et modifié les fichiers nécessaires pour construire la page de réservation.

Les principaux fichiers utilisés sont :

- `app.ts` : permet de définir le composant principal de l'application.
- `app.css` : fichier destiné au style du composant principal.
- `accueil.ts` : contient la logique et la gestion du formulaire.
- `accueil.html` : contient la structure HTML de la page.
- `accueil.css` : contient les règles CSS pour améliorer l'apparence de la page.

Cette organisation permet de séparer la structure de la page, son apparence et son fonctionnement.

## 3. Création du composant Accueil

J'ai créé un composant appelé Accueil pour construire la page principale de l'application.

Le composant est composé de trois fichiers principaux : `accueil.ts`, `accueil.html` et `accueil.css`.

Le fichier `accueil.ts` contient le code TypeScript. Il permet de gérer les informations du formulaire et les actions effectuées par l'utilisateur.

Le fichier `accueil.html` contient les éléments visibles dans le navigateur, comme les titres, les champs de saisie, les listes déroulantes et le bouton de réservation.

Le fichier `accueil.css` permet de modifier l'apparence de ces éléments.

Cette séparation rend le projet plus facile à comprendre et à modifier.

## 4. Création du formulaire de réservation

J'ai ensuite créé le formulaire de réservation dans le fichier `accueil.html`.

Le formulaire contient plusieurs champs permettant de recueillir les informations nécessaires à une réservation.

### 4.1 Informations personnelles

J'ai ajouté les champs suivants :

- Full Name : permet à l'utilisateur de saisir son nom complet.
- Email : permet de saisir une adresse courriel.
- Username : permet de saisir un nom d'utilisateur.
- Phone : permet de saisir un numéro de téléphone.

Ces informations permettent d'identifier le client et de recueillir ses coordonnées.

### 4.2 Informations sur la réservation

J'ai également ajouté les champs suivants :

- Car Type : permet de choisir le type de véhicule.
- Pick-up Location : permet d'indiquer le lieu de prise en charge.
- Pick-up Date : permet de choisir la date de départ.
- Return Date : permet de choisir la date de retour.
- Additional Insurance : permet de sélectionner une assurance supplémentaire.

Pour le type de véhicule, j'ai ajouté plusieurs choix : Sedan, SUV, Compact et Luxury.

J'ai utilisé une liste déroulante afin que l'utilisateur puisse sélectionner facilement le véhicule souhaité.

## 5. Utilisation d'Angular Reactive Forms

Pour gérer les informations du formulaire, j'ai utilisé Angular Reactive Forms.

Dans le fichier `accueil.ts`, j'ai importé les éléments suivants :

- `FormBuilder` : permet de construire le formulaire.
- `FormGroup` : permet de regrouper les différents champs.
- `Validators` : permet de définir les règles de validation.
- `ReactiveFormsModule` : permet d'utiliser les formulaires réactifs dans le composant.

J'ai créé un formulaire appelé `bookingForm`.

Ce formulaire contient tous les champs nécessaires à la réservation.

J'ai utilisé `Validators.required` pour rendre obligatoires les champs principaux.

Pour le champ Email, j'ai également utilisé `Validators.email` afin de vérifier le format de l'adresse courriel.

Les champs HTML sont reliés au formulaire avec `formControlName`. Cela permet à Angular de récupérer les informations saisies par l'utilisateur.

## 6. Fonctionnement du bouton BOOK NOW

J'ai ajouté un bouton appelé BOOK NOW pour permettre à l'utilisateur de soumettre son formulaire.

Lorsque l'utilisateur clique sur ce bouton, la méthode `onBookNow()` est exécutée.

Cette méthode vérifie d'abord si le formulaire est valide.

Si certains champs obligatoires ne sont pas remplis, un message demande à l'utilisateur de compléter les informations.

Si les champs sont valides, l'application affiche un message de confirmation et les informations du formulaire sont affichées dans la console du navigateur avec `console.log()`.

Cette étape permet de vérifier que les données saisies sont correctement récupérées.

**Remarque :** cette version du projet ne sauvegarde pas encore les réservations dans une base de données et ne réalise pas de paiement.

## 7. Conception et amélioration du design

Après avoir créé le formulaire, j'ai travaillé sur son apparence dans le fichier `accueil.css`.

J'ai utilisé CSS pour organiser les éléments et rendre l'interface plus agréable.

Les principales améliorations sont :

- Création d'un arrière-plan gris clair.
- Ajout d'un en-tête bleu avec le nom DRIVE NOW.
- Création d'une carte blanche pour contenir le formulaire.
- Ajout d'espacements entre les champs.
- Modification des bordures et des coins des champs.
- Création d'un bouton bleu avec le texte BOOK NOW.
- Ajout d'un pied de page avec le nom du service.

J'ai choisi le bleu et le blanc pour donner à l'application une apparence simple et professionnelle.

J'ai également utilisé des propriétés CSS comme `padding`, `margin`, `border-radius`, `background` et `box-shadow`.

Ces propriétés permettent de gérer les espacements, les couleurs, les bordures et les ombres.

## 8. Connexion du composant à l'application principale

Pour afficher le formulaire dans l'application, j'ai modifié le fichier `app.ts`.

J'ai importé le composant Accueil avec :

`import { Accueil } from './accueil/accueil';`

Ensuite, j'ai ajouté Accueil dans la propriété `imports` du composant principal.

J'ai utilisé la balise suivante dans le template :

`<app-accueil></app-accueil>`

Cette balise permet d'afficher le composant Accueil dans la page principale de l'application.

Cette étape était importante parce que le formulaire existait dans son propre composant, mais il devait être connecté à l'application principale pour être visible dans le navigateur.

## 9. Lancement de l'application

Pour tester le projet, j'ai utilisé le terminal intégré de Visual Studio Code.

Je me suis placé dans le dossier du projet et j'ai exécuté la commande :

`npm.cmd start`

Cette commande permet de démarrer le serveur de développement Angular.

Après le démarrage, j'ai ouvert le navigateur Google Chrome et j'ai accédé à l'adresse :

`http://localhost:4200`

J'ai ainsi pu voir le résultat de mon travail et vérifier les modifications apportées aux fichiers.

Lorsque je modifie le code et que je sauvegarde les fichiers, Angular actualise automatiquement l'application pendant le développement.

## 10. Tests effectués

J'ai effectué des vérifications pour observer le fonctionnement de l'application.

Les vérifications comprennent :

1. L'affichage de la page DRIVE NOW.
2. L'affichage des différents champs du formulaire.
3. La sélection d'un type de véhicule.
4. La saisie des informations personnelles.
5. La sélection des dates de réservation.
6. Le fonctionnement du bouton BOOK NOW.
7. L'affichage des messages de validation.

J'ai également préparé des captures d'écran pour présenter l'interface et les tests réalisés.

## 11. Difficultés rencontrées

Pendant la réalisation du projet, j'ai rencontré quelques difficultés techniques.

Au début, j'avais de la difficulté à trouver les fichiers nécessaires dans Visual Studio Code.

J'ai également rencontré des erreurs lorsque j'ai placé du code TypeScript dans un fichier CSS. Le problème venait du fait que chaque langage doit être placé dans le fichier correspondant.

J'ai corrigé cette erreur en séparant le code dans les bons fichiers :

- TypeScript dans les fichiers `.ts`.
- HTML dans les fichiers `.html`.
- CSS dans les fichiers `.css`.

J'ai aussi rencontré une erreur d'importation du composant Accueil. J'ai corrigé le chemin d'importation et remis chaque code dans son fichier approprié.

Ces difficultés m'ont permis de mieux comprendre l'organisation d'un projet Angular.

## 12. Améliorations possibles

Plusieurs améliorations pourraient être ajoutées dans une prochaine version :

- Ajouter une base de données pour sauvegarder les réservations.
- Ajouter une page pour consulter les réservations.
- Ajouter des images des véhicules.
- Ajouter les prix de location.
- Ajouter une validation plus complète des numéros de téléphone.
- Ajouter une authentification des utilisateurs.
- Ajouter un système de paiement en ligne.

Ces améliorations permettraient de transformer le formulaire actuel en une application de location de voitures plus complète.

## 13. Conclusion

La réalisation de ce projet m'a permis de mettre en pratique plusieurs notions de développement d'applications.

J'ai appris à créer un composant Angular, à construire un formulaire avec Reactive Forms, à utiliser TypeScript pour gérer les données et à utiliser CSS pour améliorer l'apparence d'une interface.

J'ai également appris à organiser les fichiers d'un projet et à corriger certaines erreurs de programmation.

Le résultat obtenu est une première version d'une application de réservation de voitures appelée DRIVE NOW.

Ce projet m'a permis de développer mes compétences en programmation et de mieux comprendre le fonctionnement d'une application Angular.

---

**Fin du rapport**
