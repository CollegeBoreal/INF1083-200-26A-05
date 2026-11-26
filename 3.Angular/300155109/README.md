# Laboratoire : Introduction à Angular

## Informations sur l'étudiante

- **Nom :** Wendyam Kabore
- **Numéro d'étudiante :** 300155109
- **Programme :** Technique de systèmes informatiques
- **Cours :** INF1083-200-26A-05
- **Projet :** B300155109

## 1. Présentation du laboratoire

Ce laboratoire a pour objectif de découvrir le framework Angular et de comprendre les principes fondamentaux du développement d'applications Web modernes.

Le travail consiste à créer une application Angular, à utiliser les composants, à mettre en place la navigation entre les pages et à récupérer des données à partir d'une API REST.

## 2. Environnement de développement

Les outils utilisés pour réaliser ce laboratoire sont :

| Outil | Version |
|---|---|
| Angular CLI | 22.2.7 |
| Node.js | 24.21.0 |
| npm | 11.19.0 |
| Visual Studio Code | Environnement de développement |
| Navigateur | Google Chrome |

## 3. Création du projet Angular

Le projet a été créé avec Angular CLI à l'aide de la commande :

```bash
ng new B300155109
```

Les options suivantes ont été sélectionnées :
- Routage : activé
- Feuilles de style : CSS
- SSR/SSG : désactivé

## 4. Fonctionnalités réalisées

### 4.1 Composant Accueil

Création d'un composant d'accueil permettant de présenter plusieurs fonctionnalités Angular :

- Interpolation de données avec `{{ }}`.
- Gestion des événements avec `(click)`.
- Affichage conditionnel avec `@if` et `@else`.
- Affichage dynamique d'une liste avec `@for`.

### 4.2 Navigation entre les pages

Mise en place du routage Angular afin de naviguer entre les pages :

- Accueil : `/`
- Utilisateurs : `/utilisateurs`

### 4.3 Récupération des données avec une API REST

Utilisation de `HttpClient` pour communiquer avec l'API suivante :

https://jsonplaceholder.typicode.com/users

Les données récupérées comprennent :
- Le nom de l'utilisateur.
- Son adresse courriel.
- Sa ville.

Les données sont affichées dynamiquement dans une liste de cartes.

### 4.4 Interface utilisateur

Amélioration de l'interface avec CSS :
- Cartes de présentation des utilisateurs.
- Avatars avec initiales.
- Couleurs et effets au survol.
- Mise en page adaptative pour différents écrans.

## 5. Captures d'écran

Les captures d'écran du laboratoire seront enregistrées dans le dossier `images`.

### 5.1 Page d'accueil

![Page d'accueil](images/accueil.png)

### 5.2 Fonctionnalités et événements Angular

![Fonctionnalités Angular](images/fonctionnalites.png)

### 5.3 Navigation vers la page Utilisateurs

![Navigation](images/navigation.png)

### 5.4 Liste des utilisateurs récupérés depuis l'API

![Liste des utilisateurs](images/utilisateurs.png)

### 5.5 Interface finale

![Interface finale](images/interface-finale.png)

## 6. Lancement de l'application

Pour démarrer le serveur de développement, ouvrir un terminal dans le dossier du projet et exécuter :

```bash
ng serve
```

Ensuite, ouvrir un navigateur à l'adresse :

http://localhost:4200/

## 7. Conclusion

Ce laboratoire m'a permis de découvrir les bases d'Angular et de mettre en pratique plusieurs notions essentielles du développement Web.

J'ai appris à créer des composants, à gérer les événements, à afficher des données dynamiques, à configurer la navigation et à communiquer avec une API REST.

Ce travail m'a également permis de mieux comprendre l'organisation d'un projet Angular et l'importance de séparer la logique, le contenu et la présentation.
