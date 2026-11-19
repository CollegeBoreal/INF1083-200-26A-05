# Restaurant — Application Mobile NativeScript

Application mobile de restaurant (connexion, accueil, menu, panier, réservation, profil) développée avec **NativeScript + Angular + TypeScript**. Interface entièrement en français, données de démonstration fictives.

## Technologies

- **Template :** `@nativescript/template-blank-ng`
- **NativeScript :** 9.1.1
- **Angular :** 20
- **TypeScript :** 5.8
- **Composants utilisés :** uniquement des composants NativeScript (`StackLayout`, `GridLayout`, `Label`, `TextField`, `Button`, `ListView`, `ScrollView`, `Image`, `DatePicker`, `TimePicker`, `Frame`) — aucun élément HTML web.

## Prérequis

- Node.js 18+ et npm
- NativeScript CLI : `npm install -g nativescript`
- Android Studio (pour Android) et/ou Xcode (pour iOS)

## Installation

```bash
npm install
```

## Lancement

Prévisualisation dans l'application NativeScript Preview (sans recompilation) :

```bash
ns preview --no-hmr
```

Lancer sur un émulateur ou un appareil Android :

```bash
ns run android
```

Construire l'APK de production :

```bash
ns build android
```

Sur iOS :

```bash
ns run ios
```

## Compte démo

- **Email :** `demo@restaurant.com`
- **Mot de passe :** `demo1234`

Un bouton **« Compte démo »** sur l'écran de connexion permet de se connecter instantanément.

## Fonctionnalités

- **Animation d'entrée très fluide** sur l'écran de connexion : le logo et les champs apparaissent en fondu + glissement doux, en cascade.
- **Effet shimmer** : une brillance glisse sur les placeholders pendant le chargement des plats et des images.
- **Écrans skeleton** : cartes et lignes grises affichées pendant le chargement, avant l'arrivée des données.
- **Mode sombre complet** : bouton clair / sombre (écran d'accueil et profil), appliqué à tous les écrans.
- **Barre de navigation bulle flottante** : arrondie, flotte au-dessus du contenu, onglet actif mis en avant dans une bulle orange, badge compteur sur le panier.
- Catalogue de plats par catégorie (Entrées, Plats, Desserts, Boissons) avec photos et prix en DA.
- Recherche de plats, détail d'un plat avec sélecteur de quantité, panier avec total et commande.
- Réservation de table : date, heure et nombre de personnes.
- Profil : informations, historique des commandes et des réservations, déconnexion.

## Navigation

Barre inférieure flottante : **Accueil · Menu · Panier · Réservations · Profil**.

## Base de données

L'application peut se connecter à une vraie base **SQL Server** via une API **Node.js + Express**. Si l'API est hors ligne, l'application bascule automatiquement sur les données de démonstration (`src/app/data/demo-data.ts`) : rien ne casse.

### Étape 1 — Créer la base avec SSMS

1. Ouvrez **SQL Server Management Studio (SSMS)** et connectez-vous à votre instance SQL Server.
2. Ouvrez le fichier `backend/sql/schema.sql`, puis exécutez-le (F5). Il crée la base `restaurant_app` et les tables : `users`, `branches`, `categories`, `dishes`, `orders`, `order_items`, `reservations` (avec leurs clés étrangères).
3. Ouvrez ensuite `backend/sql/seed.sql` et exécutez-le. Il insère les branches, les catégories (Entrées / Plats / Desserts / Boissons), les 18 plats avec leurs prix en DA, et l'utilisateur démo `demo@restaurant.com` (mot de passe `demo1234`, stocké en hash bcrypt).

### Étape 2 — Configurer la connexion

1. Copiez `backend/.env.example` en `backend/.env` :
   ```bash
   cp backend/.env.example backend/.env
   ```
2. Renseignez vos identifiants SQL Server dans `backend/.env` :
   ```
   DB_SERVER=localhost
   DB_NAME=restaurant_app
   DB_USER=sa
   DB_PASSWORD=votre_mot_de_passe
   PORT=3000
   ```

### Étape 3 — Lancer l'API

```bash
cd backend
npm install
npm start
```

L'API écoute sur `http://localhost:3000`. Vérifiez avec `http://localhost:3000/api/health` (réponse `{"status":"ok"}`).

### Étape 4 — Lancer l'application

```bash
ns run android
```

L'application appelle l'API automatiquement (URL définie dans `src/app/services/api.config.ts` : `http://10.0.2.2:3000/api` pour l'émulateur Android). **Pour un appareil physique**, remplacez `10.0.2.2` par l'adresse IP locale de votre PC (ex. `http://192.168.1.10:3000/api`).

### Routes de l'API

| Méthode | Route | Description |
|---|---|---|
| GET | `/api/dishes` | Liste des plats disponibles |
| GET | `/api/dishes/:id` | Détail d'un plat |
| GET | `/api/categories` | Liste des catégories |
| GET | `/api/branches` | Liste des restaurants |
| POST | `/api/login` | Connexion (vérification bcrypt) |
| GET | `/api/orders` | Commandes (filtre optionnel `?userId=`) |
| POST | `/api/orders` | Créer une commande + ses lignes |
| GET | `/api/reservations` | Réservations (filtre optionnel `?userId=`) |
| POST | `/api/reservations` | Créer une réservation |

## Structure du projet

```
restaurant-app/
├── App_Resources/              # Ressources natives Android / iOS
├── src/
│   ├── main.ts
│   └── app/
│       ├── app.component.*     # Composant racine + styles globaux (thème, shimmer, bulle…)
│       ├── app.module.ts
│       ├── app.routes.ts
│       ├── models/             # Interfaces TypeScript
│       ├── data/               # Données de démonstration
│       ├── services/           # Auth, panier, données, thème, garde de route
│       └── components/
│           ├── login/          # Écran de connexion
│           ├── tabs/           # Coquille + barre bulle flottante
│           ├── home/           # Accueil (restaurants, populaires, recherche)
│           ├── menu/           # Menu par catégorie
│           ├── dish-detail/    # Détail d'un plat
│           ├── cart/           # Panier et commande
│           ├── reservations/   # Réservation de table
│           └── profile/        # Profil
├── nativescript.config.ts
├── package.json
└── webpack.config.js
```

> Les données sont fictives (démonstration) et stockées en mémoire : aucun serveur n'est requis.
