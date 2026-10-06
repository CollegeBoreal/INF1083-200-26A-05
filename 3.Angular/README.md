# 🚀 Introduction à Angular

|  |
|-|
| [Participation](.scripts/Participation.md) |


## 🚀 Créer votre répertoire


- [ ] Créer un répertoire avec son 🆔 et ajouter le fichier README.md et un répertoire `images` 🖼️


## 🎯 Objectif

À la fin de ce laboratoire, vous serez capable de :

- Comprendre le rôle d'Angular
- Installer Angular CLI
- Créer une application Angular
- Comprendre les composants
- Utiliser le data binding
- Créer des interfaces modernes
- Consommer une API REST

---

# 🤔 Pourquoi Angular ?

Imaginez une application moderne :

- Netflix
- Gmail
- Microsoft 365
- Tableau de bord Azure
- Gestionnaire de tickets

Ces applications ne rechargent pas la page à chaque clic.

Angular permet de créer ce type d'application.

---

# 🏗️ Architecture Angular

```text
Application
│
├── Composants
├── Services
├── Routes
├── Formulaires
└── API REST
```

Chaque écran de l'application est composé de composants.

Exemple :

```text
Page d'accueil
│
├── Barre de navigation
├── Liste des produits
└── Pied de page
```

Chaque section devient un composant Angular.

---

# 📦 Installation

## Installer Node.js

### Windows

```powershell
choco install nodejs-lts -y
```

### macOS

```bash
brew install node
```

### Vérification

```bash
node --version
npm --version
```

---

## Installer Angular CLI

```bash
npm install -g @angular/cli
```

### Vérification

```bash
ng version
```

---

# 🚀 Créer une application Angular

Créer un projet :

- [ ] Dans votre répertoire 🆔, Créer un projet :

```bash
ng new B🆔
```

Répondre :

```text
Would you like to use routing? Yes
```

Puis :

```text
Which stylesheet format?
CSS
```

Entrer dans le projet :

```bash
cd B🆔
```

Démarrer le serveur :

```bash
ng serve
```

Ouvrir :

```text
http://localhost:4200
```

---

# 📁 Structure d'un projet Angular

```text
src/
│
├── app/
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.component.css
│
├── assets/
├── index.html
└── main.ts
```

---

# 🧩 Qu'est-ce qu'un composant ?

Un composant représente une partie de l'interface utilisateur.

Exemple :

```text
Accueil
Profil
Liste des utilisateurs
Menu
```

Chaque élément devient un composant.

---

# Créer un composant

Créer un composant nommé accueil :

```bash
ng generate component accueil
```

ou

```bash
ng g c accueil
```

Résultat :

```text
src/app/accueil
│
├── accueil.component.ts
├── accueil.component.html
├── accueil.component.css
└── accueil.component.spec.ts
```

---

# ✍️ Premier composant

## accueil.component.ts

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html'
})
export class AccueilComponent {
  titre = 'Bienvenue INF1083';
}
```

---

## accueil.component.html

```html
<h1>{{ titre }}</h1>
```

Résultat :

```text
Bienvenue INF1083
```

---

# 🔄 Data Binding

Le Data Binding permet de connecter les données TypeScript à l'interface HTML.

## Affichage

```html
<p>{{ nom }}</p>
```

```typescript
nom = "Brice";
```

Résultat :

```text
Brice
```

---

# 🖱️ Évènements

## Bouton

```html
<button (click)="saluer()">
    Cliquez-moi
</button>
```

```typescript
saluer() {
    alert("Bonjour !");
}
```

---

# 📋 Directives

## Afficher une condition

```html
<div *ngIf="connecte">
    Connecté*</div*
```

```typescript
*onnecte = true;
```

---

## Affic*er une liste

```html*<ul>
  <li *ngFor*"let nom of noms">
    {{ nom }}
* </*i>
</*l>
```

*``*ypescript
noms =*[
  "Alice",
  "Bob",
  "Charlie"
];
```

---

# 🌐 Consommer une API*REST

Très utile pour les étudiant* DevOps.

## Importer HttpClient

*``typescript
import { HttpClient }*from '@angular/common/http';
```

*# Utiliser une API

```typescript
*his.http
  .get('https://jsonplaceholder.typicode.com/users')
  .subs*ribe(data => {
      console.log(d*ta);
  });
```

---

# 🛣️ Routage*
Le routage permet de naviguer ent*e plusieurs pages.

Exemple :

```*ext
/
├── Accueil
├── Utilisateurs*├── Configuration
└── Contact
```
*---

## Créer une route

```typesc*ipt
const routes = [
  {
    path: '',
    component: AccueilComponent
  }
];
```

---

# 🎨 Style CSS

*# accueil.component.css

```css
h1*{
    color: blue;
}
```

---

#*⚡ Pourquoi Angular est populaire ?*
Angular offre :

✅ TypeScript

✅ *omposants réutilisables

✅ Routage*intégré

✅ Injection de dépendance*

✅ Formulaires

✅ HTTP Client*
✅ Outils officiels

✅ Architectur* entreprise

---

* 🏢 Angular dans le monde professi*nnel

Angular est souvent utilisé *our :

- Applications*d'entreprise
- Tableaux de bord
- *ortails Web
- Applications gouvern*mentales
- Applications bancaires
* Outils d'administration

---

* 🧪 Exercice 1*
Créer un projet :

```bash
ng new*inf1083-angular
```

Lancer :

*``bash
ng serve
```

*--

#*🧪 Exercice 2

Créer un compos*nt :

```bash*ng g c bienvenue*```

Afficher :

```text
Bienvenue*dans*INF1083
```

---

# 🧪 Exercice 3
*Créer une liste d'étudiants :

*``typescript*etudiants*= [
    "Alice",
    "Bob",
*   "Charlie"
];
```

Afficher la l*ste avec :

*``html
*ngFor
```

*--

# 🧪 Exercice 4

*jouter un bouton :

```html*<button>
*   Ajouter
</button>
```

Afficher*un message lorsque l'utilisateur c*ique.

*--

# 🏆 Défi

Créer une applicati*n permettant :

- D'ajouter un étu*iant
- D'afficher*la liste des étudiants
- De suppri*er un étudiant
- De consommer une *PI REST

---

# ✅ Résumé

```text*Angular
*
├── TypeScript
├──*HTML*├── CSS
├── Composants
├── Service*
├── Routage
├──*API REST
*── Applications Web modernes
```

*# Command*s importantes

```bash
ng new mon-*pp

ng serve

ng generate componen* accueil

ng build

ng test
```

#* Compétences développées

- Dévelo*pement Web moderne
- TypeScript
- *rchitecture applicative
* Consommation d'API REST
-*Com*osants réutilisables
- Préparation*au développement Full Stack
- Comp*éhension des interfaces utilisées *ans les environnements DevOps et C*oud modernes
````*
