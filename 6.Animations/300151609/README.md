# 📱 NativeScript Angular — Animations Déclaratives & Impératives

[![NativeScript](https://img.shields.io/badge/NativeScript-v8%2B-3A53FF?logo=nativescript&logoColor=white)](https://nativescript.org/)
[![Angular](https://img.shields.io/badge/Angular-Framework-DD0031?logo=angular&logoColor=white)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Sass](https://img.shields.io/badge/Style-SCSS-CC6699?logo=sass&logoColor=white)](https://sass-lang.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> Projet mobile cross-platform développé avec **NativeScript** et **Angular**, illustrant la mise en œuvre des deux grands paradigmes d'animation mobile : les **animations CSS déclaratives** (`@keyframes`) et les **animations impératives** par le code TypeScript (`view.animate`).

---

## 📌 Description courte (pour la bio GitHub / About)

> *Application mobile NativeScript & Angular démontrant l'implémentation d'animations déclaratives (CSS/SCSS) et impératives (TypeScript view.animate avec Promises/async-await).*

---

## 📖 Sommaire

- [Contexte & Objectifs](#-contexte--objectifs)
- [Architecture & Fonctionnalités](#-architecture--fonctionnalités)
  - [1. Animation Déclarative (Composant Home)](#1-animation-déclarative-composant-home)
  - [2. Animation Impérative (Composant Browse)](#2-animation-impérative-composant-browse)
- [Structure des Fichiers Clés](#-structure-des-fichiers-clés)
- [Prérequis](#-prérequis)
- [Installation & Démarrage](#-installation--démarrage)
- [Bonnes Pratiques & Optimisations](#-bonnes-pratiques--optimisations)
- [Auteur](#-auteur)

---

## 🎯 Contexte & Objectifs

Dans le développement d'applications mobiles performantes, les animations jouent un rôle crucial pour l'expérience utilisateur (UX). NativeScript permet d'exécuter des animations fluides (60 fps) accélérées matériellement par le GPU natif (iOS & Android).

Ce dépôt explore :
- **L'approche déclarative** : définie dans les feuilles de style (SCSS), autonome, idéale pour les transitions d'état simples ou les animations au chargement.
- **L'approche impérative** : pilotée directement par l'API `View` de NativeScript en TypeScript, idéale pour les séquences multi-étapes et les réactions aux interactions utilisateur.

---

## ⚙️ Architecture & Fonctionnalités

### 1. Animation Déclarative (Composant `Home`)

- **Technologie** : CSS3 / Sass (`@keyframes`).
- **Comportement** : Transition fluide de la couleur d'arrière-plan du bouton `{N}` de **rouge** à **vert** sur une durée de **2 secondes**.
- **Propriété clé** : `animation-fill-mode: forwards`, garantissant la persistance de l'état final.

```scss
@keyframes bgAnimation {
    from { background-color: red; }
    to   { background-color: green; }
}

.background {
    animation-name: bgAnimation;
    animation-duration: 2s;
    animation-fill-mode: forwards;
}
```

---

### 2. Animation Impérative (Composant `Browse`)

- **Technologie** : API `view.animate(options)` de NativeScript (`@nativescript/core`).
- **Comportement** : Séquence chorégraphiée de 8 étapes sur une cible (`Image #cible`) contenue dans un `AbsoluteLayout` de 300x300 px lors de l'événement `(tap)` :
  1. **Disparition** (`opacity: 0`, 300 ms)
  2. **Apparition** (`opacity: 1`, 300 ms)
  3. **Translation** vers `(x: 200, y: 200)` (300 ms)
  4. **Retour** à l'origine `(x: 0, y: 0)` (300 ms)
  5. **Échelle** agrandie (`scale: { x: 5, y: 5 }`, 300 ms)
  6. **Échelle** normale (`scale: { x: 1, y: 1 }`, 300 ms)
  7. **Rotation** à 180° (300 ms)
  8. **Retour** à la rotation 0° (300 ms)

```typescript
// Exemple moderne avec async/await
async animate(view: View): Promise<void> {
    const duration = 300;
    try {
        await view.animate({ opacity: 0, duration });
        await view.animate({ opacity: 1, duration });
        await view.animate({ translate: { x: 200, y: 200 }, duration });
        await view.animate({ translate: { x: 0, y: 0 }, duration });
        await view.animate({ scale: { x: 5, y: 5 }, duration });
        await view.animate({ scale: { x: 1, y: 1 }, duration });
        await view.animate({ rotate: 180, duration });
        await view.animate({ rotate: 0, duration });
        console.log("Animation terminée avec succès !");
    } catch (error) {
        console.error("Erreur lors de l'animation :", error);
    }
}
```

---

## 📂 Structure des Fichiers Clés

```text
src/
└── app/
    ├── home/
    │   ├── home.component.html      # Template avec le bouton animé
    │   ├── home.component.scss      # Définition des @keyframes
    │   └── home.component.ts        # Liaison avec styleUrls
    └── browse/
        ├── browse.component.html    # AbsoluteLayout & variable #cible
        └── browse.component.ts      # Méthode animate(view: View)
```

---

## 🛠️ Prérequis

- [Node.js](https://nodejs.org/) (version LTS recommandée : 18.x ou 20.x)
- [NativeScript CLI](https://docs.nativescript.org/) :
  ```bash
  npm install -g nativescript
  ```
- Pour tester en local :
  - **Android** : Android Studio, SDK Android & JDK 17
  - **iOS** : macOS avec Xcode installé

---

## 🚀 Installation & Démarrage

### 1. Cloner le dépôt
```bash
git clone https://github.com/VOTRE_UTILISATEUR/VOTRE_DEPOT.git
cd VOTRE_DEPOT
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Exécuter l'application

| Plateforme | Commande |
| :--- | :--- |
| **Android** | `ns run android` |
| **iOS** (macOS) | `ns run ios` |
| **Aperçu mobile instantané** | `ns preview` |

---

## 💡 Bonnes Pratiques & Optimisations

- **Accélération matérielle** : Utiliser en priorité `translate`, `scale`, `rotate` et `opacity`, qui ne déclenchent pas de recalcul de mise en page (*reflow*) sur les moteurs natifs iOS et Android.
- **Gestion asynchrone** : Préférer `async/await` aux longues chaînes de `.then()` pour une meilleure lisibilité et une capture d'erreurs simplifiée via `try...catch`.
- **Référence directe de vue** : L'utilisation de `#cible` dans le template Angular permet de passer la référence directe du composant sans recourir inutilement à `ViewChild` ou `getElementById`.

---

<image src=images/Animi.png
 width=50% height=50% > </image>
## 👤 Auteur

- **Étudiant** : [Saadi Ramz Eddine] (ID : `300098957`)

