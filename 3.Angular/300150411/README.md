# Rapport de laboratoire — Introduction à Angular

**Étudiant :** Bourhane Kessouri  
**Matricule :** 300150411  
**Programme :** Techniques des systèmes informatiques  
**Cours :** INF1083 — Développement d'applications

---

## 🎯 Objectif

L'objectif de ce laboratoire est de découvrir les bases du framework Angular et de créer une première application Web.

Ce laboratoire m'a permis de découvrir les outils nécessaires au développement Angular et de comprendre comment fonctionne une application organisée avec des composants.

Dans ce laboratoire, j'ai réalisé les étapes suivantes :

- Vérification de Node.js, npm et Angular CLI.
- Installation d'Angular CLI.
- Création d'une application Angular.
- Création d'un composant nommé Accueil.
- Utilisation du Data Binding.
- Gestion d'un événement avec un bouton.
- Configuration du routage Angular.
- Personnalisation de l'interface avec CSS.
- Exécution et test de l'application avec `ng serve`.

Le projet réalisé est :

**B300150411**

## 🛠️ 1. Environnement Angular

Pour commencer le laboratoire, j'ai préparé mon environnement de développement sur Windows.

J'ai installé Node.js et Angular CLI afin de pouvoir créer et exécuter une application Angular.

J'ai utilisé les commandes suivantes pour vérifier l'environnement :

```powershell
node --version
npm.cmd --version
ng.cmd version
```

Node.js permet d'exécuter les outils JavaScript, tandis que npm permet de gérer les paquets nécessaires au projet.

Angular CLI permet de créer et de gérer les applications Angular à partir du terminal.

**Versions utilisées :**

- Node.js : À compléter avec la version affichée.
- npm : À compléter avec la version affichée.
- Angular CLI : À compléter avec la version affichée.
- Système d'exploitation : Windows 64 bits.

**Figure 1 — Vérification de l'environnement Angular dans PowerShell.**

## 🏗️ 2. Création du projet

Après avoir préparé l'environnement, j'ai créé mon répertoire étudiant portant mon numéro de matricule.

J'ai ensuite créé mon application Angular avec la commande suivante :

```powershell
ng.cmd new B300150411
```

Lors de la création du projet, j'ai utilisé les configurations suivantes :

- Routage : Oui.
- Feuille de style : CSS.

Le projet a été créé dans mon répertoire étudiant :

`300150411/B300150411`

Pour entrer dans le projet, j'ai utilisé :

```powershell
cd B300150411
```

Cette étape permet de préparer la structure de l'application avant de commencer le développement.

## 📁 3. Structure du projet

Le projet Angular contient plusieurs fichiers et répertoires qui permettent d'organiser le code.

Voici les principaux fichiers utilisés :

```text
B300150411/
│
├── src/
│   ├── app/
│   │   ├── app.config.ts
│   │   ├── app.css
│   │   ├── app.html
│   │   ├── app.routes.ts
│   │   ├── app.ts
│   │   │
│   │   └── accueil/
│   │       ├── accueil.css
│   │       ├── accueil.html
│   │       ├── accueil.spec.ts
│   │       └── accueil.ts
│   │
│   ├── index.html
│   ├── main.ts
│   └── styles.css
│
├── public/
├── angular.json
├── package.json
└── tsconfig.json
```

Cette organisation permet de séparer les différentes parties de l'application.

Les fichiers TypeScript contiennent la logique du programme, les fichiers HTML définissent l'interface et les fichiers CSS permettent de personnaliser son apparence.

## 🧩 4. Création du composant Accueil

Angular utilise des composants pour organiser les différentes parties d'une application Web.

Dans mon projet, j'ai créé un composant nommé Accueil avec la commande suivante :

```powershell
ng.cmd generate component accueil
```

Ce composant représente la page d'accueil de mon application.

Dans le fichier `accueil.ts`, j'ai utilisé le décorateur `@Component` pour définir le composant.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-accueil',
  imports: [],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class Accueil {

  titre = 'Bienvenue INF1083';

  nom = 'Bourhane Kessouri';

  matricule = '300150411';

  saluer() {
    alert('Bonjour Bourhane !');
  }
}
```

La variable `titre` contient le texte principal de la page.

Les variables `nom` et `matricule` permettent d'afficher mes informations dans l'interface.

La fonction `saluer()` permet d'afficher un message lorsqu'un utilisateur clique sur le bouton.

**Figure 2 — Création et configuration du composant Accueil.**

## 🔄 5. Liaison de données (Data Binding)

Le Data Binding permet de connecter les données définies dans TypeScript avec les éléments HTML de l'interface.

Dans mon composant Accueil, j'ai déclaré une variable :

```typescript
titre = 'Bienvenue INF1083';
```

Pour afficher cette variable dans le fichier `accueil.html`, j'ai utilisé l'interpolation Angular :

```html
<h1>{{ titre }}</h1>
```

J'ai également utilisé cette méthode pour afficher mon nom et mon matricule :

```html
<p>{{ nom }}</p>

<p>{{ matricule }}</p>
```

Grâce au Data Binding, Angular affiche automatiquement les valeurs définies dans le composant.

Cette fonctionnalité permet de relier facilement les données à l'interface utilisateur.

## 🖱️ 6. Gestion d'un événement

Dans cette partie, j'ai appris à utiliser les événements Angular.

J'ai ajouté un bouton dans le fichier `accueil.html` :

```html
<button (click)="saluer()">
  👋 Cliquez-moi
</button>
```

Dans le fichier `accueil.ts`, j'ai créé la fonction suivante :

```typescript
saluer() {
  alert('Bonjour Bourhane !');
}
```

L'événement `(click)` permet d'exécuter la fonction `saluer()` lorsque l'utilisateur clique sur le bouton.

Après le clic, une boîte de dialogue apparaît avec le message :

**Bonjour Bourhane !**

Cette manipulation m'a permis de comprendre comment Angular gère les interactions avec l'utilisateur.

## 🛣️ 7. Routage Angular

Le routage permet de naviguer entre plusieurs pages dans une application Angular.

Dans mon projet, j'ai configuré la route principale dans le fichier `app.routes.ts`.

Voici le code utilisé :

```typescript
import { Routes } from '@angular/router';
import { Accueil } from './accueil/accueil';

export const routes: Routes = [
  {
    path: '',
    component: Accueil
  }
];
```

La route vide `''` représente la page principale de l'application.

Elle permet d'afficher le composant Accueil lorsque l'utilisateur ouvre l'application.

Dans le fichier `app.html`, j'ai utilisé :

```html
<router-outlet></router-outlet>
```

Cette directive représente l'emplacement où Angular affiche le composant associé à la route active.

**Figure 3 — Configuration du routage Angular.**

## 🎨 8. Personnalisation avec CSS

J'ai utilisé le fichier `accueil.css` pour personnaliser l'apparence de mon application.

Le CSS permet de modifier la présentation des éléments HTML.

J'ai utilisé plusieurs propriétés pour rendre l'interface plus moderne :

- Flexbox pour centrer les éléments.
- Un arrière-plan avec un dégradé de couleurs.
- Une carte centrale avec des coins arrondis.
- Des couleurs personnalisées pour les titres.
- Une ombre autour de la carte.
- Un bouton avec un effet au passage de la souris.

Voici un exemple du code CSS utilisé :

```css
.card {
  width: 520px;
  max-width: 85%;
  padding: 45px;
  background: white;
  border-radius: 22px;
  text-align: center;
  box-shadow: 0 15px 45px rgba(0, 0, 0, 0.10);
}
```

Pour ajouter un effet au bouton lorsque la souris passe dessus, j'ai utilisé :

```css
button:hover {
  background: #0d55b8;
  transform: translateY(-2px);
}
```

Cette personnalisation permet d'obtenir une interface plus claire, moderne et agréable à utiliser.

## ▶️ 9. Exécution de l'application

Après avoir terminé la configuration du projet, j'ai démarré le serveur de développement avec la commande :

```powershell
ng.cmd serve
```

Angular compile le projet et démarre un serveur local.

L'application est accessible dans le navigateur à l'adresse suivante :

http://localhost:4200/

Cette étape permet de vérifier le fonctionnement de l'application et de visualiser les modifications effectuées dans le code.

**Figure 4 — Démarrage du serveur Angular avec ng serve.**

## ✅ 10. Résultat final de l'application

Après la configuration du composant, du HTML, du CSS et du routage, j'ai obtenu une première interface d'accueil personnalisée.

L'application contient les éléments suivants :

- Le titre « Bienvenue INF1083 ».
- Mon nom : Bourhane Kessouri.
- Mon matricule : 300150411.
- Mon programme d'études.
- Un bouton interactif « Cliquez-moi ».

L'interface permet de présenter mes informations dans une carte centrale avec un design personnalisé.

**Figure 5 — Résultat final de l'application Angular dans le navigateur.**

### 🖱️ Test du bouton

J'ai également testé le fonctionnement du bouton « Cliquez-moi ».

Lorsque je clique sur ce bouton, Angular exécute la fonction `saluer()` grâce à l'événement `(click)`.

Le message affiché est :

**Bonjour Bourhane !**

Ce test confirme que l'événement fonctionne correctement.

**Figure 6 — Test du bouton et affichage du message Bonjour Bourhane !**

## 📋 11. Résumé des étapes réalisées

Le projet `B300150411` comprend les différentes étapes suivantes :

- Installation de Node.js.
- Vérification de npm.
- Installation et vérification d'Angular CLI.
- Création du projet Angular.
- Configuration du routage.
- Création du composant Accueil.
- Utilisation du Data Binding.
- Affichage des informations de l'étudiant.
- Gestion d'un événement avec `(click)`.
- Personnalisation de l'interface avec CSS.
- Exécution de l'application avec `ng serve`.
- Test de l'application dans le navigateur.

## 📝 Conclusion

Ce laboratoire m'a permis de découvrir les bases d'Angular et de comprendre comment créer une application Web avec des composants.

J'ai appris à installer les outils nécessaires, à créer un projet Angular, à utiliser le Data Binding, à gérer les événements et à configurer le routage.

J'ai également découvert comment personnaliser une interface avec CSS et exécuter une application localement.

Cette première expérience m'a permis de mieux comprendre l'organisation d'un projet Angular et les différentes technologies utilisées dans le développement d'applications Web.

<image src=images/999.jpg width=50% height=50% > </image>
<image src=images/888.jpg width=50% height=50% > </image>
<image src=images/7777.jpg width=50% height=50% > </image>
<image src=images/1234444.jpg width=50% height=50% > </image>
